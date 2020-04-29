'use srtict';

class first {
 hello(){
 console.log ('Привет я метод родителя!');
}

};

class second extends first {
  hello(){
    super.hello();
    console.log ('А я наследуемый метод!');
  } 
}

//const cons1 = new first();
const cons2 = new second();

//cons1.hello();
cons2.hello();