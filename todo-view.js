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
            editBtn.addEventListener('click',()=>{
                const update = document.createElement('input')
                update.type = 'text';
                span.innerHTML = ''
                span.appendChild(update)
                const save = document.createElement('button')
                save.innerText = `save`
                save.classList = 'saveUpdate'
                save.addEventListener('click',()=>{
                    console.log('save btn clicked')
                })
                editBtn.appendChild(save)

            })
            li.appendChild(editBtn)
            const btn = document.createElement('button')
            btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            btn.addEventListener('click',()=>{
                console.log('deleted')
                cloudServer().delete(index)
            })
            li.appendChild(btn)
            return ul.appendChild(li)
        },
        createTask : async function () {
            
            const value = input.value
            if(value){
            input.value = '';
            console.log(value)
            let result = await cloudServer().post(value)
            console.log(result.status)

            if(result.id && result.name){
                console.log('created')
                this.createLi(result.name,result.id)
            }
        }else{
                alert('Enter task name')
            }
        }
    }
}

btn.addEventListener('click', (e)=>{
    e.preventDefault()
    todoView().createTask()
})
