import  cloudServer  from "../storage-controller/cloud-server.js"

import localServer from "../storage-controller/localStorage-server.js";

import todoView from "../../view/todo-view.js";


let storage = document.querySelector(".storage")
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.taskList');



export default function control(){

    return{
        createAllTasks: async function () {
            if (storage.value === "cloudStorage") {
                let list = await cloudServer().get()
                list.map(({ name, id, isCompleted }) => {
                    this.instance(name, id, isCompleted)
                })
            } else {
                let todo = localServer().get()
                todo.forEach((elem, index) => {
                    this.instance(elem, index)
                })
            }
        },

        eventManager : function () {
            return {
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
            }
        },
    
        createSingleTask : async function () {
            const value = input.value
            if (value) {
                input.value = '';
                let result = (storage.value === "cloudStorage") ? await cloudServer().post(value) : localServer().set(value);
                if (result.id && result.name) {
                    this.instance(result.name, result.id, result.isCompleted)
                }
                else {
                    this.instance(value, result.length)
                }
            } else {
                alert('Enter task name')
            }
        },

        instance : function (...options) {
            
            return todoView(this.eventManager).createListElement(...options)
        }
    }
    
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    control().createSingleTask ()
})

storage.addEventListener('change', () => {
    alert(`U are changing the storage .=> you data will store only in ${storage.value}`)
    ul.innerHTML = ''
    control().createAllTasks()
})




document.querySelector('.clearAllBtn').addEventListener('click', () => {
    cloudServer().deleteAll()
})

