'use srtict';
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?');
    }
    while ((!isNumber(money)));
    appData.budget = money;
  };

let money,
  appData = {
    budget: 30000,
    burgetDay: 0,
    burgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 700000,
    period: 3,
    asking: function () {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      for (let i = 0; i < 2; i++) {
        let expense = [];
        expense[i] = prompt('Введите обязательную статью расходов?');
        do {
          sum = +prompt('Во сколько это обойдется?');
        }
        while ((!isNumber(sum)));
        appData.expenses[expense[i]] = sum;
      }
    },

    getExpensesMonth: function () {
      for (let item in appData.expenses) {
        appData.expensesMonth += appData.expenses[item];
      }
      return appData.expensesMonth;
    },
    getAccumulatedMonth: function () {
      appData.burgetMonth = appData.budget - appData.expensesMonth;
      appData.burgetDay = appData.burgetMonth / 30;
      return appData.burgetMonth, appData.burgetDay;
    },
    getTargetMonth: function () {
      appData.period = appData.mission / appData.burgetMonth;
      return appData.period;
    },
    getStatusIncome: function () {
      if (appData.burgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
      } else if (600 <= appData.burgetDay && appData.burgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (0 <= appData.burgetDay && appData.burgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
      } else {
        return ('Что то пошло не так');
      }
    },
    getStatusTargetMonth: function () {
      if (appData.period >= 0) {
        return ('Цель будет достигнута за:' + Math.ceil(appData.period) + ' месяцев');
      } else {
        return ('Цель не будет достигнута');
      }
    }
  };


start();
appData.asking();
appData.getExpensesMonth();
appData.getAccumulatedMonth();
appData.getTargetMonth();


console.log("Наша программа включает в себя данные:");
for (let item in appData) {
  console.log(item + " = " + appData[item]);
}
//console.log(appData.expenses);
console.log('Расходы на месяц:', appData.expensesMonth);
console.log(appData.getStatusTargetMonth());
//console.log('Бюджет на день:', Math.floor(appData.burgetDay));
console.log(appData.getStatusIncome());