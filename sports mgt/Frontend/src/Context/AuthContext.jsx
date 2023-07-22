// import React, { createContext } from 'react';
// import { RecaptchaVerifier } from 'firebase/auth';
// import { auth } from '../Config/Config';



// const UserAuthContext = createContext();

// const UserAuthContextProvider = ({ children }) => {
//   const setUpRecaptcha = (phoneNumber) => {
//     const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
//     recaptchaVerifier.render();
//   };

//   return <UserAuthContext.Provider value={{ setUpRecaptcha }}>{children}</UserAuthContext.Provider>;
// };

// export { UserAuthContext, UserAuthContextProvider };
