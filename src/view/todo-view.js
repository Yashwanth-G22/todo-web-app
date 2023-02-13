


export default function todoView(eventManager) {
    const ul = document.querySelector('.taskList');
       
    const { checked , updateOfLi , singleTaskDelete} =  eventManager

    return {

        createListElement: function (elem, index, value) {
            const li = this.createNode('li')
            li.classList = 'li-List';
            const input = this.createNode('input')
            const span = this.createNode('span', elem)
            input.type = 'checkbox';
            input.classList = 'checkBox';
            if (value) { input.checked = true, span.style.textDecoration = 'line-through' }
            input.addEventListener('click', checked.bind(this, input, span, elem, index))
            this.appendNode(li, input)
            this.appendNode(li, span)
            let editBtn = this.createNode('button', `<i class="fas fa-pencil"></i>`)
            editBtn.addEventListener('click', updateOfLi.bind(this, span, index, elem, editBtn, input))
            this.appendNode(li, editBtn)
            const btn = this.createNode('button', `<i class="fa-solid fa-xmark"></i>`)
            btn.addEventListener('click', singleTaskDelete.bind(this, index, li))
            this.appendNode(li, btn)
            return this.appendNode(ul, li)
        },

        createNode: function (elementName, elementValue = '') {
            let taskNode = document.createElement(elementName)
            taskNode.innerHTML = elementValue;
            return taskNode;
        },

        appendNode: function (parentNode, childNode) {
            return parentNode.appendChild(childNode)
        },
    }
}












