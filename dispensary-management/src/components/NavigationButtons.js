import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationButtons = ({ pages }) => {
  const location = useLocation();
  const currentPageIndex = pages.findIndex(page => page.path === location.pathname);

  return (
    <div className="navigation-buttons flex justify-between items-center py-4">
      {/* Back Button */}
      {currentPageIndex > 0 ? (
        <Link
          to={pages[currentPageIndex - 1].path}
          className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg"
        >
          Back
        </Link>
      ) : (
        <button className="bg-gray-200 text-black py-2 px-4 rounded-lg" disabled>
          Back
        </button>
      )}

      {/* Next Button */}
      {currentPageIndex < pages.length - 1 ? (
        <Link
          to={pages[currentPageIndex + 1].path}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Next
        </Link>
      ) : (
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" disabled>
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
