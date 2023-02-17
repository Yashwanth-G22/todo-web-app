export function todoObject(  name , id = '',isCompleted = false){
    return {
        name : name ,
        id : id ,
        isCompleted : isCompleted,
    }
}