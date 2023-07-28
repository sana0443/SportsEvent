import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
const RequireAuth = ({ children,...rest}) => {
  console.log('Inside protected route');
  const loginstatus = localStorage.getItem('loginstatus')
  const userid=localStorage.getItem('token')
  

  return (
    <>
      {loginstatus || userid ? children : <Navigate to='/login' />}
    </>
  );

};

export default RequireAuth;
