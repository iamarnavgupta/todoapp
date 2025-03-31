import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(); 

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to update user state
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save user data to localStorage (optional)
  };

  // Logout function to clear user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>  
      {children} 
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export default ContextProvider;
