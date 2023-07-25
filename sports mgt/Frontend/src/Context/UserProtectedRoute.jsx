// import Cookies from 'js-cookie';
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const UserProtectedRoute = ({ children }) => {
//   console.log('Inside protected route');
//   const LoginStatus = Cookies.get('access_token');
// //   const {isAuthenticated} = useContext(AuthContext)
//   console.log("requireauth works user ", LoginStatus);

//   return (
//     <>
//       {LoginStatus ? <>{children}</> : <Navigate to='/login' />}
//     </>
//   );
// };

// export default UserProtectedRoute;
