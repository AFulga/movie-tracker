const { Heading, Text } = require('@chakra-ui/react');

const Overview = ({ text }) => {
  return (
    <>
      <Heading as='h3' fontSize='1.7em' mb='5px'>
        Overview
      </Heading>
      <Text>{text}</Text>
    </>
  );
};

export default Overview;
