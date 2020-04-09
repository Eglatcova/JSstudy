'use srtict';

let money = 1000,
  income = 'teaching',
  addExpenses = 'Shopping, Taxi, Cats, Course', 
  deposit = true,
  mission = 100000000,
  period = 7,
  budgetDay;
  
  question = prompt('Ваш месячный доход?'),
  question2 = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '2700, 3000, 15000'),
  question3 = confirm('Есть ли у вас депозит в банке?');
  expenses1 = prompt('Введите обязательную статью расходов?');
  amount1 = prompt('Во сколько это обойдется?');
  expenses2 = prompt('Введите обязательную статью расходов?');
  amount2 = prompt('Во сколько это обойдется?');


budgetDay = money/30;

money = question;
addExpenses = question2;
deposit = question3;
answer1 = expenses1;
answer2 = amount1;
answer3 = expenses2;
answer4 = amount2;

budgetMonth = money - answer2 - answer4;
budgetAim = mission / budgetMonth;

budgetDay = budgetMonth / 30;



console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'кг доширака');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(' '));
console.log(budgetDay);
console.log('Бюджет на месяц равен:', budgetMonth);
console.log('Цель будет достигнута за:', Math.ceil(budgetAim), ' месяцев');
console.log('Бюджет на день:', Math.floor(budgetDay));

if (budgetDay >= 1200){
  console.log('У вас высокий уровень дохода');
} else if (600 <= budgetDay && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (0 <= budgetDay && budgetDay < 600) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}