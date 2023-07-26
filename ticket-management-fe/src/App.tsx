import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
        <Route path="/login" Component={SignIn}></Route>
      </Routes>
    </div>
  );
}

export default App;
