import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi'; // Feather Icons에서 화살표 아이콘 불러오기
import { useLocation } from 'react-router-dom';


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const toggleVisibility = () => {
    if (window.scrollY > 300) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <a
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '15%',
          backgroundColor: 'rgb(47, 85, 212)', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
          zIndex: 1000
        }}      
      onClick={scrollToTop} className="scroll-to-top"><FiArrowUp /></a>
    )
  );
};

export default ScrollToTop;
