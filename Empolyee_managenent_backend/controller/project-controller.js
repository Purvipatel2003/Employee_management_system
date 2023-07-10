const ProjectModel = require("../model/project-model");

module.exports.addProject = function(req,res){
    console.log(req.body)

    var today = new Date();
    var yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '-' + mm + '-' + yyyy;

   // res.json({msg:"add project",status:200,data:req.body})
  let projectTitle=req.body.projectTitle;
  let projectDescription=req.body.projectDescription;
  let projectTechnology=req.body.projectTechnology;
  let priority = req.body.priority;
  let projectEstimatedHours=req.body.projectEstimatedHours;
  let projectStartDate=today;
  let projectCompletionDate=req.body.projectCompletionDate;
   
  let project = new ProjectModel({
  
    projectTitle:projectTitle,
    projectDescription:projectDescription,
    projectTechnology:projectTechnology,
    priority:priority,
    projectEstimatedHours:projectEstimatedHours,
    projectStartDate:projectStartDate,
    projectCompletionDate:projectCompletionDate

     

   })

   project.save(function(err,sucess){
       if(err){
           console.log(err)
           res.json({msg:"something went wrong",status:-1,data:err})
       }
       else{
           res.json({msg:"add project",status:200,data:sucess})
       }
   })
}

module.exports.getAllProject = function(req,res){
    ProjectModel.find().populate("priority").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project",status:200,data:data})
        }
    })
}

module.exports.getAllProjectById = function(req,res){

    let projectId = req.params.projectId;

    ProjectModel.findById({"_id":projectId}).populate("priority").exec(function(err,data){
        if(err){
                res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all project",status:200,data:data})
        }
    })
}


module.exports.deleteProject = function(req,res){

    let projectId = req.params.projectId;

    ProjectModel.deleteOne({"_id":projectId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"deleted project...",status:200,data:data})
        }
    })
}


module.exports.updateProject = function(req,res){

    let projectId = req.params.projectId;
    

   let projectTitle=req.body.projectTitle;
    let projectDescription=req.body.projectDescription;
    let projectTechnology=req.body.projectTechnology;
    let priority = req.body.priority;
    let projectEstimatedHours=req.body.projectEstimatedHours;
    // let projectStartDate=req.body.projectStartDate;
    let projectCompletionDate=req.body.projectCompletionDate;


    ProjectModel.updateOne({"_id":projectId},{projectTitle:projectTitle,projectDescription:projectDescription,projectTechnology:projectTechnology,priority:priority,projectEstimatedHours:projectEstimatedHours,projectCompletionDate:projectCompletionDate},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"updated project...",status:200,data:data})
        }
    })
}