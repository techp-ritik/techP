import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
        <Route path="/login" Component={SignIn}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/users" Component={Users}></Route>
      </Routes>
    </div>
  );
}

export default App;
