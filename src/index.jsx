import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/Admin';
import Publish from './admin/Publish';

const path = window.location.pathname.replace(/\/+$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {path === '/admin/publish' ? <Publish /> : path === '/admin' ? <Admin /> : <App />}
  </React.StrictMode>
);
