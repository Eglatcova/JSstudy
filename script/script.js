"use strict";

window.addEventListener('DOMContentLoaded', () => {

  const hiDay = document.querySelector('.hi-day'),
      weekday = document.querySelector('.weekday'),
      nowTime = document.querySelector('.now-time'),
      date = document.querySelector('.date');

  let newDate = new Date();

  function nowWeek (){
    const weekRu = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ],
      weekDay = newDate.getDay();
    return weekRu[weekDay];
  }




  weekday.textContent = nowWeek();
  nowTime.textContent = newDate.toLocaleTimeString('en');

  console.log(newDate.getTime());
  console.log(newDate.getTime('31 december 2020'));



});