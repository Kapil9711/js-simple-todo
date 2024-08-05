const titleInput = document.querySelector(".titleInput");
const dateInput = document.querySelector(".dateInput");
const priorityInput = document.querySelector(".priorityInput");
const btn = document.querySelector(".btn");

let todos = JSON.parse(localStorage.getItem("todo")) || [];

btn.addEventListener("click", () => {
  const title = titleInput.value;
  const date = dateInput.value;
  const priority = priorityInput.value;
  const id = "id" + Math.random().toString(16).slice(2);
  const todo = { id, title, date, priority, isCompleted: false };
  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));
  displayTodo(todos);
});

const todoWrapper = document.querySelector("#todaysTasks");

const displayTodo = (todos) => {
  let content = "";
  console.log(todos);
  todoWrapper.innerHTML = "";
  todos?.forEach((todo, i) => {
    content += `<li id=${todo.id} > <span class='index'>${
      i + 1
    }</span> <span class='title'>${todo.title}</span>  <span>${
      todo.date
    }</span> <span>${todo.priority}</span>  <span > <input id=${
      todo.id
    } type='checkbox'  class='checkboxInput' ${
      todo.isCompleted && "checked"
    } /> <span id='isCompleted'> ${
      todo.isCompleted ? "completed" : "pending"
    }  </span>  </span>   <button class='delete'  id=${todo.id} >delete</button>
     
    <button ${todo.isCompleted && "disabled"}  class='update' id=${
      todo.id
    }>update</button>
    </li>`;
  });
  todoWrapper.innerHTML = content;
  console.log(todoWrapper);
};

const ul = document.getElementById("todaysTasks");

ul.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches("input")) {
    const checked = target.checked;
    const span = e.target.nextElementSibling;
    if (checked) span.innerText = "Completed";
    else span.innText = "Pending";
    todos = todos.map((todo) => {
      if (todo.id === e.target.id) todo.isCompleted = checked;
      return todo;
    });
    localStorage.setItem("todo", JSON.stringify(todos));
    displayTodo(todos);
  }

  //delete button code
  if (e.target.matches(".delete")) {
    e.target.parentElement.remove();
    todos = todos.filter((todo) => todo.id !== e.target.id);
    localStorage.setItem("todo", JSON.stringify(todos));
    displayTodo(todos);
  }

  if (e.target.matches(".update")) {
    const value = window.prompt("Update value");
    if (value.length) {
      const li = e.target.parentElement;
      const titleSpan = li.querySelector(".title");
      console.log(titleSpan, li);
      titleSpan.innerText = value;

      todos = todos.map((todo) => {
        if (todo.id === e.target.id) todo.title = value;
        return todo;
      });
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  }
});

displayTodo(todos);
