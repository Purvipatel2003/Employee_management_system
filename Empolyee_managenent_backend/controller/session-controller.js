const { status } = require("express/lib/response")
const fs = require("fs")


function login(req,res){
    let loginHtml = fs.readFileSync("./views/Login.html")
    res.write(loginHtml)
    res.end()

}

function signup(req,res){
    let signupHtml = fs.readFileSync("./views/Signup.html")
    res.write(signupHtml)
    res.end()

}


function saveUser(req,res){
    console.log(req.body)
    res.json({
        msg:"done done",
        status:200,
        data:req.body
    })
    
    res.end()
}


module.exports.login=login
module.exports.signup=signup
module.exports.saveuser=saveUser