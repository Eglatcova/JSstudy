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

export default slider;