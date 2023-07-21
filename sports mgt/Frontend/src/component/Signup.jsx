import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../Config/Config";
import { CgSpinner } from "react-icons/cg";
import { toast, Toaster } from "react-hot-toast";
import { setUserDetails } from "../Redux/userSlice";
import BaseUrl from "../BaseUrl";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [full_name, setFull_name] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(null);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  let confirmationResult = null;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email || !password || !password2 || !full_name || !age) {
      setError("Please fill in all fields");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (phone_number < 0) {
      toast.error("Phone number cannot be negative");
      return false;
    }

    if (age < 0) {
      toast.error("Enter a valid age");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (password !== password2) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user = {
      email: email,
      password: password,
      password2: password2,
      full_name: full_name,
      phone_number: phone_number,
      age: age
    };

    try {
      const response = await axios.get(
        BaseUrl+"account/register/",
        {
          params: {
            email: email
          }
        }
      );

      if (response.data.message === "success") {
        onSignup();
      } else {
        console.log("User exists. Terminate.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.phone_number
      ) {
        const errorMessage = error.response.data.errors.phone_number;
        setError(errorMessage);
      } else {
        setError("Invalid credentials.");
      }
    }
  };

  const onSignup = async () => {
    setLoading(true);
    const appVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }, auth);

    const formatPhone = "+91" + phone_number;
    confirmationResult = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
    setUser(confirmationResult);
    setLoading(false);
    setShowOtp(true);
    setVerify(confirmationResult);
    toast.success("OTP sent successfully!");
  };

  const onOTPVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await user.confirm(otp);

      if (response) {
        toast.success("OTP verification successful!");
        const userData = {
          email: email,
          full_name: full_name,
          password: password,
          password2: password2,
          phone_number: phone_number,
          age: age
        };

        await axios.post(BaseUrl+"account/register/", userData);
        dispatch(setUserDetails(userData));
        navigate("/login");
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      setError("Failed to verify OTP");
    }

    setLoading(false);
  };

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  // const resendOTP = async () => {
  //   try {
  //     setLoading(true);
  //     await confirmationResult.resend();
  
  //     setShowOtp(true);
  //     toast.success("OTP resent successfully!");
  //   } catch (error) {
  //     setError("Failed to resend OTP");
  //   }
  
  //   setLoading(false);
  // };
  
  


  

return (
  <>
  {showOtp ? (
    <section className="p-20 h-screen bg-gradient-to-t from-white to-blue-200 flex flex-col pt-10 px-20 justify-between">
      <div className="w-full h-full flex items-center justify-center">
        <div className="hidden md:block relative w-1/2 h-full flex-col">
          <div className="absolute top-[15%] flex flex-col items-center">
            <h1 className="text-4xl text-black font-bold my-3 text-center">
              Unlock unforgettable experiences.
            </h1>
            <p className="text-xl text-white font-normal text-center">
              Sign in and secure your future in sports events with our seamless facilities and events.
            </p>
          </div>
          {/* <img src={signupimg} alt="Login" className="w-full h-full object-cover" /> */}
        </div>

        <div className="w-1/2 h-full bg-gradient-to-r from-gray-200 to-gray-500 flex flex-col p-20 justify-between">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2 max-w-[450px]">
              <h3 className="text-3xl font-bold mb-2">Verify OTP</h3>
              <p className="text-base mb-2">
                Welcome to EventGo! Please verify your account.
              </p>
            </div>

            <div className="w-full flex flex-col pt-10">
              <input
                type="number"
                onChange={handleChange}
                // onBlur={handleBlur}
                name="otp"
                value={otp}
                className="w-full text-black py-1 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
              />
            </div>

            <div className="w-full flex flex-col pt-10">
              <button
                onClick={onOTPVerify}
                className="text-white w-full bg-violet-500 hover:bg-violet-700 rounded-md p-4 mt-5 text-center flex items-center justify-center"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify</span>
              </button>
              {/* <button
                onClick={resendOTP}
                className="text-white w-full bg-violet-500 hover:bg-violet-700 rounded-md p-4 mt-5 text-center flex items-center justify-center"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Resend OTP</span>
              </button> */}
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </section>
    ) : (
      <div className="bg-gray-900 min-h-screen flex justify-center items-center">
        <section className="bg-gray-800 dark:bg-gray-1900">
          <div className="flex flex-col items-center justify-center px-6 py-15 mx-auto md:h-screen lg:py-0">
            {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                  Flowbite
                </a> */}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-800">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>

                <div>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </div>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter your full name
                    </label>
                    <input
                      onChange={(e) => setFull_name(e.target.value)}
                      value={full_name}
                      type="full_name"
                      name="full_name"
                      id="full_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="fullname"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your age
                    </label>
                    <input
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                      type="age"
                      name="age"
                      id="age"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="age"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      onChange={(e) => setphone_number(e.target.value)}
                      value={phone_number}
                      type="phone_number"
                      name="phone_number"
                      id="phone_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mobile"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password2"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      onChange={(e) => setPassword2(e.target.value)}
                      value={password2}
                      type="password2"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={submitForm}
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                    <div id="recaptcha-container"></div>
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </a>
                  </p>
                </form>
      
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </div>
    )}
  </>
);
};                  
export default SignUpForm;
