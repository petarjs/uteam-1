import './App.css';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Login from './components/login';
import Register from './components/Register';
import { useState } from 'react';

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [visibleLogin, setVisibilityLogin] = useState(true);
  const [visibleRegister, setVisibilityRegister] = useState(false);
  return (
    <div className="App">
      <TopBar
        setShowSideBar={setShowSideBar}
        visibleLogin={visibleLogin}
        setVisibilityLogin={setVisibilityLogin}
        visibleRegister={visibleRegister}
        setVisibilityRegister={setVisibilityRegister}
      />
      {showSideBar ? <SideBar /> : null}
      {visibleLogin ? (
        <Login
          setVisibilityLogin={setVisibilityLogin}
          setShowSideBar={setShowSideBar}
          setVisibilityRegister={setVisibilityRegister}
        />
      ) : null}
      {visibleRegister ? (
        <Register
          setShowSideBar={setShowSideBar}
          setVisibilityLogin={setVisibilityLogin}
          setVisibilityRegister={setVisibilityRegister}
        />
      ) : null}
    </div>
  );
};

export default App;
