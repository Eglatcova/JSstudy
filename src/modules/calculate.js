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

export default calc;