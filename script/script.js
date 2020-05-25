"use strict";
window.addEventListener("DOMContentLoaded", () => {
  // Timer
  const countTimer = (deadline) => {
    const timerDays = document.querySelector("#timer-days"),
      timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");
    let idTimeout = 0;
    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24),
        days = Math.floor(timeRemaining / 60 / 60 / 24);
      return {
        timeRemaining,
        days,
        hours,
        minutes,
        seconds,
      };
    }
    function updateClock() {
      const timer = getTimeRemaining();
      timerSeconds.textContent = String(timer.seconds).padStart(2, "0");
      timerMinutes.textContent = String(timer.minutes).padStart(2, "0");
      timerHours.textContent = String(timer.hours).padStart(2, "0");
      timerDays.textContent = String(timer.days).padStart(2, "0");
      if (timer.timeRemaining < 0) {
        clearTimeout(idTimeout);
        timerSeconds.textContent = "00";
        timerMinutes.textContent = "00";
        timerHours.textContent = "00";
        timerDays.textContent = "00";
      }
    }
    idTimeout = setInterval(updateClock, 1000);
  };

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      menuItems = menu.querySelectorAll("ul>li");

    const addMenu = () => {
      menu.classList.add("active-menu");
    };

    const removeMenu = () => {
      menu.classList.remove("active-menu");
    };

    btnMenu.addEventListener("click", addMenu);

    menu.addEventListener("click", () => {
      let target = event.target;
      if (target.classList.contains("close-btn")) {
        removeMenu();
      }
      if (target.matches("a")) {
        menuItems.forEach(() => {
          removeMenu();
        });
      }
    });
  };

  //Modal
  const togglePopUp = () => {
    let count = 0;
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupModal = document.querySelector(".popup-content");

    //animate
    let animate = function () {
      count++;
      if (count < 25) {
        requestAnimationFrame(animate);
        popupModal.style.top = count * 4 + "px";
      } else {
        cancelAnimationFrame(animate);
      }
    };

    popupBtn.forEach((e) => {
      e.addEventListener("click", () => {
        popup.style.display = "block";
        if (document.documentElement.clientWidth > 767) {
          count = 0;
          requestAnimationFrame(animate);
        }
      });
    });

    popup.addEventListener("click", () => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");
        if (target === null) {
          popup.style.display = "none";
        }
      }
    });
  };

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target.classList.contains("service-header-tab")) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  //Slider
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      dots = document.querySelector(".portfolio-dots"),
      slider = document.querySelector(".portfolio-content");
    let currentSlide = 0,
      interval;
    // создает пагинацию слайдера
    let dotAll = [];

    slide.forEach((index) => {
      (dotAll[index] = document.createElement("li")),
        (dotAll[index].className = "dot"),
        dotAll.push(dotAll[index]);
      dotAll[0].className = "dot dot-active";
      dots.append(dotAll[index]);
    });
    //удаление активных классов
    const prevSlide = (elem, index, strCLass) => {
      elem[index].classList.remove(strCLass);
    };
    //создание активных классов
    const nextSlide = (elem, index, strCLass) => {
      elem[index].classList.add(strCLass);
    };
    //автоматическое переключение сладйов
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dotAll, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dotAll, currentSlide, "dot-active");
    };
    //вызов автоматического переключения
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };
    // переключение слайдов при нажатии на пагинацию и кнопки
    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;
      //ограничение слушателей
      //arrow-left. arrow-right навигация
      //dot - пагинация
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dotAll, currentSlide, "dot-active");
      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dotAll, currentSlide, "dot-active");
    });
    //остановка автоматического переключения при наведении на пагинацию и навигацию
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    //включение автоматического переключения если нет наведения
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide(3000);
  };

  countTimer("29 may 2020");
  toggleMenu();
  togglePopUp();
  tabs();
  slider();
});
