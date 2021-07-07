var taskList = new TaskList; 
var validator = new Validation;
var taskService = new TaskService;

var getEleID = function(id)
{
    return document.getElementById(id);
}

var resetInput = function(id)
{
    getEleID('newTask').value = "";
}

var stopAndShowError = function(error)
{
    alert(error);
    stopLoading();
}

var stopLoading = function()
{
    getEleID('loader').style.display = "none";
}

var starLoading = function()
{
    getEleID('loader').style.display = "block";
}

var getTaskFromApi = function()
{
    taskService.getTaskApi().then(function(res){
        taskList.arr = res.data;
        stopLoading();
        renderTaskList(taskList.arr);
    }).catch(stopAndShowError);
}

getTaskFromApi();

function renderTaskList(taskListArr) 
{
    var content = ["", ""];

    taskListArr.forEach(function(task){        
        content[1 - Number(task.status === "todo")] += `
                <li>
                    <span>${task.name}</span>
                    <div class="buttons">
                        <button class="remove" onclick="removeTask('${task.id}')"><i class="fa fa-trash-alt"></i></button>
                        <button class="complete" onclick="changeTaskStatus('${task.name}')">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
    });

    getEleID('todo').innerHTML = content[0]; 
    getEleID('completed').innerHTML = content[1];
}

getEleID('addItem').addEventListener('click', function()
{
    starLoading();

    var taskName = getEleID('newTask').value; 
    var taskStatus = "todo"; 

    resetInput();

    var flag = true; 
    flag &= validator.checkEmpty(taskName);
    flag &= validator.checkDuplicate(taskList, taskName); 

    if (flag == false) 
    {
        stopLoading();
        return; 
    }

    var task = new Task(taskName, taskStatus);
    
    taskService.addTaskApi(task).then(getTaskFromApi).catch(stopAndShowError);
});

var removeTask = function(id)
{
    starLoading();
    taskService.deleteTaskApi(id).then(getTaskFromApi).catch(stopAndShowError);
}

var changeTaskStatus = function(name)
{
    starLoading();
    debugger

    var idx = taskList.findIdxByName(name);

    if (idx !== -1)
    {
        var task = taskList.arr[idx];
        if (task.status === "todo")
            task.status = "completed"; 
        else task.status = "todo";

        taskService.updateTaskApi(task).then(getTaskFromApi).catch(stopAndShowError);
    }
}