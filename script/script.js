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
  //budgetDay = money/30;
  budgetMonth = money - (amount1 + amount2),
  period = mission / budgetMonth,
  budgetDay = budgetMonth / 30;

 if (budgetDay >= 1200){
  console.log('У вас высокий уровень дохода');
} else if (600 <= budgetDay && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (0 <= budgetDay && budgetDay < 600) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
} 

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен' + ' ' + Math.ceil(period) + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'кг доширака');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(' '));
console.log(Math.floor(budgetDay));
console.log('Бюджет на месяц равен:', budgetMonth);
console.log('Цель будет достигнута за:', Math.ceil(period), ' месяцев');
console.log('Бюджет на день:', Math.floor(budgetDay));

