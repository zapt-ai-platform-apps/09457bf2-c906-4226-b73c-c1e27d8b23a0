import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Net Ai</h1>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="text-sm text-gray-600">
              {user.email}
            </span>
            <button 
              onClick={signOut} 
              className="btn-secondary text-sm py-1.5"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;