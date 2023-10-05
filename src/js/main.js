import {Timer} from './modules/timer.js';

let count = 0;
const imp = ['default', 'important', 'so-so']
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i])
    } else {
      target.classList.remove(imp[i])
    }
  }
});

console.log('It works!');
const tomato = new Timer('Tomato', 25);

console.log(tomato.getId());
console.log(tomato.getName());
console.log(tomato.getCounter());

tomato.name = '55';

console.log(tomato.getName());