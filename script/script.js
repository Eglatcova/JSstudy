'use srtict';

const books = document.querySelector('.books');
book = document.querySelectorAll('.book');
bookTitle = document.querySelectorAll('.book a');
book2 = document.querySelector('.book');
book5 = document.querySelectorAll('.book')[5];
bookUl6 = document.querySelectorAll('.book ul')[2];
bookLi2 = book2.querySelectorAll('li');
bookLi5 = book5.querySelectorAll('li');
bookLi6 = bookUl6.querySelectorAll('li');
newElem = document.createElement('li');

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
ad = document.querySelector('.adv');

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);
bookTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';
ad.remove();
bookUl6.append(newElem);
newElem.textContent = 'Глава 8: За пределами ES6';

bookLi2[1].after(bookLi2[3]);
bookLi2[3].after(bookLi2[6]);
bookLi2[6].after(bookLi2[8]);
bookLi2[9].after(bookLi2[2]);

bookLi5[1].after(bookLi5[9]);
bookLi5[9].after(bookLi5[3]);
bookLi5[3].after(bookLi5[4]);
bookLi5[2].after(bookLi5[6]);
bookLi5[6].after(bookLi5[7]);

bookLi6[8].after(newElem);

//console.log(bookLi6);