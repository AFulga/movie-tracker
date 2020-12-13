import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Select,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl } from '../connectors/tmdb';
import { HISTORY_URL } from '../connectors/api';
import { STATUS } from '../utils';

import MovieCard from '../components/MovieCard';
import { UserContext } from '../context/UserContext';

const sortValues = [
  {
    key: 'release_date',
    isDate: true,
  },
  {
    key: 'title',
    isDate: false,
  },
  {
    key: 'whatched_date',
    isDate: true,
  },
];

const sortFn = (m1, m2, { key, isDate }) => {
  const val1 = isDate ? new Date(m1[key]) : m1[key].toLowerCase();
  const val2 = isDate ? new Date(m2[key]) : m2[key].toLowerCase();

  if (val1 < val2) {
    return -1;
  }
  if (val1 > val2) {
    return 1;
  }
  return 0;
};

export default function History() {
  const { user } = useContext(UserContext);
  const { status, data: movies, error } = useFetchEffect(
    `${HISTORY_URL}/${user.uid}`
  );
  const [sortVal, setSortVal] = useState(sortValues[0]);
  const [sortedMovies, setSortedMovies] = useState([]);

  useEffect(() => {
    if (movies && sortedMovies.length === 0) {
      setSortedMovies([...movies].sort((m1, m2) => sortFn(m1, m2, sortVal)));
    }
    if (sortedMovies.length && sortVal) {
      setSortedMovies((prev) =>
        [...prev].sort((m1, m2) => sortFn(m1, m2, sortVal))
      );
    }
  }, [movies, sortVal]);

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

  // let sortedMovies = movies.sort((m1, m2) => sortFn(m1, m2, sortVal));
  const handleDateChange = (movieId, newDate) => {
    setSortedMovies((prev) => {
      const temp = [...prev].map((movie) => {
        if (movie.movieId === movieId) {
          return {
            ...movie,
            whatched_date: newDate,
          };
        }
        return movie;
      });
      return [...temp].sort((m1, m2) => sortFn(m1, m2, sortVal));
    });
  };

  return (
    <Container p={3} maxW='50em'>
      <Box mb='20px'>
        <InputGroup d='flex' justifyContent='center'>
          <InputLeftAddon children='Sort By:' />
          <Select
            w='150px'
            onChange={(event) => {
              setSortVal(sortValues[event.target.value]);
            }}
            defaultValue={0}
          >
            <option value='0'>Release date</option>
            <option value='1'>Name</option>
            <option value='2'>View Date</option>
          </Select>
        </InputGroup>
      </Box>
      <SimpleGrid
        minChildWidth={150}
        spacing={3}
        gridTemplateColumns='repeat(3, minmax(10px, 1fr))'
      >
        {sortedMovies.map((movie) => {
          const src = buildImageUrl(movie.poster_path, 'w300');

          return (
            <MovieCard
              key={movie.movieId}
              movie={movie}
              imageSrc={src}
              reRender={handleDateChange}
            />
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
