import axios from 'axios';
import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
export const UserTable = () => {

    const [userList, setuserList] = useState([]);


    const [role, setrole] = useState("All");

    const [filteredUser, setfilteredUser] = useState(userList);
  const [roleList, setroleList] = useState([]);

    const userData = useContext(UserContext);
    const [dashBoard, setdashBoard] = useState("");



    const getRoleData =async()=>{
      await axios.get(`http://localhost:4000/roles`).then(res=>{
         setroleList(res.data.data);
       }) 

    }

    const getUserData=async()=>{

       await axios.get(`http://localhost:4000/users`).then(res=>{
            console.log(res.data.data)
            setuserList(res.data.data)

            if(role != "All"){

              const filteredTeam = res.data.data.filter(eachObj => eachObj.role._id === role)
              console.log("fileterUser",filteredTeam);
              setfilteredUser(filteredTeam)
            }
            else{
              setfilteredUser(res.data.data)
              console.log(("in else",res.data.data));
            }
    
          
        });
        };
       

    

   

    const UserdeleteData=(id)=>{
        axios.delete(`http://localhost:4000/users/`+ id).then(res=>{
            console.log("data delted....");
            getUserData();
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

   


    const roleHandler=(e)=>{
      setrole(e.target.value)
      console.log("selected role",e.target.value);
    }
    useEffect(() => {
      getUserData();
      getRoleData();
    dashBoardHandler();
      
    }, [role])
    

    const isAdminUser = () => {
      return (
        userData &&
        userData.role &&
        userData.role._id === "626c3b7675332464bdbb6570"
      );
    };
    
    
  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All Users List </p>
                <h4 class="card-title d-inline-flex">Users List</h4>
                {
                  isAdminUser() ?
                  <Link to={`/${dashBoard}/UserTable/AddUserTable`}><button className="btn btn-primary float-right ">Add User</button></Link>
                
                :""
                }
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
                      }
                    )
                  }
                </select>
              </div>
              
              <div class="card-body table-full-width table-responsive">
              
                <table class="table table-hover">
                  <thead>
                    <th>User ID</th>
                    <th>FirstName</th>
                    {/* <th>LastName</th> */}
                    <th>Email</th>
                    {/* <th>Password</th> */}
                    <th>Role</th>
                   {isAdminUser() ? <th>Action</th>:""}
                  </thead>
                  <tbody>
                    {filteredUser.map((user) => {
                      return (
                        <tr>
                          <td>{user._id}</td>
                          <td>{user.firstName}</td>
                          {/* <td>{user.lastName}</td> */}
                          <td>{user.email}</td>
                          {/* <td>{user.password}</td> */}
                          <td>{user.role.roleName}</td>
                         {isAdminUser() ?
                          (<td>
                            
                            <button className="btn btn-danger" onClick={()=>{UserdeleteData(user._id)}}>
                              Delete
                            </button>
                            <Link className="addmargin" to={`/${dashBoard}/UserTable/UpdateUserTable/${user._id}`}>
                              <button className="btn btn-success">Update</button>
                            </Link>
                          </td>)
                          :""} 
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

  )
}
