const mongoose = require("mongoose");

const UserTaskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
    }
})

const UserTaskmodel = new mongoose.model("user_task",UserTaskSchema)

module.exports = UserTaskmodel