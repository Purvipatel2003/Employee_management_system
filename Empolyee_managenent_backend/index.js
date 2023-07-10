const express = require("express");
const sessionController = require("./controller/session-controller");
const roleController = require("./controller/role-controller");
const statusController = require("./controller/status-controller");
const projectController = require("./controller/project-controller");
const userController = require("./controller/user-controller");
const projectTeamController = require("./controller/project_team-controller");
const projectModuleController = require("./controller/project_module-controller");
const taskController = require("./controller/task-controller");
const userTaskController = require("./controller/user_task-controller");
const priorityController = require("./controller/priority-controller");

const taskByProject_ModuleIdController = require("./controller/taskByProject_moduleId-controller");
const project_moduleByProjectIdController = require("./controller/project_moduleByProjectId-controller");

const userByRoleId = require("./controller/userByRoleId-controller");
const app=express();
const cors=require('cors');
const mongoose = require('mongoose');

app.use(cors());

// middle ware

app.use(express.json())  //mobile -> accept json data request
app.use(express.urlencoded({extended:true}))


//databases

// mongoose.connect('mongodb://localhost:27017/project_management',function(err){
mongoose.connect('mongodb://127.0.0.1:27017/project_management',function(err){
    if(err){
        console.log("db connection fail ....");
        console.log(err);
    }else{
        console.log("db connected...");
    }
});

// url
app.get('/',function(req,res){
    res.write("welcome...");
    res.end();
})


app.get("/login",sessionController.login);
app.get("/signup",sessionController.signup);
app.post("/saveuser",sessionController.saveuser);



//  role

app.post("/roles",roleController.addRole)
app.get("/roles",roleController.getAllRoles)
app.delete("/roles/:roleId",roleController.deleteRole)
app.put("/roles/:roleId",roleController.updateRole)
app.get("/roles/:roleId",roleController.getAllRolesById)


// status
app.post("/status",statusController.addStatus)
app.get("/status",statusController.getAllStatus)
app.delete("/status/:statusId",statusController.deleteStatus)
app.put("/status",statusController.updateStatus)
app.get("/status/:statusId",statusController.getAllStatusById)


// project

app.post("/projects",projectController.addProject)
app.get("/projects",projectController.getAllProject)
app.get("/projects/:projectId",projectController.getAllProjectById)
app.delete("/projects/:projectId",projectController.deleteProject)
app.put("/projects/:projectId",projectController.updateProject)


// user

app.post("/users",userController.addUser)
app.get("/users",userController.getAllUser)
app.get("/users/:userId",userController.getAllUserById)
app.delete("/users/:userId",userController.deleteUser)
app.put("/users/:userId",userController.updateUser)
app.post("/login",userController.login)

// project_team
app.post("/project_teams",projectTeamController.addProjectTeam)
app.get("/project_teams",projectTeamController.getAllProjectTeam)
app.delete("/project_teams/:projectTeamId",projectTeamController.deleteProjectTeam)
app.put("/project_teams/:projectTeamId",projectTeamController.updateProjectTeam)
app.get("/project_teams/:projectTeamId",projectTeamController.getAllProjectTeamById);


//project_module
app.post("/project_modules",projectModuleController.addProjectModule)
app.get("/project_modules",projectModuleController.getAllProjectModule)
app.delete("/project_modules/:projectModuleId",projectModuleController.deleteProjectModule)
app.put("/project_modules/:projectModuleId",projectModuleController.updateProjectModule)
app.get("/project_modules/:projectModuleId",projectModuleController.getAllProjectModuleById)


// task
app.post("/tasks",taskController.addTask)
app.get("/tasks",taskController.getAllTask)
app.delete("/tasks/:taskId",taskController.deleteTask)
app.put("/tasks/:taskId",taskController.updateTask)
app.get("/tasks/:taskId",taskController.getAllTaskById)

// user_task
app.post("/user_tasks",userTaskController.addUserTask)
app.get("/user_tasks",userTaskController.getAllUserTask)
app.delete("/user_tasks/:userTaskId",userTaskController.deleteUserTask)
app.put("/user_tasks/:userTaskId",userTaskController.updateUserTask)
app.get("/user_tasks/:userTaskId",userTaskController.getAllUserTaskById)

//priority
app.post("/prioritys",priorityController.addPriority);
app.get("/prioritys",priorityController.getAllPriority);
app.delete("/prioritys",priorityController.deletePriority);
app.put("/prioritys/:priorityId",priorityController.updatePriority);
app.get("/prioritys/:priorityId",priorityController.getAllPriorityById);


// task by project_module ID

app.get("/taskByProject_ModuleId/:projectModuleId",taskByProject_ModuleIdController.listTaskByProject_moduleId);


// project_module by project id

app.get("/project_moduleByprojectId/:projectId",project_moduleByProjectIdController.listProject_moduleByProjectId);


// user by role id

app.get("/userByRoleId/:roleId",userByRoleId.listUserByRoleId);
// //signup
// app.post("/signups",signupController.addSignup)
// app.get("/signups",signupController.getAllSignup)
// app.delete("/signups/:signupId",signupController.deleteSignup)
// app.put("/signups",signupController.updateSignup)

// app.get('/login',function(req,res){
//     res.write("login");
//     res.end();

// })

// app.get('/signup',function(req,res){
//     res.write("signup");
//     res.end();
// })



app.listen(4000,function(){
    console.log("server started on port 4000");
})