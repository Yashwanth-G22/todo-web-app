import cloudServer from "../controller/storage-controller/cloud-server.js";
import localServer from "../model/localStorage-server.js";



function control(){

}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    todoView().createTask()
})

storage.addEventListener('change', () => {
    alert(`U are changing the storage .=> you data will store only in ${storage.value}`)
    ul.innerHTML = ''
    todoView().createAllTasks()
})

todoView().createAllTasks()



document.querySelector('.clearAllBtn').addEventListener('click', () => {
    cloudServer().deleteAll()
})
