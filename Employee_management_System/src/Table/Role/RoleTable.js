import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export const RoleTable = () => {

    const [roleList, setroleList] = useState([])

    const getRoleData=()=>{
        axios.get(`http://localhost:4000/roles`).then((res)=>{
          console.log(res.data.data);
          setroleList(res.data.data);
        })
      }
    
    
      const deleteData = (id) => {
        axios.delete(`http://localhost:4000/roles/` + id).then((res) => {
            console.log("DATA DELETED");
            getRoleData()
        });
      }
    
      useEffect(() => {
        getRoleData();
      }, []);
  return (
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-plain table-plain-bg">
            <div class="card-header ">
              <p class="card-category">All Role List </p>
              <h4 class="card-title d-inline-flex">Role List</h4>
            <Link to="/AdminDashboard/RoleTable/AddRole"><button className="btn btn-primary float-right ">Add Role</button></Link>
            </div>
            
            <div class="card-body table-full-width table-responsive">
            
              <table class="table table-hover">
                <thead>
                  <th>Role ID</th>
                  <th>Role Name</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {roleList.map((role) => {
                    return (
                      <tr>
                        <td>{role._id}</td>
                        <td>{role.roleName}</td>
                        <td>
                          <button className="btn btn-danger" onClick={()=>{deleteData(role._id)}}>
                            Delete
                          </button>
                          <Link to={`/AdminDashboard/RoleTable/UpdateRoleTable/${role._id}`}>
                            <button className="btn btn-success">Update</button>
                          </Link>
                        </td>
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
