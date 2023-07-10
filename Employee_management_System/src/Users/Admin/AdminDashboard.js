import React from 'react'
import { Routes,Route } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { AddProject } from '../../Table/Project/AddProject';
import { AdminFooter } from './AdminFooter';
import { AdminNavbar } from './AdminNavbar';

import { AdminSidebar } from './AdminSidebar';
import { UserTable } from '../../Table/Users/UserTable';
import { UpdateUserTable } from '../../Table/Users/UpdateUserTable';


import { ProjectTable } from '../../Table/Project/ProjectTable';
import { UpdateProjectTable } from '../../Table/Project/UpdateProjectTable';
import { Project_ModuleTable } from '../../Table/Project_Module/Project_ModuleTable';
import { UpdateProject_Module } from '../../Table/Project_Module/UpdateProject_Module';
import { AddUserTable } from '../../Table/Users/AddUserTable';
import { AddProject_Module } from '../../Table/Project_Module/AddProject_Module';
import { TaskTable } from '../../Table/Task/TaskTable';
import { StatusTable } from '../../Table/Status/StatusTable';
import { UpdateStatusTable } from '../../Table/Status/UpdateStatusTable';
import { AddStatus } from '../../Table/Status/AddStatus';
import { UpdateTaskTable } from '../../Table/Task/UpdateTaskTable';
import { AddTaskTable } from '../../Table/Task/AddTaskTable';
import { RoleTable } from '../../Table/Role/RoleTable';
import { UpdateRoleTable } from '../../Table/Role/UpdateRoleTable';
import { AddRole } from '../../Table/Role/AddRole';
import { Project_Team } from '../../Table/Project_Team/Project_Team';
import { UpdateProject_TeamTable } from '../../Table/Project_Team/UpdateProject_TeamTable';
import { AddProject_TeamTable } from '../../Table/Project_Team/AddProject_TeamTable';
import { User_TaskTable } from '../../Table/User_Task/User_TaskTable';
import { UpdateUser_Task } from '../../Table/User_Task/UpdateUser_TaskTable';
import { AddUser_TaskTable } from '../../Table/User_Task/AddUser_TaskTable';

import { CardUserTask } from '../../Table/Task/CardUserTask';
import { Loader } from '../../Components/Loader/Loader';
import { UserProfile } from '../../Components/userProfile/UserProfile';
import { AdminWelcomePage } from './AdminWelcomePage';
import { TaskDetail } from '../../Table/Task/TaskDetail';
import { ApproveUser } from '../../Table/Users/ApproveUser';


export const AdminDashboard = () => {

    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        setisLoading(true);
        setTimeout(()=>{
          setisLoading(false)
        },500)
      
        
      }, [])

  return (
    
    isLoading ? <Loader/>
    :
    <div className="wrapper">
      {/* <Dashboard/> */}

      
      <AdminSidebar/>

      <div className="main-panel">
      <AdminNavbar/>

      <Routes>
        {/* <Route path="/" element={<Login />}></Route> */}
         {/* <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>  */}
        <Route path='/' element={<AdminWelcomePage/>}></Route>
        <Route path="ProjectTable" element={<ProjectTable/>}></Route>
        <Route path="AddProject" element={<AddProject/>}></Route>
        <Route path="ProjectTable/UpdateProjectTable/:id" element={<UpdateProjectTable/>} ></Route>
        <Route path='ProjectTable/Project_ModuleTable/:id' element={<Project_ModuleTable/>}></Route>
        <Route path='ProjectTable/Project_ModuleTable/TaskTable/:id' element={<TaskTable/>}></Route>
        <Route path="ProjectTable/AddProject" element={<AddProject/>} ></Route>

        <Route path="UserTable" element={<UserTable/>}></Route>
        <Route path="UserTable/UpdateUserTable/:id" element={<UpdateUserTable/>}></Route>
        <Route path='UserTable/AddUserTable' element={<AddUserTable/>}></Route>

        <Route path='ProjectTable/Project_ModuleTable' element={<Project_ModuleTable/>}></Route>
        <Route path='ProjectTable/Project_ModuleTable/UpdateProject_Module/:id' element={<UpdateProject_Module/>}></Route>
        <Route path='ProjectTable/Project_ModuleTable/AddProject_Module/:id' element={<AddProject_Module/>}></Route>

        <Route path='ProjectTable/Project_ModuleTable/TaskTable/:id' element={<TaskTable/>}></Route>
        <Route path='TaskTable/UpdateTaskTable/:id' element={<UpdateTaskTable/>}></Route>
        <Route path='ProjectTable/Project_ModuleTable/TaskTable/AddTaskTable/:id' element={<AddTaskTable/>}></Route>

        {/* <Route path='ProjectTable/Project_ModuleTable/TaskTable/CardUserTask' element={<CardUserTask/>}></Route> */}


        <Route path='StatusTable' element={<StatusTable/>}></Route>
        <Route path='StatusTable/UpdateStatusTable/:id' element={<UpdateStatusTable/>}></Route>
        <Route path='StatusTable/AddStatus' element={<AddStatus/>}></Route>

        <Route path='RoleTable' element={<RoleTable/>}></Route>
        <Route path="RoleTable/UpdateRoleTable/:id" element={<UpdateRoleTable/>}></Route>
        <Route path='RoleTable/AddRole' element={<AddRole/>}></Route>

        <Route path='Project_TeamTable' element={<Project_Team/>}></Route>
        <Route path="Project_TeamTable/UpdateProject_TeamTable/:id" element={<UpdateProject_TeamTable/>}></Route>
        <Route path='Project_TeamTable/AddProject_TeamTable' element={<AddProject_TeamTable/>}></Route>

        <Route path='User_TaskTable' element={<User_TaskTable/>}></Route>
        <Route path='User_TaskTable/UpdateUser_TaskTable/:id' element={<UpdateUser_Task/>}></Route>
        <Route path="User_TaskTable/AddUser_taskTable" element={<AddUser_TaskTable/>}></Route>


        <Route path="UserProfile" element={<UserProfile/>}></Route>

        <Route path="ApprovedUser" element={<ApproveUser/>}></Route>
      </Routes>

      {/* <AdminBody/> */}

      <AdminFooter/> 
    </div>
 </div>
  )
}
