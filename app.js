'use strict';

// JSON Database
let database = [
    {'task':'Organizar tarefas da semana.', 'status':''}
];

// Create Item
const createItem = (taskDescription, status, index) => {
    const item = document.createElement('label');
    item.classList.add("to-do-item");
    const html = `
    <input type="checkbox" class="to-do-item-checkbox" ${status} data-index=${index}> 
    <div class="to-do-item-description"> ${taskDescription} </div> 
    <input type="button" class="to-do-item-button" value="x" data-index=${index}>
    `;
    item.innerHTML = html;
    document.getElementById('to-do-list').appendChild(item);
}

// Clear tasks
const clearTasks = () => {
    const toDoList = document.getElementById('to-do-list');
    while (toDoList.firstChild){
        toDoList.removeChild(toDoList.lastChild);
    }
}

// Update Screen
const updateScreen = () => {
    clearTasks();
    database.forEach ( (item, index) => createItem (item.task, item.status, index));
}

// Insert Item
const insertItem = (event) => {
    const text = event.target.value; // takes the value of our event, being the input
    const key = event.key;
    if (key === 'Enter') {
        database.push ({'task': text, 'status':''});
        updateScreen();
        event.target.value = ''; // clears the input after enter
    }
}

// Deleted Item
const deletedItem = (index) => {
    database.splice(index, 1);
    updateScreen();
}

// Update Status Item
const updateItemStatus = (index) => {
    database[index].status = database[index].status === '' ? 'checked' : '';
    updateScreen();
}

// Click Item
const clickItem = (event) => {
    const element = event.target;
    const index = element.dataset.index;
    if (element.type === 'button'){
        deletedItem(index);
    } else {
        if (element.type === 'checkbox') {
            updateItemStatus(index);
        }
    }
}

document.getElementById('new-item').addEventListener('keypress', insertItem);
document.getElementById('to-do-list').addEventListener('click', clickItem);

updateScreen();