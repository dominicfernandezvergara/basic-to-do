import React, { useState } from "react";
import "./todo.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TodoItem from "./todoItem";
import TodoForm from "./todoForm";
import PropTypes from "prop-types";
import {
  addTodoData,
  removeTodoData,
  completeTodoData,
} from "../../redux/todoStore";
import { useDispatch } from "react-redux";

//To use this component you must to send un TYPE as props and add this TYPE to ToDoStore.jsx as well

function Todo({ title, image, todos, type }) {
  // const todosSuperMarket = useSelector((state) => state.taskTodo.todos);
  const dispatch = useDispatch();
  const [showCompletedTodos, setShowCompletedTodos] = useState(false);
  const [showActiveTodos, setShowActiveTodos] = useState(true);
  const [showAllTodos, setShowAllTodos] = useState(false);

  const completeTodo = (index) => {
    const todoDataComplete = { index, type };
    dispatch(completeTodoData(todoDataComplete));
  };

  const removeTodo = (index) => {
    const todoDataRemove = { index, type };
    dispatch(removeTodoData(todoDataRemove));
  };

  const addTodo = (text) => {
    const todoData = { text: text, isCompleted: false, type: type };
    dispatch(addTodoData(todoData));
  };

  const completed = () => {
    setShowCompletedTodos(true);
    setShowActiveTodos(false);
    setShowAllTodos(false);
  };

  const active = () => {
    setShowCompletedTodos(false);
    setShowActiveTodos(true);
    setShowAllTodos(false);
  };

  const all = () => {
    setShowCompletedTodos(false);
    setShowActiveTodos(false);
    setShowAllTodos(true);
  };

  const allCopletedTodos = todos.map((item, index) => {
    if (item.isCompleted) {
      return (
        <TodoItem
          key={index}
          index={index}
          todo={item}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      );
    }

    return null;
  });

  const activeTodos = todos.map((item, index) => {
    if (!item.isCompleted) {
      return (
        <TodoItem
          key={index}
          index={index}
          todo={item}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      );
    }

    return null;
  });

  const allTodos = todos.map((item, index) => {
    return (
      <TodoItem
        key={index}
        index={index}
        todo={item}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
  });

  return (
    <div className="containerHome containerTodo">
      {title ? (
        <div className="TitleTodo"> {title} </div>
      ) : (
        <div className="TitleTodo">To Do</div>
      )}
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {/*--------Item list---------*/}
        {/* image empty state*/}
        {todos.length === 0 && image}

        {/* All completed todos */}
        {showCompletedTodos && allCopletedTodos}

        {/* All Active todos */}
        {showActiveTodos && activeTodos}

        {/* All todos */}
        {showAllTodos && allTodos}
        {/*--------Item list---------*/}

        {todos.length > 0 ? (
          <FormControl component="fieldset">
            <RadioGroup>
              <div className="containerRadioGroup">
                <FormControlLabel
                  value="completed"
                  control={<Radio checked={showCompletedTodos} />}
                  label="Completed"
                  onChange={() => completed()}
                />
                <FormControlLabel
                  value="active"
                  control={<Radio checked={showActiveTodos} />}
                  label="Active"
                  onChange={() => active()}
                />
                <FormControlLabel
                  value="all"
                  control={<Radio checked={showAllTodos} />}
                  label="All"
                  onChange={() => all()}
                />
              </div>
            </RadioGroup>
          </FormControl>
        ) : null}
      </div>
    </div>
  );
}

Todo.defaultProps = {
  title: "",
};
Todo.propType = {
  title: PropTypes.string,
  image: PropTypes.element.isRequired,
  type: PropTypes.element.isRequired,
  todo: PropTypes.element.isRequired,
};

export default Todo;
