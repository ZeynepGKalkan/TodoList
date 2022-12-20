const divTodos = document.getElementById("todos");
const frmTodo = document.getElementById("frmTodo");
const txtTitle = document.getElementById("title");
let todos = [];
// let todos = [
//     { title: "Haircut", done: false },
//     { title: "Do laundry", done: false },
//     { title: "Do your homework", done: true },
//     { title: "Eat, Pray, Love", done: true }

// ];
function listTodos() {
    todos.sort((a, b) => a.done - b.done);
    saveData();

    divTodos.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        let div = document.createElement("div");
        let input = document.createElement("input");
        let spa = document.createElement("span");
        let butDelete = document.createElement("button");
        let butEdit = document.createElement("button");
        input.type = "checkbox";
        input.checked = todo.done;
        // inp.className="me-2";
        input.onchange = function () {
            todo.done = inp.checked;
            listTodos();

        };
        spa.textContent = todo.title;
        spa.className = "me-auto";

        butDelete.innerHTML = '<i class="fa-solid fa-remove"></i>';
        butDelete.className = "me-2 btn btn-danger"
        butDelete.onclick = function () {
            todos.splice(i, 1);
            listTodos();
        };
        butEdit.innerHTML = '<i class="fa-solid fa-edit"></i>';
        butEdit.className = "btn btn-warning";
        butEdit.onclick = function () {
            let newTitle = prompt(todo.title);
            if (newTitle) {
                todo.title = newTitle;
                listTodos();
            }

        };
        div.className = "p-2 bg-light my-3 d-flex align-items-center"
        div.append(input, spa, butDelete, butEdit);
        divTodos.append(div);
    }
}
function saveData() {
    let json = JSON.stringify(todos);
    localStorage["data"] = json;

}

function loadData() {
    let json = localStorage["data"]
    if (json) {
        todos = JSON.parse(json);
    }
    else {
        let todos = [
            { title: "Haircut", done: false },
            { title: "Do laundry", done: false },
            { title: "Do your homework", done: true },
            { title: "Eat, Pray, Love", done: true }

        ];

    }
}

frmTodo.onsubmit = function (event) {
    event.preventDefault();
    let title = txtTitle.value.trim();
    let todo = { title: title, done: false };
    todos.push(todo);
    listTodos();
    txtTitle.value = "";
};
loadData();
listTodos();

