import { Link } from 'react-router-dom';
import { Box, Center, Text } from '@chakra-ui/react';
import { releaseDateFormat2, STATUS } from '../utils';
import RatingCircle from './RatingCircle';
import DatePick from './DatePick';
import useMovie from '../hooks/useMovie';
import { buildImageUrl } from '../connectors/tmdb';
import WatchlistButton from './WatchlistButton';
import { CircularProgress, Container } from '@material-ui/core';

const MovieCard = ({ movie, imageSrc, showDatePicker = true }) => {
  // const MovieCard = ({ movieId, showDatePicker = true }) => {
  //   const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);
  //   const imageSrc = buildImageUrl(movie?.poster_path, 'w300');
  const { movie: movieToUpdate, status, error, updateMovie } = useMovie(
    movie.movieId
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
        <Text>
          Error fetching movie with ID {movie.movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }
  console.log('status', status);
  return (
    <Box
      key={movie.movieId}
      h='360px'
      overflow='hidden'
      width='220px'
      maxW='250px'
      background='#fff'
      borderRadius={5}
      pos='relative'
    >
      <WatchlistButton
        css={{
          position: 'absolute',
          zIndex: 1,
          right: '0.2em',
          top: '0.2em',
        }}
        movie={movieToUpdate}
        update={updateMovie}
      />
      <Box
        as={Link}
        to={`/movies/${movie.id}`}
        key={movie.id}
        pos='relative'
        noOfLines={2}
        h={showDatePicker ? '60%' : '70%'}
        overflow='unset'
      >
        <Box
          h='100%'
          w='100%'
          position='relative'
          backgroundImage={`url(${imageSrc})`}
          backgroundSize='cover '
        >
          <Box position='absolute' bottom='-30px'>
            <RatingCircle
              score={movie.vote_average}
              scale='scale(0.6)'
              isLabelHidden
              css={{
                margin: 0,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box mt='20px' w='100%'>
        <Box p='0 10px' fontWeight='700' color='#000'>
          {movie.title}
        </Box>
        <Box
          p='0 10px'
          fontWeight='600'
          color='#000'
          opacity={0.5}
          isTruncated={false}
        >
          {`R: ${releaseDateFormat2(movie.release_date)}`}
        </Box>
        {showDatePicker && (
          <Box
            p='0 10px'
            fontWeight='600'
            color='#000'
            opacity={0.5}
            d='flex'
            justifyContent='space-between'
          >
            <DatePick
              movieId={movie.movieId}
              whatched_date={movie.whatched_date}
              release_date={movie.release_date}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MovieCard;
