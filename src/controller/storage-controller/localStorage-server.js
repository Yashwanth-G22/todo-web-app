function localServer() {
    return {
        getAllItems: function get() {
            const todoList = (localStorage.getItem('todos'))? JSON.parse(localStorage.getItem('todos')) : []
            return todoList;
        },
        postSingleItem: function set(todo) {
            let set_Todo = this.getAllItems()
            set_Todo.push(todo)
            localStorage.setItem('todos',JSON.stringify(set_Todo))
            return set_Todo;
        },
        putSingleItem: function edit(index,elem){
            let edit_Todo = this.getAllItems()
            edit_Todo.splice(index , 1,elem)
            localStorage.setItem('todos',JSON.stringify(edit_Todo))
        },

        deleteSingleItem: function delet(index) {
            let delete_Todo = this.getAllItems()
            delete_Todo.splice(index , 1)
            localStorage.setItem('todos',JSON.stringify(delete_Todo))
        },
        deleteAllItems: function deleteAll() {
            let deleteAll_Todo = this.getAllItems()
            deleteAll_Todo = []
            localStorage.setItem('todos',JSON.stringify(deleteAll_Todo))
        },
    }
}
export default localServer