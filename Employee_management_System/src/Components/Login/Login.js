import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import "../Login/Login.css";
// import { useState } from 'react';
import axios from 'axios';

export const Login = ({authenticate}) => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    var navigate = useNavigate();

    const emailChangeHandler=(e)=>{
        setemail(e.target.value)
    }
    const passwordChangeHandler=(e)=>{
        setpassword(e.target.value)
    }
    const submitForm = async (e)=>{
        e.preventDefault();

        var loginData={
            email:email,
            password:password
        }

        await axios.post(`http://localhost:4000/login`,loginData).then((res)=>{


            if(res.data.status == 200){

                console.log("axios post called",res.data.data)

                console.log("email :",res.data.data.email);
                console.log("roleName :",res.data.data.role.roleName);

                console.log("login userId",res.data.data._id);

                localStorage.setItem('email',res.data.data.email)
                localStorage.setItem('role',res.data.data.role.roleName)
                localStorage.setItem('roleId',res.data.data.role._id)

                localStorage.setItem('userId',res.data.data._id);

                authenticate && authenticate(true,res.data.data.role._id,res.data.data._id);
                

                if(res.data.data.isApproved === true){

                if(res.data.data.role._id === "626c3b7675332464bdbb6570")
                {
                    navigate('/AdminDashboard')
                }
                else if(res.data.data.role._id === "626c3b9075332464bdbb6572")
                {
                    navigate('/ProjectManagerDashboard')
                }
                else if(res.data.data.role._id === "626c3b9775332464bdbb6574")
                {
                    navigate('/DeveloperDashboard')
                }
            }else{

                alert(`User is not Approved by Admin!! please wait for approval by admin`)
                document.getElementById("form1Email").value=null;
                document.getElementById("form1Password").value=null;
            }
                
            }
            else{
                console.log("Invalid credentials",res.data.data)

                alert("Invalid Credentials") 
                localStorage.removeItem("email")
                localStorage.removeItem("role")
                document.getElementById("form1Email").value=null;
                document.getElementById("form1Password").value=null;
            }
        })
        
    }
  return (


<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div class="card card0 border-0">
                <div class="row d-flex">
                    <div class="col-lg-6">
                        <div class="card1 pb-5">
                            <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="../assets/img/login.png" class="image"/> </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card2 card border-0 px-4 py-5">
                            <div class="row mb-4 px-3">
                                <h2 class="mb-0 mr-4 mt-2">Login</h2>
                            </div>
                            <form onSubmit={submitForm}>
                            <div class="row px-3"> <label class="mb-1">
                                <h6 class="mb-0 text-sm">Email Address</h6>
                            </label>
                             <input class="mb-4 " type="email" name="email" id='form1Email' onChange={(e)=>{emailChangeHandler(e)}} placeholder="Enter a valid email address" required />
                             
                              </div>
                            <div class="row px-3"> <label class="mb-1">
                                <h6 class="mb-0 text-sm">Password</h6>
                            </label> <input type="password" name="password" id='form1Password' onChange={(e)=>{passwordChangeHandler(e)}}  placeholder="Enter password" required/> </div>
                            
                            <div class="row px-3 mb-4">
                                {/* <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a> */}
                            </div>
                            <div class="row mb-3 px-3">
                                {/* <Link to="/AdminDashboard">  */}
                                <button type='submit' className="btn btn-primary text-center">Login</button>
                                {/* </Link> */}
                             {/* <button type="submit" class="btn btn-primary text-center" onClick={onClickHandler}>Login</button> */}
                              </div>
                              </form>
                            <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account? <Link to="/Registration" class="text-danger ">Register</Link></small> </div>
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