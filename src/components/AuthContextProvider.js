import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
import { login } from '../services/auth';
import { userRegister } from '../services/reg';

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

  const handleUserRegister = async (name, email, password) => {
    try {
      await userRegister(name, email, password);

      // Not using handle login function because it requires event in order to prevent default behaviour
      const authenticatedUser = await login(email, password);
      setJwt(authenticatedUser.jwt);
      setUserData(authenticatedUser.user);
      setIsLoggedIn(true);
      setActiveOption(null);
    } catch (error) {
      console.error(error);
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
        handleUserRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
