const mongoose =  require("mongoose");

const TaskSchema = new mongoose.Schema({
    project_module:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project_module"
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    taskTitle:{
        type:String
    },
    priority:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"priority"
    },
    taskDescription:{
        type:String
    },
    status:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"status"
    },
    taskTotalMinutes:{
        type:Number
    }

})

const TaskModel = new mongoose.model("task",TaskSchema);

module.exports = TaskModel