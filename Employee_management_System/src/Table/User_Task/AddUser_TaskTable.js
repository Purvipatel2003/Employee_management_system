import React from 'react'
import { useState ,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../App'
export const AddUser_TaskTable = (props) => {

  
  const pmodId = props.pmodId

  const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("");
    
    const [taskList, settaskList] = useState([])
    const [projectTeamList, setprojectTeamList] = useState([])

    const [userListFromProject, setuserListFromProject] = useState([])

    const [projectId, setprojectId] = useState('')
    const [user, setuser] = useState('')
    const [task, settask] = useState('');

    const getUserTaskData = async (e)=>{
     

      await axios.get(`http://localhost:4000/taskByProject_ModuleId/${pmodId}`).then(res=>{
        settaskList(res.data.data)

        console.log("tasklist",res.data.data);
        setprojectId(res.data.data[0].project._id)
        console.log("projectId",projectId);   
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
      getUserTaskData();
      dashBoardHandler();
    
     }, [])

     const getProjectTeamData = async ()=>{
      await axios.get(`http://localhost:4000/project_teams`).then(res=>{
        setprojectTeamList(res.data.data)
        console.log("projectUSer",res.data.data)

        const filteredTeam = res.data.data.filter(eachObj => eachObj.project._id === projectId)
        console.log("filtered data for developer: ",filteredTeam);

        const filteredTeamByRole = filteredTeam.filter(eachObj => eachObj.user.role === '626c3b9775332464bdbb6574')
        setuserListFromProject(filteredTeamByRole)
      })
     }
     useEffect(() => {
       getProjectTeamData();
     
      
     }, userListFromProject[0])
     

    const userChangeHandler=(e)=>{
        setuser(e.target.value)
      }
      
      const taskChangeHandler=(e)=>{
        settask(e.target.value)
      }

      
      
      
      const submitForm=(e)=>{
        e.preventDefault();
        
        var formData={
          user:user,
          task:task
         
        }

        axios.post(`http://localhost:4000/user_tasks`,formData).then(res=>{
            alert("New Project Added...");
        })
    }
    
  return (
    <div className='content'>
    <div class="container-fluid">
        
  <form onSubmit={submitForm}>

  <div class="form-group">
    <label for="exampleInputPassword1">Task</label>
    {/* <input type="text" class="form-control"  onChange={(e)=>{taskChangeHandler(e)}}/> */}
    <select class="form-control"  onChange={(e)=>{taskChangeHandler(e)}} required>
      <option value="select status">--- Select Tasks ---</option>
      {
        taskList.map((task)=>{
          return(
          <option value={task._id}>{task.taskTitle}</option>
          )
          
        })        
      }
    </select>
  
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">User</label>
    {/* <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{userChangeHandler(e)}}/> */}

    <select class="form-control"  onChange={(e)=>{userChangeHandler(e)}} required>
      <option value="select status">--- Select Users ---</option>
      {
        userListFromProject.map((projectUser)=>{
          return(
          <option value={projectUser.user._id}>{projectUser.user.firstName}</option>
          )
          
        })        
      }
    </select>
  

  </div> 

 
  <button type="submit" class="btn btn-primary">Submit</button>
  <Link className="addmargin" to={`/${dashBoard}/User_TaskTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
</form>
        
</div>
</div>

  )
}
