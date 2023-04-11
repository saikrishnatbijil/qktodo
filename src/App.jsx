import { useEffect, useState } from "react";
import "./App.css";
import { LogInScreen, MainScreen, PrivacyPolicyScreen } from "./screens";
import { FooterComponent, Navbar, PromptComponent } from "./components";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const getLocalCOK = () => {
  let list = localStorage.getItem("COK");
  if (list) {
    return JSON.parse(localStorage.getItem("COK"));
  } else {
    return true;
  }
};

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [isCookies, setIsCookies] = useState(getLocalCOK());
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(false);

  const toggle = () => {
    if (isLogIn) {
      setIsLogIn(false);
    } else {
      setIsLogIn(true);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("UID");
        window.location.reload(true);
      })
      .catch((err) => [alert(err)]);
  };

  const accept = () => {
    setIsCookies(false);
    localStorage.setItem("COK", false);
    localStorage.setItem("cookies_permission", true);
    setIsAccepted(true);
  };

  const disable = () => {
    setIsCookies(false);
    localStorage.setItem("COK", false);
    localStorage.setItem("cookies_permission", false);
    setIsAccepted(false);
  };

  const promptToogle = () => {
    // if (isCookies) {
    //   setIsCookies(false);
    // } else {
    //   setIsCookies(true);
    // }
    setIsCookies(true);
  };

  const privacyPolicyToggle = () => {
    if (isPrivacyPolicy) {
      setIsPrivacyPolicy(false);
    } else {
      setIsPrivacyPolicy(true);
    }
  };

  return (
    <div className="App">
      {isCookies && (
        <PromptComponent
          accept={accept}
          disable={disable}
          toggle={privacyPolicyToggle}
        />
      )}
      {isPrivacyPolicy && <PrivacyPolicyScreen toggle={privacyPolicyToggle} />}
      <Navbar toggle={toggle} logout={logout} />
      {!isLogIn ? (
        <MainScreen accepted={isAccepted} tooglePrompt={promptToogle} />
      ) : (
        <LogInScreen toggle={toggle} />
      )}
      <FooterComponent toggle={privacyPolicyToggle} />
    </div>
  );
}

export default App;
