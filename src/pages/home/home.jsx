import React from "react";
import "./home.css";
import HomeWeather from "../../component/homeWeathers/homeWeather";
import Todo from "../../component/todo";
import ImageShopping from "../../images/undraw_add_to_cart_vkjp.svg";
import { useSelector } from "react-redux";
import ModalCityChange from "../../component/modal";

// All comment in the page are an example to add other to do list in the app

// import ImageOthers from "../../images/undraw_buy_house_560d.svg";
// import ImageToDo from "../../images/undraw_following_q0cr.svg";

const Home = ({ loading }) => {
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
    <img className="welcome-image" src={ImageShopping} alt="React Logo" />
  );
  // const imageEmptyStateTodo = (
  //   <img className="welcome-image" src={ImageToDo} alt="React Logo" />
  // );
  // const imageEmptyStateOthers = (
  //   <img className="welcome-image" src={ImageOthers} alt="React Logo" />
  // );
  return (
    <div className="container-home">
      <div
        // contentEditable={true}
        className="home-title"
      >
        Welcome to your shopping list!!
      </div>
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
    </div>
  );
};

export default Home;
