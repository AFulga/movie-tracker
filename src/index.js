import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './components/App';
import theme from './theme';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
