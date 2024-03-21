import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import { getCookie } from './Cookies/Cookie';


const client = new ApolloClient({
  uri:"http://5.189.166.187:4001/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <Router>
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </Router>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
