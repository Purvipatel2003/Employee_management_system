const mongoose = require('mongoose');

// schema table 

let StatusSchema = new mongoose.Schema({
    statusName:{
       type : String
    }
})

// model

let StatusModel = new mongoose.model("status",StatusSchema);

module.exports = StatusModel