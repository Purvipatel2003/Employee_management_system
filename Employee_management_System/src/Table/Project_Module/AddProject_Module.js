import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState,useContext,useEffect } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'

export const AddProject_Module = () => {
  
    const id = useParams().id;
    const [projectList, setprojectList] = useState([])
    const [statusList, setstatusList] = useState([])
    const [priorityList, setpriorityList] = useState([])


    const [project, setproject] = useState(projectList._id)
    const [moduleName, setmoduleName] = useState('')
    const [projectModuleDescription, setprojectModuleDescription] = useState('')
    const [priority, setpriority] = useState('')
    const [projectModuleEstimatedHours, setprojectModuleEstimatedHours] = useState('')
    const [status, setstatus] = useState('626cb63e67a64dfee71e1eba')
    // const [projectModuleStartDate, setprojectModuleStartDate] = useState('')


    const userData = useContext(UserContext);
    const [dashBoard, setdashBoard] = useState("");


      const getProject_moduleData = async(e) =>{
         await axios.get(`http://localhost:4000/projects/${id}`).then((res)=>{
            setprojectList(res.data.data)
          
          })

          await axios.get(`http://localhost:4000/status`).then((res)=>{
            setstatusList(res.data.data)
        })

        await axios.get(`http://localhost:4000/prioritys`).then(res=>{
          setpriorityList(res.data.data)
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
        getProject_moduleData();
        dashBoardHandler();
      
        
      }, [])
      

    const projectChangeHandler=(e)=>{
        setproject(e.target.value)
        console.log(e.target.value)
    }
    const moduleNameChangeHandler=(e)=>{
        setmoduleName(e.target.value)
    }

    const projectModuleDescriptionChangeHandlers=(e)=>{
      setprojectModuleDescription(e.target.value)
    }

    const priorityChangeHandler = (e)=>{
      setpriority(e.target.value)
    }

    const projectModuleEstimatedHoursChangeHandler=(e)=>{
      setprojectModuleEstimatedHours(e.target.value)
    }

    const statusChangeHandler=(e)=>{
        setstatus(e.target.value)
        console.log(e.target.value)
    }

    // const projectModuleStartDateChangeHandler=(e)=>{
    //   setprojectModuleStartDate(e.target.value)
    // }


    const submitForm=(e)=>{
        e.preventDefault();
        
        var formData={
         project:projectList._id,
            moduleName:moduleName,
            projectModuleDescription:projectModuleDescription,
            priority:priority,
            projectModuleEstimatedHours:projectModuleEstimatedHours,
            status:status,
            // projectModuleStartDate:projectModuleStartDate
        }

        if( project !== "" && project !== "select project" && status !== "" && status !== "select status" && priority !=="" && priority !== "select priority")
        {
        axios.post(`http://localhost:4000/project_modules`,formData).then(res=>{
            alert("New Project Added...");
        })
    }
    else{
      alert("Please Fill Require Details...")
    }
  }
  return (

    <div className='content'>
    <div class="container-fluid">
  <form onSubmit={submitForm}>

  {/* <div class="form-group">
    <label for="exampleInputEmail1">Project</label>
    <select class="form-control"   onChange={(e)=>{projectChangeHandler(e)}} required> 
      <option value="select project">--- Select Project ---</option>
      {
        projectList.map((project_module)=>{

          return(
            <option value={project_module._id}>{project_module.projectTitle}</option>
          )
        })
      }
      
    </select>

  </div> */}

<div class="form-group">
    <label for="exampleInputPassword1">Project</label>
    <input type="text" class="form-control" readOnly  value={projectList.projectTitle}/>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">ModuleName</label>
    <input type="text" class="form-control"  onChange={(e)=>{moduleNameChangeHandler(e)}} required/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Description</label>
    <input type="text" class="form-control"  onChange={(e)=>{projectModuleDescriptionChangeHandlers(e)}}  />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Priority</label>
    <select class="form-control"  onChange={(e)=>{priorityChangeHandler(e)}} required>
      <option value="select priority">--- Select Priority ---</option>
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
    <label for="exampleInputPassword1">Estimated Hours</label>
    <input type="text" class="form-control" onChange={(e)=>{projectModuleEstimatedHoursChangeHandler(e)}} required/>
  </div>
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Status</label>
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
  </div> */}
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Start Date</label>
    <input type="text" class="form-control"  onChange={(e)=>{projectModuleStartDateChangeHandler(e)}} required/>
  </div> */}
  <button type="submit" class="btn btn-primary">Submit</button>
  <Link className="addmargin" to={`/${dashBoard}/ProjectTable/Project_ModuleTable/${id}`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
</form>
</div>
</div>
  )
}
