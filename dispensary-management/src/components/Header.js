import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className=" bg-gray-100 p-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold flex items-center">
          <img src="/logo3.webp" alt="Logo" className="h-12 w-12 bg-blue-600 inline mr-2" />
          <span className="hidden md:inline">Dispensary Management System</span>
          <span className="md:hidden">DMS</span> {/* Shorter text for mobile */}
        </Link>
        <div className='flex space-x-4'>
          {isLoggedIn ? (
            <>
            <Link
              to="/appointment"
              className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 transition duration-100"
            >
              Dashboard
            </Link>
            <button
              onClick={onLogoutClick}
              className="bg-orange-500 px-6 py-3 rounded hover:bg-red-600 transition duration-100">
              Logout
            </button>
            </>
          ) : (
            <Link to="/" className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 transition duration-100">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
