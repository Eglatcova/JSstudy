'use srtict';

const plusButton1 = document.getElementsByTagName('button')[0],
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

  depositBank = document.querySelector('.deposit-bank'),
  inputDepositAmount = document.querySelector('.deposit-amount'),
  inputDepositPercent = document.querySelector('.deposit-percent'),
  inputTargetAmount = document.querySelector('.target-amount'),
  inputPeriodSelect = document.querySelector('.period-select'),
  inputTextAll = document.querySelectorAll('[type="text"]'),
  calculateButton = document.getElementById('start'),
  closeButton = document.getElementById('cancel'),

  isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n) && n != 0,

  isString = (str) => str === "" || !isNaN(parseFloat(str));


let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),
  inputTextLeft = document.querySelectorAll('.data [type="text"]');

class AppData {

  constructor() {
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
  }

  start() {
    this.budget = inputSalaryAmount.value;
    this.getIncome(); //дополнительный доход
    this.getAddIncome(); //возможный доход
    this.getExpenses(); //обязательные расходы
    this.getAddExpenses(); //возможные расходы
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getInfoDeposit();
    this.getAccumulatedMonth();
    this.showResult();
  }

  showResult() {
    budgetMonthValue.value = +this.burgetMonth;
    budgetDayValue.value = Math.floor(this.burgetDay);
    expensesIncomeValue.value = +this.expensesMonth;
    additionalIncomeValue.value = this.addIncome.join(', ');
    additionalExpensesValue.value = this.addExpenses.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSaveMoney();
    inputPeriodSelect.addEventListener('input',
      () => {
        incomePeriodValue.value = this.calcSaveMoney();
      });
  }

  //рассчитать
  calculate() {
    if (inputSalaryAmount.value === '') {
      alert('Введите месячный доход');
      return;
    }
    if ((inputDepositPercent.value === '' && inputDepositPercent.style.display === 'inline-block') || !isNumber(inputDepositPercent.value) || !(inputDepositPercent.value > 0 && inputDepositPercent.value < 101)) {
      alert('Введите корректное значение в поле проценты');
      return;
    }
    calculateButton.style.display = "none";
    closeButton.style.display = "block";
    this.start();
    //блокировка левых инпутов
    inputTextLeft = document.querySelectorAll('.data [type="text"]');
    inputTextLeft.forEach((item) => {
      item.disabled = true;
    });
    plusButton1.disabled = true;
    plusButton2.disabled = true;
    plusButton1.style.display = "block";
    plusButton2.style.display = "block";
  }

  //сбросить
  reset() {
    inputTextAll.forEach((item) => {
      calculateButton.style.display = "block";
      closeButton.style.display = "none";
      item.value = '';
      item.disabled = false;
      expensesItems = document.querySelectorAll('.expenses-items');
      incomeItems = document.querySelectorAll('.income-items');
      incomeItems.forEach((item, index) => {
        if (index !== 0) {
          item.remove();
        }
      });
      expensesItems.forEach((item, index) => {
        if (index !== 0) {
          item.remove();
        }
      });
      plusButton1.disabled = false;
      plusButton2.disabled = false;
      this.burgetMonth = 0;
      inputPeriodSelect.value = 1;
      this.rangePeriod();
      inputDepositPercent.style.display = 'none';
      depositCheckbox.checked = false;
      this.depositHandler();
    });
  }

  rangePeriod() {
    //this.calcSaveMoney();
    const numberPeriod = document.querySelector('.period-amount');
    numberPeriod.textContent = inputPeriodSelect.value;

  }

  //дополнительный доход
  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
  }

  //дополнительный доход, дополнительный блок
  addIncomeBlock() {
    cloneIncomeItem = incomeItems[0].cloneNode(true);
    plusButton1.before(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusButton1.style.display = "none";
    }
  }

  //возможный доход
  getAddIncome() {
    additionalIncomeInput.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  //обязательные расходы, дополнительный блок
  addExpensesBlock() {
    cloneExpensesItem = expensesItems[0].cloneNode(true);
    plusButton2.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusButton2.style.display = "none";
    }
  }

  //обязательные расходы
  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  //возможные расходы
  getAddExpenses() {
    let addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  //сумма расходов
  getExpensesMonth() {
    for (let expensesItems in this.expenses) {
      this.expensesMonth += +this.expenses[expensesItems];
    }
  }

  //сумма дополнительных доходов
  getIncomeMonth() {
    for (let incomeItems in this.income) {
      this.incomeMonth += +this.income[incomeItems];
    }
  }

  getAccumulatedMonth() {
    const monthDeposit = this.moneyDeposit * this.percentDeposit;
    this.burgetMonth = this.budget - this.expensesMonth + this.incomeMonth + monthDeposit;
    this.burgetDay = this.burgetMonth / 30;
  }

  getTargetMonth() {
    return inputTargetAmount.value / this.burgetMonth;
  }

  getStatusIncome() {
    if (this.burgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (600 <= this.burgetDay && this.burgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (0 <= this.burgetDay && this.burgetDay < 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }

  getStatusTargetMonth() {
    if (this.period >= 0) {
      return ('Цель будет достигнута за:' + Math.ceil(this.getTargetMonth()) + ' месяцев');
    } else {
      return ('Цель не будет достигнута');
    }
  }

  calcSaveMoney() {
    return this.burgetMonth * inputPeriodSelect.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = inputDepositPercent.value;
      this.moneyDeposit = inputDepositAmount.value;
      if(this.percentDeposit > 1){
        this.percentDeposit = this.percentDeposit / 100;
      }
    }
  }

  changePercent() {
    let valueSelect = this.value;
    if (valueSelect === 'other') {
      inputDepositPercent.value = '';
      inputDepositPercent.style.display = 'inline-block';
      inputDepositPercent.disabled = false;
      
    } else {
      inputDepositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheckbox.checked) {
      depositBank.style.display = 'inline-block';
      inputDepositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      inputDepositAmount.style.display = 'none';
      depositBank.value = '';
      inputDepositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  //клики
  eventsListeners() {
    calculateButton.addEventListener('click', this.calculate.bind(this));
    closeButton.addEventListener('click', this.reset.bind(this));
    plusButton1.addEventListener('click', this.addIncomeBlock);
    plusButton2.addEventListener('click', this.addExpensesBlock);
    inputPeriodSelect.addEventListener('input', this.rangePeriod);
    depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData;

appData.eventsListeners();

//console.log(inputPeriodSelect.value);