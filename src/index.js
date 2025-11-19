import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { GradeProvider } from "./context/GradeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StudentProvider>
        <AttendanceProvider>
          <GradeProvider>
            <App />
          </GradeProvider>
        </AttendanceProvider>
      </StudentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
