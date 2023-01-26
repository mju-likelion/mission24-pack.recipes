import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga';

const root = createRoot(document.getElementById('root'));
ReactGA.initialize(process.env.GA_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
);
