import React from "react";
import "./input.css";
import logo from "../../assets/logo_clear_background.png";

function input({ buttonVal, noOfTodos, setInput, clicked, input }) {
  return (
    <div className="inputContainer">
      <img src={logo} className="logo" />
      <form className="inputBody">
        <input
          className="input"
          placeholder="Enter a Todo."
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button" type="submit" onClick={clicked}>
          {buttonVal}
        </button>
      </form>
      <p>You have {noOfTodos} thing(s) TODO.</p>
    </div>
  );
}

export default input;
