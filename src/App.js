import TopBar from './components/TopBar';
import '@fontsource/poppins';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import MainContent from './components/MainContent';
import { useAuthContext } from './components/AuthContextProvider';

const App = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Switch>
          <PrivateRoute component={MainContent} path="/" exact={!isLoggedIn} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
