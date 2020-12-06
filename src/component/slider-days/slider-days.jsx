import React, { useState } from "react";
import moment from "moment";
import cn from "classnames";

import styles from "./slider-days.module.css";

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

function SliderDays() {
  const currentDate = moment().format("D");
  const [currentDay, setCurrentDay] = useState(Number(currentDate));
  const actionButtonsWidth = 50;
  const itemMargin = 4;
  const itemWidth = 30 + itemMargin;
  const currentTranslation = actionButtonsWidth - currentDay * itemWidth;

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

    while (date.getMonth() === monthIndex) {
      const id = date.getDate() + names[date.getDay()];

      result.push({
        id,
        dayNumberWeek: date.getDate(),
        dayNameWeek: names[date.getDay()],
        active: Number(currentDay) === date.getDate(),
      });
      date.setDate(date.getDate() + 1);
    }

    return result;
  };

  // la clave!!!!!
  const [monthDays, setMonthDays] = useState(getDaysArray());

  const activeItem = (index) => {
    const newDays = monthDays.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setMonthDays(newDays);
    setCurrentDay(index);
  };

  const handlePrevDay = () => {
    const prevDay = currentDay - 1;
    let currentDayNumber = currentDay;
    if (currentDayNumber < 0) {
      currentDayNumber = 0;
    }
    const newDays = monthDays.map((item, i) => {
      if (item.dayNumberWeek === prevDay) {
        //item.active = !item.active
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setMonthDays(newDays);
    setCurrentDay(currentDay - 1);
  };

  const handleNextDay = () => {
    const nexDay = currentDay + 1;
    const lastIndexOfArray = monthDays.length - 1;
    let indexNewCurrentDay = currentDay;

    if (indexNewCurrentDay > lastIndexOfArray) {
      indexNewCurrentDay = lastIndexOfArray;
    }

    const newDays = monthDays.map((item, i) => {
      if (item.dayNumberWeek === nexDay) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setMonthDays(newDays);
    setCurrentDay(nexDay);
  };

  const dayList = monthDays.map((item, index) => {
    return (
      <button
        type="button"
        onClick={() => activeItem(index)}
        className={cn(styles.item, item.active ? styles.activeItem : item)}
        key={index}
      >
        <div className={styles.containerDayInfo}>
          <div className={styles.dayNameWeek}>{item.dayNameWeek}</div>
          <div className={styles.dayNumberWeek}>{item.dayNumberWeek}</div>
        </div>
      </button>
    );
  });
  return (
    <div>
      <div className={styles.containerSliderDays}>
        <button
          type="button"
          className={styles.buttonPrevDay}
          onClick={handlePrevDay}
        >
          {prevDayTextButton}
        </button>
        <div
          className={styles.containerDayList}
          style={{
            transform: `translate(${currentTranslation}px)`,
            marginLeft: `calc(50% - ${actionButtonsWidth}px - 15px)`,
          }}
        >
          {dayList}
        </div>
        <button
          type="button"
          className={styles.buttonNextDay}
          onClick={handleNextDay}
        >
          {nextDayTextButton}
        </button>
      </div>
    </div>
  );
}

export default SliderDays;
