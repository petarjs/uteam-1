import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
import { login } from '../services/auth';
import { userRegister } from '../services/register';
import { registerCompany } from '../services/company';
import { uploadPhoto } from '../services/upload';
import { createProfile } from '../services/profile';

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

  const handleUserRegister = async (formData, company, name, email, password) => {
    try {
      const [registerResponse, companyResponse, photoResponse] = await Promise.all([
        userRegister(name, email, password),
        registerCompany(company),
        uploadPhoto(formData),
      ]);
      await createProfile(
        registerResponse.data.user.id,
        companyResponse.data.data.id,
        photoResponse.data[0].id
      );
      setJwt(registerResponse.jwt);
      setUserData(registerResponse.user);
      setIsLoggedIn(true);
      setActiveOption(null);
      return true;
    } catch (error) {
      return false;
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
