require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './utils/theme';
import AuthContextProvider from './components/AuthContextProvider';
import QuestionContextProvider from './components/QuestionContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <QuestionContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </QuestionContextProvider>
      </ChakraProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
