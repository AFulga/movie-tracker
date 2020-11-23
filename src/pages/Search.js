import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Input,
  IconButton,
  UnorderedList,
  ListItem,
  Container,
  Link,
  Progress,
  Text,
  VStack,
  StackDivider,
  Divider,
  Heading,
  Image,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useFetchEffect from '../hooks/useFetchEffect';
import {
  buildSearchMovieUrl,
  buildImageUrl,
  imageFallback,
} from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import RatingCircle from '../components/RatingCircle';

export default function Search() {
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };

  const { status, data, error } = useFetchEffect(
    buildSearchMovieUrl(terms),
    !!terms
  );

  return (
    <Container p={3}>
      <Box as='form' onSubmit={handleSearch} w='100%' d='flex' mb={3}>
        <Input
          placeholder='Search for a movie...'
          defaultValue={terms}
          ref={searchRef}
          mr={3}
        />
        <IconButton
          aria-label='Search for a movie'
          icon={<SearchIcon />}
          type='submit'
          isLoading={status === STATUS.PENDING}
        />
      </Box>
      {status === STATUS.IDLE && (
        <Text>Type some terms and submit for a quick search</Text>
      )}
      {status === STATUS.PENDING && <Progress size='xs' isIndeterminate />}
      {status === STATUS.REJECTED && (
        <Text>
          Error fetching movies for {terms}: {JSON.stringify(error)}
        </Text>
      )}
      {status === STATUS.RESOLVED && (
        <VStack spacing={0} align='stretch'>
          {data.results.map((movie) => {
            const { id, title, release_date } = movie;
            return (
              <Box key={id}>
                <Link
                  textDecoration='none'
                  _hover={{ textDecoration: 'none' }}
                  as={RouterLink}
                  to={`/movies/${id}`}
                >
                  <Box
                    cursor='pointer'
                    // __css={{ cursor: 'pointer' }}
                    _hover={{
                      background: 'rgba(255, 255, 255, 0.12)',
                    }}
                    padding={2}
                    display='flex'
                    spacing={1}
                    height={88}
                  >
                    <Box>
                      <Image
                        src={buildImageUrl(movie.poster_path, 'w300')}
                        alt='Poster'
                        width='48px'
                        fallbackSrc={imageFallback}
                      />
                    </Box>
                    <Box
                      flex={1}
                      marginLeft={5}
                      d='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Heading fontSize='s'>
                        {title}
                        <Text as='span' color='GrayText' ml='2px'>
                          ({getYear(release_date)})
                        </Text>
                      </Heading>

                      <RatingCircle
                        score={movie.vote_average || 0}
                        scale='scale(0.5)'
                        // isLabelHidden
                        css={{
                          margin: 0,
                        }}
                      />
                    </Box>
                  </Box>
                </Link>
                <Divider />
              </Box>
            );
          })}
        </VStack>
      )}
      {status === STATUS.RESOLVED && data.results.length === 0 && (
        <Text>
          No results found for <b>"{searchRef.current.value}"</b>
        </Text>
      )}
    </Container>
  );
}
