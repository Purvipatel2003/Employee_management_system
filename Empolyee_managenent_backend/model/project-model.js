const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
   
    projectTitle:{
        type:String
    },
    
    projectDescription:{
        type:String
    },
    
    projectTechnology:{
        type:String
    },
    priority:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"priority"
    },
    projectEstimatedHours:{
        type:Number
    },
    
    projectStartDate:{
        type:String
    },
 
    projectCompletionDate:{
        type:String
    }
})

const ProjectModel = new mongoose.model("project",ProjectSchema)


module.exports = ProjectModel