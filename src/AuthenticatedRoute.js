import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ element: Element, ...rest }) => {
  const user = useSelector(state => state.user.user);

  // Check if the user is authenticated
  if (user) {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/sign_in" />;
  }
};

export default AuthenticatedRoute;
