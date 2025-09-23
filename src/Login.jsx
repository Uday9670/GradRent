import React, { useState }from 'react'
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const signIn = (e) => {
    e.preventDefault();
     // do some fancy firebase shitt
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
     // it successfully created a new user with email ans password
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">

        <Link to="/">
        <img
          className="login_logo"
          src=""
          alt="GradRent"
        />
      </Link>

      <div className="login_container">
        <h1>Login to GradRent</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className="login_signInButton">Sign In</button>
        </form>

        <p>
          By signing-in you agree to the GradRents Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login_registerButton">Create your GradRent Account</button>
      </div>
    </div>
  )
}

export default Login
