import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Body } from "./Body";




export const Dashboard = () => {
  return (
    <div class="wrapper">
      <Sidebar />

      <div class="main-panel">
        <Navbar />
        <Body />
    
        <Footer />
       
      </div>
      
    </div>
    
  );
};
