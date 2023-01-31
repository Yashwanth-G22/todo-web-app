function localServer() {
    return {
        get: function get() {
            const todoList = (localStorage.getItem('todos'))? JSON.parse(localStorage.getItem('todos')) : []
            return todoList;
        },
        set: function set(todo) {
            let set_Todo = this.get()
            set_Todo.push(todo)
            localStorage.setItem('todos',JSON.stringify(set_Todo))
            return set_Todo;
        },
        edit: function edit(index,elem){
            let edit_Todo = this.get()
            edit_Todo.splice(index , 1,elem)
            localStorage.setItem('todos',JSON.stringify(edit_Todo))
        },

        delete: function delet(index) {
            let delete_Todo = this.get()
            delete_Todo.splice(index , 1)
            localStorage.setItem('todos',JSON.stringify(delete_Todo))
        },
        deleteAll: function deleteAll() {
            let deleteAll_Todo = this.get()
            deleteAll_Todo = []
            localStorage.setItem('todos',JSON.stringify(deleteAll_Todo))
        },
    }
}
export default localServer