import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import MovieFacts from '../components/MovieFacts';
import RatingCircle from '../components/RatingCircle';
import Overview from '../components/Overviw';
import MovieCrew from '../components/MovieCrew';
import HistoryButton from '../components/HistoryButton';

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();

  const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);

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
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }
  const isDisabled = new Date() <= new Date(movie.release_date);

  console.log('movie', movie);

  return (
    <Container p={3} maxW='70vw'>
      <HStack mb={3} justify='space-between'>
        <IconButton
          aria-label='Back'
          icon={<ChevronLeftIcon />}
          variant='outline'
          fontSize={36}
          colorScheme='teal'
          onClick={history.goBack}
        />
        <HStack>
          <WatchlistButton
            movie={movie}
            // status={updateStatus}
            update={updateMovie}
          />
          <HistoryButton
            movie={movie}
            // status={updateStatus}
            update={updateMovie}
            isDisabled={isDisabled}
          />
        </HStack>
      </HStack>
      <HStack align='flex-start'>
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt='Poster'
            w='35vw'
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box maxW='70vw' paddingLeft={10}>
          <Heading as='h2'>
            {movie.title}
            <Text as='span' marginLeft='5px' fontWeight={400} opacity={0.8}>
              ({getYear(movie.release_date)})
            </Text>
          </Heading>
          <MovieFacts movie={movie} />
          <RatingCircle score={movie.vote_average} />
          <Text fontStyle='italic' opacity={0.8} mb='5px'>
            {movie.tagline}
          </Text>
          <Overview text={movie.overview} />
          <MovieCrew data={movie.crew} />
        </Box>
      </HStack>
    </Container>
  );
}
