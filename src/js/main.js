import { Timer } from "./modules/timer";
import { Tomato } from "./modules/tomato";

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

const task = new Timer('First task');
const tomato = new Tomato({tasks: [].push(task)});
console.log('tomato: ', tomato);