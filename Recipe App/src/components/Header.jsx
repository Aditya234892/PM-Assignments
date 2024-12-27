import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'animate.css';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className='w-full h-20 bg-gradient-to-b from-amber-600/80 to-amber-600/10'>
      <ul className='w-full h-full flex justify-center items-center gap-8'>
        <li className='text-2xl font-semibold text-amber-95 animate__animated animate__tada'>
          <Link
            to="/"
            className={`${location.pathname === '/' ? 'underline' : ''}`}
          >
            Home
          </Link>
        </li>
        <li className='text-2xl font-semibold animate-color-change'>
          <Link
            to="/fav_recipe"
            className={`${location.pathname === '/fav_recipe' ? 'underline' : ''}`}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
