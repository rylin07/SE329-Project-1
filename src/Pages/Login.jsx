import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import firebase_app from "../01_firebase/config_firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, login_user } from "../Redux/Authantication/auth.action";

const auth = getAuth(firebase_app);
const state = {
  number: "",
  otp: "",
  verify: false,
};

export const Login = () => {
  const [check, setCheck] = useState(state);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, activeUser, user } = useSelector((store) => {
    return {
      isAuth: store.LoginReducer.isAuth,
      activeUser: store.LoginReducer.activeUser,
      user: store.LoginReducer.user,
    };
  });

  const { number, otp, verify } = check;

  // Remove local existence check. Firebase will handle authentication.
  // console.log(user)
  //

  function onCapture() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          handleVerifyNumber();
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  }

  function handleVerifyNumber() {
    document.querySelector("#nextText").innerText = "Please wait...";
    onCapture();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = number;
    const e164Regex = /^\+[1-9]\d{9,14}$/;
    const localRegex = /^\d{10}$/;
    if (e164Regex.test(phoneNumber) || localRegex.test(phoneNumber)) {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setCheck({ ...check, verify: true });
          document.querySelector(
            "#loginMesageSuccess"
          ).innerHTML = `Otp Send To ${number} !`;
          document.querySelector("#loginMesageError").innerHTML = "";
          document.querySelector("#nextText").style.display = "none";
        })
        .catch((error) => {
          document.querySelector("#nextText").innerText = "Server Error";
        });
    } else {
      document.querySelector("#loginMesageSuccess").innerHTML = ``;
      document.querySelector("#loginMesageError").innerHTML =
        "Mobile Number is Invalid !";
    }
  }

  //
  function verifyCode() {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
       // User signed in successfully.
        const user = result.user;

        document.querySelector(
          "#loginMesageSuccess"
        ).innerHTML = `Verified Successful`;
        document.querySelector("#loginMesageError").innerHTML = "";

        // Save user info to Redux
       dispatch(login_user(user));
        // Redirect to home page
        window.location = "/";
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        document.querySelector("#loginMesageSuccess").innerHTML = ``;
        document.querySelector("#loginMesageError").innerHTML = "Invalid OTP";
      });
  }

  //
  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };
  // console.log(isAuth)

  useEffect(() => {
    dispatch(fetch_users);
    if (isAuth) {
      window.location = "/";
    }
  }, [isAuth]);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
        <div className="logoImgdiv"><img className="imglogo" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg':'https://i.postimg.cc/fRx4D7QH/logo3.png" alt="" /></div>
           
          <div className="loginHead">
          <hr /><hr /><hr />
            <h1>SignIn</h1>
          </div>
          <div className="loginInputB">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
                type="text"
                readOnly={verify}
                name="number"
                value={number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify}
                onClick={handleVerifyNumber}
                id="nextText"
              >
                SignIn
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB">
              <label htmlFor="">Enter Your OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Continue</button>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="loginTerms">
            {/* <h2>Or USE ARE BUSSINESS ACCOUNT WITH</h2>
                    <p>By proceeding, you agree to MakeMyTrip'sT&Csand Privacy</p> */}
            <Link to="/register">Don't have an Account</Link>
            <Link to="/admin">Admin Login</Link>
            <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Expedia <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <h3 id="loginMesageError"></h3>
          <h3 id="loginMesageSuccess"></h3>
        </div>
      </div>
    </>
  );
};
