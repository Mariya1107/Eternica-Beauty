import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ offset = 120 }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
