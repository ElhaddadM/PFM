import React from "react";
import { Route, Routes } from "react-router-dom";


import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Home";
import SignUp from "./Components/SignUp";

function App() {
  return (

    <div  >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* <Route  path="/Dashboard" element={<Dashboard/>} />
      <Route path="*" element={<NotFound/>}/> */}
      </Routes>
      


    </div>
  );
}
export default App;