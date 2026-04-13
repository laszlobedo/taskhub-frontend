import React from 'react';
import ReactDOM from 'react-dom/client';
import DesignPreview from './components/DesignPreview';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Nem található a gyökér elem a Preview-hoz');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DesignPreview onExit={() => { window.location.href = '/'; }} />
  </React.StrictMode>
);

