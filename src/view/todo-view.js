


export default function todoView(eventManager) {
    const ul = document.querySelector('.taskList');
       
    const { checked , updateOfList , singleTaskDelete } =  eventManager()
    
    return {

        createListElement: function ( elem , index , value) {
            const li = createNode('li')
            li.classList = 'li-List';
            const span = createNode('span', elem)
            appendNode(li, updateInput(span , elem , index , value , checked))
            appendNode(li, span)
            appendNode(li, editButton(span, index, elem , updateOfList))
            appendNode(li, deleteButton(singleTaskDelete , index , li))
            console.log(index)
            return appendNode(ul, li)
        },
    }
}

function createNode(elementName, elementValue = '') {
    let taskNode = document.createElement(elementName)
    taskNode.innerHTML = elementValue;
    return taskNode;
}

 function appendNode(parentNode, childNode) {
    return parentNode.appendChild(childNode)
}

function updateInput(span , elem , index , value , checked){
    const input = createNode('input')
    input.type = 'checkbox';
    input.classList = 'checkBox';
    if (value) { input.checked = true, span.style.textDecoration = 'line-through' }
    input.addEventListener('click',checked.bind(this, input, span, elem, index))

    return input;
}

function editButton(span, index, elem , updateOfList){
    let editBtn = createNode('button', `<i class="fas fa-pencil"></i>`)
    editBtn.addEventListener('click', updateOfList.bind(this, span, index, elem, editBtn))

    return editBtn
}

function deleteButton(singleTaskDelete , index , li){
    const button = createNode('button', `<i class="fa-solid fa-xmark"></i>`)
    button.addEventListener('click', singleTaskDelete.bind(this, index, li))
    
    return button
}










