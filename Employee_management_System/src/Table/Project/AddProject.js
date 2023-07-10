import axios from 'axios';
import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
export const AddProject = () => {
    
    const [priorityList, setpriorityList] = useState([])

    
    const [projectTitle, setprojectTitle] = useState('');
    const [projectDescription, setprojectDescription] = useState('');
    const [projectTechnology, setprojectTechnology] = useState('');
    const [priority, setpriority] = useState('')
    const [projectEstimatedHours, setprojectEstimatedHours] = useState('');
    // const [projectStartDate, setprojectStartDate] = useState('');
    const [projectCompletionDate, setprojectCompletionDate] = useState('');


    const userData = useContext(UserContext);

    const [dashBoard, setdashBoard] = useState("")



    const getProjectData = async(e)=>{
        await axios.get(`http://localhost:4000/prioritys`).then((res)=>{
                setpriorityList(res.data.data)
                console.log("priorityList: ",res.data.data)
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
      
      
      }, [])
      

    const projectTitleChangeHandler=(e)=>{
      setprojectTitle(e.target.value);
    }

    const projectDescriptionChangeHandler=(e)=>{
      setprojectDescription(e.target.value);
    }
    const projectTechnologyChangeHandler=(e)=>{
        setprojectTechnology(e.target.value);
    }
    const priorityChangeHandler=(e)=>{
      setpriority(e.target.value);
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


    const submitForm=(e)=>{
        e.preventDefault();
        
        var formData={
          projectTitle:projectTitle,
          projectDescription:projectDescription,
          projectTechnology:projectTechnology,
          priority:priority,
          projectEstimatedHours:projectEstimatedHours,
          // projectStartDate:projectStartDate,
          projectCompletionDate:projectCompletionDate
        }
        
        if(priority != "" && priority !="select priority")
        {

        axios.post(`http://localhost:4000/projects`,formData).then(res=>{
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
    <div class="form-group">
      <label for="exampleInputEmail1">Title</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{projectTitleChangeHandler(e)}} placeholder="Enter The Project Title "/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Description</label>
      <textarea rows="3" class="form-control"  onChange={(e)=>{projectDescriptionChangeHandler(e)}}  />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Technology</label>
      <input type="text" class="form-control"  onChange={(e)=>{projectTechnologyChangeHandler(e)}} />
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Prority</label>
      {/* <input type="text" class="form-control" onChange={(e)=>{prorityChangeHandler(e)}} /> */}
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
      <input type="text" class="form-control" onChange={(e)=>{projectEstimatedHoursChangeHandler(e)}} />
    </div>
    {/* <div class="form-group">
      <label for="exampleInputPassword1">Start Date</label>
      <input type="text" class="form-control"  onChange={(e)=>{projectStartDateChangeHandler(e)}} />
    </div> */}
    <div class="form-group">
      <label for="exampleInputPassword1">End Date</label>
      <input type="text" class="form-control"  onChange={(e)=>{projectCompletationDateChangeHandler(e)}} />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link className='addmargin' to={`/${dashBoard}/ProjectTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
