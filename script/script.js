'use srtict';

let money = +prompt('Ваш месячный доход?'),
  income = 'teaching',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  mission = 100000000,
  getExpensesMonth = function  () {
    return amount1 + amount2;
  },
  getAccumulatedMonth = function  () {
    return money - getExpensesMonth();
  },
  accumulatedMonth = getAccumulatedMonth(),
  getTargetMonth = function  (){
    return mission / accumulatedMonth; 
  },//period
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
console.log(getExpensesMonth());
console.log(addExpenses.split(' '));
console.log('Цель будет достигнута за:', Math.ceil(getTargetMonth()), ' месяцев');
console.log('Бюджет на день:', Math.floor(budgetDay));
console.log(getStatusIncome());

