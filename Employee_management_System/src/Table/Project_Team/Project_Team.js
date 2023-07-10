import React from "react";
import { useState,useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

export const Project_Team = () => {
  const [project_teamList, setproject_teamList] = useState([]);

  const [filteredProjectTeam, setfilteredProjectTeam] = useState(project_teamList);
  const [roleList, setroleList] = useState([]);

  const [role, setrole] = useState("All")

  const userData = useContext(UserContext)

  const [dashBoard, setdashBoard] = useState('');

  const getRoleData =()=>{
    axios.get(`http://localhost:4000/roles`).then(res=>{
      setroleList(res.data.data);

    })
  } 

  
  
  const roleHandler=(e)=>{
    setrole(e.target.value)
    console.log("selected role",e.target.value);
  }

  const getProject_TeamData = async() => {
    axios.get(`http://localhost:4000/project_teams`).then((res) => {
      console.log(res.data.data);
      setproject_teamList(res.data.data);

        if(role != "All"){

          const filteredTeam = res.data.data.filter(eachObj => eachObj.user.role === role)
          console.log("fileterTeam",filteredTeam);
          setfilteredProjectTeam(filteredTeam)
        }
        else{
          setfilteredProjectTeam(res.data.data)
          console.log(("in else",res.data.data));
        }

      
    });
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/project_teams/` + id).then((res) => {
      console.log("DATA DELETED");
      getProject_TeamData();
    });
  };

  
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
    getProject_TeamData();
    getRoleData();
    dashBoardHandler();
  }, [role]);


  
  const isProjectManager=()=>{
    return(
      userData &&
      userData.role &&
      userData.role._id === "626c3b9075332464bdbb6572"
    )
    }

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All project_Team List </p>
                <h4 class="card-title d-inline-flex">Project_Team List</h4>

               
                <Link to={`/${dashBoard}/Project_TeamTable/AddProject_TeamTable`}>
                  <button className="btn btn-primary float-right ">
                    Add Project_Team
                  </button>
                </Link>
              </div>
              <br></br>
              <div>
                <select
                  type="text"
                  className="form-control"
                  id="exampleInputText1"
                  onChange={(e)=>{roleHandler(e)}}
                >
                  <option value="All">All</option>
                  {
                    roleList.map((role1)=>{
                      if(role1._id != "626c3b7675332464bdbb6570"){

                        return(
                          <option value={role1._id}>{role1.roleName}</option>
                        )
                      }
                    })
                  }
                </select>
              </div>
               {/* <div class="btn-group">
                  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    All
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Project Manager</a>
                    <a class="dropdown-item" href="#">Developer</a>
                  </div>
                </div> */}
              <div class="card-body table-full-width table-responsive">
                <table class="table table-hover">
                  <thead>
                    <th>Project_Team ID</th>
                    <th>Project</th>
                    <th>Users</th>
                 {isProjectManager() ? <th>Action</th> :("")}   
                  </thead>
                  <tbody>
                    {filteredProjectTeam.map((project_team) => {
                      return (
                        <tr>
                          <td>{project_team._id}</td>
                          <td>{project_team.project.projectTitle}</td>
                          <td>{project_team.user.firstName}</td>

                         {isProjectManager() ? 
                         <td>
                         <button
                           className="btn btn-danger"
                           onClick={() => {
                             deleteData(project_team._id);
                           }}
                         >
                           Delete
                         </button>
                         <Link className="addmargin"
                           to={`/${dashBoard}/Project_TeamTable/UpdateProject_TeamTable/${project_team._id}`}
                         >
                           <button className="btn btn-success">
                             Update
                           </button>
                         </Link>
                       </td>: ("")} 
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
