const UserModel = require("../model/user-model");
const bcrypt = require("bcrypt");

module.exports.addUser =  function(req,res){

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    //encrypt
    let encPassword = bcrypt.hashSync(password,10);


    let role = req.body.role;
    let address = req.body.address;
    let city = req.body.city;
    let country = req.body.country;
    let pinCode = req.body.pinCode;
    let isApproved =req.body.isApproved;



    let user = new UserModel({
        firstName: firstName,
        lastName:lastName,
        email: email,
        password: encPassword,
        role: role,
        address:address,
        city:city,
        country:country,
        pinCode:pinCode,
        isApproved:isApproved
    })

    UserModel.findOne({email: req.body.email}).then(function(userExists){

        console.log("User already exisits!!!!!!!!")
        if(userExists){
            res.json({msg:"user already exists with a similar email Id",status:400 ,data:userExists}) 
            console.log("User already exisits inside if !!!!!!!!")
        }
        else{
    
    user.save(function(err,data){
        if(err){
            res.json({msg:"somthing went to wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"sign up",status:200,data:data})
        }
    })
}
    })

}


module.exports.getAllUser = function(req,res){

    UserModel.find().populate("role").exec(function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all user",status:200,data:data})
        }
    })
        
    
}


module.exports.getAllUserById = function(req,res){

    let userId = req.params.userId;

    UserModel.findById({"_id":userId}).populate("role").exec(function(err,data){

        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"display all user",status:200,data:data})
        }
    })
}

module.exports.deleteUser = function(req,res){

    let userId = req.params.userId;

    UserModel.deleteOne({"_id":userId},function(err,data){
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"delete user",status:200,data:data})
        }
    })
}


module.exports.updateUser = function(req,res){
    
    let userId = req.params.userId; 
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.encPassword;
    let role = req.body.role;
    let address = req.body.address;
    let city = req.body.city;
    let country = req.body.country;
    let pinCode = req.body.pinCode;
    let isApproved =req.body.isApproved;
    

    UserModel.updateOne({"_id":userId},{firstName:firstName,lastName:lastName,email:email,password:password,role:role,address:address,city:city,country:country,pinCode:pinCode,isApproved:isApproved},function(err,data){
        //console.log(req.body.userId)
      
        
        if(err){
            res.json({msg:"something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"update user",status:200,data:data})
        }
    }) 
}


// login 

module.exports.login = function(req,res){
    let param_email=req.body.email;
    let param_password=req.body.password;

    let isCorrect = false;

    UserModel.findOne({email:param_email}).populate("role").exec(function(err,data){
        if(data){
            let ans = bcrypt.compareSync(param_password,data.password);
            if(ans==true){
                isCorrect=true;
            }
        }

        if(isCorrect==false){
            res.json({msg:"invalid password",status:-1,data:req.body})
        }else{
            res.json({msg:"login sucessful",status:200,data:data})
        }
    })
}
