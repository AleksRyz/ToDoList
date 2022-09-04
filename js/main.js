const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//добавление задачи
form.addEventListener('submit', addTask);

function addTask(event) {
   //отменяем отправку формы
   event.preventDefault();

   // достать текст из input
   const taskText = taskInput.value;

   // задача
   const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
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
   taskList.insertAdjacentHTML('beforeend', taskHTML);

   // очистить поле ввода и вернуть на него фокус
   taskInput.value = '';
   taskInput.focus();

   if (taskList.children.length > 1) {
      emptyList.classList.add('none');
   }
}




// удаление задачи
taskList.addEventListener('click', deleteTask);

function deleteTask(event) {

   if (event.target.dataset.action !== 'delete') return;

   const parentNode = event.target.closest('.list-group-item');
   parentNode.remove();

   if (taskList.children.length == 1) {
      emptyList.classList.remove('none');
   }

}

// отмечаем задачу завершенной
taskList.addEventListener('click', doneTask);

function doneTask(event) {
   if (event.target.dataset.action !== 'done') return;

   const parentNode = event.target.closest('.list-group-item');
   const taskTitle = parentNode.querySelector('.task-title');
   taskTitle.classList.toggle('task-title--done');

}

// перемещаем задачу вверх
taskList.addEventListener('click', topTask);

function topTask(event) {
   if (event.target.dataset.action !== 'top') return;
   const parentNode = event.target.closest('.list-group-item');  // задача
   parentNode.previousElementSibling.before(parentNode);
}

// перемещаем задачу вниз
taskList.addEventListener('click', bottomTask);

function bottomTask(event) {
   if (event.target.dataset.action !== 'bottom') return;
   const parentNode = event.target.closest('.list-group-item');  // задача
   parentNode.nextElementSibling.after(parentNode);
}











