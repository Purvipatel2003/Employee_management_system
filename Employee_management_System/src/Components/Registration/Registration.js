import React from 'react'
import { useEffect } from 'react';
import "../Registration/Registration.css";

import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const Registration = () => {
    
    const [roleList, setroleList] = useState([])
    const [firstName, setfirstName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [role, setrole] = useState('')

    const getRoleData=async(e)=>{

       await axios.get(`http://localhost:4000/roles`).then((res)=>{
           console.log(res.data.data)
           setroleList(res.data.data)
           
       })
    }

    useEffect(() => {
      
    getRoleData();
      
    }, [])
    
    const firstNameChangeHandler=(e)=>{
        setfirstName(e.target.value)
    }

    const emailChangeHandler=(e)=>{
        setemail(e.target.value)
    }

    const passwordChangeHandler=(e)=>{
        setpassword(e.target.value)
    }
    const roleNameChangeHandler=(e)=>{
      
        setrole(e.target.value)
        
    }

    const submitForm =(e)=>{
        e.preventDefault();

        var registrationData={
            firstName:firstName,
            email:email,
            password:password,
            role:role
        }

        if(roleList.role !== undefined || role !== '' && role !== "select role"){

        axios.post(`http://localhost:4000/users`,registrationData).then((res)=>{
            alert("Add New Users");
        })
    }
    else{
        alert("please select role")
    }
    }
  return (
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div class="card card0 border-0">
                <div class="row d-flex">
                    <div class="col-lg-6">
                        <div class="card1 pb-5">
                            <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="../assets/img/registration.jpg" class="image1"/> </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card2 card border-0 px-4 py-5">
                            <div class="row mb-4 px-3">
                                <h2 class="mb-0 mr-4 mt-2">Registration</h2>
                            </div>
                            <form onSubmit={submitForm}>
                            <div class="row px-3"> <label class="mb-1">
                                <h6 class="mb-0 text-sm">FirstName</h6>
                            </label>
                             <input class="mb-4 " type="text" name="firstName" onChange={(e)=>{firstNameChangeHandler(e)}} placeholder="Enter FirstName" required />
                             
                              </div>
                            <div class="row px-3"> <label class="mb-1">
                                <h6 class="mb-0 text-sm">Email Address</h6>
                            </label>
                             <input class="mb-4 " type="email" name="email" onChange={(e)=>{emailChangeHandler(e)}} placeholder="Enter a valid email address" required />
                             
                              </div>
                            <div class="row px-3"> <label class="mb-1">
                                <h6 class="mb-0 text-sm">Password</h6>
                            </label> <input class="mb-4" type="password" name="password" onChange={(e)=>{passwordChangeHandler(e)}}  placeholder="Enter password" required/> 
                            </div>
                                
                            <div class="row px-3"> <label class="mb-1">
                                <h6 class="mb-0 text-sm">RoleName</h6>
                            </label>
                             <select class="mb-4 form-control form-control selectcss" onChange={(e)=>{roleNameChangeHandler(e)}} required>
                                    <option value="select role">Select Role</option>
                                    <option value="626c3b7675332464bdbb6570">Admin</option>
                                    <option value="626c3b9075332464bdbb6572">manager</option>
                                    <option value="626c3b9775332464bdbb6574">developer</option>

                                 {
                                     roleList.map((role)=>{
                                        console.log("role--------------------------------------",role);
                                         if(role._id == '626c3b7675332464bdbb6570'){

                                         
                                         return(
                                             
                                         <option value={role._id}>{role.roleName}</option>
                                         )
                                         }  
                                     })
                                    
                                 }
                               
                             </select> 
                              </div>
                            
                            
                            <div class="row mb-3 px-3">
                                {/* <Link to="/AdminDashboard">  */}
                                <button type='submit' className="btn btn-primary text-center">Registration</button>
                                {/* </Link> */}
                             {/* <button type="submit" class="btn btn-primary text-center" onClick={onClickHandler}>Login</button> */}
                              </div>
                              </form>
                            <div class="row mb-4 px-3"> <small class="font-weight-bold">Already have an account? <Link to="/" class="text-danger ">Login</Link></small> </div>
                        </div>
                    </div>
                </div>
                <div class="bg-blue py-4">
                    <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2023. All rights reserved.</small>
                    </div>
                </div>
            </div>
        </div>
 
  )
}
