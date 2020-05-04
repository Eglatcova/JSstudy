'use srtict';

//1 задание
const myLesson = [{
    lesson: 1,
    status: true
  },
  {
    lesson: 2,
    status: true
  },
  {
    lesson: 3,
    status: false
  },
  {
    lesson: 4,
    status: true
  },
  {
    lesson: 5,
    status: false
  },
  {
    lesson: 6,
    status: true
  },
  {
    lesson: 7,
    status: true
  },
  {
    lesson: 8,
    status: true
  },
  {
    lesson: 9,
    status: true
  },
  {
    lesson: 10,
    status: false
  }
];

const falseLesson = myLesson.filter(item => item.status === false);

console.log('Обязательное задание', falseLesson);


////////////////////

const a = document.querySelector('#a'),
  b = document.querySelector('#b'),
  sumBtn = document.querySelector('#sum'),
  multBtn = document.querySelector('#mult'),
  resEl = document.querySelector('#res');

let calculator = {

  sumRes: 0,
  mulRes: 0,

  sum() {
    this.sumRes = +a.value + +b.value;
  },

  mult() {
    this.mulRes = +a.value * +b.value;
  },

  show() {
    if (sumBtn === event.target) {
      this.sum();
      resEl.value = this.sumRes;
    }
    if (multBtn === event.target) {
      this.mult();
      resEl.value = this.mulRes;
    }
  }
};


sumBtn.addEventListener('click', calculator.show.bind(calculator));
multBtn.addEventListener('click', calculator.show.bind(calculator));

///////////////////////

function getResult(x, y) {
  let result;

  result = Math.pow(x, y);
  result = result.toString().split('');
  result = result.reduce((accumulator, item) => +accumulator + +item, 0);

  return result;
}

console.log('Бонус задание №2', getResult(4, 8));

////////////////////



const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
};
const country = document.querySelector('#country');

console.log(country.value);