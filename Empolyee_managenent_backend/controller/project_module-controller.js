
const ProjectModuleModel = require("../model/project_module-model");

module.exports.addProjectModule = function(req,res){

    var today = new Date();
    var yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '-' + mm + '-' + yyyy;

    let project = req.body.project;
    let moduleName = req.body.moduleName;
    let projectModuleDescription = req.body.projectModuleDescription;
    let priority = req.body.priority;
    let projectModuleEstimatedHours = req.body.projectModuleEstimatedHours;
    let status = req.body.status;
    let projectModuleStartDate = today;

    let project_module = new ProjectModuleModel({
        project:project, 
        moduleName:moduleName,
        projectModuleDescription:projectModuleDescription,
        priority:priority,
        projectModuleEstimatedHours:projectModuleEstimatedHours,
        status:status,
        projectModuleStartDate:projectModuleStartDate
        
    })

    project_module.save(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"add project_module",status:200,data:data})

        }
    })
}

module.exports.getAllProjectModule = function(req,res){
    ProjectModuleModel.find().populate("project").populate("status").populate("priority").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project_module",status:200,data:data})

        }
    })
}

module.exports.getAllProjectModuleById =function(req,res){

    let projectModuleId = req.params.projectModuleId;

    ProjectModuleModel.findById({"_id":projectModuleId}).populate("project").populate("status").populate("priority").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project_module",status:200,data:data})

        }
    })
}

module.exports.deleteProjectModule = function(req,res){

    let projectModuleId = req.params.projectModuleId;

    ProjectModuleModel.deleteOne({"_id":projectModuleId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"delete project_module",status:200,data:data})

        }
    })
}


module.exports.updateProjectModule = function(req,res){

    let projectModuleId = req.params.projectModuleId;
    let project = req.body.project;
    let moduleName = req.body.moduleName;
    let projectModuleDescription = req.body.projectModuleDescription;
    let priority = req.body.priority;
    let projectModuleEstimatedHours = req.body.projectModuleEstimatedHours;
    let status = req.body.status;
    // let projectModuleStartDate = req.body.projectModuleStartDate;

    ProjectModuleModel.updateOne({"_id":projectModuleId},{project:project,moduleName:moduleName,projectModuleDescription:projectModuleDescription,priority:priority,projectModuleEstimatedHours:projectModuleEstimatedHours,status:status},function(err,data){
        
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"update project_module",status:200,data:data})

        }
    })
}