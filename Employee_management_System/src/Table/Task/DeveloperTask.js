import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';


export const DeveloperTask = () => {
    const [user_taskList, setuser_taskList] = useState([]);

  const userRole = useContext(UserContext);

  const [filterTaskByUser, setfilterTaskByUser] = useState([]);

const userData = useContext(UserContext);

  const [dashBoard, setdashBoard] = useState("");

  const userId = useContext(UserContext);

  const getUser_TaskData = () => {

    console.log('dsafkjladfsl',userRole);

    console.log("user_Task userId",userId);


    axios.get(`http://localhost:4000/user_tasks`).then((res) => {
      console.log("User_task:   ", res.data.data);
      setuser_taskList(res.data.data);

      const filterTaskByUser = res.data.data.filter(eachObj => eachObj.user._id === userData._id)
      setfilterTaskByUser(filterTaskByUser);
      console.log("filteredbyUser",filterTaskByUser);
    });
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/user_tasks/` + id).then((res) => {
      console.log("DATA DELETED");
      getUser_TaskData();
    });
  };

  useEffect(() => {
    getUser_TaskData();
    dashBoardHandler();
  }, []);

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

 


  const isProjectManager=()=>{
    return(
      userData &&
      userData.role &&
      userData.role._id === "626c3b9075332464bdbb6572"
    )
    }

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All My Task List </p>
                <h4 class="card-title d-inline-flex">My Task List</h4>
                {/* <Link to={`/${dashBoard}/User_TaskTable/AddUser_TaskTable`}>
                  <button className="btn btn-primary float-right ">
                    Add User_Task
                  </button>
                </Link> */}
              </div>

              <div class="card-body table-full-width table-responsive">
                <table class="table table-hover">
                  <thead>
                    <th>User_Task ID</th>
                    <th>Users</th>
                    <th>Task</th>
                    {isProjectManager() ?<th>Action</th>:("")}
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {filterTaskByUser.map((user_task) => {
                      return (
                        <tr>
                          <td>{user_task._id}</td>
                          <td>{user_task.user.firstName}</td>
                          <td>{user_task.task.taskTitle}</td>
                          {isProjectManager()?<td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteData(user_task._id);
                              }}
                            >
                              Delete
                            </button>
                            <Link
                              to={`/${dashBoard}/User_TaskTable/UpdateUser_TaskTable/${user_task._id}`}
                            >
                              <button className="btn btn-success">
                                Update
                              </button>
                            </Link>
                          </td>
                          :("")
                          }
                          <td>
                          <Link
                              to={`TaskDetail/${user_task.task._id}`}
                            >
                              <button className="btn btn-success">
                                View Details
                              </button>
                            </Link>
                          </td>
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
