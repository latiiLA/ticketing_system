import "./App.css";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets" element={<Tickets />} />
      {/* <Route path="/changepassword" /> */}
    </Routes>
  );
}

export default App;
