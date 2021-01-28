const { HStack, Box, Heading, Text } = require('@chakra-ui/react');

const MovieCrew = ({ data }) => {
  const director = data.find((dt) => dt.job === 'Director');
  const novel = data.find((dt) => dt.job === 'Novel');
  const screenplay = data.find((dt) => dt.job === 'Screenplay');
  const writer = data.find((dt) => dt.job === 'Writer');
  const crew = [director, novel, screenplay || writer].filter((el) => el);
  crew.push(...Array(3 - crew.length).fill());
  return (
    <HStack justify='space-between' flexWrap='wrap'>
      {crew.map((person, index) => {
        return (
          <Box
            key={`${person?.name}${index}`}
            ml='0px !important'
            mt='35px !important'
          >
            <Heading as='h3' fontSize='1.1em' lineHeight='1.3em'>
              {person?.name}
            </Heading>
            <Text>{person?.job}</Text>
          </Box>
        );
      })}
    </HStack>
  );
};

export default MovieCrew;
