const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// создадим массив , который будет содержать все задачи

let tasks = [];
if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   // отобразить на странице tasks
   tasks.forEach(task => renderTask(task));
}




checkEmptyList();

//добавление задачи
form.addEventListener('submit', addTask);

function addTask(event) {
   //отменяем отправку формы
   event.preventDefault();


   // достать текст из input
   const taskText = taskInput.value;

   // описываем задачу в виде обьекта
   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
   }
   // добавим задачу(обьект) в массив с задачами
   tasks.push(newTask);
   saveToLocalStorage();

   renderTask(newTask);

   // очистить поле ввода и вернуть на него фокус
   taskInput.value = '';
   taskInput.focus();
   checkEmptyList();
}

// удаление задачи
tasksList.addEventListener('click', deleteTask);

function deleteTask(event) {

   if (event.target.dataset.action !== 'delete') return;

   const parentNode = event.target.closest('.list-group-item');

   const id = parentNode.id;
   // находим индекс задачи в массиве по id
   const index = tasks.findIndex(function (task) {
      if (task.id == id) return true;
   });
   // удаляем задачу из массива с задачами  

   tasks.splice(index, 1);
   saveToLocalStorage();


   parentNode.remove();
   checkEmptyList();
}

// отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

function doneTask(event) {
   if (event.target.dataset.action !== 'done') return;

   const parentNode = event.target.closest('.list-group-item');

   // определяем id задачи 
   const id = parentNode.id;
   const task = tasks.find(task => task.id == id);
   //отмечаем в массиве выполненной
   task.done = !task.done;
   saveToLocalStorage();

   const taskTitle = parentNode.querySelector('.task-item__title');
   taskTitle.classList.toggle('--done');

}


// перемещаем задачу вверх
tasksList.addEventListener('click', topTask);

function topTask(event) {
   if (event.target.dataset.action !== 'top') return;
   const parentNode = event.target.closest('.list-group-item');  // задача
   parentNode.previousElementSibling.before(parentNode);

   // находим id задачи
   const id = parentNode.id;
   // находим индекс задачи в массиве по id
   const index = tasks.findIndex(function (task) {
      if (task.id == id) return true;
   });

   swap(tasks, index, index - 1);

   function swap(arr, a, b) {
      arr[a] = arr.splice(b, 1, arr[a])[0];
   }

   saveToLocalStorage();
}

// перемещаем задачу вниз
tasksList.addEventListener('click', bottomTask);

function bottomTask(event) {
   if (event.target.dataset.action !== 'bottom') return;
   const parentNode = event.target.closest('.list-group-item');  // задача
   if (parentNode.nextElementSibling == null) return;

   parentNode.nextElementSibling.after(parentNode);


   // находим id задачи
   const id = parentNode.id;
   // находим индекс задачи в массиве по id
   const index = tasks.findIndex(function (task) {
      if (task.id == id) return true;
   });

   swap(tasks, index, index + 1);

   function swap(arr, a, b) {
      arr[a] = arr.splice(b, 1, arr[a])[0];
   }

   saveToLocalStorage();
}

// =============================================================================================================================



// показ и отображение блока список дел пуст

function checkEmptyList() {
   if (tasks.length == 0) {
      const emptyListHTML = `
      <li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Task list is empty</div>
      </li>
      `;
      tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
   }
   if (tasks.length > 0) {
      const emptyListEl = document.querySelector('#emptyList');
      emptyListEl ? emptyListEl.remove() : null;
   }
}

// запись в Local Storage

function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
   // формируем CSS класс
   const cssClass = task.done ? "task-item__title --done" : "task-item__title"

   // задача
   const taskHTML = `<li id="${task.id}" class="list-group-item task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                           <button type="button" data-action="done" class="btn-action">
                              <img src="./img/tick.svg" alt="Done" width="18" height="18">
                           </button>
                           <button type="button" data-action="delete" class="btn-action">
                              <img src="./img/cross.svg" alt="delete" width="18" height="18">
                           </button>
                           <button type="button" data-action="top" class="btn-action">
                           <img src="./img/arrow-top.svg" alt="top" width="18" height="18">
                           </button>
                           <button type="button" data-action="bottom" class="btn-action">
                           <img src="./img/arrow-bottom.svg" alt="bottom" width="18" height="18">
                        </div>
                     </li>`;

   // добавить задачу
   tasksList.insertAdjacentHTML('beforeend', taskHTML);
}