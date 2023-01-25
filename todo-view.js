import cloudServer from "./cloud-server.js";

//console.log(cloudServer().deleteAll())

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.taskList');

function todoView() {
    return {
        createLi: function (elem,index) {
            const li = document.createElement('li')
            li.classList = 'li-List';
            const span = document.createElement('span')
            span.innerText = elem
            li.appendChild(span)
            const editBtn = document.createElement('button')
            editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            li.appendChild(editBtn)
            const btn = document.createElement('button')
            btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            btn.addEventListener('click',cloudServer().delete.bind(this,index))
            li.appendChild(btn)
            return ul.appendChild(li)
        },
        createTask : async function () {
            
            const value = input.value
            input.value = '';
            console.log(value)
            let result = await cloudServer().post(value)
            console.log(result.status)

            if(result.id && result.name){
                this.createLi(result.name,result.id)
            }
        }
    }
}

btn.addEventListener('click', (e)=>{
    e.preventDefault()
    todoView().createTask()
})
