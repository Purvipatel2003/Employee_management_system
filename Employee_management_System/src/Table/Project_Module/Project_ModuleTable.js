import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect,useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
export const Project_ModuleTable = () => {

  const id = useParams().id;
    const [project_moduleList, setproject_moduleList] = useState([])

    const userData = useContext(UserContext);
    const [dashBoard, setdashBoard] = useState("");



    const getProject_ModuleData = () => {
        axios.get(`http://localhost:4000/project_moduleByprojectId/`+id).then((res) => {
          console.log("project_module Data",res.data.data);
          setproject_moduleList(res.data.data);
        });
      }
    
      const deleteData = (id) => {
        axios.delete(`http://localhost:4000/project_modules/` + id).then((res) => {
            console.log("DATA DELETED");
            getProject_ModuleData()
        });
      }
   
      const dashBoardHandler =()=>{

        if(userData && userData.role && userData.role._id === "626c3b7675332464bdbb6570"){
          setdashBoard("AdminDashboard");
        }
        else if(userData && userData.role && userData.role._id === "626c3b9075332464bdbb6572"){
          setdashBoard("ProjectManagerDashboard");
        }
        else if(userData && userData.role && userData.role._id === "626c3b9775332464bdbb6574"){
          setdashBoard("DeveloperDashboard");
        }
        else{
          setdashBoard("none");
        }
    
      }
    


      useEffect(() => {
        getProject_ModuleData();
        dashBoardHandler();
      }, []);

      const isProjectManager=()=>{
        return(
          userData &&
          userData.role &&
          userData.role._id === "626c3b9075332464bdbb6572"
        )
        }

        

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-plain table-plain-bg">
              <div className="card-header ">
                <p className="card-category">All project_Module List </p>
                <h4 className="card-title d-inline-flex">Project_Module List</h4>
           {isProjectManager() ?
              <Link to={`/${dashBoard}/ProjectTable/Project_ModuleTable/AddProject_Module/${id}`}><button className="btn btn-primary float-right ">Add Project_Module</button></Link>
               :("")}
              </div>
              
              <div className="card-body table-full-width table-responsive">
              
                <table className="table table-hover">
                  <thead>
                    <th>Module Id</th>
                    <th>Project Name</th>
                    <th>ModuleName</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Estimated Hours</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    {isProjectManager() ? <th>Action</th> :("")}
                  </thead>
                  <tbody>
                    {project_moduleList.map((project_module) => {
                      return (
                        <tr className='tableStyle'>
                          <td>{project_module._id}</td>
                          <td>{project_module.project.projectTitle}</td>
                          <td><Link className='text-warning' to={`/${dashBoard}/ProjectTable/Project_ModuleTable/TaskTable/${project_module._id}`}>{project_module.moduleName}</Link></td>
                          <td>{project_module.projectModuleDescription}</td>
                          <td>{project_module.priority.priorityName}</td>
                          <td>{project_module.projectModuleEstimatedHours}</td>
                          {
                            project_module.status._id === "626cb63e67a64dfee71e1eba" ? 
                          <td ><p className='statusTodo'>{project_module.status.statusName}</p></td>
                          :
                            project_module.status._id === "626cb65767a64dfee71e1ebc" ?
                          <td ><p className='statusPending'>{project_module.status.statusName}</p></td>
                          :

                          project_module.status._id === "626cb66c67a64dfee71e1ebe" ?
                          <td ><p className='statusComplete'>{project_module.status.statusName}</p></td>
                            : ""
                           }
                          <td>{project_module.projectModuleStartDate}</td>
                          {
                            isProjectManager() ? 
                            <td>
                            
                            <button className="btn btn-danger" onClick={()=>{deleteData(project_module._id)}}>
                              Delete
                            </button>
                            <Link className="addmargin" to={`/${dashBoard}/ProjectTable/Project_ModuleTable/UpdateProject_Module/${project_module._id}`}>
                              <button className="btn btn-success">Update</button>
                            </Link>
                          </td>: ("")
                          }
                         
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
