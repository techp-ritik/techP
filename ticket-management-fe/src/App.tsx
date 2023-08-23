import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Categories from "./components/Categories/Categories";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import { createContext } from "react";
import Forgetpassword from "./components/Forgetpassword";
import { useLocation } from "react-router-dom";
export const Usercontext = createContext(null as any);
function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("access_token") || "{}")
  );
  const location = useLocation();
  return (
    <div className="App">
      {!user.access_token && location.pathname !== "/forgetpassword" && (
        <Navigate to={"/login"} replace />
      )}

      <Usercontext.Provider value={{ user, setUser }}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
          <Route path="/forgetpassword" Component={Forgetpassword}></Route>
          <Route path="/login" Component={SignIn}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/users" Component={Users}></Route>
          <Route path="/categories" Component={Categories}></Route>
        </Routes>
      </Usercontext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
