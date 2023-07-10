import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
export const ApproveUser = () => {

    const [userList, setuserList] = useState([])
    const [isApproved, setisApproved] = useState("")
    // const [filteredUser, setfilteredUser] = useState([])


    const getUserData=()=>{
        axios.get(`http://localhost:4000/users`).then(res=>{
            setuserList(res.data.data)
        })
    }

    const approved = (id)=>{
        setisApproved(true)
        var updateUser = {
          isApproved: isApproved
        }
  
        axios.put(`http://localhost:4000/users/${id}`, updateUser).then((res)=>{
          console.log("Update: ",updateUser)
          getUserData()
        })
      }
      const rejected = (id)=>{
        setisApproved(false)
        var updateUser = {
          isApproved: isApproved
        }
  
        axios.put(`http://localhost:4000/users/${id}`, updateUser).then((res)=>{
          console.log("Update: ",updateUser)
          getUserData()
        })
      }

      useEffect(() => {
          getUserData();
      
      }, [])
      

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All Users List </p>
                <h4 class="card-title d-inline-flex">Users List</h4>
              {/* <Link to={`/${dashBoard}/UserTable/AddUserTable`}><button className="btn btn-primary float-right ">Add User</button></Link> */}
              </div>
              <br></br>
              {/* <div>
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
              </div> */}
              
              <div class="card-body table-full-width table-responsive">
              
                <table class="table table-hover">
                  <thead>
                    <th>User ID</th>
                    <th>FirstName</th>
                    {/* <th>LastName</th> */}
                    {/* <th>Email</th> */}
                    {/* <th>Password</th> */}
                    {/* <th>Role</th> */}
                    <th>IsApprove</th>
                  </thead>
                  <tbody>
                    {
                    userList != undefined ?
                    userList.map((user) => {
                        if(user.isApproved === undefined){
                      return (
                        <tr>
                          <td>{user._id}</td>
                          <td>{user.firstName}</td>
                          {/* <td>{user.lastName}</td> */}
                          <td>
                              
                                <button className='btn btn-success' onClick={(e)=>{approved(user._id)}}>Approve</button>
                                <button className='btn btn-danger' onClick={(e)=>{rejected(user._id)}}>Reject</button>
                              
                          </td>
                        </tr>
                      );
                        }
                    }
                    )
                :""}
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
