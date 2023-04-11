import React from "react";
import "./footer.css";

function footer({ toggle }) {
  return (
    <div className="footerContainer">
      <p className="underlineText" onClick={toggle}>
        Privacy Policy
      </p>
      <a
        className="underlineText"
        href="https://github.com/saikrishnatbijil/qktodo"
        target="blank"
      >
        Github
      </a>
    </div>
  );
}

export default footer;
