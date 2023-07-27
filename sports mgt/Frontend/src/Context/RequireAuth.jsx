import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
const RequireAuth = ({ children,...rest}) => {
  console.log('Inside protected route');
  const loginstatus = localStorage.getItem('loginstatus')
  

  return (
    <>
      {loginstatus ? children : <Navigate to='/login' />}
    </>
  );

};

export default RequireAuth;
