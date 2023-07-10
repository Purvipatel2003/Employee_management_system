import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export const AddRole = () => {


    const [roleName, setRoleName] = useState('')

    const roleNameChangeHandler=(e)=>{
        setRoleName(e.target.value);
      }

      const submitForm=(e)=>{
        e.preventDefault();
            
        var formData={
          roleName:roleName
        }
    
        axios.post(`http://localhost:4000/roles`,formData).then(res=>{
            alert("New Project Added...");
        })
      }

  return (
    <div className='content'>
    <div class="container-fluid">
  <form onSubmit={submitForm}>
  <div class="form-group">
    <label for="exampleInputEmail1">Role Name</label>
    <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{roleNameChangeHandler(e)}}/>

  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
  <Link to="/AdminDashboard/RoleTable"><button type='button' className='btn btn-warning'>Go Back</button></Link>
</form>
</div>
</div>
  )
}
