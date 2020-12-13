import React, { useContext } from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { WATCHLIST_URL } from '../connectors/api';
import { STATUS } from '../utils';
import RatingCircle from '../components/RatingCircle';
import { UserContext } from '../context/UserContext';

export default function Watchlist() {
  const { user } = useContext(UserContext);
  const { status, data: movies, error } = useFetchEffect(
    `${WATCHLIST_URL}/${user.uid}`
  );

  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH='50vh'>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>Error fetching watchlist: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW='80em'>
      <SimpleGrid
        minChildWidth={100}
        spacing={3}
        gridTemplateColumns='repeat(4, minmax(100px, 1fr))'
      >
        {movies.map((movie) => (
          <Box
            as={Link}
            to={`/movies/${movie.id}`}
            key={movie.id}
            pos='relative'
            noOfLines={2}
            width='fit-content'
          >
            <RatingCircle
              score={movie.vote_average}
              isLabelHidden
              css={{ margin: 0, position: 'absolute', right: 0 }}
              scale='scale(0.8)'
            />
            <Tooltip label={movie.title}>
              <Image
                src={buildImageUrl(movie.poster_path, 'w300')}
                alt='Poster'
                fallbackSrc={imageFallback}
              />
            </Tooltip>
            <Text>{movie.title}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
