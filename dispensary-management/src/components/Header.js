import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your SVG icons
import HomeIcon from './assets/home.svg';  
import LogoutIcon from './assets/logout.svg'; 
const Header = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold flex items-center">
          <img src="/logo3.webp" alt="Logo" className="h-12 w-12 bg-blue-600 inline mr-2" />
          <span className="hidden md:inline">Dispensary Management System</span>
          <span className="md:hidden">DMS</span>
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* Home Icon */}
              <Link
                to="/appointment"
                className="flex items-center justify-center bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition duration-100"
                title="Dashboard"
              >
                <img src={HomeIcon} alt="Home" className="h-5 w-5 mr-1" />
              </Link>
              {/* Logout Icon */}
              <button
                onClick={onLogoutClick}
                className="flex items-center justify-center bg-orange-500 px-4 py-2 rounded hover:bg-red-600 transition duration-100"
                title="Logout"
              >
                <img src={LogoutIcon} alt="Logout" className="h-5 w-5 mr-1" />
              </button>
            </>
          ) : (
            <Link to="/" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition duration-100">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
