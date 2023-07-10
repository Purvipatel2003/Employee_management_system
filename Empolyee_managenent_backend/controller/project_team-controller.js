const ProjectTeamModel = require("../model/project_team-model");

module.exports.addProjectTeam = function(req,res){
    let project = req.body.project;
    let user = req.body.user;

    let project_team = new ProjectTeamModel({
        project:project,
        user:user
    })

    project_team.save(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"add project_team",status:200,data:data})
        }
    })
}


module.exports.getAllProjectTeam = function(req,res){
    ProjectTeamModel.find().populate("project").populate("user").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project_team",status:200,data:data})
        }
    })
}

module.exports.getAllProjectTeamById = function(req,res){
    let projectTeamId = req.params.projectTeamId;

    ProjectTeamModel.find({"_id":projectTeamId}).populate("project").populate("user").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project_team",status:200,data:data})
        }
    })
}

module.exports.deleteProjectTeam = function(req,res){

    let projectTeamId = req.params.projectTeamId;

    ProjectTeamModel.deleteOne({"_id":projectTeamId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"delete project_team",status:200,data:data})
        }
    })
}


module.exports.updateProjectTeam = function(req,res){
    let projectTeamId = req.params.projectTeamId;
    let project = req.body.project;
    let user = req.body.user;

    ProjectTeamModel.updateOne({"_id":projectTeamId},{project:project,user:user},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"update project_team",status:200,data:data})
        }
    })
}