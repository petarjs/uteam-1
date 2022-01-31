import { createContext, useContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
import { login } from '../services/auth';
import { userRegister } from '../services/register';
import { registerCompany } from '../services/company';
import { uploadPhoto } from '../services/upload';
import { createProfile, getProfile } from '../services/profile';
import { getUserInfo } from '../services/user';
import { backendClient } from '../services/http';
import { getQuestions } from '../services/questions';

const AuthContextProvider = ({ children }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [jwt, setJwt] = useState(window.localStorage.getItem('jwt'));
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));
  const [profilePhoto, setProfilePhoto] = useState(window.localStorage.getItem('profilePhoto'));
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('jwt') ? true : false);
  const [activeOption, setActiveOption] = useState('login');
  const [activeMainContent, setActiveMainContent] = useState('Main content');
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    try {
      const allQuestions = await getQuestions();
      setQuestions(allQuestions.data);
    } catch (error) {
      return;
    }
  }, []);

  window.localStorage.setItem('isAuthenticated', 'false');

  backendClient.interceptors.request.use(
    (config) => {
      if (window.localStorage.getItem('jwt')) {
        config.headers.Authorization = `Bearer ${window.localStorage.getItem('jwt')}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleLogout = () => {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('profilePhoto');
    setUserName('');
    setProfilePhoto('');
    setIsLoggedIn(false);
    window.localStorage.setItem('isAuthenticated', 'false');
    setActiveOption('login');
  };

  const handleLogin = async (event, email, password) => {
    event.preventDefault();
    try {
      const authenticatedUser = await login(email, password);
      setUserData(authenticatedUser.data);
      setJwt(authenticatedUser.jwt);
      window.localStorage.setItem('jwt', authenticatedUser.jwt);
      setActiveOption(null);
      setErrorVisible(false);

      const userInfo = await getUserInfo();
      const userProfile = await getProfile(userInfo.data.id);

      window.localStorage.setItem(
        'profilePhoto',

        process.env.REACT_APP_ASSET_URL +
          userProfile.data.data[0].attributes.profilePhoto.data.attributes.url
      );

      setProfilePhoto(window.localStorage.getItem('profilePhoto'));
      window.localStorage.setItem('userName', userInfo.data.username);
      setUserName(window.localStorage.getItem('userName'));
      setIsLoggedIn(true);
      window.localStorage.setItem('isAuthenticated', 'true');
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
      setUserData(registerResponse.user);
      setIsLoggedIn(true);
      setActiveOption(null);
      window.localStorage.setItem('jwt', registerResponse.data.jwt);
      const userInfo = await getUserInfo();
      const userProfile = await getProfile(userInfo.data.id);

      window.localStorage.setItem(
        'profilePhoto',
        process.env.REACT_APP_ASSET_URL +
          userProfile.data.data[0].attributes.profilePhoto.data.attributes.url
      );
      setProfilePhoto(window.localStorage.getItem('profilePhoto'));
      window.localStorage.setItem('userName', userInfo.data.username);
      setUserName(window.localStorage.getItem('userName'));
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        jwt,
        handleLogin,
        isLoggedIn,
        handleLogout,
        activeOption,
        setActiveOption,
        errorVisible,
        handleUserRegister,
        profilePhoto,
        userName,
        activeMainContent,
        setActiveMainContent,
        questions,
        setQuestions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
