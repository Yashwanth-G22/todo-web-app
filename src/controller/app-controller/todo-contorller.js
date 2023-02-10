
import todoView from "../../view/todo-view.js";

import cloudServer from "../controller/storage-controller/cloud-server.js";

import localServer from "../storage-controller/localStorage-server.js";


let storage = document.querySelector(".storage")
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');


export default function control(){

    return{
        createAllTasks: async function () {
            if (storage.value === "cloudStorage") {
                let list = await cloudServer().get()
                list.map(({ name, id, isCompleted }) => {
                    todoView().createListElement(name, id, isCompleted)
                })
            } else {
                let todo = localServer().get()
                todo.forEach((elem, index) => {
                    todoView().createListElement(elem, index)
                })
            }
        },
    
        singleTaskDelete: function (index, li) {
            if (storage.value === "cloudStorage") cloudServer().delete(index)
            else localServer().delete(index)
            ul.removeChild(li)
        },
    
        updateOfLi: function (span, index, elem, editBtn) {
            const update = document.createElement('input')
            update.classList = 'secondInput'
            update.type = 'text';
            update.placeholder = elem;
            if (flag) {
                flag = false
                span.innerHTML = ''
                span.appendChild(update)
                editBtn.innerHTML = `<i class="fa fa-check"></i>`
            } else {
                flag = true;
                let updateValue = document.querySelector('.secondInput').value
                if (input.checked !== false) {
                    (storage.value === "cloudStorage") ? cloudServer().put(index, updateValue, true) : localServer().edit(index, updateValue);
                    span.style.textDecoration = 'line-through';
                } else {
                    (storage.value === "cloudStorage") ? cloudServer().put(index, updateValue, false) : localServer().edit(index, updateValue);
                }
                span.innerHTML = updateValue
                updateValue = ''
                editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            }
        },
    
        checked: function (input, span, elem, index) {
            if (input.checked) {
                span.style.textDecoration = "line-through";
                cloudServer().put(index, elem, true)
            }
        },
    
    
        createTask: async function () {
            const value = input.value
            if (value) {
                input.value = '';
                let result = (storage.value === "cloudStorage") ? await cloudServer().post(value) : localServer().set(value);
                if (result.id && result.name) {
                    ttodoView().createListElement(result.name, result.id, result.isCompleted)
                }
                else {
                    todoView().createListElement(value, result.length)
                }
            } else {
                alert('Enter task name')
            }
        },
    }
    
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    todoView().createTask()
})

storage.addEventListener('change', () => {
    alert(`U are changing the storage .=> you data will store only in ${storage.value}`)
    ul.innerHTML = ''
    todoView().createAllTasks()
})

todoView().createAllTasks()



document.querySelector('.clearAllBtn').addEventListener('click', () => {
    cloudServer().deleteAll()
})
