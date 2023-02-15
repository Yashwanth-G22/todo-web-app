import cloudServer from "../storage-controller/cloud-server.js"

import localServer from "../storage-controller/localStorage-server.js";

export function eventManager () {    
const ul = document.querySelector('.taskList');
let storage = document.querySelector(".storage")
const input = document.querySelector('.input');
let flag = true

    return {
        singleTaskDelete: function (index, li) {
            if (storage.value === "cloudStorage") cloudServer().delete(index)
            else localServer().delete(0)
            ul.removeChild(li)
        },

        updateOfList: function (span, index, elem, editBtn) {
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
                    (storage.value === "cloudStorage") ? cloudServer().put(index, updateValue, true) : localServer().put(index, updateValue);
                    span.style.textDecoration = 'line-through';
                } else {
                    (storage.value === "cloudStorage") ? cloudServer().put(index, updateValue, false) : localServer().put(index, updateValue);
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
}