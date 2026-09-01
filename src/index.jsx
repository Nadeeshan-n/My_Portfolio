import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/Admin';

const isAdminRoute = window.location.pathname.replace(/\/+$/, '') === '/admin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminRoute ? <Admin /> : <App />}
  </React.StrictMode>
);
