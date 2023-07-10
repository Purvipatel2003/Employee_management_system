import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../App';

export const UpdateProject_TeamTable = () => {

  const id = useParams().id;

  const navigate = useNavigate();

  const [project_teamList, setproject_teamList] = useState([]);
  const [project, setproject] = useState(project_teamList.project);
  const [user, setuser] = useState(project_teamList.user);
  const [projectList, setprojectList] = useState([]);
  const [userList, setuserList] = useState([]);


  const userData = useContext(UserContext);

  const [dashBoard, setdashBoard] = useState("");



  const getProject_TeamData = async () => {
    await axios.get(`http://localhost:4000/project_teams/${id}`).then((res) => {
      console.log("axios.get called in updATE PROJECT MODULE", res.data.data)
      setproject_teamList(res.data.data[0])
    })

    await axios.get(`http://localhost:4000/projects`).then(res => {
      setprojectList(res.data.data)
    })

    await axios.get(`http://localhost:4000/userByRoleId/626c3b9775332464bdbb6574`).then(res => {
      setuserList(res.data.data)
    })
  }
  const dashBoardHandler = () => {


    if (userData && userData.role && userData.role._id === "626c3b7675332464bdbb6570") {
      setdashBoard("AdminDashboard");
    }
    else if (userData && userData.role && userData.role._id === "626c3b9075332464bdbb6572") {
      setdashBoard("ProjectManagerDashboard");
    }
    else if (userData && userData.role && userData.role._id === "626c3b9775332464bdbb6574") {
      setdashBoard("DeveloperDashboard");
    }
    else {
      setdashBoard("none");
    }

  }

  useEffect(() => {
    getProject_TeamData();
    dashBoardHandler();
  }, []);


  const projectChangeHandler = (e) => {
    setproject(e.target.value);
  }

  const userChangeHandler = (e) => {
    setuser(e.target.value)
  }

  const update = (e) => {
    e.preventDefault();

    var updatedData = {
      project: project,
      user: user
    }

    axios.put(`http://localhost:4000/project_teams/${id}`, updatedData).then(res => {
      alert("updated data....")
    })
  }

  const getProjectvalue = () => {
    if (project_teamList && project_teamList.project) {
      console.log(projectList);
      // debugger;
      return project_teamList.project._id;

    }
    return '';
  }

  const getUservalue = () => {
    if (project_teamList && project_teamList.user) {
      console.log(userList);
      // debugger;
      return project_teamList.user._id;

    }
    return '';
  }

  return (
    <div className='content'>
      <div class="container-fluid">

        {
          project_teamList != undefined ?

            <form onSubmit={update}>

              <div class="form-group">
                <label for="exampleInputEmail1">Project</label>
               

<select class="form-control"  onChange={(e)=>{projectChangeHandler(e)}} required>
      <option value="select project">--- Select Project ---</option>
      {
         projectList.map((project)=>{
          if(project._id !== project_teamList.project._id){
            return(
             <option value={project._id} >{project.projectTitle}</option>
            ) 
           }
           else{
             return(
               <option selected value={project._id} >{project.projectTitle}</option>
             )
           }
           
          
        })     
      }
    </select>
    </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Users</label>
                {/* <input type="text" class="form-control"  onChange={(e)=>{firstNameChangeHandler(e)}} defaultValue = {project_teamList.user.firstName}/> */}
        <select class="form-control"  onChange={(e)=>{userChangeHandler(e)}} required>
      <option value="select user">--- Select User ---</option>
      {
         userList.map((user)=>{
          if(user._id !== project_teamList.user._id){
            return(
             <option value={user._id} >{user.firstName}</option>
            ) 
           }
           else{
             return(
               <option selected value={user._id} >{user.firstName}</option>
             )
           }
           
          
        })     
      }
    </select>
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
              {/* <Link className="addmargin" to={`/${dashBoard}/Project_TeamTable`}> */}
              <button type='button' onClick={() => navigate(-1)} className='btn btn-warning'>Go Back</button>
              {/* </Link> */}
            </form>
            : "loading..."
        }
      </div>
    </div>

  )
}
