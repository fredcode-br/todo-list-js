'use strict';

const getBase = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBase = (base) => localStorage.setItem ('todoList', JSON.stringify(base));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-indice=${index}>
    `
    document.getElementById('todoList').appendChild(item);
}

const refreshScreen = () => {
    clearTasks();
    const base = getBase();
    base.forEach ((item, index) => createItem (item.tarefa, item.status, index));
}

const clearTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
        }
}

const insertTask = (event) => {
    const key = event.key;
    const text = event.target.value;
    if ( key == 'Enter'){
        const base = getBase();
        base.push({'tarefa': text, 'status': ''});
        setBase(base);
        refreshScreen();
        event.target.value = '';
    }
}

const deleteItem = (indice) => {
    const base = getBase();
    base.splice (indice, 1);
    setBase(base);
    refreshScreen();
}

const updateItem = (indice) => {
    const base = getBase();
    base[indice].status = base[indice].status == '' ? 'checked' : '';
    setBase(base);
    refreshScreen();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type == 'button') {
        const indice = elemento.dataset.indice;
        deleteItem (indice);
    }else if (elemento.type == 'checkbox') {
        const indice = elemento.dataset.indice;
        updateItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertTask);
document.getElementById('todoList').addEventListener('click', clickItem);

refreshScreen();
