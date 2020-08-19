import React, { useState } from "react";
import "./todoForm.css";
import PropTypes from "prop-types";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form className="todo-form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Item"
      />
      <button className="button" onSubmit={handleSubmit}>
        Add
      </button>
    </form>
  );
}

TodoForm.propType = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
