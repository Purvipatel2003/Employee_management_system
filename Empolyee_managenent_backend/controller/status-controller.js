const req = require('express/lib/request');
const res = require('express/lib/response');
const StatusModel = require('../model/status-model');

module.exports.addStatus = function(req,res){
    console.log(req.body.statusName);
//    res.json({msg:"status added",status:200,data:req.body})


let status = new StatusModel({
    statusName:req.body.statusName   // statusName ---> table field name , req.body.statusName--->postman form side 
})


status.save(function(err,sucess){
    if(err){
        console.log(err);
        res.json({msg:"something went wrong",status:-1,data:req.body})
    }else{
        res.json({msg:"status added",status:200,data:sucess})
    }
})

}

module.exports.getAllStatus = function(req,res){
    StatusModel.find(function(err,status){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"display all status...",status:200,data:status})
        }
    })
}



module.exports.getAllStatusById = function(req,res){

    let statusId = req.params.statusId;

    StatusModel.findById({"_id":statusId},function(err,data){
        if(err){
                res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all status",status:200,data:data})
        }
    })
}

module.exports.deleteStatus = function(req,res){

    let statusId = req.params.statusId;

    StatusModel.deleteOne({"_id":statusId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"deleted status....",status:200,data:data})
        }
    })
}


module.exports.updateStatus = function(req,res){
    
    //
     
    let statusId = req.params.statusId;
    let statusName = req.body.statusName;
    StatusModel.updateOne({"_id":statusId},{statusName:statusName},function(err,data){

        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"updated status...",status:200,data:data})
        }

    })
}

