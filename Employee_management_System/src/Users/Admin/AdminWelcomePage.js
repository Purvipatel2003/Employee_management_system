import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useEffect,useState } from 'react';
import axios from 'axios';
export const AdminWelcomePage = () => {
const userData = useContext(UserContext);

const [userLength, setuserLength] = useState("")
  const [projectLength, setprojectLength] = useState("")
  const [projectManagerLength, setprojectManagerLength] = useState("")

  const getData = () => {
    axios.get('http://localhost:4000/users').then((res) => {
      console.log("userList: ", res.data.data.length)
      setuserLength(res.data.data.length)
    })
    axios.get('http://localhost:4000/projects').then((res) => {
      setprojectLength(res.data.data.length)
    })
    axios.get('http://localhost:4000/userByRoleId/626c3b9075332464bdbb6572').then((res) => {
      setprojectManagerLength(res.data.data.length)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    // <div>
    //     <h1>welcome {userData.firstName} to AdminDashboard</h1>
    // </div>

<>
    
<div class="content">
<div class="container-fluid">
<h2>Welcome {userData.firstName} to Admin Dashboard</h2>
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
<p class="card-category">Users</p>
<h4 class="card-title">{userLength}</h4>
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
<p class="card-category">Projects</p>
<h4 class="card-title">{projectLength}</h4>
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
<p class="card-category">Project Manager</p>
<h4 class="card-title">{projectManagerLength}</h4>
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
