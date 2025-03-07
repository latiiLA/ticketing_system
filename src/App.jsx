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
import EditTickets from "./Pages/EditTickets";
import ViewDetails from "./Pages/ViewDetails";
import ProtectedRoute from "./Pages/ProtectedRoute";
import ProtectedRoutes from "./Pages/ProtectedRoute";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<Dashboard />}>
          <Route
            path="/admindashboard"
            element={<div>Dashboard Content! Coming Soon</div>}
          />
          <Route path="/managetickets" element={<Tickets />} />
          <Route path="/edit" element={<EditTickets />} />
          <Route path="/viewdetail" element={<ViewDetails />} />
        </Route>
        {/* </Route> */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<UserDashboard />}>
          <Route
            path="/dashboard"
            element={<div>Dashboard Content! Coming Soon</div>}
          />
          <Route path="/tickets" element={<CreateTickets />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/viewdetails" element={<ViewDetails />} />
        </Route>
        {/* </Route> */}
        {/* <Route path="*" element={<Login />} /> */}
        {/* <Route path="/changepassword" /> */}
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
