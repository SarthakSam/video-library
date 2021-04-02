import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {server} from './server/mock.api';
import { StoreProvider } from './store-context';
import { LoaderProvider } from './loader-context';

server();

ReactDOM.render(
    <React.StrictMode>
      <StoreProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </StoreProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
