const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { taskService } = require("../services")


const getAllTasks = catchAsync(async(req,res)=>{
    const {sortBy}  = req.query;
    const sortBy1 = sortBy ? sortBy :"asc";

    const allTasks = await taskService.getAllTasks(sortBy1);

    res.status(httpStatus.OK).send(allTasks);
})

const addNewTask = catchAsync(async(req,res)=>{
    const { title , description } = req.body;

    const task = await taskService.addNewTask(
        title,
        description
    );

    res.status(httpStatus.OK).send(task);
})

const getTaskById = catchAsync(async(req,res)=>{
    const id = req.params.taskId;

    const result = await taskService.getTaskById(id);

    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND , "No task with this ID");
    }
    res.status(httpStatus.OK).send(result);
})

const updateTask = catchAsync(async(req,res)=>{
    const _id = req.params.taskId;
    const {title , description} = req.body;
    if(!title && !description){
        throw new ApiError(httpStatus.NO_CONTENT,"Required title or descripyion to update");
    }else{
        const updatedTask =await taskService.updateTask(_id,title,description);
        if(!updatedTask){
            throw new ApiError(httpStatus.NOT_FOUND,"No task with this ID");
        }
        res.status(httpStatus.OK).json(updatedTask);
    }
});

const deleteTask = catchAsync(async(req,res)=>{
    const id = req.params.taskId;
    
    const deletedTask = await taskService.deleteTask(id);
    res.status(httpStatus.OK).send(deletedTask);
})

module.exports ={
    getAllTasks,
    addNewTask,
    getTaskById,
    updateTask,
    deleteTask
}