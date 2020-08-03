import React, { useState } from "react";
import "./slider.css";
import moment from "moment";

function Slider() {
  const date = moment().format("DD");
  const currentDate = date - 1;
  const monthDays = getDaysArrayByMonth();
  const [day, setDay] = useState(monthDays);

  const [currentDay, setCurrentDay] = useState(currentDate);
  const prevDayTextButton = "<";
  const nextDayTextButton = ">";

  function getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    const arrDays = [];

    for (let i = 0; i < daysInMonth; i++) {
      const current = moment().date(i + 1);
      arrDays.push({
        id: i,
        day: current.format("DD"),
        active: i === currentDate,
      });
    }

    return arrDays;
  }

  const activeItem = (index) => {
    const newDays = day.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setDay(newDays);
    setCurrentDay(index);
  };

  const prevDay = () => {
    let indexNewCurrentDay = currentDay - 1;
    if (indexNewCurrentDay < 0) {
      indexNewCurrentDay = 0;
    }
    const newDays = day.map((item, i) => {
      if (i === indexNewCurrentDay) {
        //item.active = !item.active
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setDay(newDays);
    setCurrentDay(indexNewCurrentDay);
  };

  // ultimoItemDeCualquierArreglo = arr[arr.length - 1]
  // ultimoIndiceDeCualquierArreglo = arr.length - 1

  const nextDay = () => {
    const lastIndexOfArray = day.length - 1;
    let indexNewCurrentDay = currentDay + 1;
    if (indexNewCurrentDay > lastIndexOfArray) {
      indexNewCurrentDay = lastIndexOfArray;
    }
    const newDays = day.map((item, i) => {
      if (i === indexNewCurrentDay) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setDay(newDays);
    setCurrentDay(indexNewCurrentDay);
  };

  const actionButtonsWidth = 50;
  const itemMargin = 4;
  const itemWidth = 30 + itemMargin;
  const currentTranslation = actionButtonsWidth - currentDay * itemWidth;

  const dayList = day.map((item, index) => {
    const currentDayActive = item.active ? "item item-active" : "item";
    return (
      <button
        onClick={() => activeItem(index)}
        className={currentDayActive}
        key={index}
      >
        {item.day}
      </button>
    );
  });
  return (
    <div>
      <div className="container">
        <div className="container-carousel-action-prev">
          <button className="carousel-action-prev" onClick={prevDay}>
            {prevDayTextButton}
          </button>
        </div>
        <div
          className="day-list-container"
          style={{
            transform: `translate(${currentTranslation}px)`,
            marginLeft: `calc(50% - ${actionButtonsWidth}px - 15px)`,
          }}
        >
          {dayList}
        </div>
        <div className="container-carousel-action-next">
          <button className="carousel-action-next" onClick={nextDay}>
            {nextDayTextButton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
