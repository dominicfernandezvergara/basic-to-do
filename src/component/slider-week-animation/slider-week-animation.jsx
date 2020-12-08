import React, { useState } from "react";
import moment from "moment";
import cn from "classnames";

import styles from "./slider-week-animation.module.css";

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

function SliderWeekAnimation() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const currentDate = moment().format("D");
  const [currentDay, setCurrentDay] = useState(Number(currentDate));
  console.log("currentDay", currentDay);
  const weekNumber = Math.ceil(currentDay / 7);

  const actionButtonsWidth = 50;

  console.log("weekNumber", weekNumber);
  const itemWidth = vw / 7 - 17;
  let currentTranslation =
    weekNumber > 1
      ? 7 * weekNumber * itemWidth * -1
      : 7 * weekNumber * itemWidth;
  currentTranslation = currentTranslation >= 50 ? 50 : currentTranslation;
  currentTranslation = currentTranslation <= -1693 ? -1693 : currentTranslation;

  console.log("currentTranslation", currentTranslation);
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
    const prevDay = currentDay - 7 <= 0 ? 0 : currentDay - 7;
    let currentDayNumber = currentDay;
    if (currentDayNumber < 0) {
      currentDayNumber = 0;
    }
    setCurrentDay(prevDay);
    const newWeekNumber = Math.ceil(prevDay / 7) - 1;

    let currentTranslation2 = newWeekNumber * 7 * itemWidth * -1;
    // let currentTranslation2 = actionButtonsWidth - prevDay * itemWidth;
    currentTranslation2 = currentTranslation2 >= 50 ? 50 : currentTranslation2;

    setTransform(`translate(${currentTranslation2}px)`);
  };

  const handleNextDay = () => {
    const monthDays = new Date(2020, 12, 0).getDate();
    const nexDay = currentDay + 7 >= monthDays ? monthDays : currentDay + 7;
    // const nexDay = currentDay + 7;
    const lastIndexOfArray = monthDays.length - 7;
    let indexNewCurrentDay = currentDay;

    if (indexNewCurrentDay > lastIndexOfArray) {
      indexNewCurrentDay = lastIndexOfArray;
    }

    setCurrentDay(nexDay);
    const newWeekNumber = Math.ceil(nexDay / 7) - 1;
    let currentTranslation2 = newWeekNumber * 7 * itemWidth * -1;
    currentTranslation2 =
      currentTranslation2 <= -1693 ? -1693 : currentTranslation2;
    console.log("currentTranslation2", currentTranslation2);

    setTransform(`translate(${currentTranslation2}px)`);
  };

  const dayList = monthDays.map((item, index) => {
    return (
      <button
        type="button"
        onClick={() => activeItem(index)}
        className={cn(styles.item, item.active ? styles.activeItem : item)}
        key={index}
      >
        <div className={styles.dayNameWeek}>{item.dayNameWeek}</div>
        <div className={styles.dayNumberWeek}>{item.dayNumberWeek}</div>
      </button>
    );
  });
  const [transform, setTransform] = useState(
    `translate(${currentTranslation}px)`
  );
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
            transform,
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

export default SliderWeekAnimation;
