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
    const menu = document.querySelector("menu"),
      menuItems = menu.querySelectorAll("ul>li");

    const addMenu = () => {
      menu.classList.add("active-menu");
    };

    const removeMenu = () => {
      menu.classList.remove("active-menu");
    };

    document.addEventListener("click", () => {
      let target = event.target;
      //искючение всех слушателей, кроме меню и его детей
      if (!target.closest("menu, .menu, .close-btn, a")) {
        removeMenu();
        return;
      }
      //открытие меню на клик по бургеру и его детям
      if (target.closest(".menu")) {
        addMenu();
      }
      //закрытие при клике на крестик
      if (target.classList.contains("close-btn")) {
        removeMenu();
      }
      //закрытие при клике на каждую ссылку
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

  //переключение картинок

  const toggleImg = () => {
    const photos = document.querySelectorAll(".command__photo");
    let firstPhotos = [],
      currentIndex = 0;
    //пушить первоначальные ссылки в массив
    photos.forEach((elem) => {
      firstPhotos.push(elem.src);
    });

    photos.forEach((elem) => {
      //дать каждой фотаграфии свой индекс
      elem.value = currentIndex++;
      elem.addEventListener("mouseenter", () => {
        event.target.src = event.target.dataset.img;
      });

      elem.addEventListener("mouseleave", (index) => {
        event.target.src = firstPhotos[elem.value];
      });
    });
  };

  //валидация, цифры

  const inputValidation = () => {
    const inputSquare = document.querySelector(".calc-square"),
      inputCount = document.querySelector(".calc-count"),
      inputDay = document.querySelector(".calc-day");

    inputSquare.addEventListener("input", () => {
      inputSquare.value = inputSquare.value.replace(/\D/g, "");
    });

    inputCount.addEventListener("input", () => {
      inputCount.value = inputCount.value.replace(/\D/g, "");
    });

    inputDay.addEventListener("input", () => {
      inputDay.value = inputDay.value.replace(/\D/g, "");
    });
  };

  //calculate

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.querySelector("#total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      //получение выбранного option.value
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      //получение индекса колическтва помещений
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      //получение индекса срочности
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      //конечный результат
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      // console.log(squareValue);

      totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (
        target === calcType ||
        target === calcSquare ||
        target === calcDay ||
        target === calcCount
      ) {
        countSum();
      }
    });

    // console.log(totalValue);
  };

  // send-ajax-form1
  const sendForm1 = () => {
    const errorMessage = "Что то пошло не так",
      loadMessage = "Загрузка...",
      successMessage = "Спасибо! Мы скоро с вами свяжемся!";
    const form = document.querySelector("#form1"),
      inputs = form.querySelectorAll("input"),
      formName = document.querySelector("#form1-name"),
      formPhone = document.querySelector("#form1-phone");

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem";
    //валидация
    formPhone.addEventListener("input", () => {
      formPhone.value = formPhone.value.match(/[\d\+]+/, "");
    });
    formName.addEventListener("input", () => {
      formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form);
      //объект для внесения в него данных формы
      let body = {};
      //запись данных формы в объект body
      formData.forEach((val, key) => {
        body[key] = val;
      });

      const postData = (body) => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          //важно вешать прослушку сразу после создания request
          request.addEventListener("readystatechange", () => {
            if (request.readyState !== 4) {
              return;
            }
            if (request.status === 200) {
              resolve();
            } else {
              reject(request.status);
            }
          });

          request.open("POST", "./server.php");
          request.setRequestHeader("Content-Type", "application/json");

          //отправка данных в JSON формате
          request.send(JSON.stringify(body));
        });
      };

      postData(body)
        .then(() => {
          statusMessage.textContent = successMessage;
          inputs.forEach((elem) => {
            elem.value = "";
          });
        })
        .catch(() => {
          statusMessage.textContent = errorMessage;
        });
    });
  };

  // send-ajax-form2
  const sendForm2 = () => {
    const errorMessage = "Что то пошло не так",
      loadMessage = "Загрузка...",
      successMessage = "Спасибо! Мы скоро с вами свяжемся!";
    const form = document.querySelector("#form2"),
      inputs = form.querySelectorAll("input"),
      formName = document.querySelector("#form2-name"),
      formPhone = document.querySelector("#form2-phone"),
      formMessage = document.querySelector("#form2-message");

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem";

    //валидация
    formPhone.addEventListener("input", () => {
      formPhone.value = formPhone.value.match(/[\d\+]+/, "");
    });
    formName.addEventListener("input", () => {
      formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
    });
    formMessage.addEventListener("input", () => {
      formMessage.value = formMessage.value.match(/[а-яёА-ЯЁ  ]+/u, "");
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form);
      //объект для внесения в него данных формы
      let body = {};
      //запись данных формы в объект body
      formData.forEach((val, key) => {
        body[key] = val;
      });

      const postData = (body) => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          //важно вешать прослушку сразу после создания request
          request.addEventListener("readystatechange", () => {
            if (request.readyState !== 4) {
              return;
            }
            if (request.status === 200) {
              resolve();
            } else {
              reject(request.status);
            }
          });

          request.open("POST", "./server.php");
          request.setRequestHeader("Content-Type", "application/json");

          //отправка данных в JSON формате
          request.send(JSON.stringify(body));
        });
      };

      postData(body)
        .then(() => {
          statusMessage.textContent = successMessage;
          inputs.forEach((elem) => {
            elem.value = "";
          });
        })
        .catch(() => {
          statusMessage.textContent = errorMessage;
        });
    });
  };

  // send-ajax-form3
  const sendForm3 = () => {
    const errorMessage = "Что то пошло не так",
      loadMessage = "Загрузка...",
      successMessage = "Спасибо! Мы скоро с вами свяжемся!";
    const form = document.querySelector("#form3"),
      inputs = form.querySelectorAll("input"),
      formName = document.querySelector("#form3-name"),
      formPhone = document.querySelector("#form3-phone");

    const statusMessage = document.createElement("div");
    statusMessage.style = "color: white; font-size: 2rem";

    //валидация
    formPhone.addEventListener("input", () => {
      formPhone.value = formPhone.value.match(/[\d\+]+/, "");
    });
    formName.addEventListener("input", () => {
      formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form);
      //объект для внесения в него данных формы
      let body = {};
      //запись данных формы в объект body
      formData.forEach((val, key) => {
        body[key] = val;
      });

      const postData = (body) => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          //важно вешать прослушку сразу после создания request
          request.addEventListener("readystatechange", () => {
            if (request.readyState !== 4) {
              return;
            }
            if (request.status === 200) {
              resolve();
            } else {
              reject(request.status);
            }
          });

          request.open("POST", "./server.php");
          request.setRequestHeader("Content-Type", "application/json");

          //отправка данных в JSON формате
          request.send(JSON.stringify(body));
        });
      };

      postData(body)
        .then(() => {
          statusMessage.textContent = successMessage;
          inputs.forEach((elem) => {
            elem.value = "";
          });
        })
        .catch(() => {
          statusMessage.textContent = errorMessage;
        });
    });
  };

  countTimer("29 june 2020");
  toggleMenu();
  togglePopUp();
  tabs();
  slider();
  toggleImg();
  inputValidation();
  calc();
  sendForm1();
  sendForm2();
  sendForm3();
});
