const mongoose = require("mongoose");


const taskSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        description:{
            type:String,
            required:true,
        },
        status:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
);

const task = mongoose.model("task",taskSchema);

module.exports.task = task;