import cloudServer from "../storage-controller/cloud-server.js"

import localServer from "../storage-controller/localStorage-server.js";

import todoView from "../../view/todo-view.js";

import { eventManager } from "./event-manager.js";

let storage = document.querySelector(".storage")
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.taskList');



function selectStorage() {
    if (storage.value === "localStorage") {
        return localServer
    } else {
        return cloudServer
    }
}



function control() {
    let setStorage = selectStorage()
    return {
        createAllTasks: async function () {
            if (storage.value === "cloudStorage") {
                let list = await cloudServer().getAllItems()
                list.map(({ name, id, isCompleted }) => {
                    this.instance(name, id, isCompleted)
                })
                
            } else {
                let todo = localServer().getAllItems()
                todo.forEach((elem, index) => {
                    this.instance(elem, index)
                })
                
            }
        },



        createSingleTask: async function () {
            const value = input.value
            if (value) {
                input.value = '';
                let result =await setStorage().postSingleItem(value) 
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

        instance: function (...options) {
            return todoView(eventManager).createListElement(...options)
        },

    }

}




btn.addEventListener('click', (e) => {
    e.preventDefault()
    control().createSingleTask()
})

storage.addEventListener('change', () => {
    alert(`U are changing the storage .=> you data will store only in ${storage.value}`)
    ul.innerHTML = ''
    control().createAllTasks()
    
})


control().createAllTasks()

document.querySelector('.clearAllBtn').addEventListener('click', () => {
    let setStorage = selectStorage()
    setStorage().deleteAllItems()
})


