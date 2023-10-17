import { tomatoStorage } from "./storage";

/* class Model */
export class Tomato {
  constructor(render, time = 25, pause = 5, breakTime = 15, tasks = []) {
    if (Tomato._instance) {
      return Tomato._instance;
    }

    Tomato._instance = this;

    this.render = render;
    this.time = time;
    this.breakTime = breakTime;
    this.pause = pause;
    this.tasks = tasks;
    this.activeTask = null;

    this.init();
  }

  init() {
    this.storage = new tomatoStorage();

    if (this.tasks.length === 0) {
      this.tasks = this.storage.get();
    }
  }

  addTask(task) {
    this.tasks.push(task);
    this.storage.set(this.tasks);
    this.render.render();
  }

  activateTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);

    this.activeTask = this.tasks[index];
  }

  runTask() {
    try {
      if (!this.activeTask) {
        throw new Error('Невозможно запустить таймер: отсутствует активная задача');
      } else {
        console.log(`Таймер запущен, осталось ${this.time} минут.`);

        setTimeout(() => {
          const rest = this.activeTask.getCount() % 3 === 0 ? this.breakTime : this.pause;
          console.log(`Время работы вышло, пауза ${rest} минут.`);
          this.increaseTaskCount(this.activeTask.id);

          setTimeout(() => {
            console.log('Время отдыха закончилось, пора поработать!');
          }, rest * 60 * 1000);
        }, this.time * 60 * 1000);

      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  increaseTaskCount(id) {
    const index = this.tasks.findIndex(task => task.id === id);

    if (this.tasks[index]) {
      this.tasks[index].increaseCount();
    } else {
      console.log(`Невозможно выполнить действие: задача с id ${id} не найдена.`);
    }
  }
}
