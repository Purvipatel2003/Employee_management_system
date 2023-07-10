import React from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useContext,useEffect,useState} from "react";

export const UserProfile = () => {

  const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("");

  // const newdata = userData;
  // console.log("newdata",newdata);



 

  console.log("userId1 in profile.....",userData);
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
      dashBoardHandler();
    
  }, [])


  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title d-inline-flex">Profile</h4>
                
{/*                 
                  <button className="btn btn-warning float-right ">
                    Edit Profile
                  </button> */}
                
              </div>
              
              
              <div class="card-body">
              {
                userData.role !== undefined ?
                <form>
                  <div class="row">
                    <div class="col-md-5 pr-1">
                      <div class="form-group">
                        <label>Company (disabled)</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled=""
                          placeholder="Company"
                          value="Creative Code Inc."
                        />
                      </div>
                    </div>
                    <div class="col-md-3 px-1">
                      <div class="form-group">
                        <label>roleName</label>
                        <input
                          type="text"
                          class="form-control"
                          defaultValue={userData.role.roleName}
                          
                        />
                      </div>
                    </div>
                    <div class="col-md-3 px-1">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                          type="email"
                          class="form-control"
                          defaultValue={userData.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 pr-1">
                      <div class="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Company"
                          value={userData.firstName}
                          
                        />
                      </div>
                    </div>
                    <div class="col-md-6 pl-1">
                      <div class="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last Name"
                          value={userData.lastName}
                          
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Home Address"
                          value={userData.address}
                         
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 pr-1">
                      <div class="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="City"
                          value={userData.city}
                        />
                      </div>
                    </div>
                    <div class="col-md-4 px-1">
                      <div class="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Country"
                          value={userData.country}
                          
                        />
                      </div>
                    </div>
                    <div class="col-md-4 pl-1">
                      <div class="form-group">
                        <label>Postal Code</label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="ZIP Code"
                          value={userData.pinCode}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>About Me</label>
                        <textarea
                          rows="4"
                          cols="80"
                          class="form-control"
                          placeholder="Here can be your description"
                         
                        >
                          Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo.
                        </textarea>
                      </div>
                    </div>
                  </div> */}
                  {/* <button
                    type="submit"
                    class="btn btn-success  pull-right"
                  >
                    Update Profile
                  </button> */}
                  <div class="clearfix"></div>
                </form>
                :"loading...."
              }
              </div>
            </div>
          </div>
          <div class="col-md-4">
                            <div class="card card-user">
                                <div class="card-image">
                                    <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
                                </div>
                                <div class="card-body">
                                    <div class="author">
                                        <p href="#">
                                            <img class="avatar border-gray" src="../assets/img/faces/face-3.jpg" alt="..."/>
                                            <h5 class="title">{userData.firstName} {userData.lastName}</h5>
                                            <h5>{userData.email}</h5>
                                        </p>
                                        {/* <p class="description">
                                            michael24
                                        </p> */}
                                    </div>
                                    {/* <p class="description text-center">
                                        "Lamborghini Mercy
                                        <br/> Your chick she so thirsty
                                        <br/> I'm in that two seat Lambo"
                                    </p> */}
                                </div>
                                {/* <hr/> */}
                                {/* <div class="button-container mr-auto ml-auto">
                                    <button href="#" class="btn btn-simple btn-link btn-icon">
                                        <i class="fa fa-facebook-square"></i>
                                    </button>
                                    <button href="#" class="btn btn-simple btn-link btn-icon">
                                        <i class="fa fa-twitter"></i>
                                    </button>
                                    <button href="#" class="btn btn-simple btn-link btn-icon">
                                        <i class="fa fa-google-plus-square"></i>
                                    </button>
                                </div> */}
                            </div>
                        </div>
        </div>
      </div>
    </div>
  );
};
