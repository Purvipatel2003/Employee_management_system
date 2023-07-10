import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
export const StatusTable = () => {

  const [statusList, setstatusList] = useState([]);


  const getStatusData=()=>{
    axios.get(`http://localhost:4000/status`).then((res)=>{
      console.log(res.data.data);
      setstatusList(res.data.data);
    })
  }


  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/status/` + id).then((res) => {
        console.log("DATA DELETED");
        getStatusData()
    });
  }

  useEffect(() => {
    getStatusData();
  }, []);

  return (
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-plain table-plain-bg">
            <div class="card-header ">
              <p class="card-category">All Status List </p>
              <h4 class="card-title d-inline-flex">Status List</h4>
            <Link to="/AdminDashboard/StatusTable/AddStatus"><button className="btn btn-primary float-right ">Add Project</button></Link>
            </div>
            
            <div class="card-body table-full-width table-responsive">
            
              <table class="table table-hover">
                <thead>
                  <th>Status ID</th>
                  <th>Status Name</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {statusList.map((status) => {
                    return (
                      <tr>
                        <td>{status._id}</td>
                        <td>{status.statusName}</td>
                        <td>
                          <button className="btn btn-danger" onClick={()=>{deleteData(status._id)}}>
                            Delete
                          </button>
                          <Link to={`/AdminDashboard/StatusTable/UpdateStatusTable/${status._id}`}>
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
