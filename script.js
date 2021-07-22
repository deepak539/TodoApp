const inputField = document.getElementById('todo-input-container');

const todoList = document.getElementById('todo-list');

var todos = JSON.parse(localStorage.getItem('todos'));

const cssFile = document.querySelector('.theme-link');

const themeChanger = document.querySelector('.header-img');

const countTodo = document.getElementById('todos-counter');

const allTodos = document.getElementById('all');

const activeTodos = document.getElementById('active');

const completeTodos = document.getElementById('completed');

const clearCompleted = document.getElementById('clear');


if(todos){
  todos.forEach((todo) => {
    displayTodo(todo);
  });
}


inputField.addEventListener('keyup' , (event) => {
  if(event.keyCode === 13) {
    if(inputField.value !== '' && inputField.value !== ' '){
      const todo = {
        id: Math.floor(Math.random() * 10000),
        text: inputField.value,
        checked: false
      }
      addTodo(todo);
      inputField.value = ``;
  }
  else{
    alert('Empty value can not be added in todo list');
  }
}
});

function addTodo(todo){
  var arr = JSON.parse(localStorage.getItem('todos'));
  if(arr){
    arr.push(todo);
    localStorage.setItem('todos', JSON.stringify(arr));
  }
  else{
    var arr = [todo];
    localStorage.setItem('todos', JSON.stringify(arr));
  }
  todos = JSON.parse(localStorage.getItem('todos'));
  displayTodo(todo);
}

function displayTodo(todo){
  const listItem = document.createElement('li');
  listItem.classList.add('todo-list-item');
  listItem.innerHTML = `
    <div class="todo-list-item-info">
      <label for="checkbox-input-${todo.id}" class="todo-list-label">
        <input class="cb-input" type="checkbox" name="checkboxField" id="checkbox-input-${todo.id}">
        <div class="custom-checkbox"></div>
        <span class="todo-text">${todo.text}</span>
      </label>
    </div>
    <div class="cross-icon"></div>
    `

    todoList.appendChild(listItem);


    countTodo.innerHTML = `${todos.length} items left`;
    
    const cross = listItem.querySelector('.cross-icon'); 

    const cb = listItem.querySelector('.cb-input');

    const text = listItem.querySelector('.todo-text');

    cb.checked = todo.checked;

    if(cb.checked){
      text.classList.toggle('complete');
    }


    cross.addEventListener('click', () => {
      deleteTodo(todo, listItem);
    });

    cb.addEventListener('change', () => {
      updateLs(cb);
      text.classList.toggle('complete');
    })
}

function deleteTodo(todo, listItem){
  var todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((todoItem) => {
    if(todoItem.id !== todo.id){
      return true;
    }
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  removeTodo(listItem);
}

function removeTodo(todoItem){
  todos = JSON.parse(localStorage.getItem('todos'));
  todoList.removeChild(todoItem); 
  countTodo.innerHTML = `${todos.length} items left`;
}

function updateLs(checkboxInput){
  var todos = JSON.parse(localStorage.getItem('todos'));
  todos.map((todoItem) => {
    if(checkboxInput.id === "checkbox-input-"+todoItem.id){
      todoItem.checked = checkboxInput.checked;
    }
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
 
themeChanger.addEventListener('click', () => {
  if(cssFile.id === 'dark-file'){
    cssFile.setAttribute('id', 'light-file');
    cssFile.setAttribute('href', './css/light-theme.css');
  }
  else{
    cssFile.setAttribute('id', 'dark-file');
    cssFile.setAttribute('href', './css/dark-theme.css');
  }
});

allTodos.addEventListener('click', () => {
  allTodos.classList.toggle('active');
  activeTodos.classList.remove('active');
  completeTodos.classList.remove('active');
  todoList.innerHTML = ``;
  todos = JSON.parse(localStorage.getItem('todos'));
  todos.forEach((todo) => {
    displayTodo(todo);
  });
});

activeTodos.addEventListener('click', () => {
  activeTodos.classList.toggle('active');
  allTodos.classList.remove('active');
  completeTodos.classList.remove('active');
  todoList.innerHTML = ``;
  todos = JSON.parse(localStorage.getItem('todos'));
  todos.forEach((todo) => {
    if(todo.checked === false){
      displayTodo(todo);
    }
  });
});

completeTodos.addEventListener('click', () => {
  completeTodos.classList.toggle('active');
  allTodos.classList.remove('active');
  activeTodos.classList.remove('active');
  todoList.innerHTML = ``;
  todos = JSON.parse(localStorage.getItem('todos'));
  todos.forEach((todo) => {
    if(todo.checked){
      displayTodo(todo);
    }
  });
});

clearCompleted.addEventListener('click', () => {
  todos = JSON.parse(localStorage.getItem('todos'));
  const listItems = todoList.querySelectorAll('.todo-list-item');
  todos.forEach((todo) => {
    if(todo.checked){
      for(let i = 0; i < listItems.length; i++){
        if("checkbox-input-" + todo.id === listItems[i].querySelector('.cb-input').id){
          deleteTodo(todo, listItems[i]);
        }
      }
    }
  });
});

// function onDragStart(event) {
//   event
//     .dataTransfer
//     .setData('text/plain', event.target.id);

//     event
//     .currentTarget
//     .style
//     .backgroundColor = 'yellow';
// }

// function onDragOver(event) {
//   event.preventDefault();
// }

// function onDrop(event) {
//   const id = event
//     .dataTransfer
//     .getData('text');

//     const draggableElement = document.getElementById(id);
//     const dropzone = event.target;
//     dropzone.appendChild(draggableElement);

//     event
//     .dataTransfer
//     .clearData();
// }