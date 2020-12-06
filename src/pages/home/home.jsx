import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./home.module.css";
import HomeWeather from "../../component/homeWeathers/homeWeather";
import Todo from "../../component/todo";
import ImageShopping from "../../images/undraw_add_to_cart_vkjp.svg";
import ModalCityChange from "../../component/modal/modal-welcome";
import { removeCurrentUser } from "../../redux/usersStore";
import Nav from "../../component/nav";

// All comment in the page are an example to add other to do list in the app

// import ImageOthers from "../../images/undraw_buy_house_560d.svg";
// import ImageToDo from "../../images/undraw_following_q0cr.svg";

const Home = ({ loading }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const todosSuperMarket = useSelector(
    (state) => state.taskTodo.todosSuperMarket
  );
  // const todosDailyTask = useSelector((state) => state.taskTodo.todosDailyTask);
  // const todosOthers = useSelector((state) => state.taskTodo.todosOthers);

  console.log("todosSuperMarket", todosSuperMarket);
  if (loading) {
    return <div>loading...</div>;
  }

  const imageEmptyState = (
    <img className={styles.welcomeImage} src={ImageShopping} alt="React Logo" />
  );
  // const imageEmptyStateTodo = (
  //   <img className="welcome-image" src={ImageToDo} alt="React Logo" />
  // );
  // const imageEmptyStateOthers = (
  //   <img className="welcome-image" src={ImageOthers} alt="React Logo" />
  // );

  const logOutClick = () => {
    dispatch(removeCurrentUser({}));
    history.push("./login");
  };
  return (
    <div className={styles.containerHome}>
      <Nav />
      <div className={styles.homeTitle}>Welcome</div>
      <HomeWeather />
      <Todo
        todos={todosSuperMarket}
        type="todosSuperMarket"
        title="Shopping list"
        image={imageEmptyState}
      />
      {/* <Todo
        todos={todosDailyTask}
        type="todosDailyTask"
        title="Daily Tasks"
        image={imageEmptyStateTodo}
      />
      <Todo
        todos={todosOthers}
        type="todosOthers"
        title="Others"
        image={imageEmptyStateOthers}
     /> */}
      <ModalCityChange />
      <button type="button " onClick={logOutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Home;
