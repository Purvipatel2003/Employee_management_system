import React from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { CardUserTask } from './CardUserTask';
import { AddUser_TaskTable } from '../User_Task/AddUser_TaskTable';
import { UserContext } from '../../App';
import "jspdf-autotable";
import jsPDF from "jspdf";
export const TaskTable = () => {
  
  const id = useParams().id;

  

    const [taskList, settaskList] = useState([])


    const userData = useContext(UserContext)
    const [dashBoard, setdashBoard] = useState("")


  const getTaskData=()=>{
        axios.get(`http://localhost:4000/taskByProject_ModuleId/${id}`).then((res)=>{
            settaskList(res.data.data);
        })
    }

    
    const TaskdeleteData=(id)=>{
        axios.delete(`http://localhost:4000/tasks/`+ id).then((res)=>{
            console.log("data delted....");
            getTaskData();
        })
      
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
      getTaskData();
      dashBoardHandler();
    
      
    }, [])

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }


    const isProjectManager=()=>{
      return(
        userData &&
        userData.role &&
        userData.role._id === "626c3b9075332464bdbb6572"
      )
      }

      const isDeveloper=()=>{
        return(
          userData &&
          userData.role &&
          userData.role._id === "626c3b9775332464bdbb6574"
        )
        }

        const columns = [

          { title: "TaskId", field: "_id" },
          { title: "TaskTitle", field: "taskTitle" },
          { title: "TaskDescription", field: "taskDescription" },
          { title: "Taskminutes", field: "taskTotalMinutes" },
          { title: "Project_module", field: `project_module`},
          { title: "Project", field: "project.*"},
          // { title: "status", field: "status" },
          // { title: "Priority", field: "priority" },
        ]
      
        // console.log("studentData: ",studentData)
      
        const downloadPDF = ()=>{
      // if(taskList != undefined ){
      
        // console.log("taskData123: ",taskData);
        const doc = new jsPDF();
        doc.text("TASK DATA: ",20,10);
        
        doc.autoTable({
          theme: "grid",
          columns: columns.map((col) => ({ ...col, dataKey: col.field })),
          body: taskList,
        });
        doc.save("table.pdf");
      // }
      // else{
      //   console.log("NULL Data")
      // }
      // taskList.clear()
        }
   
  
  return (
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-plain table-plain-bg">
            <div class="card-header ">
              <div className='d-inline-flex'></div>
              <button className='btn btn-warning float-right' onClick={() => { downloadPDF() }}>Print</button>
              <p class="card-category">All Tasks List </p>
              <h4 class="card-title d-inline-flex">Tasks List</h4>
              {
                isProjectManager() ? 
               (<button  className=' btn btn-info addmargin' onClick={togglePopup}>Assign</button>)
                :("")
              }
              {
                isProjectManager() ?
                (<Link to={`/${dashBoard}/ProjectTable/Project_ModuleTable/TaskTable/AddTaskTable/${id}`}><button className="btn btn-primary float-right ">Add Task</button></Link>
                ):("")}
            </div>
             
           
            
            <div class="card-body table-full-width table-responsive">
            
              <table class="table table-hover">
                <thead>
                  <th>Task Id</th>
                  <th>Module Id</th>
                  <th>Project Id</th>
                  <th>title</th>
                  <th>Prority</th>
                  <th>Description</th>
                  <th>status</th>
                  <th>TotalMinuties</th>
                 { isProjectManager() || isDeveloper() ? (<th>Action</th>) : ("")}
                </thead>
                <tbody className='tbodycard'>
                  {taskList.map((task) => {
                    return (
                      <tr className='tableStyle'>
                        <td>{task._id}</td>
                        <td>{task.project_module.moduleName}</td>
                        <td>{task.project.projectTitle}</td>
                        <td>{task.taskTitle}</td>
                        <td>{task.priority.priorityName}</td>
                        <td>{task.taskDescription}</td>
                        {/* <td ><p className='statusColor'>{task.status ? task.status.statusName : "Todo"}</p></td> */}
                        {
                            task.status.statusName === "Todo" ? 
                          <td ><p className='statusTodo'>{task.status ? task.status.statusName : "Todo"}</p></td>
                          :
                            task.status.statusName === "work in progress" ?
                          <td ><p className='statusPending'>{task.status ? task.status.statusName : "Todo"}</p></td>
                          :

                          task.status.statusName === "Completed" ?
                          <td ><p className='statusComplete'>{task.status ? task.status.statusName : "Todo"}</p></td>
                            : ""
                        }
                        <td>{task.taskTotalMinutes}</td>
                        
                       
                        <td>
                         {isProjectManager() ?
                          (  <button
                              className="btn btn-danger"
                              onClick={() => {
                                TaskdeleteData(task._id);
                              }}
                            >
                              Delete
                            </button>)
                            :("")
                         }
                        
                         {isProjectManager() || isDeveloper() ?
                            (<Link className="addmargin"
                              to={`/${dashBoard}/TaskTable/UpdateTaskTable/${task._id}`}
                            >
                              <button className="btn btn-success">
                                Update
                              </button>
                            </Link>)
                            :("")
                            }
                          {/* <Link to={`/AdminDashboard/User_TaskTable/CardUserTask`}> */}
                        </td>
                  

                        {isOpen && (
                          <CardUserTask
                            content={
                              <>
                                <AddUser_TaskTable pmodId={id} />
                              </>
                            }
                            handleClose={togglePopup}
                          />
                        )}
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