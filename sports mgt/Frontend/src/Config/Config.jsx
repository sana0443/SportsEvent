// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCWIQDYavOlRiR04ggP23-VhDjgE3J8LwE",
  authDomain: "otp6-8dec1.firebaseapp.com",
  projectId: "otp6-8dec1",
  storageBucket: "otp6-8dec1.appspot.com",
  messagingSenderId: "647426170759",
  appId: "1:647426170759:web:f4aa91dc8db7c2c95b7d22",
  measurementId: "G-M78SDEH199"
};


const app = initializeApp(firebaseConfig);
console.log(' firebase app : ' , app);
export const auth=getAuth(app)
