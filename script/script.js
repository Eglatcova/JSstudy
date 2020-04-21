'use srtict';

const calculateButton = document.getElementById('start');
const plusButton1 = document.getElementsByTagName('button')[0];
const plusButton2 = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('#deposit-check');
const additionalIncomeInput = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesIncomeValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n != 0;
  },
  isString = function (str) {
    return str === "" || !isNaN(parseFloat(str));
  };

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  appData = {
    budget: 0,
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
    start: function () {
      appData.budget = inputSalaryAmount.value;
      appData.getIncome(); //дополнительный доход
      appData.getAddIncome(); //возможный доход
      appData.getExpenses(); //обязательные расходы
      appData.getAddExpenses(); //возможные расходы
      appData.getAccumulatedMonth();
      appData.showResult();
      //appData.getTargetMonth();
      //appData.getInfoDeposit();
    },
    showResult: function () {
      budgetMonthValue.value = +appData.burgetMonth;
      budgetDayValue.value = Math.floor(appData.burgetDay);
      expensesIncomeValue.value = +appData.expensesMonth;
      additionalIncomeValue.value = appData.addIncome.join(', ');
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcSaveMoney();
      inputPeriodSelect.addEventListener('change',
        function () {
          incomePeriodValue.value = appData.calcSaveMoney();
        });
    },
    rangePeriod: function (event) {
      let numberPeriod = document.querySelector('.period-amount');
      numberPeriod.textContent = event.target.value;
    },
    //дополнительный доход
    getIncome: function () {
      incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });
    },
    //дополнительный доход, дополнительный блок
    addIncomeBlock: function () {
      cloneIncomeItem = incomeItems[0].cloneNode(true);
      plusButton1.before(cloneIncomeItem);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        plusButton1.style.display = "none";
      }
    },
    //возможный доход
    getAddIncome: function () {
      additionalIncomeInput.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    //обязательные расходы, дополнительный блок
    addExpensesBlock: function () {
      cloneExpensesItem = expensesItems[0].cloneNode(true);
      plusButton2.before(cloneExpensesItem);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        plusButton2.style.display = "none";
      }
    },
    //обязательные расходы
    getExpenses: function () {
      expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    //возможные расходы
    getAddExpenses: function () {
      let addExpenses = inputAdditionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    getAccumulatedMonth: function () {
      appData.burgetMonth = appData.budget - appData.expensesMonth;
      appData.burgetDay = appData.burgetMonth / 30;
      return appData.burgetMonth, appData.burgetDay;
    },
    getTargetMonth: function () {
      return inputTargetAmount.value / appData.burgetMonth;
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
      return appData.burgetMonth * inputPeriodSelect.value;
    }
  };
calculateButton.addEventListener('click',
  function () {
    if (inputSalaryAmount.value === '') {
      return;
    }
    appData.start();
  });
plusButton1.addEventListener('click', appData.addIncomeBlock);
plusButton2.addEventListener('click', appData.addExpensesBlock);
inputPeriodSelect.addEventListener('change', appData.rangePeriod);

//console.log(numberPeriod);