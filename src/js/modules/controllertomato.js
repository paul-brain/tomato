import { ImportantTask } from "./task";
import { DefaultTask } from "./task";
import { SoSoTask } from "./task";

/* class Controller */
export class ControllerTomato {
  constructor(tomato) {
    this.tomato = tomato;
  }

  handleIncrement() {
    this.model.increment();
  }

  handleDecrement() {
    this.model.decrement();
  }

  handleAddTask(btn, input) {
    const text = input.value;

    if (!text) {
      alert('Введите пожалуйста название задачи, очень вас прошу!');
    } else {
      const importance = btn.className.split(' ')[2];
      const taskClass =
        importance === 'important' ? ImportantTask :
        importance === 'default' ? DefaultTask : SoSoTask;
      const task = new taskClass(text);

      this.tomato.addTask(task);
    }
  }
}
