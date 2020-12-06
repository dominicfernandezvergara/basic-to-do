import React from "react";
import { useSelector } from "react-redux";

import styles from "./shopping-list.module.css";
import Todo from "../../component/todo";
import ImageShopping from "../../images/undraw_add_to_cart_vkjp.svg";

function ShoppingList() {
  const todosSuperMarket = useSelector(
    (state) => state.taskTodo.todosSuperMarket
  );
  const imageEmptyState = (
    <img
      className={styles.emptyStateImage}
      src={ImageShopping}
      alt="React Logo"
    />
  );
  return (
    <div className={styles.containerShoppingList}>
      <h2 className={styles.title}>Shopping List</h2>
      <div className={styles.containerToDo}>
        <Todo
          todos={todosSuperMarket}
          type="todosSuperMarket"
          // title="Shopping list"
          image={imageEmptyState}
        />
      </div>
    </div>
  );
}
export default ShoppingList;
