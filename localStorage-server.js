function localServer() {
    return {
        get: function get() {
            const todoList = (localStorage.getItem('todos'))? JSON.parse(localStorage.getItem('todos')) : []
            return todoList;
        },
        set: function set() {

        },

        delete: function delet() {

        },
        deleteAll: function deleteAll() {

        },
    }
}