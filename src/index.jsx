import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/Admin';

function Root() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, '');
    return path === '/admin' || window.location.hash === '#admin' || window.location.search.includes('admin');
  });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      setIsAdminRoute(path === '/admin' || window.location.hash === '#admin' || window.location.search.includes('admin'));
    };

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  return isAdminRoute ? (
    <Admin onNavigateToPortfolio={() => { window.location.hash = ''; setIsAdminRoute(false); }} />
  ) : (
    <App onNavigateToAdmin={() => { window.location.hash = '#admin'; setIsAdminRoute(true); }} />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

