import React, { createContext, useState, useContext } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);


  return (
    <RoleContext.Provider value={{ role, setRole,userData, setUserData }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
