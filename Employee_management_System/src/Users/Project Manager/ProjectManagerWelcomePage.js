import React from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
export const ProjectManagerWelcomePage = () => {

const userData = useContext(UserContext)
const [developerLength, setdeveloperLength] = useState("")
const [project_moduleLength, setproject_moduleLength] = useState("")
const [taskLength, settaskLength] = useState("")

const getData = ()=>{
  axios.get('http://localhost:4000/userByRoleId/626c3b9775332464bdbb6574').then((res)=>{
    setdeveloperLength(res.data.data.length)
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
    <>

<div class="content">
<div class="container-fluid">
<h2>Welcome {userData.firstName} to Project ManagerDashboard</h2>
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
<p class="card-category">Developers</p>
<h4 class="card-title">{developerLength}</h4>
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
<p class="card-category">Project_Modules</p>
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

{/* <div class="col-lg-3 col-sm-6">
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
