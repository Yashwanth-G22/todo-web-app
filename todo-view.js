import cloudServer from "./cloud-server.js";

import localServer from "./localStorage-server.js";

let storage = document.querySelector(".storage")
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.taskList');
let flag = true
function todoView() {
    return {

        createLi: function (elem, index,value) {
            const li = document.createElement('li')
            li.classList = 'li-List';
            const input = document.createElement('input')
            const span = document.createElement('span')
            input.type = 'checkbox';
            input.classList = 'checkBox';
            if(value){ input.checked = true , span.style.textDecoration = 'line-through'}
            input.addEventListener('click',this.checked.bind(this,input,span,elem , index))
            li.appendChild(input)
            span.innerText = elem
            li.appendChild(span)
            let editBtn = document.createElement('button')
            editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            editBtn.addEventListener('click', this.updateOfLi.bind(this, span, index, elem, editBtn , input))
            li.appendChild(editBtn)
            const btn = document.createElement('button')
            btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            btn.addEventListener('click', this.singleTaskDelete.bind(this, index, li))
            li.appendChild(btn)
            return ul.appendChild(li)
        },

        createTask: async function () {
            const value = input.value
            if (value) {
                input.value = '';
                let result =(storage.value == "cloudStorage")? await cloudServer().post(value): localServer().set(value);
                if (result.id && result.name) {
                    this.createLi(result.name, result.id , result.isCompleted)
                }
                else{
                    this.createLi(value,result.length)
                }
            } else {
                alert('Enter task name')
            }
        },

        createAllTasks: async function () {
            if(storage.value == "cloudStorage"){
            let list = await cloudServer().get()
            list.map(({ name, id , isCompleted}) => {
                this.createLi(name, id , isCompleted)
            })
            }else{
                let todo = localServer().get()
                todo.forEach((elem , index)=>{
                    this.createLi(elem , index)
                })
            }
        },

        singleTaskDelete: function (index, li) {
            if(storage.value == "cloudStorage") cloudServer().delete(index)
            else localServer().delete(index)
            ul.removeChild(li)
        },

        updateOfLi: function (span, index, elem , editBtn) {
            const update = document.createElement('input')
            update.classList = 'secondInput'
            update.type = 'text';
            update.placeholder = elem;
            console.log(input.checked)
            if (flag) {
                flag = false
                span.innerHTML = ''
                span.appendChild(update)
                editBtn.innerHTML = `<i class="fa fa-check"></i>`
            } else {
                flag = true;
                let updateValue = document.querySelector('.secondInput').value
                if(input.checked !== false){
                (storage.value == "cloudStorage")?cloudServer().put(index, updateValue, true) : localServer().edit(index,updateValue);
                span.style.textDecoration = 'line-through';
                }else{
                    (storage.value == "cloudStorage")?cloudServer().put(index, updateValue, false) : localServer().edit(index,updateValue);
                }
                span.innerHTML = updateValue
                updateValue = ''
                editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            }          
        },
        checked : function(input , span , elem , index){
            console.log('click')
            if(input.checked){
                span.style.textDecoration = "line-through";
                cloudServer().put(index, elem , true)
            }
        },
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    todoView().createTask()
})

storage.addEventListener('change',()=>{
    alert(`U are changing the storage .=> you data will store only in ${storage.value}`)
    ul.innerHTML = ''
    todoView().createAllTasks()
})

todoView().createAllTasks()



document.querySelector('.clearAllBtn').addEventListener('click', () => {
    cloudServer().deleteAll()
})

//console.log(localServer().delete(0))