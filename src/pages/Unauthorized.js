import React from "react";
import "./Unauthorized.css";

function Unauthorized() {
  return (
    <div className="unauth">
      <h1>🚫 Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}

export default Unauthorized;
