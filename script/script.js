"use strict";

window.addEventListener('DOMContentLoaded', () => {

  const hiDay = document.querySelector('.hi-day'),
    weekday = document.querySelector('.weekday'),
    nowTime = document.querySelector('.now-time'),
    date = document.querySelector('.date');

    
  let newDate = new Date(),
    yearDay = new Date('31 december 2020').getTime(),
    newYearStay = Math.floor((yearDay - newDate.getTime()) / 1000 / 60 / 60 / 24);

  function nowWeek() {
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

  function nowHi() {
    if (newDate.getHours() > 0 && newDate.getHours() < 7) {
      hiDay.textContent = 'Доброй ночи';
    } else if (newDate.getHours() > 6 && newDate.getHours() < 12) {
      hiDay.textContent = 'Доброе утро';
    } else if (newDate.getHours() > 11 && newDate.getHours() < 20) {
      hiDay.textContent = 'Добрый день';
    } else {
      hiDay.textContent = 'Добрый вечер';
    }
  }

  weekday.textContent = 'Сегодня: ' + nowWeek();
  nowTime.textContent = 'Текущее время: ' + newDate.toLocaleTimeString('en');
  date.textContent = 'До нового года осталось: ' + newYearStay;
  nowHi();
  
});