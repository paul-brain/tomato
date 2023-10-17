class Storage {
  constructor(key) {
    const proto = Object.getPrototypeOf(this);

    if (proto.constructor === Storage) {
      throw new Error(`${this.constructor.name}: can not create instance of interface`);
    }

    this.key = key;
  }

  get() {
    throw new Error(`Не описан метод get() в классе ${this.constructor.name}`);
  }

  set(data) {
    throw new Error(`Не описан метод set() в классе ${this.constructor.name}`);
  }

  edit(id, newData) {
    throw new Error(`Не описан метод edit() в классе ${this.constructor.name}`);
  }

  remove(id) {
    throw new Error(`Не описан метод remove() в классе ${this.constructor.name}`);
  }
}

export class tomatoStorage extends Storage {
  constructor(key = 'tasks') {
    super(key);
  }

  get() {
    let data = localStorage.getItem(this.key);

    if (data !== null) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error(`Не удалось загрузить данные, ошибка: ${err.message}`);
      }

      return data;
    }

    return [];
  }

  set(tasks) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  edit(id, task) {
    let data = this.get();
    const index = data.findIndex(task => task.id === id);

    if (index) {
      data.splice(index, 1, task);
      this.set(data);
    }
  }

  remove(id) {
    let data = this.get();
    const index = data.findIndex(task => task.id === id);

    if (index) {
      data.splice(index, 1);
      this.set(data);
    }
  }
}
