import './App.css';
import { useState } from 'react';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import LoginRegister from './components/LoginRegister';
import { HStack, Heading } from '@chakra-ui/layout';
import '@fontsource/poppins';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeOption, setActiveOption] = useState('login');
  return (
    <div className="App">
      <TopBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setActiveOption={setActiveOption}
      />
      {isLoggedIn ? (
        <HStack>
          <SideBar w="10vw" isLoggedIn={isLoggedIn} />
          <Heading w="80vw">Main content</Heading>
        </HStack>
      ) : (
        <LoginRegister
          setIsLoggedIn={setIsLoggedIn}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
      )}
    </div>
  );
};

export default App;
