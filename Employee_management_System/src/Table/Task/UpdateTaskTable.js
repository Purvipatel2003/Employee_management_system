import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export const UpdateTaskTable = () => {
  const userData = useContext(UserContext);
  const [dashBoard, setdashBoard] = useState("");

  const id = useParams().id;

  const navigate = useNavigate()


  const [taskList, settaskList] = useState([]);
  const [statusList, setstatusList] = useState([]);
  const [priorityList, setpriorityList] = useState([]);

  const [project_module, setproject_module] = useState(taskList.project_module);
  const [project, setproject] = useState(taskList.project);
  const [taskTitle, settaskTitle] = useState(taskList.taskTitle);
  const [priority, setpriority] = useState(taskList.priority);
  const [taskDescription, settaskDescription] = useState(
    taskList.taskDescription
  );
  const [status, setstatus] = useState(taskList.status);
  const [taskTotalMinutes, settaskTotalMinutes] = useState(
    taskList.taskTotalMinutes
  );

  const getTaskData = async () => {
    await axios.get(`http://localhost:4000/tasks/${id}`).then((res) => {
      console.log("axios called", res.data.data);
      settaskList(res.data.data);
    });

    await axios.get(`http://localhost:4000/status`).then((res) => {
      setstatusList(res.data.data);
      console.log("status",res.data.data)
    });

    await axios.get(`http://localhost:4000/prioritys`).then((res) => {
      setpriorityList(res.data.data);
    });
  };

  const moduleNameChangeHandler = (e) => {
    setproject_module(e.target.value);
  };

  const projectChangeHandler = (e) => {
    setproject(e.target.value);
  };
  const taskTitleChangeHandler = (e) => {
    settaskTitle(e.target.value);
  };
  const priorityChangeHandler = (e) => {
    setpriority(e.target.value);
  };
  const taskDescriptionChangeHandler = (e) => {
    settaskDescription(e.target.value);
  };
  const statusChangeHandler = (e) => {
    setstatus(e.target.value);
  };
  const taskTotalMinutiesChangeHandler = (e) => {
    settaskTotalMinutes(e.target.value);
  };

  const update = (e) => {
    e.preventDefault();

    var updatedData = {
      project_module: project_module,
      project: project,
      taskTitle: taskTitle,
      priority: priority,
      taskDescription: taskDescription,
      status: status,
      taskTotalMinutes: taskTotalMinutes,
    };
    debugger;
    axios.put(`http://localhost:4000/tasks/${id}`, updatedData).then((res) => {
      alert("updated data....");
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
  useEffect(() => {
    getTaskData();
    dashBoardHandler();
  }, []);

  const isDeveloper = () => {
    return (
      userData &&
      userData.role &&
      userData.role._id === "626c3b9775332464bdbb6574"
    );
  };
  const isProjectManager = () => {
    return (
      userData &&
      userData.role &&
      userData.role._id === "626c3b9075332464bdbb6572"
    );
  };
  return (
    <div className="content">
      <div class="container-fluid">
        {taskList.project_module !== undefined &&
        taskList.project !== undefined &&
        taskList.status !== undefined &&
        taskList.priority !== undefined ? (
          <form onSubmit={update}>
            {isProjectManager() ? (
              <>
                <div class="form-group">
                  <label for="exampleInputEmail1">Module Name</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      moduleNameChangeHandler(e);
                    }}
                    defaultValue={taskList.project_module.moduleName}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Project Name</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      projectChangeHandler(e);
                    }}
                    defaultValue={taskList.project.projectTitle}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      taskTitleChangeHandler(e);
                    }}
                    defaultValue={taskList.taskTitle}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Prority</label>
                  {/* <input type="text" class="form-control" onChange={(e)=>{priorityChangeHandler(e)}} defaultValue={taskList.priority.priorityName}/> */}

                  <select
                    class="form-control"
                    onChange={(e) => {
                      priorityChangeHandler(e);
                    }}
                  >
                    {priorityList.map((priority1) => {
                      if (priority1._id !== taskList.priority._id) {
                        return (
                          <option value={priority1._id}>
                            {priority1.priorityName}
                          </option>
                        );
                      } else {
                        return (
                          <option selected value={priority1._id}>
                            {priority1.priorityName}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      taskDescriptionChangeHandler(e);
                    }}
                    defaultValue={taskList.taskDescription}
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">TotalMinuties</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      taskTotalMinutiesChangeHandler(e);
                    }}
                    defaultValue={taskList.taskTotalMinutes}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            <div class="form-group">
              <label for="exampleInputPassword1">Status</label>
              {/* <input type="text" class="form-control" onChange={(e)=>{statusChangeHandler(e)}} defaultValue={taskList.status.statusName}/> */}

              <select
                class="form-control"
                onChange={(e) => {
                  statusChangeHandler(e);
                }}
              >
                {statusList.map((status1) => {
                  if (status1 && taskList)
                    if (
                      status1 &&
                      taskList &&
                      taskList.status &&
                      status1._id !== taskList.status._id
                    ) {
                      return (
                        <option value={status1._id}>
                          {status1.statusName}
                        </option>
                      );
                    } else {
                      return (
                        <option selected value={status1._id ? status1._id : ""}>
                          {status1.statusName ? status1.statusName : ""}
                        </option>
                      );
                    }
                })}
              </select>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            {/* <Link className="addmargin" to={`/${dashBoard}/TaskTable`}> */}
              <button type="button" onClick={()=>navigate(-1)} className="btn btn-warning addmargin">
                Go Back
              </button>
            {/* </Link> */}
          </form>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};
