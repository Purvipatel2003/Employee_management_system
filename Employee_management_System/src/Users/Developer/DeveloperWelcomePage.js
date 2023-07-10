import React from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
export const DeveloperWelcomePage = () => {

    const userData = useContext(UserContext)

    const [user_taskList, setuser_taskList] = useState([])
    const [filterTaskByUser, setfilterTaskByUser] = useState([])
    const [taskByIdLength, settaskByIdLength] = useState("")
    const [project_moduleLength, setproject_moduleLength] = useState("")
    const [taskLength, settaskLength] = useState("")
    
    const getData = ()=>{
      
      axios.get(`http://localhost:4000/user_tasks`).then((res) => {
        setuser_taskList(res.data.data)
        console.log("user_task data: ", res.data.data)

        const filterTaskByUser = res.data.data.filter(eachObj => eachObj.user._id === userData._id)
        console.log("filterTaskByUser: ",filterTaskByUser)
        setfilterTaskByUser(filterTaskByUser)
        settaskByIdLength(filterTaskByUser.length)
    })
    axios.get(`http://localhost:4000/project_modules`).then((res)=>{
      setproject_moduleLength(res.data.data.length)
    })
    axios.get(`http://localhost:4000/tasks`).then((res)=>{
      settaskLength(res.data.data.length)
    })
    }
    useEffect(() => {
      getData()
    }, [])

  return (
    // <div>DeveloperWelcomePage
    //     <h1>welcome {userData.firstName} to DeveloperWelcomePage</h1>
    // </div>
  
    <>
  
<div class="content">
<div class="container-fluid">
<h2>Welcome {userData.firstName} to Developer Dashboard</h2>
<div class="row">
<div class="col-lg-3 col-sm-6">
<div class="card card-stats">
<div class="card-body ">
<div class="row">
<div class="col-5">
<div class="icon-big text-center icon-warning">
<i class="nc-icon nc-chart text-warning nc-icon nc-single-02"></i>
</div>
</div>
<div class="col-7">
<div class="numbers">
<p class="card-category">My Tasks</p>
<h4 class="card-title">{taskByIdLength}</h4>
</div>
</div>
</div>
</div>
<div class="card-footer ">
<hr/>
{/* <div class="stats">
<i class="fa fa-refresh"></i> Update Now
</div> */}
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6">
<div class="card card-stats">
<div class="card-body ">
<div class="row">
<div class="col-5">
<div class="icon-big text-center icon-warning">
<i class="nc-icon nc-light-3 text-success nc-icon nc-notes"></i>
</div>
</div>
<div class="col-7">
<div class="numbers">
<p class="card-category">Project_Module</p>
<h4 class="card-title">{project_moduleLength}</h4>
</div>
</div>
</div>
</div>
<div class="card-footer ">
<hr/>
{/* <div class="stats">
<i class="fa fa-calendar-o"></i> Last day
</div> */}
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6">
<div class="card card-stats">
<div class="card-body ">
<div class="row">
<div class="col-5">
<div class="icon-big text-center icon-warning">
<i class="nc-icon nc-paper-2"></i>
</div>
</div>
<div class="col-7">
<div class="numbers">
<p class="card-category">Tasks</p>
<h4 class="card-title">{taskLength}</h4>
</div>
</div>
</div>
</div>
<div class="card-footer ">
<hr/>
{/* <div class="stats">
<i class="fa fa-clock-o"></i> In the last hour
</div> */}
</div>
</div>
</div>
{/* 
<div class="col-lg-3 col-sm-6">
<div class="card card-stats">
<div class="card-body ">
<div class="row">
<div class="col-5">
<div class="icon-big text-center icon-warning">
<i class=" text-primary nc-icon nc-bullet-list-67"></i>
</div>
</div>
<div class="col-7">
<div class="numbers">
<p class="card-category">Tasks</p>
<h4 class="card-title">+45K</h4>
</div>
</div>
</div>
</div>
<div class="card-footer ">
<hr/>
<div class="stats">
<i class="fa fa-refresh"></i> Update now
</div>
</div>
</div>
</div> */}
</div>
</div>
</div>

</>
  
    )
}
