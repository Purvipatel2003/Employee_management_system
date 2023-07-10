const { use } = require("express/lib/application");
const UserTaskmodel = require("../model/user_task-model");

module.exports.addUserTask = function(req,res){
    let user = req.body.user;
    let task = req.body.task;

    let User_task = new UserTaskmodel({
        user:user,
        task:task
    })

    User_task.save(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"add user_task",status:200,data:data})
        }
    })
}


module.exports.getAllUserTask = function(req,res){

    UserTaskmodel.find().populate("user").populate("task").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all user_task",status:200,data:data})
        }  
    })
}

module.exports.getAllUserTaskById = function(req,res){

    let userTaskId = req.params.userTaskId;

    UserTaskmodel.find({"_id":userTaskId}).populate("user").populate("task").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all user_task",status:200,data:data})
        }  
    })
}


module.exports.deleteUserTask = function(req,res){

        let userTaskId = req.params.userTaskId;

    UserTaskmodel.deleteOne({"_id":userTaskId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"delete user_task",status:200,data:data})
        }  
    })
}


module.exports.updateUserTask = function(req,res){
    let userTaskId = req.params.userTaskId;
    let user =req.body.user;
    let task = req.body.task;

    UserTaskmodel.updateOne({"_id":userTaskId},{user:user,task:task},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"update user_task",status:200,data:data})
        }  
    })
}