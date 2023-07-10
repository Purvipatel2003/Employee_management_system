import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../App';
export const UpdateUser_Task = () => {

  const id = useParams().id;

  const [user_taskList, setuser_taskList] = useState("")
  const [user, setUser] = useState(user_taskList.user)
  const [task, settask] = useState(user_taskList.task)

  const [userList, setuserList] = useState([]);
  const [taskList, settaskList] = useState([]);

  const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("");


  const getUser_TaskData = () => {
    axios.get(`http://localhost:4000/user_tasks/${id}`).then((res) => {
      console.log("axios.get called in updATE PROJECT MODULE", res.data.data);
      if (res && res.data && res.data.data && res.data.data.length > 0) {
        setuser_taskList(res.data.data[0]);
      }

    })
  }

  const getTaskData =()=>{
    axios.get(`http://localhost:4000/users`).then((res)=>{
      setuserList(res.data.data)
    })
    axios.get(`http://localhost:4000/tasks`).then((res)=>{
      settaskList(res.data.data)
    })
  }

  const dashBoardHandler = () => {

    if (userData && userData.role && userData.role._id === "626c3b7675332464bdbb6570") {
      setdashBoard("AdminDashboard");
    }
    else if (userData && userData.role && userData.role._id === "626c3b9075332464bdbb6572") {
      setdashBoard("ProjectManagerDashboard");
    }
    else if (userData && userData.role && userData.role._id === "626c3b9775332464bdbb6574") {
      setdashBoard("DeveloperDashboard");
    }
    else {
      setdashBoard("none");
    }

  }

  useEffect(() => {
    getUser_TaskData();
    getTaskData();
    dashBoardHandler();
  }, []);

  const userChangeHandler = (e) => {
    setUser(e.target.value)
  }

  const taskChangeHandler = (e) => {
    settask(e.target.value)
  }

  const update = (e) => {
    e.preventDefault();

    var updatedData = {
      user: user,
      task: task
    }

    axios.put(`http://localhost:4000/user_tasks/${id}`, updatedData).then(res => {
      alert("updated data....")
    })
  }


  const getUserValue =()=>{
    if(user_taskList && user_taskList.user){
      return user_taskList.user._id;
    }
    return "";
  }

  const getTaskValue =()=>{
    if(user_taskList && user_taskList.task){
      return user_taskList.task._id;
    }
    return "";
  }
  return (
    <div className='content'>
      <div class="container-fluid">

        {
          (user_taskList.user && user_taskList.task) ?

            <form onSubmit={update}>

              <div class="form-group">
                <label for="exampleInputEmail1">User</label>
                {/* <input type="text" class="form-control" aria-describedby="emailHelp" onChange={(e) => { userChangeHandler(e) }} defaultValue={user_taskList.user.firstName} /> */}
                

<select class="form-control"  onChange={(e)=>{taskChangeHandler(e)}} required>
      <option value="select task">--- Select Task ---</option>
      {
         taskList.map((task)=>{
          if(task._id !== user_taskList.task._id){
            return(
             <option value={task._id} >{task.taskTitle}</option>
            ) 
           }
           else{
             return(
               <option selected value={task._id} >{task.taskTitle}</option>
             )
           }
           
          
        })     
      }
    </select>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Task</label>
                {/* <input type="text" class="form-control" onChange={(e) => { taskChangeHandler(e) }} defaultValue={user_taskList.task.taskTitle} /> */}
               

<select class="form-control"  onChange={(e)=>{userChangeHandler(e)}} required>
      <option value="select user">--- Select User ---</option>
      {
         userList.map((user)=>{
          if(user._id !== user_taskList.user._id){
            return(
             <option value={user._id} >{user.firstName}</option>
            ) 
           }
           else{
             return(
               <option selected value={user._id} >{user.firstName}</option>
             )
           }
           
          
        })     
      }
    </select>
             
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
              <Link className="addmargin" to={`/${dashBoard}/User_TaskTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
            </form>
            : "loading..."
        }
      </div>
    </div>

  )
}
