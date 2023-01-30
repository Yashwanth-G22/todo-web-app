import cloudServer from "./cloud-server.js";

import localServer from "./localStorage-server.js";
//console.log(cloudServer().deleteAll())

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.taskList');
let flag = true
function todoView() {
    return {
        createLi: function (elem, index) {
            const li = document.createElement('li')
            li.classList = 'li-List';
            const span = document.createElement('span')
            span.innerText = elem
            li.appendChild(span)
            const editBtn = document.createElement('button')
            editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            editBtn.addEventListener('click', () => {
                const update = document.createElement('input')
                update.classList = 'secondInput'
                update.type = 'text';
                update.placeholder = elem;
                if (flag) {
                    flag = false
                    span.innerHTML = ''
                    span.appendChild(update)
                    console.log('1st click')
                    editBtn.innerHTML = `<i class="fa fa-check"></i>`
                } else {
                    flag = true;
                    let updateValue = document.querySelector('.secondInput').value
                    console.log(updateValue)
                    let result = cloudServer().put(index, updateValue)
                    console.log(result)
                    span.innerHTML = updateValue
                    updateValue = ''
                    editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
                }
            })
            li.appendChild(editBtn)
            const btn = document.createElement('button')
            btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            btn.addEventListener('click', this.singleTaskDelete.bind(this,index,li))
            li.appendChild(btn)
            return ul.appendChild(li)
        },
        createTask: async function () {

            const value = input.value
            if (value) {
                input.value = '';
                console.log(value)
                let result = await cloudServer().post(value)
                if (result.id && result.name) {
                    console.log('created')
                    this.createLi(result.name, result.id)
                }
            } else {
                alert('Enter task name')
            }
        },
        createAllTasks: async function () {
            let list = await cloudServer().get()
            console.log(list)
            list.map(({ name, id }) => {
                this.createLi(name, id)
            })
        },
        singleTaskDelete : function (index,li){
                console.log('deleted')
                cloudServer().delete(index)   
                ul.removeChild(li)         
        }
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    todoView().createTask()
})

todoView().createAllTasks()

document.querySelector('.clearAllBtn').addEventListener('click', ()=>{
    console.log("All Deleted Msg")
    cloudServer().deleteAll()
})

//console.log(localServer().delete(0))