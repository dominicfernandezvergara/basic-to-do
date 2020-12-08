import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";

import styles from "./schedule.module.css";

import Modal from "../../component/modal";
import ModalNewTask from "../../component/modal/modal-new-task";
import SliderWeek from "../../component/slider-week";

function Schedule() {
  const [modalState, setModalState] = useState(false);
  const [checked, setChecked] = useState(false);

  const onClickNewtask = () => {
    setModalState(true);
  };
  const addNewTaskButtonText = "+";
  const dayTask = [
    {
      id: 1,
      type: "Personal",
      task: "Read a book",
      time: "8:30",
      checked: false,
    },
    {
      id: 2,
      type: "Shopping",
      task: "Go to super Market",
      time: "10:30",
      checked: false,
    },
    {
      id: 3,
      type: "Event",
      task: "Cumpleaños Mamá",
      time: "15:00",
      checked: false,
    },
  ];

  const checkedTask = (id) => {
    console.log("id", id);
  };

  return (
    <div className={styles.containerSchedule}>
      <div className={styles.title}>Schedule</div>
      <div className={styles.containerButtonModalNewTask}>
        <button className={styles.buttonNewTask} onClick={onClickNewtask}>
          {addNewTaskButtonText}
        </button>
      </div>
      <div className={styles.containerSliderWeekdays}>
        <SliderWeek />
      </div>
      <div className={styles.containerDay}>
        <div className={styles.dayName}>Day</div>
        <div className={styles.fullDay}>Full day</div>
        <div className={styles.containerDayTask}></div>
        {dayTask.map((item, index) => {
          return (
            <div key={index} className={styles.containerTask}>
              <Checkbox
                onChange={() => checkedTask(item.id)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <div className={styles.timeTask}>{item.time}</div>
              <div className={styles.task}>
                <div className={styles.titleTask}>{item.task}</div>
                <div className={styles.typeTask}>{item.type}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        open={modalState}
        close={() => setModalState(false)}
        footer={false}
        header={false}
      >
        <ModalNewTask />
      </Modal>
    </div>
  );
}
export default Schedule;
