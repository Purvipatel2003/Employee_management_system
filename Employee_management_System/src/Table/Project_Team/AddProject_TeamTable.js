import React from 'react'
import { useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { UserContext } from '../../App'
export const AddProject_TeamTable = () => {


  

        const [projectList, setprojectList] = useState([])
        const [userList, setuserList] = useState([])

        const [project, setproject] = useState('')
        const [user, setuser] = useState('')

        const userData = useContext(UserContext);
        const [dashBoard, setdashBoard] = useState("");

        const getProject_teamData = async(e)=>{
          await axios.get(`http://localhost:4000/projects`).then(res=>{
            setprojectList(res.data.data)
          })

          await axios.get(`http://localhost:4000/userByRoleId/626c3b9775332464bdbb6574`).then(res=>{
            setuserList(res.data.data)
          })
        }

        const projectChangeHandler=(e)=>{
            setproject(e.target.value)
        }

        const firstNameChangeHandler=(e)=>{
            setuser(e.target.value)
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
        
          getProject_teamData();
          dashBoardHandler();
        }, [])
        

        const submitForm=(e)=>{
            e.preventDefault();
            
            var formData={
              project:project,
              user:user
             
            }
    
            axios.post(`http://localhost:4000/project_teams`,formData).then(res=>{
                alert("New Project Added...");
            })
        }
    

  return (
    <div className='content'>
      <div class="container-fluid">
    <form onSubmit={submitForm}>
    <div class="form-group">
      <label for="exampleInputEmail1">Project</label>
      {/* <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{projectChangeHandler(e)}} placeholder="Enter The Project Title "/> */}
      <select class="form-control"  onChange={(e)=>{projectChangeHandler(e)}} required>
      <option value="select status">--- Select Status ---</option>
      {
        projectList.map((project)=>{
          return(
          <option value={project._id}>{project.projectTitle}</option>
          )
          
        })        
      }
    </select>
  
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">User</label>
      {/* <textarea rows="3" class="form-control"  onChange={(e)=>{firstNameChangeHandler(e)}}  /> */}

      <select class="form-control"  onChange={(e)=>{firstNameChangeHandler(e)}} required>
      <option value="select status">--- Select Status ---</option>
      {
        userList.map((user)=>{
          return(
          <option value={user._id}>{user.firstName}</option>
          )
          
        })        
      }
    </select>
  
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link className="addmargin" to={`/${dashBoard}/Project_TeamTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
