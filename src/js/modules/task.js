class Task {
  constructor(text, count = 0) {
    this.id = Math.random().toString().substring(2, 10);
    this.text = text;
    this.count = count;
  }

  increaseCount() {
    this.count++;

    return this;
  }

  changeText(newText) {
    this.text = newText;

    return this;
  }
}

export class ImportantTask extends Task {
  constructor(text) {
    super(text);

    this.importance = 'important';
  }
}

export class DefaultTask extends Task {
  constructor(text) {
    super(text);

    this.importance = 'default';
  }
}

export class SoSoTask extends Task {
  constructor(text) {
    super(text);

    this.importance = 'so-so';
  }
}
