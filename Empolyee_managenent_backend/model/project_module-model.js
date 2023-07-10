const mongoose = require("mongoose");

const ProjectModuleSchema = new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    moduleName:{
        type:String
    },
    projectModuleDescription:{
        type:String
    },
    priority:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"priority"
    },
    projectModuleEstimatedHours:{
        type:Number
    },
    status:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"status"
    },
    projectModuleStartDate:{
        type:String
    }


})


const projectModuleModel =new  mongoose.model("project_module",ProjectModuleSchema)

module.exports = projectModuleModel