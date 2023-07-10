import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import { DndProvider } from "react-dnd";
// import { ChakraProvider } from "@chakra-ui/react";
// import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <BrowserRouter>
//     <DndProvider backend={HTML5Backend}>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </DndProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
