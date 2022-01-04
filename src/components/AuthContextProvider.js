import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
import { login } from '../services/auth';

const AuthContextProvider = ({ children }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [jwt, setJwt] = useState();
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeOption, setActiveOption] = useState('login');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveOption('login');
  };

  const handleLogin = async (event, email, password) => {
    event.preventDefault();
    try {
      const authenticatedUser = await login(email, password);
      setJwt(authenticatedUser.jwt);
      setUserData(authenticatedUser.user);
      setIsLoggedIn(true);
      setActiveOption(null);
      setErrorVisible(false);
    } catch (error) {
      console.error(error);
      setErrorVisible(true);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        jwt,
        userData,
        handleLogin,
        isLoggedIn,
        handleLogout,
        activeOption,
        setActiveOption,
        errorVisible,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
