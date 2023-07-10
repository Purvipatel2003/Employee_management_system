// import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import React, { Component }  from 'react';

import { AdminDashboard } from "./Users/Admin/AdminDashboard";
import { ProjectManagerDashboard } from "./Users/Project Manager/ProjectManagerDashboard";
import { DeveloperDashboard } from "./Users/Developer/DeveloperDashboard";
import "./App.css";
// import { Dashboard } from './Components/Dashboard';
import { Login } from "./Components/Login/Login";
import "./Components/Login/Login.css";
import { Registration } from "./Components/Registration/Registration";
import { Loader } from "./Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

function App() {
  const [auth, setauth] = useState(null);
  const [roleId, setroleId] = useState("");
  const [adminrole, setadminrole] = useState(null);
  const [pmrole, setpmrole] = useState(null);
  const [devrole, setdevrole] = useState(null);

  const [role, setrole] = useState("");

  const [userId, setuserId] = useState("");

  const [userData, setuserData] = useState([]);

  const getUserData = async () => {
    if (userId) {
      await axios.get(`http://localhost:4000/users/${userId}`).then((res) => {
        setuserData(res.data.data);
      });
    }
  };

  // var navigate = useNavigate();

  // const [isLoading, setisLoading] = useState(false);

  //  useEffect(() => {
  //     setisLoading(true);
  //     setTimeout(()=>{
  //       setisLoading(false)
  //     },1000)

  //   }, [])

  useEffect(() => {
    let email = localStorage.getItem("email");
    let role = localStorage.getItem("role");
    let roleId = localStorage.getItem(`roleId`);
    let userId = localStorage.getItem("userId");

    setrole(role);
    setroleId(roleId);
    setuserId(userId);

    console.log("App.js email: ", email);
    console.log("App.js role: ", role);
    console.log("roleId", roleId);
    console.log("userId", userId);

    // email && role ? setauth(true) && setroleId(roleId): setauth(false) && setroleId(null);

    if (email && roleId) {
      setauth(true);
      // if (roleId === `620e00e5b93c9f525393f7ac`) {
      //   setadminrole(roleId);
      //   // debugger;
      //   // navigate("/AdminDashboard");
      // } else if (roleId === `620e0102b93c9f525393f7b0`) {
      //   setpmrole(roleId);
      // } else if (roleId === `620e00f0b93c9f525393f7ae`) {
      //   setdevrole(roleId);
      // }
    } else {
      setauth(false);
      // setadminrole(null);
      // setpmrole(null);
      // setdevrole(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user_auth", auth);
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("roleId", roleId);
  }, [roleId]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
    getUserData();
    return () => {
      console.log("user.......", userId);
    };
  }, [userId]);

  console.log("auth :", auth);

  const authenticate = (auth, roleId, userId) => {
    setauth(auth);
    setroleId(roleId);
    setuserId(userId);
  };

  console.log("user data...", userData);

  if (!userData) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <UserContext.Provider value={userData}>
        {/* <Login/> */}
        {/* <UserTable/> */}

        <Routes>
          {
            <>
              <Route
                path="/"
                element={<Login authenticate={authenticate} />}
              ></Route>
              <Route path="/Registration" element={<Registration />}></Route>
            </>
          }
          ,
          {auth && roleId === "626c3b7675332464bdbb6570" ? (
            <Route
              path="/AdminDashboard/*"
              element={<AdminDashboard />}
            ></Route>
          ) : (
            "NO ADMIN..."
          )}
          {auth && roleId === "626c3b9075332464bdbb6572" ? (
            <Route
              path="/ProjectManagerDashboard/*"
              element={<ProjectManagerDashboard />}
            ></Route>
          ) : (
            "NO project manager..."
          )}
          ,
          {auth && roleId === "626c3b9775332464bdbb6574" ? (
            <Route
              path="/DeveloperDashboard/*"
              element={<DeveloperDashboard />}
            ></Route>
          ) : (
            "No Developer..."
          )}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
