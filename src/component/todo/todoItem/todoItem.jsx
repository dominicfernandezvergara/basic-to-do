import React from "react";
import "./todoItem.css";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

const TodoItem = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <Checkbox
        checked={todo.isCompleted}
        onClick={() => completeTodo(index)}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {todo.text}
      <div>
        {removeTodo && (
          <button className="buttonTodo" onClick={() => removeTodo(index)}>
            x
          </button>
        )}
      </div>
    </div>
  );
};

// Defining default prop type for non given prop
TodoItem.defaultProps = {
  removeTodo: false,
};

// defining TodoItem prop types
// ref: https://devhints.io/react#property-validation
TodoItem.propType = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  completeTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func,
};

export default TodoItem;
