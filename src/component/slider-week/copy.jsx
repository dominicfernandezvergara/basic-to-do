import React, { useState } from "react";
import moment from "moment";
import cn from "classnames";

import styles from "./slider-week.module.css";

const arrDays = [
  {
    dayName: "Mon",
    numberDay: 1,
  },
  {
    dayName: "Tue",
    numberDay: 2,
  },
  {
    dayName: "Wed",
    numberDay: 3,
  },
  {
    dayName: "Thu",
    numberDay: 4,
  },
  {
    dayName: "Fri",
    numberDay: 5,
  },
  {
    dayName: "Sat",
    numberDay: 6,
  },
  {
    dayName: "Sun",
    numberDay: 7,
  },
];
const prevDayTextButton = "<";
const nextDayTextButton = ">";

function SliderWeek() {
  const currentDateDay = moment().format("D");
  const [currentDay, setCurrentDay] = useState(Number(currentDateDay));
  const currentDateMonth = moment().format("M");
  const [currentMonth, setCurrentMonth] = useState(currentDateMonth);

  function getCurrentWeekDays(year, month) {
    const positionInWeekOfFirstMonthDay = new Date(year, month, 1).getDay();
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
    let month = moment().month();
    let year = moment().year();
    let monthIndex = month; // 0..11 instead of 1..12
    let names = getCurrentWeekDays(year, month);
    let date = new Date(year, month, 1);
    let result = [];
    let count = 0;

    while (date.getMonth() === monthIndex) {
      const id = date.getDate() + names[date.getDay()];
      let valueWeekNumber = 1;
      let dayNumberWeek = date.getDate();

      if (dayNumberWeek <= 7) {
        valueWeekNumber = 1;
      }
      if (dayNumberWeek >= 8 && dayNumberWeek <= 14) {
        valueWeekNumber = 2;
      }
      if (dayNumberWeek <= 21 && dayNumberWeek >= 15) {
        valueWeekNumber = 3;
      }
      if (dayNumberWeek <= 28 && dayNumberWeek >= 22) {
        valueWeekNumber = 4;
      }
      if (dayNumberWeek <= 31 && dayNumberWeek >= 29) {
        valueWeekNumber = 5;
      }

      // Checking when index week day should be reset
      if (count > 6) {
        count = 0;
      }

      result.push({
        id,
        dayNumberWeek,
        dayNameWeek: names[count],
        active: Number(currentDay) === date.getDate(),
        weekNumber: valueWeekNumber,
      });
      date.setDate(date.getDate() + 1);

      count++;
    }
    return result;
  };

  // la clave!!!!!
  const [monthDays, setMonthDays] = useState(getDaysArray());

  const currentDayData = monthDays.find((item) => {
    return item.dayNumberWeek === currentDay;
  });
  const [currentNumberWeek, setCurrentNumberWeek] = useState(
    currentDayData.weekNumber
  );

  //Week!!
  const week = monthDays.filter((item) => {
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

  const activeItem = (index) => {
    const newDays = monthDays.map((item, i) => {
      if (item.dayNumberWeek === index) {
        item.active = true;
      } else {
        item.active = false;
      }

      return item;
    });
    setMonthDays(newDays);
    setCurrentDay(index);
  };
  const handlePrevMonth = () => {
    console.log("handlePrevMonth");
  };
  const handleNextMonth = () => {
    console.log("handleNextMonth");
  };

  const daysList = week.map((item, index) => {
    return (
      <button
        type="button"
        onClick={() => activeItem(item.dayNumberWeek)}
        className={cn(styles.item, item.active ? styles.activeItem : item)}
        key={index}
      >
        <div className={styles.dayNameWeek}>{item.dayNameWeek}</div>
        <div className={styles.dayNumberWeek}>{item.dayNumberWeek}</div>
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
        <div className={styles.currentMonth}>{currentMonth}</div>
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
