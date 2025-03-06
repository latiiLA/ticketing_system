import "./App.css";
import Login from "./Pages/Login";
import { Routes, Route, Router } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/AdminDashboard";
import Tickets from "./Pages/Tickets";
import UserDashboard from "./Pages/UserDashboard";
import MyTickets from "./Pages/MyTickets";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<Dashboard />}>
        <Route path="/admindashboard" element={<div>Dashboard Content</div>} />
        <Route path="/tickets" element={<Tickets />} />
      </Route>
      <Route element={<UserDashboard />}>
        <Route path="/dashboard" element={<div>Dashboard Content</div>} />
        <Route path="/mytickets" element={<MyTickets />} />
      </Route>
      {/* <Route path="/changepassword" /> */}
    </Routes>
  );
}

export default App;
