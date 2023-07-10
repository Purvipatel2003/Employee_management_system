const req = require('express/lib/request');
const res = require('express/lib/response');
const PriorityModel = require('../model/priority-model');

module.exports.addPriority = function(req,res){
    console.log(req.body.priorityName);
//    res.json({msg:"status added",status:200,data:req.body})


let priority = new PriorityModel({
    priorityName:req.body.priorityName   // statusName ---> table field name , req.body.statusName--->postman form side 
})


priority.save(function(err,sucess){
    if(err){
        console.log(err);
        res.json({msg:"something went wrong",status:-1,data:req.body})
    }else{
        res.json({msg:"priority added",status:200,data:sucess})
    }
})

}

module.exports.getAllPriority = function(req,res){
    PriorityModel.find(function(err,status){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"display all priority...",status:200,data:status})
        }
    })
}



module.exports.getAllPriorityById = function(req,res){

    let priorityId = req.params.priorityId;

    PriorityModel.findById({"_id":priorityId},function(err,data){
        if(err){
                res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all priority",status:200,data:data})
        }
    })
}

module.exports.deletePriority = function(req,res){

    let priorityId = req.params.priorityId;

    priorityModel.deleteOne({"_id":priorityId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"deleted priority....",status:200,data:data})
        }
    })
}


module.exports.updatePriority = function(req,res){
    
    //
     
    let priorityId = req.params.priorityId;
    let priorityName = req.body.priorityName;
    PriorityModel.updateOne({"_id":priorityId},{priorityName:priorityName},function(err,data){

        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"updated priority...",status:200,data:data})
        }

    })
}

