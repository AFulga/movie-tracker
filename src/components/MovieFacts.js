import { buildImageUrl } from '../connectors/tmdb';

const {
  HStack,
  Box,
  Image,
  Heading,
  Text,
  Badge,
} = require('@chakra-ui/react');
const {
  releaseDateFormat,
  getYear,
  runtimeFormat,
  finReleseByCountry,
} = require('../utils');

const MovieFacts = ({ movie }) => {
  const rDate_US = finReleseByCountry(movie.release_dates, 'US');
  const rDate_RO = finReleseByCountry(movie.release_dates, 'RO');

  if (!rDate_RO && !rDate_US) {
    return null;
  }

  const rDate = rDate_RO || rDate_US;

  const { certification, release_date, countryCode } = rDate[0];

  return (
    <HStack mt='5px' mb='5px' flexWrap='wrap'>
      {certification && (
        <Badge variant='outline' fontWeight={400} fontSize='1em'>
          {certification}
        </Badge>
      )}
      <Text>{`${releaseDateFormat(release_date)} (${countryCode})`}</Text>
      {movie.genres.length && (
        <Box d='flex'>
          <Text>&bull;</Text>
          <Text ml='5px'>{movie.genres.map((m) => m.name).join(', ')}</Text>
        </Box>
      )}
      <Box d='flex'>
        <Text>&bull;</Text>
        <Text ml='5px'>{runtimeFormat(movie.runtime)}</Text>
      </Box>
    </HStack>
  );
};

export default MovieFacts;
