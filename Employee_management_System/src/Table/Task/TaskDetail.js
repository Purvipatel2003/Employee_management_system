import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
export const TaskDetail = () => {
  const id = useParams().id;

  const [taskList, settaskList] = useState([]);
  const [filterTaskById, setfilterTaskById] = useState([]);

  const getTaskData = async () => {
    await axios.get(`http://localhost:4000/tasks`).then((res) => {
      console.log("task details", res.data.data);
      settaskList(res.data.data);

      const filterTaskById = res.data.data.filter(
        (eachObj) => eachObj._id === id
      );
      console.log("xyz", filterTaskById);
      setfilterTaskById(filterTaskById);
    });
  };
  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-plain table-plain-bg">
              <div class="card-header ">
                <p class="card-category">All Tasks List </p>
                <h4 class="card-title d-inline-flex">Tasks List</h4>
              </div>

              <div class="card-body table-full-width table-responsive">
                <table class="table table-hover">
                  <thead>
                    <th>Task Id</th>
                    <th>Module Id</th>
                    <th>Project Id</th>
                    <th>title</th>
                    <th>Prority</th>
                    <th>Description</th>
                    <th>status</th>
                    <th>TotalMinuties</th>
                    <th>Action</th>
                  </thead>
                  <tbody className="tbodycard">
                    {filterTaskById.map((task) => {
                      return (
                        <tr className="tableStyle" key={task._id}>
                          <td>{task._id}</td>
                          <td>{task.project_module.moduleName}</td>
                          <td>{task.project.projectTitle}</td>
                          <td>{task.taskTitle}</td>
                          <td>{task.priority.priorityName}</td>
                          <td>{task.taskDescription}</td>
                          {/* <td><p className="statusColor">{task.status ? task.status.statusName : 'Todo'}</p></td> */}

                          {
                            task.status.statusName === "Todo" ? 
                          <td ><p className='statusTodo'>{task.status ? task.status.statusName : "Todo"}</p></td>
                          :
                            task.status.statusName === "work in progress" ?
                          <td ><p className='statusPending'>{task.status ? task.status.statusName : "Todo"}</p></td>
                          :

                          task.status.statusName === "Completed" ?
                          <td ><p className='statusComplete'>{task.status ? task.status.statusName : "Todo"}</p></td>
                            : ""
                        }
                          <td>{task.taskTotalMinutes}</td>

                          <td>
                            <Link
                              to={`/DeveloperDashBoard/DeveloperTask/TaskDetail/UpdateTaskStatus/${task._id}`}
                            >
                              <button className="btn btn-success">
                                Update
                              </button>
                            </Link>
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
