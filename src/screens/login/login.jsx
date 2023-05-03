import React, { useState } from "react";
import "./login.css";
import { ErrorComponent } from "../../components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase/firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function login({ toggle }) {
  // Error Componenet
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Data Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const makeSpace = async (uid) => {
    try {
      const docRef = doc(db, uid, 'spacesData');
      await setDoc(doc(db, uid, "spacesData"), {
        name: "main"
      });
      localStorage.setItem('space_name', 'main')
      // console.log("Document written with ID: ", docRef.id);
      window.location.reload(true);
    } catch (e) {
      // setIsError(true);
      // setErrorMessage(e);
      console.log(e)  
    }
  }

  const logInUser = (e) => {
    setIsError(false);
    e.preventDefault(e);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.removeItem("todos");
        console.log(user);
        saveUID(user.uid);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setIsError(true);
        setErrorMessage(errorMessage);
      });
  };

  const registerUser = (e) => {
    setIsError(false);
    e.preventDefault(e);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.removeItem("todos");
        console.log("Someone is in :: " + user.uid);
        makeSpace(user.uid)
        localStorage.removeItem("todos");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsError(true);
        setErrorMessage(errorMessage);
      });
  };

  const saveUID = (uid) => {
    try {
      // localStorage.setItem("UID", uid);
      localStorage.removeItem("todos");
      window.location.reload(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className="logInContainer">
      <div className="loginBody">
        <div className="backContainer">
          <h5 className="backBTN" onClick={toggle}>
            Back
          </h5>
        </div>
        <h1>Log In</h1>
        <form className="formContainer">
          <input
            type="text"
            className="inputLogIn"
            placeholder="Email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="inputLogIn"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && <ErrorComponent errorMessage={errorMessage} />}
          <button onClick={logInUser} className="buttonLogIn" type="submit">
            Log In
          </button>
          <button onClick={registerUser} className="buttonRegister">
            Register
          </button>
          {/* <h5>Don't have a account, Create Account?</h5> */}
        </form>
      </div>
    </div>
  );
}

export default login;
