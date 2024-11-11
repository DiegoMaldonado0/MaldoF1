import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">MALDO F1</Link>
        </div>
        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/drivers" className="text-white hover:text-gray-300">Drivers</Link>
          <Link to="/driver-standings" className="text-white hover:text-gray-300">Driver Standings</Link>
          <Link to="/constructor-standings" className="text-white hover:text-gray-300">Constructor Standings</Link>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-red-800 p-4`}>
        <Link to="/" className="text-white block py-2 hover:text-gray-300" onClick={closeMenu}>Home</Link>
        <Link to="/drivers" className="text-white block py-2 hover:text-gray-300" onClick={closeMenu}>Drivers</Link>
        <Link to="/driver-standings" className="text-white block py-2 hover:text-gray-300" onClick={closeMenu}>Driver Standings</Link>
        <Link to="/constructor-standings" className="text-white block py-2 hover:text-gray-300" onClick={closeMenu}>Constructor Standings</Link>
      </div>
    </nav>
  );
};

export default Navbar;
