import "./App.css";
import MenuAppBar from "./components/Navbar";
import SignIn from "./components/Signin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MenuAppBar />
        <Routes>
        <Route path="/login" Component={SignIn}></Route>
      </Routes>
    </div>
  );
}

export default App;
