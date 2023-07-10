const TaskModel = require("../model/task-model");


module.exports.listTaskByProject_moduleId = function(req,res){

    let projectModuleId = req.params.projectModuleId;

    TaskModel.find({project_module: projectModuleId}).populate("project_module").populate("project").populate("priority").populate("status").exec(function(err,success){
    
        if (err) {
            res.json({msg: "something went wrong while displaying", status:-1, data:err})
        }
        else{
            res.json({msg: "success while displaying", status:200, data:success})
        }
    })
}

// module.exports.addTask = function(req,res){

//     let project_module = req.body.project_module;
//     let project = req.body.project;
//     let taskTitle = req.body.taskTitle;
//     let priority = req.body.priority;
//     let taskDescription = req.body.taskDescription;
//     let status = req.body.status;
//     let taskTotalMinutes = req.body.taskTotalMinutes;

//     let Task = new TaskModel({
//         project_module:project_module,
//         project:project,
//         taskTitle:taskTitle,
//         priority:priority,
//         taskDescription:taskDescription,
//         status:status,
//         taskTotalMinutes:taskTotalMinutes
//     })

//     Task.save(function(err,data){
//         if(err){
//             res.json({msg:"something went wrong",status:-1,data:err})
//         }
//         else{
//             res.json({msg:"add tasks...",status:200,data:data})
//         }
//     })
// }


// module.exports.getAllTask = function(req,res){
//     TaskModel.find().populate("project_module").populate("project").populate("status").populate("priority").exec(function(err,data){
//         if(err){
//             res.json({msg:"something went wrong",status:-1,data:err})
//         }
//         else{
//             res.json({msg:"displat all tasks...",status:200,data:data})
//         }
//     })
// }


// module.exports.getAllTaskById=function(req,res){
//     let taskId = req.params.taskId;
//     TaskModel.findById({"_id":taskId}).populate("project_module").populate("project").populate("status").populate("priority").exec(function(err,data){
//         if(err){
//             res.json({msg:"something went wrong",status:-1,data:err})
//         }
//         else{
//             res.json({msg:"displat all tasks...",status:200,data:data})
//         }
//     })

// }
// module.exports.deleteTask = function(req,res){

//     let taskId = req.params.taskId;

//     TaskModel.deleteOne({"_id":taskId},function(err,data){
//         if(err){
//             res.json({msg:"something went wrong",status:-1,data:err})
//         }
//         else{
//             res.json({msg:"delete tasks...",status:200,data:data})
//         }
//     })
// }

// module.exports.updateTask = function(req,res){

//     let taskId = req.params.taskId; 
//     let project_module = req.body.project_module;
//     let project = req.body.project;
//     let taskTitle = req.body.taskTitle;
//     let priority = req.body.priority;
//     let taskDescription = req.body.taskDescription;
//     let status = req.body.status;
//     let taskTotalMinutes = req.body.taskTotalMinutes;

//     TaskModel.updateOne({"_id":taskId},{project_module:project_module,project:project,taskTitle:taskTitle,priority:priority,taskDescription:taskDescription,status:status,taskTotalMinutes:taskTotalMinutes},function(err,data){
//         if(err){
//             res.json({msg:"something went wrong",status:-1,data:err})
//         }
//         else{
//             res.json({msg:"update tasks...",status:200,data:data})
//         }
//     })
// }