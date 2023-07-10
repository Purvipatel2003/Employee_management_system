const mongoose = require("mongoose");

// schema --> table structure

let RoleSchema = new mongoose.Schema({
    roleName:{
       type : String
    }
})


//model

let RoleModel = new mongoose.model("role",RoleSchema)   // role is table name

module.exports = RoleModel