import './App.css';
import TopBar from './components/TopBar';
import '@fontsource/poppins';
import AuthContextProvider from './components/AuthContextProvider';
import MainContent from './components/MainContent';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <div className="App">
          <TopBar />
          <Switch>
            <Route exact path="/">
              <MainContent />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
