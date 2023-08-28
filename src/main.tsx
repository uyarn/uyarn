import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@/styles/theme.css';
import '@/styles/reset.css';
import '@/styles/responsive.css';

import App from './layouts/index';

const env = import.meta.env.MODE || 'development';
const baseRouterName = env === 'development' ? '' : '';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('app')!;

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <BrowserRouter basename={baseRouterName}>
      <App />
    </BrowserRouter>,
  );
};

renderApp();
