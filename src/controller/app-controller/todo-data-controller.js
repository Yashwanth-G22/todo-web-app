
export function dataContorller(){

    return{
        createAllTasks: async function () {
            if (storage.value === "cloudStorage") {
                let list = await cloudServer().get()
                list.map(({ name, id, isCompleted }) => {
                    this.createListElement(name, id, isCompleted)
                })
            } else {
                let todo = localServer().get()
                todo.forEach((elem, index) => {
                    this.createListElement(elem, index)
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
                    this.createListElement(result.name, result.id, result.isCompleted)
                }
                else {
                    this.createListElement(value, result.length)
                }
            } else {
                alert('Enter task name')
            }
        },
    }
}