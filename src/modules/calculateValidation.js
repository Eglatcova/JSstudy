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

export default inputValidation;