import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

if (import.meta.env.VITE_APP_NODE_ENV === "production") {
  console.log = () => {};
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Router>
    <App />
  </Router>
  // </StrictMode>
);
