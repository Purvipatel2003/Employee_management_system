import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { UserContext } from '../../App';

export const UpdateProject_Module = () => {

    const id=useParams().id;
    const navigate = useNavigate()


    const userData = useContext(UserContext)
    const [dashBoard, setdashBoard] = useState("");

    
    const [statusList, setstatusList] = useState([])
    const [priorityList, setpriorityList] = useState([])

    const [project_moduleList, setproject_moduleList] = useState([]);

    const [project, setproject] = useState(project_moduleList.project)
    const [moduleName, setmoduleName] = useState(project_moduleList.moduleName)
    const [projectModuleDescription, setprojectModuleDescription] = useState(project_moduleList.projectModuleDescription)
    const [priority, setpriority] = useState(project_moduleList.priority)
    const [projectModuleEstimatedHours, setprojectModuleEstimatedHours] = useState(project_moduleList.projectModuleEstimatedHours)
    const [status, setstatus] = useState(project_moduleList.status)
    // const [projectModuleStartDate, setprojectModuleStartDate] = useState(project_moduleList.projectModuleStartDate)
    
        const getProject_ModuleData = async ()=>{
           await axios.get( `http://localhost:4000/project_modules/${id}`).then((res)=>{
                console.log("axios.get called in updATE PROJECT MODULE",res.data.data)
                setproject_moduleList(res.data.data)
                
            })

          // await  axios.get(`http://localhost:4000/projects`).then((res)=>{
          //     setprojectList(res.data.data)
          //   })

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
          getProject_ModuleData();  
          dashBoardHandler();    
        },[] );
        
        console.log("project modlu list",project_moduleList)


    const update=(e)=>{
        e.preventDefault();

        var updatedData={
            project:project,
            moduleName:moduleName,
            projectModuleDescription:projectModuleDescription,
            priority:priority,
            projectModuleEstimatedHours:projectModuleEstimatedHours,
            status:status,
            // projectModuleStartDate:projectModuleStartDate
        }

        axios.put(`http://localhost:4000/project_modules/${id}`,updatedData).then(res=>{
            alert("updated data....")
        })
    }

    const projectChangeHandler=(e)=>{
        setproject(e.target.value);
        console.log("project handler called")
    }
   
    const moduleNameChangeHandler=(e)=>{
        setmoduleName(e.target.value)
    }

    const projectModuleDescriptionChangeHandlers=(e)=>{
        setprojectModuleDescription(e.target.value)
    }

    const priorityChangeHandler =(e)=>{
      setpriority(e.target.value)
    }
    const projectModuleEstimatedHoursChangeHandler=(e)=>{
        setprojectModuleEstimatedHours(e.target.value)
    }

    const statusChangeHandler=(e)=>{
        setstatus(e.target.value)
    }

    // const projectModuleStartDateChangeHandler=(e)=>{
    //     setprojectModuleStartDate(e.target.value)
    // }

    console.log("projectModule: ",project_moduleList.moduleName)


    
  return (
    <div className='content'>
    <div class="container-fluid">

      {
        project_moduleList.project !== undefined && project_moduleList.status !== undefined ? 
      
  <form onSubmit={update}>

  <div class="form-group">
    <label for="exampleInputEmail1">Project</label>

<input type="text" class="form-control"  onChange={(e)=>{projectChangeHandler(e)}} defaultValue = {project_moduleList.project.projectTitle} readOnly/>

    

  </div> 
  <div class="form-group">
    <label for="exampleInputPassword1">ModuleName</label>
    <input type="text" class="form-control"  onChange={(e)=>{moduleNameChangeHandler(e)}} defaultValue = {project_moduleList.moduleName}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Description</label>
    <input type="text" class="form-control"  onChange={(e)=>{projectModuleDescriptionChangeHandlers(e)}} defaultValue={project_moduleList.projectModuleDescription} />
  </div>
  
  <div class="form-group">
    <label for="exampleInputPassword1">Priority</label>
    
    <select class="form-control"  onChange={(e)=>{priorityChangeHandler(e)}}>
      {
          priorityList.map((priority1)=>{
            if(priority1._id !== project_moduleList.priority._id){
              return(
               <option value={priority1._id} >{priority1.priorityName}</option>
              ) 
             }
             else{
               return(
                 <option selected value={priority1._id} >{priority1.priorityName}</option>
               )
             }
             
            
          })
      }
    </select>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Estimated Hours</label>
    <input type="text" class="form-control" onChange={(e)=>{projectModuleEstimatedHoursChangeHandler(e)}} defaultValue={project_moduleList.projectModuleEstimatedHours}/>
  </div>
   <div class="form-group">
    <label for="exampleInputPassword1">Status</label>
    
    <select class="form-control"  onChange={(e)=>{statusChangeHandler(e)}}>
      {
          statusList.map((status)=>{
            if(status._id !== project_moduleList.status._id){
              return(
               <option value={status._id} >{status.statusName}</option>
              ) 
             }
             else{
               return(
                 <option selected value={status._id} >{status.statusName}</option>
               )
             }
             
            
          })
      }
    </select>
  </div>
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Start Date</label>
    <input type="text" class="form-control"  onChange={(e)=>{projectModuleStartDateChangeHandler(e)}} defaultValue={project_moduleList.projectModuleStartDate}/>
  </div> */}
  <button type="submit" class="btn btn-primary">Submit</button>
  {/* <Link className="addmargin" to={`/${dashBoard}/ProjectTable/Project_ModuleTable/${id}`}> */}
    <button type='button' onClick={()=>navigate(-1)} className='btn btn-warning addmargin'>Go Back</button>
    {/* </Link> */}
</form>
      :"loading..."
      }
</div>
</div>

  )
}
