(() => {
    const ul = document.querySelector('.taskList')
    const clearAllBtn = document.querySelector('.clearAllBtn')
    const input = document.querySelector('.input')
    let clearAll = true;
    const apiURL = `https://mk-ap-todo-webapi.azurewebsites.net/api/YeswanthTodoItems`
    let Todo = ''
    let value = 0
    let listId = []

    document.querySelector('.btn').addEventListener('click', setTaskList)

    function setTaskList(e) {
        e.preventDefault()
        if (input.value) {
            Todo = input.value
            input.value = '';
            const Data = JSON.stringify({  "name": Todo })
            console.log(Todo)
            sendHttpRequest(apiURL, "POST", Data)
            createTodo()
        } else {
            alert(`Enter any Task Name`)
        }
    }

    async function createTodo() {
        const response = await fetch(apiURL, { method: "GET" })
        list = await response.json()
        console.log(list)
        if (value) {
            return createLi(Todo)
        }else {
            ul.innerHTML = ''
            value = 1
            list.map(({ name, id }) => {
                return createLi(name, id)
            })
        }
    }


    console.log(listId)

    function createLi(elem, index) {
        const li = document.createElement('li');
        li.classList = 'li-List'
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.addEventListener('click', checkBox.bind(this, elem, index))
        li.appendChild(input)
        const span = document.createElement('span')
        span.innerHTML = elem;
        li.appendChild(span)
        const edit = document.createElement('span')
        edit.innerHTML = `<i class="fas fa-pencil"></i>`
        edit.addEventListener('click',()=>{
            const update = document.createElement('input')
            const save = document.createElement('button')

        })
        li.appendChild(edit)
        const btn = document.createElement('button')
        btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        btn.addEventListener('click', deleteTask.bind(this, index))
        li.appendChild(btn)
        ul.appendChild(li)
        clearAllTasks()
    }

    function checkBox(Todo, index) {
        console.log(this)
        const Data = JSON.stringify({ "id": index, "name": Todo, "isCompleted": true })
        sendHttpRequest(`${apiURL}/${index}`, "PUT", Data)

    }

    function deleteTask(index) {
        sendHttpRequest(`${apiURL}/${index}`, 'DELETE')
        value = 0
        ul.innerHTML = ''
        createTodo()
        
    }

    function sendHttpRequest(url, Method, Data) {
        fetch(url,
            {
                method: Method,
                headers: {
                    'content-type': 'application/json'
                },
                body: Data
            }
        )
    }

    function clearAllTasks() {
        localStorage.setItem('clearAl', JSON.stringify(clearAll))
        if (JSON.parse(localStorage.getItem('clearAl')) === true) {
            const btnClearAll = document.createElement('button');
            btnClearAll.innerHTML = 'ClearAll'
            btnClearAll.classList.add('deleteAll')
            btnClearAll.addEventListener('click', () => {
                sendHttpRequest(`https://mk-ap-todo-webapi.azurewebsites.net/deleteAll`,'DELETE')

            })
            clearAllBtn.appendChild(btnClearAll)
            clearAll = false;
        }
    }

    function reloadTodos() {
        createTodo()
    }
    window.onload = reloadTodos()

    // const editId = document.querySelector('.editId')
    // const editInput = document.querySelector('.editInput')
    // document.querySelector('.editBtn').addEventListener('click', editTask)

    function editTask(index,editInput) {
        
        const Data = JSON.stringify({ "id": index, "name": editInput.value })
        sendHttpRequest(`${apiURL}/${index}`, 'PUT', Data)
        editInput.value = ''
    }

    const getId = document.querySelector('.getId')
    document.querySelector('.getItem').addEventListener('click', getTask)

    function getTask() {
        const index = getId.value
        fetch(`${apiURL}/${index}`, { method: "GET" })
            .then(res => res.json()).then(data => {
                const { name, id } = data
                ul.innerHTML = ''
                return createLi(name, id)
            })
    }
}
)()



//  https://stackblitz.com/edit/js-r5a6x7?file=style.css,index.js,index.html

//  https://codesandbox.io/s/exciting-cookies-6ou8r7?file=/index.html