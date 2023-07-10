const req = require("express/lib/request")
const res = require("express/lib/response")
const RoleModel  = require("../model/role-model")
 
 
 module.exports.addRole =function(req,res){
            console.log(req.body.roleName)
        
           // res.json({msg:"role added",status:200,data:req.body})
 


 let role = new RoleModel({
     roleName:req.body.roleName
 })

 role.save(function(err,sucess){
     if(err){
         console.log(err);
         res.json({msg:"some thing went wrong",status:-1,data:err})
     }
     else{
         res.json({msg:"role added",status:200,data:sucess})
     }
 })

}


module.exports.getAllRoles = function(req,res){
    RoleModel.find(function(err,roles){
        if(err){
            res.json({
                msg:"Something went wrong!!!",status:-1,data:err 
            })
        }else{
            res.json({
                msg:"roles....",status:200,data:roles
             })
        } 
    })
}

module.exports.getAllRolesById = function(req,res){

    let roleId=req.params.roleId;
    
    RoleModel.findById({"_id":roleId},function(err,roles){
        if(err){
            res.json({
                msg:"Something went wrong!!!",status:-1,data:err 
            })
        }else{
            res.json({
                msg:"roles....",status:200,data:roles
             })
        } 
    })
}

module.exports.deleteRole = function(req,res){

        //delete from role where roleId = 1 


    let roleId=req.params.roleId;

    RoleModel.deleteOne({"_id":roleId},function(err,data){
        if(err){
            res.json({msg:"Something went wrong while deleteing !!!",status:-1,data:err})
        }else{
            res.json({msg:"removed...",status:200,data:data})
        }
    })
}


module.exports.updateRole = function(req,res){

        //update role set roleName = admin where roleId = 12121 


    let roleId=req.params.roleId;
    let roleName=req.body.roleName;

    RoleModel.updateOne({"_id":roleId},{roleName:roleName},function(err,data){
        if(err){
            res.json({msg:"Something went wrong while upadating !!!",status:-1,data:err})
        }else{
            res.json({msg:"updated...",status:200,data:data})
        }
    })
}