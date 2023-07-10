const ProjectModuleModel = require("../model/project_module-model");

module.exports.listProject_moduleByProjectId =function(req,res){

    let projectId = req.params.projectId;

    ProjectModuleModel.find({project:projectId}).populate("project").populate("status").populate("priority").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project_module",status:200,data:data})

        }
    })
}
