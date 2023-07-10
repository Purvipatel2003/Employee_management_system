import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect,useContext } from 'react';
import { UserContext } from '../../App';

export const UpdateProjectTable = () => {

    var id=useParams().id;

  const [priorityList, setpriorityList] = useState([])

  const userData = useContext(UserContext);

  const [dashBoard, setdashBoard] = useState("");

    const [getData, setgetData] = useState([])
    const [projectTitle, setprojectTitle] = useState(getData.projectTitle);
    const [projectDescription, setprojectDescription] = useState(getData.projectDescription);
    const [projectTechnology, setprojectTechnology] = useState(getData.projectTechnology);
    const [priority, setPriority] = useState(getData.priority)
    const [projectEstimatedHours, setprojectEstimatedHours] = useState(getData.projectEstimatedHours);
    // const [projectStartDate, setprojectStartDate] = useState(getData.projectStartDate);
    const [projectCompletionDate, setprojectCompletionDate] = useState(getData.projectCompletionDate);

    const getProjectData=async()=>{
       await axios.get(`http://localhost:4000/projects/${id}`).then((res) => {
            console.log("axios called",res.data.data);
            setgetData(res.data.data);
          });

       await axios.get(`http://localhost:4000/prioritys`).then(res=>{
         setpriorityList(res.data.data)
       })   
    }

    const projectTitleChangeHandler=(e)=>{
      setprojectTitle(e.target.value);
    }

    const projectDescriptionChangeHandler=(e)=>{
      setprojectDescription(e.target.value);
    }
    const projectTechnologyChangeHandler=(e)=>{
        setprojectTechnology(e.target.value);
    }
  const  priorityChangeHandler =(e)=>{
    setPriority(e.target.value);
  }
   const projectEstimatedHoursChangeHandler=(e)=>{
        setprojectEstimatedHours(e.target.value);
    }
    // const projectStartDateChangeHandler=(e)=>{
    //     setprojectStartDate(e.target.value);
    // }
    const projectCompletationDateChangeHandler=(e)=>{
        setprojectCompletionDate(e.target.value);
    }

    const update=(e)=>{
        e.preventDefault();

        var updatedData={
          projectTitle:projectTitle,
          projectDescription:projectDescription,
          projectTechnology:projectTechnology,
          priority:priority,
          projectEstimatedHours:projectEstimatedHours,
          // projectStartDate:projectStartDate,
          projectCompletionDate:projectCompletionDate
        }

        axios.put(`http://localhost:4000/projects/${id}`,updatedData).then(res=>{
            alert("updated data....")
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
      getProjectData();
      dashBoardHandler();
    
    },[] )
    
  return (
    <div className='content'>
      <div class="container-fluid">
    <form onSubmit={update}>
    <div class="form-group">
      <label for="exampleInputEmail1">Title</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{projectTitleChangeHandler(e)}} defaultValue={getData.projectTitle}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Description</label>
      <textarea rows="3" class="form-control"  onChange={(e)=>{projectDescriptionChangeHandler(e)}} defaultValue={getData.projectDescription} />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Technology</label>
      <input type="text" class="form-control"  onChange={(e)=>{projectTechnologyChangeHandler(e)}} defaultValue={getData.projectTechnology}/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Prority</label>
      {/* <input type="text" class="form-control" onChange={(e)=>{prorityChangeHandler(e)}} /> */}
      <select class="form-control"  onChange={(e)=>{priorityChangeHandler(e)}} required>
      <option value="select priority">--- Select Status ---</option>
      {
          priorityList.map((priority)=>{
            if(priority._id !== getData.priority._id){
              return(
               <option value={priority._id} >{priority.priorityName}</option>
              ) 
             }
             else{
               return(
                 <option selected value={priority._id} >{priority.priorityName}</option>
               )
             }
             
            
          })
      }
    </select>
    </div>
   
    <div class="form-group">
      <label for="exampleInputPassword1">Estimated Hours</label>
      <input type="text" class="form-control" onChange={(e)=>{projectEstimatedHoursChangeHandler(e)}} defaultValue={getData.projectEstimatedHours}/>
    </div>
    {/* <div class="form-group">
      <label for="exampleInputPassword1">Start Date</label>
      <input type="text" class="form-control"  onChange={(e)=>{projectStartDateChangeHandler(e)}} defaultValue={getData.projectStartDate}/>
    </div> */}
    <div class="form-group">
      <label for="exampleInputPassword1">End Date</label>
      <input type="text" class="form-control"  onChange={(e)=>{projectCompletationDateChangeHandler(e)}} defaultValue={getData.projectCompletionDate}/>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link className="addmargin" to={`/${dashBoard}/ProjectTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
