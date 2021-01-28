import React, { useContext, useState } from 'react';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';

import { Link, Box, Heading, Flex, Button, Container } from '@chakra-ui/react';
import { ArrowForwardIcon, HamburgerIcon } from '@chakra-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import UserIcon from './UserIcon';
import { UserContext } from '../context/UserContext';
import useFetchCallback from '../hooks/useFetchCallback';
import { LOGOUT_URL } from '../connectors/api';

const MenuItem = ({ to, children }) => (
  <Link as={RouterLink} to={to} mt={{ base: 4, sm: 0 }} mr={6} display='block'>
    {children}
  </Link>
);

export default function Header() {
  // const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [show, setShow] = React.useState(false);
  const [callback, state] = useFetchCallback(LOGOUT_URL);
  const handleToggle = () => setShow((s) => !s);

  const handleLogOut = () => {
    callback();
    setUser(null);
    // history.push('/');
    // setUser(null)
  };
  // console.log('history', history);
  console.log('logout state', state);
  return (
    <Box bg='teal.500'>
      <Container p={0} maxW='80em'>
        <Flex
          as='nav'
          align='center'
          justify='space-between'
          wrap='wrap'
          padding='1.5rem'
          color='white'
        >
          <Flex align='center' mr={5}>
            <Heading as={RouterLink} to='/' size='lg' letterSpacing={'-.1rem'}>
              Movie Tracker
            </Heading>
          </Flex>

          <Box display={{ base: 'block', sm: 'none' }} onClick={handleToggle}>
            <Button bg='transparent'>
              <HamburgerIcon w={12} />
            </Button>
          </Box>

          <Box
            display={{ base: show ? 'block' : 'none', sm: 'flex' }}
            width={{ base: 'full', sm: 'auto' }}
            alignItems='center'
            flexGrow={1}
          >
            <MenuItem to='/search'>Search</MenuItem>
            <MenuItem to='/watchlist'>Watchlist</MenuItem>
            <MenuItem to='/history'>History</MenuItem>
            <MenuItem to='/profile'>
              <UserIcon />
            </MenuItem>
          </Box>

          <Box
            display={{ base: show ? 'block' : 'none', sm: 'block' }}
            mt={{ base: 4, sm: 0 }}
          >
            <Button
              as={RouterLink}
              to='/recommendations'
              bg='transparent'
              border='1px'
            >
              What to watch
            </Button>

            <Button
              rightIcon={<ArrowForwardIcon />}
              as={RouterLink}
              to='/'
              color='yellow.100'
              border='1px'
              bg='transparent'
              size='xs'
              ml='5px'
              onClick={() => handleLogOut()}
            >
              Log out
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
