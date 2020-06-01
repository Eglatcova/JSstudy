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

export default toggleImg;