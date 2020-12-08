import React, { useState } from "react";
import cn from "classnames";

import styles from "./slider-week.module.css";
import {
  arrDays,
  monthNames,
  nextDayTextButton,
  prevDayTextButton,
} from "../../constants";

function SliderWeek() {
  const currentDateDay = new Date().getDate();
  const currentDaytoGetCurrentMonth = new Date();
  const currentDateMonth = currentDaytoGetCurrentMonth.getMonth();
  const [currentDay, setCurrentDay] = useState(currentDateDay);
  const [currentMonth, setCurrentMonth] = useState(currentDateMonth);

  function getCurrentWeekDays(year) {
    const positionInWeekOfFirstMonthDay = new Date(year, 0).getDay();
    let newArrDays = [...arrDays];

    for (let k = 0; k < positionInWeekOfFirstMonthDay - 1; k++) {
      //newArrDays.shift() : Remove days of the week until reaching the day where the month begins
      let daysRemovedFromArray = newArrDays.shift();
      // days removed added to the end of the arrangement
      newArrDays.push(daysRemovedFromArray);
    }

    const daysArr = newArrDays.map((item) => item.dayName);
    return daysArr;
  }

  const getDaysArray = function () {
    const year = new Date().getFullYear();
    const names = getCurrentWeekDays(year);
    const arrayDaysYear = [];
    const date = new Date(year, 0);
    let count = 0;

    while (date.getFullYear() === year) {
      /* month to which each day corresponds */
      const monthEachDay = date.getMonth();
      const month = monthNames[monthEachDay];
      const day = date.getDate();
      let valueWeekNumber = 1;

      /* conditional rendering to know what week
      number corresponds to each day of the month*/
      if (day <= 7) {
        valueWeekNumber = 1;
      } else if (day >= 8 && day <= 14) {
        valueWeekNumber = 2;
      } else if (day <= 21 && day >= 15) {
        valueWeekNumber = 3;
      } else if (day <= 28 && day >= 22) {
        valueWeekNumber = 4;
      } else if (day <= 31 && day >= 29) {
        valueWeekNumber = 5;
      }

      // Checking when index week day should be reset
      if (count > 6) {
        count = 0;
      }

      /* Id to object */
      const id = date.getDate() + month;

      arrayDaysYear.push({
        id,
        month,
        monthNumber: date.getMonth(),
        weekDay: names[count],
        day,
        weekNumber: valueWeekNumber,
        active:
          Number(currentDay) === date.getDate() &&
          currentDateMonth === date.getMonth(),
        tasks: {
          id: "",
          title: "",
          hour: "",
          task: "",
          type: "",
        },
      });

      date.setDate(date.getDate() + 1);
      count++;
    }
    return arrayDaysYear;
  };

  //CLAVEEE!!
  //CURRENT YEAR ARRAY
  const [yearDays, setYearDays] = useState(getDaysArray());

  //CURRENT MONTH ARRAY
  const arrayMonthDays = yearDays.filter((item) => {
    return item.monthNumber === currentMonth;
  });

  //CURRENT DAY OBJECT
  const currentDayData = arrayMonthDays.find((item) => {
    return item.day === currentDay && item.monthNumber === currentMonth;
  });

  //CURRENT WEEK
  // ?? ===> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  // obj?.algo?.some ===> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const [currentNumberWeek, setCurrentNumberWeek] = useState(
    currentDayData?.weekNumber ?? 1
  );

  //Week!!
  const week = arrayMonthDays.filter((item) => {
    return item.weekNumber === currentNumberWeek;
  });

  const handlePrevDay = () => {
    const prevWeek = currentNumberWeek - 1;
    let currentDayNumber = currentNumberWeek;
    if (currentDayNumber < 1) {
      currentDayNumber = 0;
    }
    setCurrentNumberWeek(prevWeek);
  };

  const handleNextDay = () => {
    const nextWeek = currentNumberWeek + 1;
    // let currentDayNumber = currentNumberWeek;
    // if (currentDayNumber < 1) {
    //   currentDayNumber = 0;
    // }
    setCurrentNumberWeek(nextWeek);
  };

  const activeItem = (day, month) => {
    const newDays = yearDays.map((item) => {
      // if (item.day === day && item.month === month) {
      //   item.active = true;
      // } else {
      //   item.active = false;
      // }
      // Fancy way instead using if statement
      item.active = Boolean(item.day === day && item.month === month);

      return item;
    });

    setYearDays(newDays);
    setCurrentDay(day);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
  };

  const daysList = week.map((item, index) => {
    return (
      <button
        type="button"
        onClick={() => activeItem(item.day, item.month)}
        className={cn(styles.item, item.active ? styles.activeItem : item)}
        key={index}
      >
        <div className={styles.weekDay}>{item.weekDay}</div>
        <div className={styles.day}>{item.day}</div>
      </button>
    );
  });

  return (
    <div>
      <div className={styles.containerMonth}>
        <button
          type="button"
          className={styles.buttonHandMonthChange}
          onClick={handlePrevMonth}
        >
          {prevDayTextButton}
        </button>
        <div className={styles.currentMonth}> {monthNames[currentMonth]}</div>
        <button
          type="button"
          className={styles.buttonHandMonthChange}
          onClick={handleNextMonth}
        >
          {nextDayTextButton}
        </button>
      </div>
      <div className={styles.containerSliderDays}>
        <button
          type="button"
          className={styles.buttonHandWeekChange}
          onClick={handlePrevDay}
        >
          {prevDayTextButton}
        </button>
        <div className={styles.containerDayList}>{daysList}</div>
        <button
          type="button"
          className={styles.buttonHandWeekChange}
          onClick={handleNextDay}
        >
          {nextDayTextButton}
        </button>
      </div>
    </div>
  );
}

export default SliderWeek;
