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
        },
        post : function(){
            
        },
        put : function(){

        },
        delete : function(){

        },
    }

}
cloudServer().set()