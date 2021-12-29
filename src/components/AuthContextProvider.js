import { login } from '../utils/authenticate';
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [jwt, setJwt] = useState();
  const [userData, setUserData] = useState();
  return (
    <AuthContext.Provider value={{ jwt, setJwt, userData, setUserData, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
