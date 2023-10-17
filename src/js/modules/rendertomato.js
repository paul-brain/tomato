import { Tomato } from "./tomato";
import { ControllerTomato } from "./controllertomato";
import tomatoLogo from '../../img/svg/noto_tomato.svg';

/* class View */
export class RenderTomato {
  constructor(root) {
    this.root = document.getElementById(root);
    this.tomato = new Tomato(this);
    this.controller = new ControllerTomato(this.tomato);
  }

  createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');

    const container = document.createElement('div');
    container.classList.add('container', 'header__container');

    const logo = document.createElement('img');
    logo.classList.add('header__logo');
    // logo.src = 'img/svg/noto_tomato.svg'; // не фурычит
    logo.src = tomatoLogo;
    logo.alt = 'Tomato image';

    const title = document.createElement('h1');
    title.classList.add('header__title');
    title.textContent = 'Tomato timer';

    container.append(logo, title);
    header.append(container);

    return header;
  }

  createMain() {
    const main = document.createElement('main');
    main.classList.add('main');

    const container = document.createElement('div');
    container.classList.add('container', 'main__container');

    const window = document.createElement('div');
    window.classList.add('pomodoro-form', 'window');

    const windowPanel = this.createWindowPanel();
    const windowBody = this.createWindowBody();
    const form = this.createForm();
    const pomodoroTasks = this.createPomodoroTasks();

    window.append(windowPanel, windowBody, form);
    container.append(window, pomodoroTasks);
    main.append(container);

    return main;
  }

  createWindowPanel() {
    const windowPanel = document.createElement('div');
    windowPanel.classList.add('window__panel');

    const windowPanelTitle = document.createElement('p');
    windowPanelTitle.classList.add('window__panel-title');
    windowPanelTitle.textContent = 'Сверстать сайт';

    const windowPanelTaskText = document.createElement('p');
    windowPanelTaskText.classList.add('window__panel-task-text');
    windowPanelTaskText.textContent = 'Томат 2';

    windowPanel.append(windowPanelTitle, windowPanelTaskText);

    return windowPanel;
  }

  createWindowBody() {
    const windowBody = document.createElement('div');
    windowBody.classList.add('window__body');

    const windowTimerText = document.createElement('p');
    windowTimerText.classList.add('window__timer-text');
    windowTimerText.textContent = '25:00';

    const windowsButtonsWrapper = document.createElement('div');
    windowsButtonsWrapper.classList.add('window__buttons');

    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('button', 'button-primary');
    this.startBtn.textContent = 'Старт';

    this.stopBtn = document.createElement('button');
    this.stopBtn.classList.add('button', 'button-secondary');
    this.stopBtn.textContent = 'Стоп';

    windowsButtonsWrapper.append(this.startBtn, this.stopBtn);
    windowBody.append(windowTimerText, windowsButtonsWrapper);

    return windowBody;
  }

  createForm() {
    const form = document.createElement('form');
    form.classList.add('task-form');
    form.action = 'submit';

    this.input = document.createElement('input');
    this.input.classList.add('task-name', 'input-primary');
    this.input.type = 'text';
    this.input.name = 'task-name';
    this.input.id = 'task-name';
    this.input.placeholder = 'название задачи';

    this.btnImportant = document.createElement('button');
    this.btnImportant.classList.add('button', 'button-importance', 'default');
    this.btnImportant.type = 'button';
    this.btnImportant.ariaLabel = 'Указать важность';

    this.btnAdd = document.createElement('button');
    this.btnAdd.classList.add('button', 'button-primary', 'task-form__add-button');
    this.btnAdd.type = 'submit';
    this.btnAdd.textContent = 'Добавить';

    form.append(this.input, this.btnImportant, this.btnAdd);

    return form;
  }

  createPomodoroTasks() {
    const pomodoroTasksWrapper = document.createElement('div');
    pomodoroTasksWrapper.classList.add('pomodoro-tasks');

    pomodoroTasksWrapper.insertAdjacentHTML('beforeend', `
    <p class="pomodoro-tasks__header-title">
      Инструкция:
    </p>
    <ul class="pomodoro-tasks__quest-list">
      <li class="pomodoro-tasks__list-item">
        Напишите название задачи чтобы её добавить
      </li>
      <li class="pomodoro-tasks__list-item">
        Чтобы задачу активировать, выберите её из списка
      </li>
      <li class="pomodoro-tasks__list-item">
        Запустите таймер
      </li>
      <li class="pomodoro-tasks__list-item">
        Работайте пока таймер не прозвонит
      </li>
      <li class="pomodoro-tasks__list-item">
        Сделайте короткий перерыв (5 минут)
      </li>
      <li class="pomodoro-tasks__list-item">
        Продолжайте работать, пока задача не будет выполнена.
      </li>
      <li class="pomodoro-tasks__list-item">
        Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).
      </li>
    </ul>
    `);

    const pomodoroTasksList = document.createElement('ul');
    pomodoroTasksList.classList.add('pomodoro-tasks__quest-tasks');

    const tasksItems = this.tomato.tasks.map((task, i) => {
      return this.createItemTask(task, i + 1);
    });

    pomodoroTasksList.append(...tasksItems);

    const pomodoroTasksDeadlineTimer = document.createElement('p');
    pomodoroTasksDeadlineTimer.classList.add('pomodoro-tasks__deadline-timer');
    pomodoroTasksDeadlineTimer.textContent = '1 час 30 мин';

    pomodoroTasksWrapper.append(pomodoroTasksList, pomodoroTasksDeadlineTimer);

    return pomodoroTasksWrapper;
  }

  createItemTask(task, i) {
    const active = this.tomato.activeTask === task ? 'pomodoro-tasks__task-text_active' : '';
    const li = document.createElement('li');
    li.classList.add('pomodoro-tasks__list-task', task.importance)
    li.dataset.id = task.id;
    li.insertAdjacentHTML('beforeend', `
    <span class="count-number">${i}</span>
    <button class="pomodoro-tasks__task-text ${active}">
      ${task.text}
    </button>
    <button class="pomodoro-tasks__task-button"></button>
    <!-- popup menu -->
    <div class="burger-popup">
      <button class="popup-button burger-popup__edit-button">Редактировать</button>
      <button class="popup-button burger-popup__delete-button">Удалить</button>
    </div>
    `);

    return li;
  }

  createModalOverlay() {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    modalOverlay.insertAdjacentHTML('afterbegin', `
    <div class="modal-delete">
      <p class="modal-delete__title">Удалить задачу?</p>
      <button class="modal-delete__close-button"></button>
      <button class="modal-delete__delete-button button-primary">Удалить</button>
      <button class="modal-delete__cancel-button">Отмена</button>
    </div>
    `);

    return modalOverlay;
  }

  bindListeners() {
    this.startBtn.addEventListener('click', () => {
      console.log('Старт');
    });

    this.stopBtn.addEventListener('click', () => {
      console.log('Стоп');
    });

    const imp = ['default', 'important', 'so-so']
    let count = 0;

    this.btnImportant.addEventListener('click', ({target}) => {
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

    this.btnAdd.addEventListener('click', e => {
      e.preventDefault();
      this.controller.handleAddTask(this.btnImportant, this.input)
    });
  }

  render() {
    this.header = this.createHeader();
    this.main = this.createMain();
    this.modalOverlay = this.createModalOverlay();

    this.root.innerHTML = '';
    this.root.append(this.header);
    this.root.append(this.main);
    this.root.append(this.modalOverlay);
    this.bindListeners();
  }
}
