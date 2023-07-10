import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const UpdateRoleTable = () => {

    const id = useParams().id;

    const [roleList, setroleList] = useState('');
    const [roleName, setRoleName] = useState(roleList.roleName)

    const getRoleData=()=>{
        axios.get(`http://localhost:4000/roles/${id}`).then((res)=>{
          console.log(res.data.data);
          setroleList(res.data.data);
        })
      }

      const roleNameChangeHandler=(e)=>{
        setRoleName(e.target.value);
      }

      const update=(e)=>{
        e.preventDefault();

        var updatedData={
           roleName:roleName
        }

        axios.put(`http://localhost:4000/roles/${id}`,updatedData).then(res=>{
            alert("updated data....")
        })
    
      }

      useEffect(() => {
        getRoleData();
      
      },[])

  return (
    <div className='content'>
      <div class="container-fluid">
    <form onSubmit={update}>
    <div class="form-group">
      <label for="exampleInputEmail1">Role Name</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{roleNameChangeHandler(e)}} defaultValue={roleList.roleName}/>
  
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link to="/AdminDashboard/RoleTable"><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
