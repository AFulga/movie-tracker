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
import { NavLink as RouterLink } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { LOGIN_URL, SIGNUP_URL, USER_URL } from '../connectors/api';
import useFetchCallback from '../hooks/useFetchCallback';
import { STATUS, validateEmail } from '../utils';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [surename, setSurename] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');

  const [callback, { data, status }] = useFetchCallback(SIGNUP_URL, 'POST', {
    email,
    pass,
    firstName,
    surename,
  });

  useEffect(() => {
    if (data?.message) {
      setMessage(data.message);
    }
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  const submitData = () => {
    setMessage('');
    if (validateEmail(email) && firstName && surename && pass) {
      callback();
    } else {
      if (!(email && firstName && surename && pass)) {
        setMessage('All fields are required');
      } else {
        if (!validateEmail(email)) {
          setMessage('Email address is not in the correct format.');
        }
      }
    }
  };

  console.log('user', data?.user);

  return (
    <Container p={3} maxW='30em' mt='10px'>
      <Stack spacing={3}>
        <Text fontSize='2xl' align='center'>
          Sign Up
        </Text>
        {message && (
          <Text fontSize='xl' align='center' color='tomato'>
            {message}
          </Text>
        )}
        <InputGroup>
          <InputLeftAddon children='First name' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='Surename' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={surename}
            onChange={(event) => setSurename(event.target.value)}
          />
        </InputGroup>
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
            <Text marginRight='5px'>Already have an account?</Text>
            <Link as={RouterLink} to='/' color='teal.200' textDecoration='none'>
              Login
            </Link>
          </Box>
          <Button
            isLoading={status === STATUS.PENDING}
            colorScheme='blue'
            spinner={<BeatLoader size={8} color='white' />}
            onClick={submitData}
          >
            Sign Up
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Signup;
