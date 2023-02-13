 
 
 function cloudServer() {
    const apiURL = `https://mk-ap-todo-webapi.azurewebsites.net/api/YeswanthTodoItems`;

    return {
        get: async function () {
            const response = await fetch(apiURL, { method: 'GET' })
            return response.json()
        },
        set: async function (url, options) {
            const header = new Headers
            header.append('content-type', 'application/json');
            return fetch(url, {
                ...options,
                headers: header,
            })
        },
        post: async function (name) {
            const response = await this.set(apiURL, {
                method: 'POST',
                body: JSON.stringify({
                    name: name
                })
            })
            return response.json();
        },
        put: async function (id, name , value) {
            await this.set(`${apiURL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "id": id,
                    "name": name,
                    "isCompleted": value
                })
            })
        },
        delete: function (id) {
            this.set(`${apiURL}/${id}`, {
                method: 'DELETE',
            })
        },
        deleteAll: function () {
            this.set(`https://mk-ap-todo-webapi.azurewebsites.net/deleteAll`, {
                method: 'DELETE'
            })
        }
    }

}


export default cloudServer