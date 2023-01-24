function cloudServer(){
    const apiURL = `https://mk-ap-todo-webapi.azurewebsites.net/api/YeswanthTodoItems`;

    return{
        get : async function (){
            const response = await fetch(apiURL , {method : 'GET'})
            return response.json()
        },
        set : async function (){
          
        },
        put : function(){

        },
        delete : function(){

        },
    }

}
cloudServer().set()