'use srtict';
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n != 0;
  },
  isString = function (str) {
    return str === "" || !isNaN(parseFloat(str));
  },
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?', '50000');
    }
    while ((!isNumber(money)));
    appData.budget = money;
  };
const calculateButton = document.getElementById('start');
const plusButton1 = document.getElementsByTagName('button')[0];
const plusButton2 = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('#deposit-check');
const additionalIncomeInput = document.querySelectorAll('.additional_income-item');
const inputBudgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const inputBudgetDayValue = document.getElementsByClassName('budget_day-value')[0];

const inputAdditionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const inputAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const inputIncomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const inputTargetMonthValue = document.getElementsByClassName('target_month-value')[0];

const inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-title');
const inputExpensesTitle = document.querySelector('.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');

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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 700000,
    period: 3,
    asking: function () {
      if (confirm('Есть ли у вас дополнительный заработок?')) {
        let itemIncome, cashIncome;
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
        }
        while (isString(itemIncome));
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '20000');
        }
        while (!isNumber(cashIncome));
        appData.income[itemIncome] = cashIncome;
      }
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'курсы,йога,кино');
      appData.addExpenses = addExpenses.split(/, */).map(word => word[0].toUpperCase() + word.substring(1)).join(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      for (let i = 0; i < 2; i++) {
        let expense, sum;
        do {
          expense = prompt('Введите обязательную статью расходов?')
        }
        while (isString(expense));;
        do {
          sum = prompt('Во сколько это обойдется?');
        }
        while ((!isNumber(sum)));
        appData.expenses[expense] = +sum;
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
        return ('Цель будет достигнута за:' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
      } else {
        return ('Цель не будет достигнута');
      }
    },
    getInfoDeposit: function () {
      if (appData.deposit) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент', '7');
        }
        while ((!isNumber(appData.percentDeposit)));
        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', '400000');
        }
        while ((!isNumber(appData.moneyDeposit)));
      }
    },
    calcSaveMoney: function () {
      return appData.burgetMonth * appData.period;
    }
  };


start();
appData.asking();
appData.getExpensesMonth();
appData.getAccumulatedMonth();
appData.getTargetMonth();
appData.getInfoDeposit();



console.log("Наша программа включает в себя данные:");
for (let item in appData) {
  console.log(item + " = " + appData[item]);
}
console.log('Расходы на месяц:', appData.expensesMonth);
console.log(appData.getStatusTargetMonth());
console.log(appData.getStatusIncome());