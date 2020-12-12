import {
  Button,
  Container,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Link,
} from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { LOGIN_URL, USER_URL } from '../connectors/api';
import { UserContext } from '../context/UserContext';
import useFetchCallback from '../hooks/useFetchCallback';
import { STATUS } from '../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { setUser } = useContext(UserContext);

  const [callback, { data, status }] = useFetchCallback(LOGIN_URL, 'POST', {
    email,
    pass,
  });
  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  console.log('user', data?.user);

  return (
    <Container p={3} maxW='30em' mt='10px'>
      <Stack spacing={3}>
        <Text fontSize='2xl' align='center'>
          Login
        </Text>
        {data?.message && (
          <Text fontSize='xl' align='center' color='tomato'>
            {data.message}
          </Text>
        )}
        <InputGroup>
          <InputLeftAddon children='Email' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Password' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            type='password'
          />
        </InputGroup>
        <Box display='flex' justifyContent='space-between'>
          <Box display='flex'>
            <Text marginRight='5px'>No account?</Text>
            <Link as={RouterLink} to='/signup' color='teal.200'>
              Signup
            </Link>
          </Box>
          <Button
            isLoading={status === STATUS.PENDING}
            colorScheme='blue'
            spinner={<BeatLoader size={8} color='white' />}
            onClick={callback}
          >
            Login
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
