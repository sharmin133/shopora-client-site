import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

      const [user, setUser] = useState(null); // JWT token or user info 

  const login = (token, userData) => {
    setUser({ token, ...userData });
  };

  const logout = () => {
    setUser(null);
  };
    return (
         <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;