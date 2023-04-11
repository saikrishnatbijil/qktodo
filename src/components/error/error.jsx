import React from "react";
import "./error.css";

function error({ errorMessage }) {
  return (
    <div className="errorComponent">
      <div className="circle"></div>
      <h4 className="errorMessage">Error!! {errorMessage}</h4>
    </div>
  );
}

export default error;
