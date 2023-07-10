const mongoose = require("mongoose");

const ProjectTeamSchema = new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"   
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const ProjectTeamModel = new mongoose.model("project_team",ProjectTeamSchema)

module.exports = ProjectTeamModel