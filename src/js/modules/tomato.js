export class Tomato {
  #time;
  #breakTime;
  #pause;
  #tasks;
  #activeTask;

  constructor({time = 25, pause = 5, breakTime = 15, tasks = []}) {
    this.#time = time;
    this.#breakTime = breakTime;
    this.#pause = pause;
    this.#tasks = tasks;
    this.#activeTask = null;
  }
    
  addTask(task) {
    this.#tasks.push(task);
  }

  activateTask(id) {
    const index = this.#tasks.findIndex(task => task.getId() === id);

    this.#activeTask = this.#tasks[index];
  }
  
  runTask() {
    try {
      if (this.#activeTask) {
        console.log(`Таймер запущен, осталось ${this.#time} минут.`);
        
        setTimeout(() => {
          const rest = this.#activeTask.getCounter() % 3 === 0 ? this.#breakTime : this.#pause;
          
          setTimeout(() => {
            console.log(`Время работы вышло, пауза ${rest} минут.`);
            this.#activeTask.increaseCount();
          }, rest * 60 * 1000);
        }, this.#time * 60 * 1000);
      } else {
        throw new Error('Невозможно запустить таймер: отсутствует активная задача');
      }
    } catch (error) {
      console.log('error: ', error.message);      
    }
  }

  increaseTaskCount(id) {
    const index = this.#tasks.findIndex(task => task.getId() === id);

    this.#tasks[index].increaseCount();
  }
}
