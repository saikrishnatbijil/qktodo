import React from "react";
import "./prompt.css";

function prompt({ accept, disable, toggle }) {
  return (
    <div className="promptContainer">
      <div className="promptBody">
        <div className="textContainer">
          <h4>Accept Cookies and Local Storage</h4>
          <p>
            If You click on accept you could sign in and make todos
            online/offline. if you disable cookies and local storage it would
            cause in website not functioning at all.{" "}
            <span className="underlineText" onClick={toggle}>
              Privacy Policy
            </span>
          </p>
        </div>
        <div className="buttons">
          <p onClick={accept} className="positiveBtn">
            Accept
          </p>
          <p onClick={disable} className="negativeBtn">
            Disable
          </p>
        </div>
      </div>
    </div>
  );
}

export default prompt;
