import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export const AddStatus = () => {

      const [statusName, setstatusName] = useState('');

  const statusNameChangeHandler=(e)=>{
    setstatusName(e.target.value);
  }

  const submitForm=(e)=>{
    e.preventDefault();
        
    var formData={
      statusName:statusName
    }

    axios.post(`http://localhost:4000/status`,formData).then(res=>{
        alert("New Project Added...");
    })
  }

  return (
    <div className='content'>
      <div class="container-fluid">
    <form onSubmit={submitForm}>
    <div class="form-group">
      <label for="exampleInputEmail1">Status Name</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{statusNameChangeHandler(e)}}/>
  
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link to="/AdminDashboard/StatusTable"><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
