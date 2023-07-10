import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState,useContext } from 'react'
import { useEffect } from 'react';
import { UserContext } from '../../App';

export const UpdateUserTable = () => {

    const id=useParams().id;

    const [roleList, setroleList] = useState([]);

    const [userList, setuserList] = useState([]);
    const [firstName, setFirstName] = useState(userList.firstName);
    const [email, setEmail] = useState(userList.email);
    const [password, setpassword] = useState(userList.password);
    const [role, setrole] = useState(userList.role)
    const [lastName, setlastName] = useState(userList.lastName)
    const [address, setaddress] = useState(userList.address)
    const [city, setcity] = useState(userList.city)
    const [country, setcountry] = useState(userList.country)
    const [pinCode, setpinCode] = useState(userList.pinCode)

    const userData = useContext(UserContext);
    const [dashBoard, setdashBoard] = useState("");

    const getUserData = async()=>{

      await  axios.get(`http://localhost:4000/users/${id}`).then(res=>{
            console.log("axios called",res.data.data);
            setuserList(res.data.data);
        })
      await axios.get(`http://localhost:4000/roles`).then(res=>{
        console.log("axios called",res.data.data);
        setroleList(res.data.data);
    })  
    }

    const firstNameChangeHandler=(e)=>{
        setFirstName(e.target.value);
    }

    const emailChangeHandler=(e)=>{
        setEmail(e.target.value);
    }

    const passwordChangeHandler=(e)=>{
        setpassword(e.target.value);
    }

    const roleChangeHandler=(e)=>{
        setrole(e.target.value);
    }

    const lastNameChangeHandler =(e)=>{
      setlastName(e.target.value);
    }
    
    const AddressChangeHandler = (e)=>{
      setaddress(e.target.value);
    }
    
    const cityChangeHandler=(e)=>{
      setcity(e.target.value);
    
    }
    const countryChangeHandler=(e)=>{
      setcountry(e.target.value)
    }
    const pincodeChangeHandler=(e)=>{
      setpinCode(e.target.value)
    }

    const update=(e)=>{
        e.preventDefault();

        var updatedData={
            firstName:firstName,
            email:email,
            password:password,
            role:role,
            lastName:lastName,
            address:address,
            city:city,
            country:country,
            pinCode:pinCode
        }
        axios.put(`http://localhost:4000/users/${id}`,updatedData).then(res=>{
            alert("updated data....")
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

    useEffect(() => {
      getUserData();
      dashBoardHandler();
      console.log("useEffect called....")

    },[])
    


    return (
    <div className='content'>
      <div class="container-fluid">
        {
          userList.role !== undefined ?
        
    <form onSubmit={update}>
    <div class="form-group">
      <label for="exampleInputEmail1">FirstName</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{firstNameChangeHandler(e)}} defaultValue={userList.firstName}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">LastName</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{lastNameChangeHandler(e)}} defaultValue={userList.lastName}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Email</label>
      <input type="text" class="form-control"  onChange={(e)=>{emailChangeHandler(e)}} defaultValue={userList.email} />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="text" class="form-control"  onChange={(e)=>{passwordChangeHandler(e)}} defaultValue={userList.password}/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Role</label>
      {/* <input type="text" class="form-control" onChange={(e)=>{prorityChangeHandler(e)}} /> */}
      <select class="form-control"  onChange={(e)=>{roleChangeHandler(e)}} required>
      <option value="select role">--- Select Role ---</option>
      {
         roleList.map((role)=>{
          if(role._id !== userList.role._id){
            return(
             <option value={role._id} >{role.roleName}</option>
            ) 
           }
           else{
             return(
               <option selected value={role._id} >{role.roleName}</option>
             )
           }
           
          
        })     
      }
    </select>
    </div>

    <div class="form-group">
      <label for="exampleInputEmail1">Address</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{AddressChangeHandler(e)}} defaultValue={userList.address}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">City</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{cityChangeHandler(e)}} defaultValue={userList.city}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Country</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{countryChangeHandler(e)}} defaultValue={userList.country} />
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Pincode</label>
      <input type="number" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{pincodeChangeHandler(e)}} defaultValue={userList.pinCode}/>
  
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link to={`/${dashBoard}/UserTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
    :"loading...."
    }
  </div>
  </div>
  )
}