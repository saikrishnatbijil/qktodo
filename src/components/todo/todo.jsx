import React from "react";
import "./todo.css";
import edit from "../../assets/edit.png";
import trash from "../../assets/trash.png";

function todo({ todo, toggle, key, remove }) {
  return (
    <li key={todo.id} className="inputContainer">
      <div className="todoBody">
        <div className="one">
          <input
            className="checker"
            type="checkbox"
            checked={todo.checked ? "checked" : ""}
            onChange={() => toggle(todo)}
          />
          <h2
            className={todo.checked ? "checkedText" : "unCheckedText"}
            onClick={() => toggle(todo)}
          >
            {todo.name}
          </h2>
        </div>
        <div className="two">
          {/* <img src={edit} className="elements" /> */}
          <img src={trash} onClick={() => remove(todo)} className="elements" />
        </div>
      </div>
    </li>
  );
}

export default todo;
