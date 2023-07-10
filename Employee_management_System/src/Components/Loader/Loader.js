import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../Loader/Loader.css";

import { ScaleLoader } from "react-spinners";

export const Loader = () => {
  let color = useState("#903ADC");
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  // const [isLoading, setisLoading] = useState(false);

  // useEffect(() => {
  //   setisLoading(true);
  //   setTimeout(()=>{
  //     setisLoading(false)
  //   },1000)

  // }, [])

  return (
    <div style={style}>
      <ScaleLoader color={color} />
    </div>
  );
};
