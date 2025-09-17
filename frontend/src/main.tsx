import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Providers } from './providers';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Providers />
    </StrictMode>,
  );
}
