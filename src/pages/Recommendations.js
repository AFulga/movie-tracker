import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import MovieCard from '../components/MovieCard';
import { WATCHLIST_URL } from '../connectors/api';
import { buildImageUrl } from '../connectors/tmdb';
import useFetchEffect from '../hooks/useFetchEffect';
import { shuffle, STATUS, sleep } from '../utils';

export default function Recommendations() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const { data: movies, error } = useFetchEffect(`${WATCHLIST_URL}`);
  const [recomandedMovies, setRecomandedMovies] = useState({
    selectedMovies: [],
    availableMovies: [],
  });

  useEffect(() => {
    setStatus(STATUS.PENDING);
    console.log('xxxx');
    if (movies) {
      console.log(recomandedMovies.selectedMovies);
      setRecomandedMovies(() => {
        const moviesPick = shuffle(movies).slice(0, 3);
        return {
          selectedMovies: [...moviesPick],
          availableMovies: movies.filter(
            (movie) => moviesPick.indexOf(movie) === -1
          ),
        };
      });
      setStatus(STATUS.RESOLVED);
    }
  }, [movies]);

  const newRecomandation = async () => {
    setStatus(STATUS.PENDING);
    await sleep();
    setRecomandedMovies((prev) => {
      const moviesPick = shuffle(prev.availableMovies).slice(0, 3);
      return {
        selectedMovies: [...moviesPick],
        availableMovies: prev.availableMovies.filter(
          (movie) => moviesPick.indexOf(movie) === -1
        ),
      };
    });
    setStatus(STATUS.RESOLVED);
  };

  if (status === STATUS.IDLE) {
    return null;
  }

  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>Error fetching watchlist: {JSON.stringify(error)}</Text>
      </Container>
    );
  }
  const { selectedMovies, availableMovies } = recomandedMovies;
  return (
    <Container
      p={3}
      maxW='85ch'
      d='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Box mb='15px'>
        <Button
          isLoading={status === STATUS.PENDING}
          loadingText='Chek for recomandations'
          colorScheme='teal'
          onClick={newRecomandation}
          disabled={status === STATUS.IDLE || availableMovies.length === 0}
        >
          More recomandations
        </Button>
      </Box>
      {status === STATUS.PENDING && (
        <Center minH='50vh'>
          <CircularProgress isIndeterminate />
        </Center>
      )}
      {status === STATUS.RESOLVED && (
        <SimpleGrid
          minChildWidth={150}
          spacing={3}
          d='flex'
          justifyContent='center'
          flexWrap='wrap'
        >
          {selectedMovies.map((movie) => {
            const src = buildImageUrl(movie.poster_path, 'w300');

            return (
              <MovieCard
                key={movie.movieId}
                // movieId={movie.movieId}
                movie={movie}
                imageSrc={src}
                showDatePicker={false}
              />
            );
          })}
        </SimpleGrid>
      )}
    </Container>
  );
}
