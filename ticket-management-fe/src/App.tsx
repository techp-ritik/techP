import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Categories from "./components/Categories";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";
function App() {
  const [isUser, setUser] = React.useState(true);
  return (
    <div className="App">
      <Navbar />
      {!isUser && <Navigate to={"/login"} replace />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isUser ? "/dashboard" : "/login"} replace />}
        />
        <Route path="/login" Component={SignIn}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/users" Component={Users}></Route>
        <Route path="/categories" Component={Categories}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
