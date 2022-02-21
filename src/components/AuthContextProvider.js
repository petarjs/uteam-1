import { createContext, useContext, useState } from 'react';
export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
import { login, passwordChange } from '../services/auth';
import { userRegister } from '../services/register';
import { registerCompany, getCompnay, editCompany, getCompanyLogo } from '../services/company';
import { uploadPhoto } from '../services/upload';
import { createProfile, getProfile, editProfile } from '../services/profile';
import { getUserInfo } from '../services/user';
import { backendClient } from '../services/http';

const AuthContextProvider = ({ children }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [jwt, setJwt] = useState(window.localStorage.getItem('jwt'));
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));
  const [profilePhoto, setProfilePhoto] = useState(window.localStorage.getItem('profilePhoto'));
  const [company, setCompany] = useState(window.localStorage.getItem('company'));
  const [companyLogo, setCompanyLogo] = useState(window.localStorage.getItem('companyLogo'));
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('jwt') ? true : false);
  const [activeOption, setActiveOption] = useState('login');
  const [activeMainContent, setActiveMainContent] = useState('Main content');

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
    window.localStorage.removeItem('profileId');
    window.localStorage.removeItem('companyId');
    window.localStorage.removeItem('company');
    window.localStorage.removeItem('companyLogo');
    window.localStorage.removeItem('allQuestions');
    setCompanyLogo(false);
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
      setUserData(authenticatedUser.data.data);
      setJwt(authenticatedUser.data.jwt);
      window.localStorage.setItem('jwt', authenticatedUser.data.jwt);
      window.localStorage.setItem('email', email);
      setActiveOption(null);
      setErrorVisible(false);

      const userInfo = await getUserInfo();
      const userProfile = await getProfile(userInfo.data.id);
      const userCompany = await getCompnay(userInfo.data.id);

      window.localStorage.setItem('profileId', userProfile.data.data[0].id);
      const companyLogo = await getCompanyLogo(window.localStorage.getItem('profileId'));

      if (companyLogo.data.data[0].attributes.logo.data) {
        window.localStorage.setItem(
          'companyLogo',
          process.env.REACT_APP_ASSET_URL +
            companyLogo.data.data[0].attributes.logo.data.attributes.url
        );
      } else {
        window.localStorage.setItem('companyLogo', false);
      }

      setCompanyLogo(window.localStorage.getItem('companyLogo'));
      window.localStorage.setItem(
        'profilePhoto',

        process.env.REACT_APP_ASSET_URL +
          userProfile.data.data[0].attributes.profilePhoto.data.attributes.url
      );
      window.localStorage.setItem(
        'company',
        userCompany.data.data[0].attributes.company.data.attributes.name
      );
      window.localStorage.setItem('companyId', userCompany.data.data[0].attributes.company.data.id);

      setCompany(window.localStorage.getItem('company'));
      setProfilePhoto(window.localStorage.getItem('profilePhoto'));
      window.localStorage.setItem('userName', userProfile.data.data[0].attributes.name);
      setUserName(window.localStorage.getItem('userName'));
      setIsLoggedIn(true);
      window.localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error(error);
      setErrorVisible(true);
    }
  };

  const handlePasswordChange = async (currentPassword, newPassword) => {
    try {
      let authenticatedUser = await login(window.localStorage.getItem('email'), currentPassword);
      if (authenticatedUser.status === 200) {
        const userId = authenticatedUser.data.user.id;

        await passwordChange(userId, newPassword);
        authenticatedUser = await login(window.localStorage.getItem('email'), newPassword);

        window.localStorage.setItem('jwt', authenticatedUser.data.jwt);
        setJwt(window.localStorage.getItem('jwt'));
      }
    } catch (error) {
      console.error(error);
      setErrorVisible(true);
    }
  };

  const handleEditProfile = async (formData, userName, profileId) => {
    try {
      const photoResponse = await uploadPhoto(formData);
      await editProfile(profileId, photoResponse.data[0].id, userName);
      window.localStorage.setItem('userName', userName);
      window.localStorage.setItem(
        'profilePhoto',
        process.env.REACT_APP_ASSET_URL + photoResponse.data[0].url
      );

      setProfilePhoto(window.localStorage.getItem('profilePhoto'));
      setUserName(userName);
    } catch (error) {
      console.error(error);
      setErrorVisible(true);
    }
  };

  const handleEditCompany = async (formData, companyId, companyName) => {
    try {
      const photoResponse = await uploadPhoto(formData);

      let editedCompany = await editCompany(companyId, companyName, photoResponse.data[0].id);

      window.localStorage.setItem(
        'companyLogo',
        process.env.REACT_APP_ASSET_URL + photoResponse.data[0].url
      );
      setCompanyLogo(window.localStorage.getItem('companyLogo'));
      window.localStorage.setItem('company', editedCompany.data.data.attributes.name);
      setCompany(window.localStorage.getItem('company'));
    } catch (error) {
      console.error(error);
      setErrorVisible(true);
    }
  };

  const handleUserRegister = async (formData, company, selectedCompany, name, email, password) => {
    try {
      if (company) {
        const [registerResponse, companyResponse, photoResponse] = await Promise.all([
          userRegister(name, email, password),
          registerCompany(company),
          uploadPhoto(formData),
        ]);
        await createProfile(
          registerResponse.data.user.id,
          companyResponse.data.data.id,
          photoResponse.data[0].id,
          name
        );
        setUserData(registerResponse.user);
        setIsLoggedIn(true);
        setActiveOption(null);
        window.localStorage.setItem('jwt', registerResponse.data.jwt);
        const userInfo = await getUserInfo();
        const userProfile = await getProfile(userInfo.data.id);

        window.localStorage.setItem('company', company);
        setCompany(window.localStorage.getItem('company'));
        window.localStorage.setItem(
          'profilePhoto',
          process.env.REACT_APP_ASSET_URL +
            userProfile.data.data[0].attributes.profilePhoto.data.attributes.url
        );
        setProfilePhoto(window.localStorage.getItem('profilePhoto'));
        window.localStorage.setItem('userName', userInfo.data.username);
        setUserName(window.localStorage.getItem('userName'));
      } else {
        const [registerResponse, photoResponse] = await Promise.all([
          userRegister(name, email, password),
          uploadPhoto(formData),
        ]);
        await createProfile(
          registerResponse.data.user.id,
          parseInt(selectedCompany),
          photoResponse.data[0].id,
          name
        );
        setUserData(registerResponse.user);
        setIsLoggedIn(true);
        setActiveOption(null);
        window.localStorage.setItem('jwt', registerResponse.data.jwt);
        const userInfo = await getUserInfo();
        const userProfile = await getProfile(userInfo.data.id);
        const registeredCompany = await getCompnay(parseInt(registerResponse.data.user.id));

        window.localStorage.setItem(
          'company',
          registeredCompany.data.data[0].attributes.company.data.attributes.name
        );

        setCompany(window.localStorage.getItem('company'));

        window.localStorage.setItem(
          'profilePhoto',
          process.env.REACT_APP_ASSET_URL +
            userProfile.data.data[0].attributes.profilePhoto.data.attributes.url
        );
        setProfilePhoto(window.localStorage.getItem('profilePhoto'));
        window.localStorage.setItem('userName', userInfo.data.username);
        setUserName(window.localStorage.getItem('userName'));
      }

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
        handleEditProfile,
        handlePasswordChange,
        company,
        companyLogo,
        handleEditCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
