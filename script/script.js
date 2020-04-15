'use srtict';
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      appData.budget = +prompt('Ваш месячный доход?');
    }
    while ((!isNumber(appData.budget)));
  },
  getStatusTargetMonth = function () {
    if (quantityMonth >= 0) {
      return ('Цель будет достигнута за:' + Math.ceil(quantityMonth) + ' месяцев');
    } else {
      return ('Цель не будет достигнута');
    }
  };

let 
  appData = {
    budget: 300000,
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
      return appData.mission / appData.burgetMonth;
    }, //period
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
    }
  },


  expense = [],
  sumStart = start(),
  askMoney = appData.asking(),
  expensesAmount = appData.getExpensesMonth(),
  accumulatedMonth = appData.getAccumulatedMonth(),
  quantityMonth = appData.getTargetMonth();
  


console.log(appData.expenses);
console.log(typeof appData.budget);
console.log(typeof appData.income);
console.log(typeof appData.deposit);
console.log('Расходы на месяц:', expensesAmount);
console.log(getStatusTargetMonth());
console.log('Бюджет на день:', Math.floor(appData.burgetDay));
console.log(appData.getStatusIncome());

