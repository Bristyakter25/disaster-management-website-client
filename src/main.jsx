import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Router.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS globally
const AppWrapper = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,     
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
