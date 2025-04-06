
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only navigate if we're exactly at the root path
    // This prevents an infinite redirection loop
    if (location.pathname === '/') {
      navigate('/welcome');
    }
  }, [navigate, location.pathname]);

  return null;
};

export default Index;
