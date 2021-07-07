function TaskService() {}

TaskService.prototype.getTaskApi = function()
{
    return axios({
        url: "https://60e4772f5bcbca001749ea12.mockapi.io/TodoList", 
        method: 'GET'
    })
}

TaskService.prototype.addTaskApi = function(task)
{
    return axios({
        url: "https://60e4772f5bcbca001749ea12.mockapi.io/TodoList", 
        method: 'POST', 
        data: task
    })
}

TaskService.prototype.updateTaskApi = function(task)
{
    return axios({
        url: "https://60e4772f5bcbca001749ea12.mockapi.io/TodoList/" + task.id, 
        method: 'PUT', 
        data: task
    })
}

TaskService.prototype.deleteTaskApi = function(id)
{
    return axios({
        url: "https://60e4772f5bcbca001749ea12.mockapi.io/TodoList/" + id,
        method: "DELETE" 
    })
}