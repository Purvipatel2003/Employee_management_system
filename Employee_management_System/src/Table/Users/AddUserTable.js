import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
export const AddUserTable = () => {


  const [roleList, setroleList] = useState([])

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
  const [lastName, setlastName] = useState('')
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [country, setcountry] = useState('')
  const [pinCode, setpinCode] = useState('')

  const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("")
  
  const getRoleData = async(e)=>{
    await axios.get(`http://localhost:4000/roles`).then((res)=>{
            setroleList(res.data.data)
            console.log("roleList: ",res.data.data)
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
    getRoleData();
    dashBoardHandler();
  
  
  }, [])
  

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

const submitForm=(e)=>{
  e.preventDefault();
  
  var formData={
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

  axios.post(`http://localhost:4000/users`,formData).then(res=>{
      alert("New Project Added...");
  })
}


  return (
    <div className='content'>
      <div class="container-fluid">
    <form onSubmit={submitForm}>
    <div class="form-group">
      <label for="exampleInputEmail1">FirstName</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{firstNameChangeHandler(e)}}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">LastName</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{lastNameChangeHandler(e)}}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Email</label>
      <input type="text" class="form-control"  onChange={(e)=>{emailChangeHandler(e)}} />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="text" class="form-control"  onChange={(e)=>{passwordChangeHandler(e)}}/>
    </div>
    
    <div class="form-group">
      <label for="exampleInputPassword1">Role</label>
      {/* <input type="text" class="form-control" onChange={(e)=>{prorityChangeHandler(e)}} /> */}
      <select class="form-control"  onChange={(e)=>{roleChangeHandler(e)}} required>
      <option value="select role">--- Select Role ---</option>
      {
        roleList.map((role)=>{
          return(
          <option value={role._id}>{role.roleName}</option>
          )
          
        })        
      }
    </select>
    </div>

  
    <div class="form-group">
      <label for="exampleInputEmail1">Address</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{AddressChangeHandler(e)}}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">City</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{cityChangeHandler(e)}}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Country</label>
      <input type="text" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{countryChangeHandler(e)}}/>
  
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Pincode</label>
      <input type="number" class="form-control"  aria-describedby="emailHelp" onChange={(e)=>{pincodeChangeHandler(e)}}/>
  
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <Link className="addmargin" to={`/${dashBoard}/UserTable`}><button type='button' className='btn btn-warning'>Go Back</button></Link>
  </form>
  </div>
  </div>

  )
}
