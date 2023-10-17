export class Timer {
  constructor(name, counter = 0) {
    this.id = Math.random().toString().substring(2, 10);
    this.name = name;
    this.counter = counter;
  }

  increaseCount() {
    this.counter++;

    return this;
  }

  changeName(newName) {
    this.name = newName;

    return this;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCounter() {
    return this.counter;
  }
}
