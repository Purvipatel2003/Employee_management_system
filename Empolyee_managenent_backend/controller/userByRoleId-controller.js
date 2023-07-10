const UserModel = require("../model/user-model");

module.exports.listUserByRoleId = function(req,res){

    let roleId = req.params.roleId;

    UserModel.find({role:roleId}).populate("role").exec(function(err,data){

        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all user",status:200,data:data})
        }
    })
}