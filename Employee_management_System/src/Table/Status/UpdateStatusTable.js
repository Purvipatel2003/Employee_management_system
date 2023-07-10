
import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export const UpdateStatusTable = () => {

      const id = useParams().id;

        const [statusList, setstatusList] = useState('');
        const [statusName, setStatusName] = useState(statusList.statusName)

      
        const getStatusData=()=>{
          axios.get(`http://localhost:4000/status/${id}`).then((res)=>{
            console.log(res.data.data);
            setstatusList(res.data.data);
          })
        }

        const statusNameChangeHandler=(e)=>{
          setStatusName(e.target.value);
        }

        const update=(e)=>{
          e.preventDefault();

          var updatedData={
             statusName:statusName
          }
  
          axios.put(`http://localhost:4000/status/${id}`,updatedData).then(res=>{
              alert("updated data....")
          })
      
        }

        useEffect(() => {
          getStatusData();
        
        }, [])
        
      
  return (
    <div className='content'>
      <div class="container-fluid">
    <form onSubmit={update}>
    <div class="form-group">
      <label for="exampleInputEmail1">Status Name</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{statusNameChangeHandler(e)}} defaultValue={statusList.statusName}/>
  
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link to="/AdminDashboard/StatusTable"><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>
  )
}
