 function cloudServer(){
    const apiURL = `https://mk-ap-todo-webapi.azurewebsites.net/api/YeswanthTodoItems`;

    return{
        get : async function (){
            console.log('yash')
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
        post : async function(name){
          const result = await this.set(apiURL,{
                method : 'POST',
                body : JSON.stringify({
                    name : name
                })
            })
            return result;
        },
        put : function(id , name){
          const result =  this.set(`${apiURL}/${id}`,{
                method :'PUT',
                body : JSON.stringify({
                    "id" : id ,
                    "name" : name ,
                    "isCompleted" : true
                })
            })
            return result
        },
        delete : function(id){
            this.set(`${apiURL}/${id}`,{
                method : 'DELETE',
            })
        },
        deleteAll : function(){
            this.set(`https://mk-ap-todo-webapi.azurewebsites.net/deleteAll`,{
                method : 'DELETE'
            })
        }
    }
    
}
export default cloudServer
// let result = cloudServer().get()
// console.log(result)