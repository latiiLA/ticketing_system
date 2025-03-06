import "./App.css";
import Login from "./Pages/Login";
import { Routes, Route, Router } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/AdminDashboard";
import Tickets from "./Pages/Tickets";
import UserDashboard from "./Pages/UserDashboard";
import MyTickets from "./Pages/MyTickets";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import CreateTickets from "./Pages/CreateTickets";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Dashboard />}>
          <Route
            path="/admindashboard"
            element={<div>Dashboard Content</div>}
          />
          <Route path="/managetickets" element={<Tickets />} />
        </Route>
        <Route element={<UserDashboard />}>
          <Route path="/dashboard" element={<div>Dashboard Content</div>} />
          <Route path="/tickets" element={<CreateTickets />} />
          <Route path="/mytickets" element={<MyTickets />} />
        </Route>
        {/* <Route path="/changepassword" /> */}
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
