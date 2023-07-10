import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AssignProjectManagerProject } from "../Project_Team/AssignProjectManagerProject";
import { CardUserTask } from "../Task/CardUserTask";

import { UserContext } from "../../App";

export const ProjectTable = () => {
  const id = useParams().id;
  const [projectList, setprojectList] = useState([]);

  const userData = useContext(UserContext);

  const [dashBoard, setdashBoard] = useState("");
  console.log("rohit", userData);


  const getProjectData = () => {
    axios.get(`http://localhost:4000/projects`).then((res) => {
      console.log(res.data.data);
      setprojectList(res.data.data);
    });
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/projects/` + id).then((res) => {
      console.log("DATA DELETED");
      getProjectData();
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
    // if (userData) {
    getProjectData();
    dashBoardHandler();
    // }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const isAdminUser = () => {
    return (
      userData &&
      userData.role &&
      userData.role._id === "626c3b7675332464bdbb6570"
    );
  };
  
  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All project List </p>
                <h4 class="card-title d-inline-flex">Project List</h4>
                {isAdminUser() ? (
                  <button
                    className="addmargin btn btn-info"
                    onClick={togglePopup}
                  >
                    Assign
                  </button>
                ) : (
                  ""
                )}

                {isAdminUser() ? (
                  <Link to={`/${dashBoard}/ProjectTable/AddProject`}>
                    <button className="btn btn-primary float-right">
                      Add Project
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>

              <div class="card-body table-full-width table-responsive">
                <table class="table table-hover">
                  <thead>
                    <th>Project ID</th>
                    <th>Project Title</th>
                    <th>Description</th>
                    <th>Technology</th>
                    <th>Priority</th>
                    <th>Estimated Hours</th>
                    <th>ProjectStart Date</th>
                    <th>Completion Date</th>
                    {isAdminUser() ? (
                      <th>Action</th>
                    ) : (
                      ""
                    )}
                  </thead>
                  <tbody>
                    {projectList.map((project) => {
                      return (
                        <tr>
                          <td>{project._id}</td>
                          <td>
                            <Link
                              className="text-warning"
                              to={`/${dashBoard}/ProjectTable/Project_ModuleTable/${project._id}`}
                            >
                              {project.projectTitle}
                            </Link>
                          </td>
                          <td>{project.projectDescription}</td>
                          <td>{project.projectTechnology}</td>
                          <td>{project.priority.priorityName}</td>
                          <td>{project.projectEstimatedHours}</td>
                          <td>{project.projectStartDate}</td>
                          <td>{project.projectCompletionDate}</td>
                          <td>
                            {isAdminUser() ? (
                              <>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deleteData(project._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <Link className="addmargin"
                                  to={`/${dashBoard}/ProjectTable/UpdateProjectTable/${project._id}`}
                                >
                                  <button className="btn btn-success">
                                    Update
                                  </button>
                                </Link>
                              </>
                            ) : (
                              ""
                            )}

                            {isOpen && (
                              <CardUserTask
                                content={
                                  <>
                                    <AssignProjectManagerProject pmodId={id} />
                                  </>
                                }
                                handleClose={togglePopup}
                              />
                            )}
                          </td>
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
