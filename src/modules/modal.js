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

export default togglePopUp;