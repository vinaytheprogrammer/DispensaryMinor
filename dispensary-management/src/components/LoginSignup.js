import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ setUser, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('doctor');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Automatically log in the user if a token is found in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Optionally, you can decode the token and set the user info
      setIsLoggedIn(true);
      // You can also fetch the user data using the token if needed
      navigate('/appointment');
    }
  }, [navigate, setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    const body = isLogin
      ? { email, password }
      : { name, email, password, role };

    try {
      const response = await fetch(`https://dispensaryminor-aa3dd5f90851.herokuapp.com/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token in localStorage
        localStorage.setItem('authToken', data.token); // Assuming the token is in `data.token`
        
        // Set the user and logged-in status
        setUser(data.user);
        setIsLoggedIn(true);
        
        toast.success(`${isLogin ? 'Login' : 'Registration'} successful!`);
        
        // Navigate to the appointment page after login/register
        setTimeout(() => {
          navigate('/appointment');
        }, 500); // 500ms delay
        
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 ">
        <h2 className="text-2xl font-bold mb-2 text-center"> {/* Reduced margin bottom */}
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </>
          )}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p
          className="text-center mt-4 cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginSignup;
