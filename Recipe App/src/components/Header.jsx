import React from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-full h-20 bg-gradient-to-b from-amber-600/80 to-amber-600/10'>
      <ul className='w-full h-full flex justify-center items-center gap-8'>
        <li className='text-2xl font-semibold text-amber-95 animate__animated animate__tada'>
          <Link to="/">Home</Link>
        </li>
        <li className='text-2xl font-semibold animate-color-change'>
          <Link to="/fav_recipe">Favorites</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
