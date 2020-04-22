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
const inputTextAll = document.querySelectorAll('[type="text"]');

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n != 0;
  },
  isString = function (str) {
    return str === "" || !isNaN(parseFloat(str));
  };

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  inputTextLeft = document.querySelectorAll('.data [type="text"]'),
  appData = {
    budget: 0,
    burgetDay: 0,
    burgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
      this.budget = inputSalaryAmount.value;
      this.getIncome(); //дополнительный доход
      this.getAddIncome(); //возможный доход
      this.getExpenses(); //обязательные расходы
      this.getAddExpenses(); //возможные расходы
      this.getExpensesMonth();
      this.getIncomeMonth();
      this.getAccumulatedMonth();
      this.showResult();
      console.log(this);
      //appData.getTargetMonth();
      //appData.getInfoDeposit();
    },
    showResult: function () {
      budgetMonthValue.value = +this.burgetMonth;
      budgetDayValue.value = Math.floor(this.burgetDay);
      expensesIncomeValue.value = +this.expensesMonth;
      additionalIncomeValue.value = this.addIncome.join(', ');
      additionalExpensesValue.value = this.addExpenses.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcSaveMoney();
      inputPeriodSelect.addEventListener('input',
        function () {
          incomePeriodValue.value = appData.calcSaveMoney();
        });
    },
    //рассчитать
    calculate: function () {
      if (inputSalaryAmount.value === '') {
        alert('Введите месячный доход');
        return;
      }
      appData.start();
      //блокировка левых инпутов
      inputTextLeft = document.querySelectorAll('.data [type="text"]'),
        inputTextLeft.forEach(function (item) {
          item.disabled = true;
        });
      calculateButton.textContent = 'Сбросить';
      calculateButton.removeEventListener('click', appData.calculate);
      calculateButton.addEventListener('click', appData.reset);
      plusButton1.disabled = true; 
      plusButton2.disabled = true; 
    },
    //сбросить
    reset: function () {
      inputTextAll.forEach(function (item) {
        item.value = '';
        item.disabled = false;
        calculateButton.textContent = 'Рассчитать';
        calculateButton.removeEventListener('click', appData.reset);
        calculateButton.addEventListener('click', appData.calculate);
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function (item, index) {
          if (index !== 0) {
            item.remove();
          }
        });
        expensesItems.forEach(function (item, index) {
          if (index !== 0) {
            item.remove();
          }
        });
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
    //сумма расходов
    getExpensesMonth: function () {
      for(let expensesItems in appData.expenses) {
        appData.expensesMonth += +appData.expenses[expensesItems];
      } 
    },
    //сумма дополнительных доходов
    getIncomeMonth: function () {
      for(let incomeItems in appData.income) {
        appData.incomeMonth += +appData.income[incomeItems];
      } 
    },
    getAccumulatedMonth: function () {
      this.burgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
      this.burgetDay = this.burgetMonth / 30;
      return this.burgetMonth, this.burgetDay;
    },
    getTargetMonth: function () {
      return inputTargetAmount.value / this.burgetMonth;
    },
    getStatusIncome: function () {
      if (this.burgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
      } else if (600 <= this.burgetDay && this.burgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (0 <= this.burgetDay && this.burgetDay < 600) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
      } else {
        return ('Что то пошло не так');
      }
    },
    getStatusTargetMonth: function () {
      if (this.period >= 0) {
        return ('Цель будет достигнута за:' + Math.ceil(this.getTargetMonth()) + ' месяцев');
      } else {
        return ('Цель не будет достигнута');
      }
    },
    getInfoDeposit: function () {
      if (this.deposit) {
        do {
          this.percentDeposit = prompt('Какой годовой процент', '7');
        }
        while ((!isNumber(this.percentDeposit)));
        do {
          this.moneyDeposit = prompt('Какая сумма заложена?', '400000');
        }
        while ((!isNumber(this.moneyDeposit)));
      }
    },
    calcSaveMoney: function () {
      return this.burgetMonth * inputPeriodSelect.value;
    }
  };
calculateButton.addEventListener('click', appData.calculate);
plusButton1.addEventListener('click', appData.addIncomeBlock);
plusButton2.addEventListener('click', appData.addExpensesBlock);
inputPeriodSelect.addEventListener('input', appData.rangePeriod);



//console.log(appData);