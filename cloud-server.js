function cloudServer(){
    const apiURL = `https://mk-ap-todo-webapi.azurewebsites.net/api/YeswanthTodoItems`;

    return{
        get : async function (){
            const response = await fetch(apiURL , {method : 'GET'})
            return response.json()
        },
        set : async function (url , options){
          const header = new Headers
          header.append('content-type','application/json');
          const response = await fetch(url , {
           ...options,
           headers : header,
          })
          return response.json()
        },
        post : function(name){
            this.set(apiURL,{
                method : 'POST',
                body : JSON.stringify({
                    "name" : name
                })
            })
        },
        put : function(id , name){
            this.set(`${apiURL}/${id}`,{
                method :'PUT',
                body : JSON.stringify({
                    "id" : id ,
                    "name" : name ,
                    "isCompleted" : true
                })
            })
        },
        delete : function(id){
            this.set(`${apiURL}/${id}`,{
                method : 'DELETE',
            })
        },
    }
    
}
cloudServer().delete(2)