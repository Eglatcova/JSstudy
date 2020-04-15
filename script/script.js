'use srtict';
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?');
    }
    while ((!isNumber(money)));
  },
  getStatusTargetMonth = function () {
    if (quantityMonth >= 0) {
      return ('Цель будет достигнута за:' + Math.ceil(quantityMonth) + ' месяцев');
    } else {
      return ('Цель не будет достигнута');
    }
  };

let money,
  appData = {
    budget: money,
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
      let sumAll = 0;
      for (let item in appData.expenses) {
        sumAll += appData.expenses[item];
      }
      return sumAll;
    },
    getAccumulatedMonth: function () {
      return money - expensesAmount;
    },
    getTargetMonth: function () {
      return appData.mission / accumulatedMonth;
    }, //period
    getStatusIncome: function () {
      if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
      } else if (600 <= budgetDay && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (0 <= budgetDay && budgetDay < 600) {
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
  quantityMonth = appData.getTargetMonth(),
  budgetDay = accumulatedMonth / 30;


console.log(appData.expenses);
console.log(typeof money);
console.log(typeof appData.income);
console.log(typeof appData.deposit);
console.log('Расходы на месяц:', expensesAmount);
console.log(getStatusTargetMonth());
console.log('Бюджет на день:', Math.floor(budgetDay));
console.log(appData.getStatusIncome());