import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// // import function to register Swiper custom elements
// import { register } from 'swiper/element/bundle';
// // register Swiper custom elements
// register();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
