import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { worker } from './mocks/browser';

const enableMocking = async () => {
  if (process.env.REACT_APP_ENV_NAME === 'LOCAL') {
    await worker.start();
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
