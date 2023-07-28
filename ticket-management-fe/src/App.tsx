import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
        <Route path="/login" Component={SignIn}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
      </Routes>
    </div>
  );
}

export default App;
