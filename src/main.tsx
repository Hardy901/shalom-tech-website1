import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ReactLenis } from 'lenis/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 0.7, smoothWheel: true }}>
      <App />
    </ReactLenis>
  </React.StrictMode>
);
