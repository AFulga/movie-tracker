import { Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Home() {
  const { user } = useContext(UserContext);
  console.log('user home', user);
  // const displayName = user.displayName.split('|')[0];
  return (
    <Text textAlign='center' mt={3}>
      {`Hi, ${user.firstName}, what are you gonna watch next?`}
    </Text>
  );
}
