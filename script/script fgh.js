'use srtict';

const calculateButton = document.getElementById('start'),
  plusButton1 = document.getElementsByTagName('button')[0],
  plusButton2 = document.getElementsByTagName('button')[1],
  depositCheckbox = document.querySelector('#deposit-check'),
  additionalIncomeInput = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesIncomeValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  inputSalaryAmount = document.querySelector('.salary-amount'),
  inputIncomeTitle = document.querySelector('.income-title'),
  inputIncomeAmount = document.querySelector('.income-amount'),
  inputExpensesTitle = document.querySelector('.expenses-title'),
  inputExpensesAmount = document.querySelector('.expenses-amount'),
  inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
  inputDepositAmount = document.querySelector('.deposit-amount'),
  inputDepositPercent = document.querySelector('.deposit-percent'),
  inputTargetAmount = document.querySelector('.target-amount'),
  inputPeriodSelect = document.querySelector('.period-select'),
  inputTextAll = document.querySelectorAll('[type="text"]'),

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n != 0;
  },
  isString = function (str) {
    return str === "" || !isNaN(parseFloat(str));
  };

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  inputTextLeft = document.querySelectorAll('.data [type="text"]');

const appData = function () {
  this.budget = 0;
  this.burgetDay = 0;
  this.burgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  console.log(this);
};

appData.prototype.start = function () {
  console.log(this);
  this.budget = inputSalaryAmount.value;
  this.getIncome(); //дополнительный доход
  this.getAddIncome(); //возможный доход
  this.getExpenses(); //обязательные расходы
  this.getAddExpenses(); //возможные расходы
  this.getExpensesMonth();
  this.getIncomeMonth();
  this.getAccumulatedMonth();
  this.showResult();
 
};

appData.prototype.showResult = function () {
console.log(this);
  budgetMonthValue.value = +this.burgetMonth;
  budgetDayValue.value = Math.floor(this.burgetDay);
  expensesIncomeValue.value = +this.expensesMonth;
  additionalIncomeValue.value = this.addIncome.join(', ');
  additionalExpensesValue.value = this.addExpenses.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSaveMoney();
  inputPeriodSelect.addEventListener('input',
    function () {
      incomePeriodValue.value = appData.prototype.calcSaveMoney();
    });
   
};

//рассчитать
appData.prototype.calculate = function () {
  if (inputSalaryAmount.value === '') {
    alert('Введите месячный доход');
    return;
  }
  console.log(this);
  appDataNew.start();
  //блокировка левых инпутов
  inputTextLeft = document.querySelectorAll('.data [type="text"]'),
    inputTextLeft.forEach(function (item) {
      item.disabled = true;
    }),
  calculateButton.textContent = 'Сбросить';
  calculateButton.removeEventListener('click', appDataNew.calculate);
  calculateButton.addEventListener('click', appDataNew.reset);
  plusButton1.disabled = true;
  plusButton2.disabled = true;
  plusButton1.style.display = "block";
  plusButton2.style.display = "block";

};

//сбросить
appData.prototype.reset = function () {
  inputTextAll.forEach(function (item) {
    item.value = '';
    item.disabled = false;
    calculateButton.textContent = 'Рассчитать';
    calculateButton.removeEventListener('click', appDataNew.reset);
    calculateButton.addEventListener('click', appDataNew.calculate);
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
    plusButton1.disabled = false;
    plusButton2.disabled = false;
  });
};

appData.prototype.rangePeriod = function (event) {
    let numberPeriod = document.querySelector('.period-amount');
    numberPeriod.textContent = event.target.value;
  },
  //дополнительный доход
  appData.prototype.getIncome = function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        console.log(this);
        this.income[itemIncome] = cashIncome;
      }
    });
  };

//дополнительный доход, дополнительный блок
appData.prototype.addIncomeBlock = function () {
  cloneIncomeItem = incomeItems[0].cloneNode(true);
  plusButton1.before(cloneIncomeItem);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    plusButton1.style.display = "none";
  }
};

//возможный доход
appData.prototype.getAddIncome = function () {
  additionalIncomeInput.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
     this.addIncome.push(itemValue);
    }
  });
};

//обязательные расходы, дополнительный блок
appData.prototype.addExpensesBlock = function () {
  cloneExpensesItem = expensesItems[0].cloneNode(true);
  plusButton2.before(cloneExpensesItem);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    plusButton2.style.display = "none";
  }
};

//обязательные расходы
appData.prototype.getExpenses = function () {
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

//возможные расходы
appData.prototype.getAddExpenses = function () {
  let addExpenses = inputAdditionalExpensesItem.value.split(',');
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
};

//сумма расходов
appData.prototype.getExpensesMonth = function () {

  for (let expensesItems in this.expenses) {
    this.expensesMonth += +this.expenses[expensesItems];
  }
};

//сумма дополнительных доходов
appData.prototype.getIncomeMonth = function () {
  for (let incomeItems in this.income) {
    this.incomeMonth += +this.income[incomeItems];
  }
};

appData.prototype.getAccumulatedMonth = function () {
  
  this.burgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
  this.burgetDay = this.burgetMonth / 30;
  return this.burgetMonth, this.burgetDay;
};

appData.prototype.getTargetMonth = function () {
  return inputTargetAmount.value / this.burgetMonth;
};

appData.prototype.getStatusIncome = function () {
  if (this.burgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (600 <= this.burgetDay && this.burgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (0 <= this.burgetDay && this.burgetDay < 600) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

appData.prototype.getStatusTargetMonth = function () {
  if (this.period >= 0) {
    return ('Цель будет достигнута за:' + Math.ceil(this.getTargetMonth()) + ' месяцев');
  } else {
    return ('Цель не будет достигнута');
  }
};

appData.prototype.getInfoDeposit = function () {
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
};

appData.prototype.calcSaveMoney = function () {
  return this.burgetMonth * inputPeriodSelect.value;
};


const appDataNew = new appData();

console.log(appDataNew);



calculateButton.addEventListener('click', appDataNew.calculate);
plusButton1.addEventListener('click', appDataNew.addIncomeBlock);
plusButton2.addEventListener('click', appDataNew.addExpensesBlock);
inputPeriodSelect.addEventListener('input', appDataNew.rangePeriod);



//console.log(appData);