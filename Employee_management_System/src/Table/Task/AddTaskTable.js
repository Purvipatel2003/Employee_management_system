import React from 'react'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../App';

export const AddTaskTable = () => {

  const id=useParams().id;

const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("");

  
  const [project_moduleList, setproject_moduleList] = useState([]);
const [projectList, setprojectList] = useState([])
const [statusList, setstatusList] = useState([])
const [priorityList, setpriorityList] = useState([])

  const [project_module, setproject_module] = useState('')
  const [project, setproject] = useState('')
  const [taskTitle, settaskTitle] = useState('');
  const [priority, setpriority] = useState('')
  const [taskDescription, settaskDescription] = useState('')
  const [status, setstatus] = useState('')
  const [taskTotalMinutes, settaskTotalMinutes] = useState('')


  const getProject_ModuleData = async(e)=>{

  await  axios.get(`http://localhost:4000/project_modules/`+id).then((res) => {
      console.log("task added",res.data.data);
      setproject_moduleList(res.data.data);
      setprojectList(res.data.data.project)
    });

    await axios.get(`http://localhost:4000/status`).then((res)=>{
            setstatusList(res.data.data)
        })
     
    await axios.get(`http://localhost:4000/prioritys`).then((res)=>{
            setpriorityList(res.data.data)
            console.log("priority get",res.data.data)
    })    
  
  }
  
  const moduleNameChangeHandler=(e)=>{
    setproject_module(e.target.value)
  }

  const projectChangeHandler=(e)=>{
    setproject(e.target.value);
  }
  const taskTitleChangeHandler=(e)=>{
    settaskTitle(e.target.value)
  }
  const priorityChangeHandler=(e)=>{
    setpriority(e.target.value)
  }
  const taskDescriptionChangeHandler=(e)=>{
    settaskDescription(e.target.value)
  }
  const statusChangeHandler=(e)=>{
    setstatus(e.target.value)
  }
  const taskTotalMinutiesChangeHandler=(e)=>{
    settaskTotalMinutes(e.target.value)
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
  
  }, [])
  

  const submitForm=(e)=>{
    e.preventDefault();
    
    var formData={
      project_module:project_moduleList._id,
       project:projectList._id,
       taskTitle:taskTitle,
       priority:priority,
       taskDescription:taskDescription,
       status:status,
       taskTotalMinutes:taskTotalMinutes
    }

    axios.post(`http://localhost:4000/tasks`,formData).then(res=>{
        alert("New Project Added...");
    })
}




  return (
    <div className='content'>
      <div class="container-fluid">

    <form onSubmit={submitForm} >
    <div class="form-group">
      <label for="exampleInputEmail1">Module Name</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" value={project_moduleList.moduleName} readOnly/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Project Name</label>
      <input type="text" class="form-control"  value={projectList.projectTitle} readOnly/>
    </div> 
    <div class="form-group">
      <label for="exampleInputPassword1">Task Title</label>
      <input type="text" class="form-control"  onChange={(e)=>{taskTitleChangeHandler(e)}} />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Prority</label>
      {/* <input type="text" class="form-control" onChange={(e)=>{prorityChangeHandler(e)}} /> */}
      <select class="form-control"  onChange={(e)=>{priorityChangeHandler(e)}} required>
      <option value="select status">--- Select priority ---</option>
      {
        priorityList.map((priority)=>{
          return(
          <option value={priority._id}>{priority.priorityName}</option>
          )
          
        })        
      }
    </select>
    </div>
     <div class="form-group">
      <label for="exampleInputPassword1">Description</label>
      <input type="text" class="form-control" onChange={(e)=>{taskDescriptionChangeHandler(e)}} />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Status</label>
      {/* <input type="text" class="form-control" onChange={(e)=>{statusChangeHandler(e)}} /> */}
      <select class="form-control"  onChange={(e)=>{statusChangeHandler(e)}} required>
      <option value="select status">--- Select Status ---</option>
      {
        statusList.map((status)=>{
          return(
          <option value={status._id}>{status.statusName}</option>
          )
          
        })        
      }
    </select>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">TotalMinuties</label>
      <input type="text" class="form-control" onChange={(e)=>{taskTotalMinutiesChangeHandler(e)}}/>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link className="addmargin" to={`/${dashBoard}/ProjectTable/Project_ModuleTable/TaskTable/${id}`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
