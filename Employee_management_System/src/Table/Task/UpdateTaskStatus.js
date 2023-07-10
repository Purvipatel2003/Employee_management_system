import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Column } from "../../Components/dragDrop/Column";
import "./UpdateTaskStatus.css";
// import Board from "./board";
// import { ContainerDemo } from './ContainerDemo'
// import { Container, Stack, Heading, List,Flex } from '@chakra-ui/react'

export const UpdateTaskStatus = () => {
  // console.log('rigut',id);
  // const [currentTask, setcurrentTask] = useState({});

  // const [taskList, settaskList] = useState([]);
  // const [filterTaskById, setfilterTaskById] = useState([]);

  const [toDoTask, settoDoTask] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const userData = useContext(UserContext);
  const routeParams = useParams();
  useEffect(() => {
    // if (id) {
    // debugger;
    // console.log(routeParams);
    console.log(userData);
    // if (userData && id) {
    getTaskData();
    // }
  }, []);

  const onHandleDrop = async (e, cardHeader) => {
    e.preventDefault();
    e.stopPropagation();
    var data = JSON.parse(e.dataTransfer.getData("text"));
    console.log("dropped", data, cardHeader);
    const id = data.id;

    let statusId = null;
    switch (cardHeader) {
      case "Completed":
        statusId = "626cb66c67a64dfee71e1ebe";
        break;
      case "work in progress":
        statusId = "626cb65767a64dfee71e1ebc";
        break;
      case "Todo":
        statusId = "626cb63e67a64dfee71e1eba";
        break;
      // default:
      //   break;
    }
    var updatedData = {
      status: statusId,
    };
   await axios.put(`http://localhost:4000/tasks/${id}`, updatedData).then((res) => {
      // alert("updated dataqwerqwerqew....");
      getTaskData();
    });

    // if (data.previousParent !== cardHeader) {
    //   debugger;
    //   //Prevent cards from being duplicated in a column
    //   // this.setState({
    //   //   [data.previousParent]: this.state[data.previousParent].filter(
    //   //     (item) => item.id !== data.id
    //   //   ),
    //   // });
    //   // this.setState({ [cardHeader]: this.state[cardHeader].concat(data) });
    // }
  };

  // const getTaskData = async () => {
  //   axios.get(`http://localhost:4000/user_tasks`).then((res) => {
  //     console.log("User_task:   ", res.data.data);
  //     debugger;
  //     settoDoTask([{id:'123',title:'test tiele'}])

  //     const filterTaskByUser = res.data.data.filter(
  //       (eachObj) => eachObj.user._id === userData._id
  //     );
  //     setcurrentTask(filterTaskByUser);
  //   });
  // }

  const getTaskData = async () => {
    // console.log(routeParams);
    await axios.get(`http://localhost:4000/tasks`).then((res) => {
      console.log("task details", res.data.data);
      // settaskList("abcd", res.data.data);
      // debugger;
      const id = routeParams.id;

      const filterTaskById = res.data.data.filter(
        (eachObj) => eachObj._id === id
      );

      // setfilterTaskById(filterTaskById);
      if (filterTaskById && filterTaskById.length > 0) {
        var taskdata = filterTaskById[0];
        let status = "Todo";
        if (taskdata && taskdata.status && taskdata.status.statusName) {
          status = taskdata.status.statusName;
        }
        console.log("abcd", taskdata);

        var title = taskdata.taskTitle;
        var taskId = taskdata._id;
        switch (status) {
          case "work in progress":
            setInProgress([{ id: taskId, title: title }]);
            setCompleted([]);
            settoDoTask([]);
            break;
          case "Completed":
            setCompleted([{ id: taskId, title: title }]);
            setInProgress([]);
            settoDoTask([]);
            break;
          case "Todo":
            settoDoTask([{ id: taskId, title: title }]);
            setCompleted([]);
            setInProgress([]);
            break;
          default:
            settoDoTask([{ id: taskId, title: title }]);
            setCompleted([]);
            setInProgress([]);
            break;
        }
      }
    });
  };
  return (
    <div className="board">
      <Column onHandleDrop={onHandleDrop} cards={toDoTask} name="Todo" />
      <Column
        onHandleDrop={onHandleDrop}
        cards={inProgress}
        name="work in progress"
      />
      <Column onHandleDrop={onHandleDrop} cards={completed} name="Completed" />
    </div>
  );
};
