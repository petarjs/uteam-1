import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './AuthContextProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
