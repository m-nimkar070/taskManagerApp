const { Task } = require("../models");


const getAllTasks = async(sortBy)=>{
    if(sortBy === "dsc"){
        const allTasks = await Task.find({}).sort({createdAt:-1});
        return allTasks;
    }
    const allTasks = await Task.find({}).sort({createdAt:1});
    return allTasks;
}

const addNewTask = async(title,description)=>{

    const taskCreated =await Task.create({
        title,
        description,
    });

    return taskCreated;
}

const getTaskById = async(id)=>{
    const taskById = await Task.findById(id);

    return taskById;
}

const updateTask = async(_id,title,description)=>{
    const obj={};
    if(title){
        obj.title=title;
    }
    if(description){
        obj.description=description;
    }

    const updatedTask= await Task.findOneAndUpdate({_id},{
        $set:obj
    },{
        new:true,
    });
    // console.log(updatedTask);
    return updatedTask;
}

const deleteTask = async(id)=>{
    const deletedTask = await Task.findByIdAndDelete(id);

    return deletedTask;
}

module.exports ={
    getAllTasks,
    addNewTask,
    getTaskById,
    updateTask,
    deleteTask
}