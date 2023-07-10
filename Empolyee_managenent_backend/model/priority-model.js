const mongoose = require('mongoose');

// schema table 

let PrioritySchema = new mongoose.Schema({
    priorityName:{
       type : String
    }
})

// model

let PriorityModel = new mongoose.model("priority",PrioritySchema);

module.exports = PriorityModel