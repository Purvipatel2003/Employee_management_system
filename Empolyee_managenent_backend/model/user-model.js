const mongoose = require("mongoose");

// schema 

 const UserSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    pinCode:{
        type:Number
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },
    isApproved:{
        type:Boolean
    }
})

const UserModel = new mongoose.model("user",UserSchema);

module.exports = UserModel