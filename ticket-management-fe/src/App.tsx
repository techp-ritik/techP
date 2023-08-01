import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" Component={SignIn}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/categories" Component={Categories}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
