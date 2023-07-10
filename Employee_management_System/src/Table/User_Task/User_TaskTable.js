import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import { Loader } from "../../Components/Loader/Loader";

export const User_TaskTable = () => {

  
  const [user_taskList, setuser_taskList] = useState([]);

  // const id = useParams().id;

  const userRole = useContext(UserContext);
  const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("");

  const [userList, setuserList] = useState([]);
  const [user, setuser] = useState("All");
  const [filteredUser, setfilteredUser] = useState([]);

  const [filteredUserList, setfilteredUserList] = useState([])
  const [uniqueChars, setuniqueChars] = useState([])

  const [isLoading, setisLoading] = useState(false);

  const userId = useContext(UserContext);

  

  const getUser_TaskData = async () => {

    console.log('dsafkjladfsl',userRole);

    console.log("user_Task userId",userId);


   await axios.get(`http://localhost:4000/user_tasks`).then((res) => {
      console.log("User_task:   ", res.data.data);
      setuser_taskList(res.data.data);

      if(userList.length ==0){
        for(let i=0; i<res.data.data.length; i++){
          userList.push(res.data.data[i].user)
        }
      }

      const newOne = userList.filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i)
        setfilteredUserList(newOne)
        console.log("newOne",newOne);

      console.log("before if",user);
      if(user != "All"){
        const filteredUser = res.data.data.filter((eachObj => eachObj.user._id == user))
        console.log("filtered users",filteredUser);
        setfilteredUser(filteredUser)
      }
      else{
        setfilteredUser(res.data.data)
      }

      // const filterTaskByDeveloper = res.data.data.filter(eachObj => eachObj.user_task.user._id ===  )
      // console.log("filterTask",filterTaskByDeveloper);
    });
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/user_tasks/` + id).then((res) => {
      console.log("DATA DELETED");
      getUser_TaskData();
    });
  };

 
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

  const userChangeHandler =(e)=>{
    setuser(e.target.value);
    console.log("users :",e.target.value);
  }

  useEffect(() => {
    getUser_TaskData();
    dashBoardHandler();
  }, [user]);


  const isProjectManager=()=>{
    return(
      userData &&
      userData.role &&
      userData.role._id === "626c3b9075332464bdbb6572"
    )
    }

    useEffect(() => {
      setisLoading(true);
      setTimeout(()=>{
        setisLoading(false)
      },1000);
      
    }, [])

    if(!userList && !user_taskList){
      return(
        <>
        <Loader/>
        </>
      )
    }
    

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All User_Task List </p>
                <h4 class="card-title d-inline-flex">User_Task List</h4>
                {/* <Link to={`/${dashBoard}/User_TaskTable/AddUser_TaskTable`}>
                  <button className="btn btn-primary float-right ">
                    Add User_Task
                  </button>
                </Link> */}
              </div>
              <br></br>
              <div>
                <select
                  type="text"
                  className="form-control"
                  id="exampleInputText1"
                  onChange={(e)=>{userChangeHandler(e)}}
                >
                  <option value="All">All</option>
                    {
                      filteredUserList != undefined ?
                      filteredUserList.map((user3)=>{

                        return(
                          <option value={user3._id}>{user3.firstName}</option>
                        )
                      })
                      :""
                    }
                </select>
              </div>

              <div class="card-body table-full-width table-responsive">
                <table class="table table-hover">
                  <thead>
                    <th>User_Task ID</th>
                    <th>Users</th>
                    <th>Task</th>
                    {isProjectManager() ?<th>Action</th>:("")}
                  </thead>
                  <tbody>
                    {filteredUser.map((user_task) => {
                      return (
                        <tr>
                          <td>{user_task._id}</td>
                          <td>{user_task.user.firstName}</td>
                          <td>{user_task.task.taskTitle}</td>
                          {isProjectManager()?<td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                deleteData(user_task._id);
                              }}
                            >
                              Delete
                            </button>
                            <Link className="addmargin"
                              to={`/${dashBoard}/User_TaskTable/UpdateUser_TaskTable/${user_task._id}`}
                            >
                              <button className="btn btn-success">
                                Update
                              </button>
                            </Link>
                          </td>
                          :("")
                          }
                          
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
  );
};
