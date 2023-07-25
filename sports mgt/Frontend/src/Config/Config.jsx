// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAY4HUka1vQgWb6FT-MfJsHLt1syNJ_fcM",
  authDomain: "tp7-890a3.firebaseapp.com",
  projectId: "tp7-890a3",
  storageBucket: "tp7-890a3.appspot.com",
  messagingSenderId: "190521381940",
  appId: "1:190521381940:web:57007e52fd5aee9d67e661",
  measurementId: "G-NB880ETRE7"
};


const app = initializeApp(firebaseConfig);
console.log(' firebase app : ' , app);
export const auth=getAuth(app)
