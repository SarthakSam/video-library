import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

import { StoreProvider } from './contexts/store-context';
import { LoaderProvider } from './contexts/loader-context';
import { NotificationsProvider } from './contexts/notifications-context';
import { AuthProvider } from './contexts/auth-context';

ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
        <StoreProvider>
          <LoaderProvider>
            <NotificationsProvider>
              <Router>
                <App />              
              </Router>
            </NotificationsProvider>
          </LoaderProvider>
        </StoreProvider>
      </AuthProvider>
      
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
