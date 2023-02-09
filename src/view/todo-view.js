const ul = document.querySelector('.taskList');
let flag = true
function todoView() {
    return {

        createListElement: function (elem, index, value) {
            const li = createNode('li')
            li.classList = 'li-List';
            const input = createNode('input')
            const span = createNode('span' , elem)
            input.type = 'checkbox';
            input.classList = 'checkBox';
            if (value) { input.checked = true, span.style.textDecoration = 'line-through' }
            //input.addEventListener('click', this.checked.bind(this, input, span, elem, index))
            appendNode(li , input)
            appendNode(li , span)          
            let editBtn = createNode('button' , `<i class="fas fa-pencil"></i>`)
            // editBtn.addEventListener('click', this.updateOfLi.bind(this, span, index, elem, editBtn, input))
            appendNode(li , editBtn) 
            const btn = createNode('button' , `<i class="fa-solid fa-xmark"></i>`)
            // btn.addEventListener('click', this.singleTaskDelete.bind(this, index, li))
            appendNode(li , btn)
            return appendNode(ul , li)
        },
    }
}

function createNode(elementName , elementValue = '') {
    let taskNode = document.createElement(elementName)
    taskNode.innerHTML = elementValue;
    return taskNode;
    
}

function appendNode( parentNode , childNode ) {
    return parentNode.appendChild(childNode)
}

export default todoView

let variable = todoView().createListElement('yashu', 0, true)
console.log(variable)
console.log(todoView().createListElement('yashu', 0, true))


