import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo_main_clear_background.png";
import { auth } from "../../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

// const getLocalUID = () => {
//   let list = localStorage.getItem("UID");
//   if (list) {
//     return localStorage.getItem("UID");
//   } else {
//     return "";
//   }
// };

function navabr({ toggle, logout }) {
  const [uid, setUid] = useState("");
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogedIn(true);
        const uid = user.uid;
        setUid(uid);
        console.log("UID From Navbar ::" + uid);
      } else {
        // User is signed out
        // ...
      }
      return () => unsubscribe;
    });
  }, []);

  return (
    <div className="navbarContainer">
      <div className="navBody">
        {isLogedIn ? (
          <p onClick={logout}>LOG OUT</p>
        ) : (
          <p onClick={toggle}>LOG IN</p>
        )}
        <img src={logo} className="profile" />
      </div>
    </div>
  );
}

export default navabr;
