function localServer() {
    return {
        get: function get() {
            const todoList = (localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []
            return todoList;
        },
        set: function set(todo) {
            let set_Todo = this.get()
            set_Todo.push(todo)
            sendTodo(set_Todo)
            return set_Todo;
        },
        edit: function edit(index, elem) {
            let edit_Todo = this.get()
            edit_Todo.splice(index, 1, elem)
            sendTodo(edit_Todo)
        },

        delete: function delet(index) {
            let delete_Todo = this.get()
            delete_Todo.splice(index, 1)
            sendTodo(delete_Todo)
        },
        deleteAll: function deleteAll() {
            let deleteAll_Todo = this.get()
            deleteAll_Todo = []
            sendTodo(deleteAll_Todo)
        },
    }
}
        function sendTodo(todo) {
            localStorage.setItem('todos', JSON.stringify(todo))
        }
        
export default localServer

