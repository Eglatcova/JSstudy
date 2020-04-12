'use srtict';

let money,
  income = 'teaching',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses = [],
  mission = 100000000,
  isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function() {
    do {
      money = +prompt('Ваш месячный доход?');
    }
    while ((!isNumber(money)));
  },
  sumStart = start(),
  getExpensesMonth = function  () {
    let sumAll = 0; 
    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов?');
      do {
        sum = +prompt('Во сколько это обойдется?');
      }
      while ((!isNumber(sum)));
      sumAll += sum;
    }
    return sumAll;
  }, 
  expensesAmount = getExpensesMonth(),
  getAccumulatedMonth = function  () {
    return money - expensesAmount;
  },

  accumulatedMonth = getAccumulatedMonth(),

  getTargetMonth = function  (){
    return mission / accumulatedMonth; 
  },//period
  quantityMonth = getTargetMonth(),
  getStatusTargetMonth = function() {
   if (quantityMonth >= 0) {
    return ('Цель будет достигнута за:'+ Math.ceil(quantityMonth)+ ' месяцев');
   }
   else {
   return ('Цель не будет достигнута');
   }
  },
  budgetDay = accumulatedMonth / 30,
  getStatusIncome = function() { if (budgetDay >= 1200){
  return ('У вас высокий уровень дохода');
} else if (600 <= budgetDay && budgetDay < 1200) {
  return ('У вас средний уровень дохода');
} else if (0 <= budgetDay && budgetDay < 600) {
  return ('К сожалению, у вас уровень дохода ниже среднего');
} else {
  return ('Что то пошло не так');
}};



console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Расходы на месяц:', expensesAmount);
console.log(addExpenses.split(' '));
console.log(getStatusTargetMonth());
console.log('Бюджет на день:', Math.floor(budgetDay));
console.log(getStatusIncome());

