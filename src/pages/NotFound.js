import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh", textAlign: "center", padding: "20px" }}>
            <FaExclamationTriangle className="text-warning mb-4" size={80} />
            <h1 className="display-4 fw-bold text-dark">404</h1>
            <h2 className="mb-3 text-secondary">Page Not Found</h2>
            <p className="lead text-muted mb-5" style={{ maxWidth: "500px" }}>
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link to="/dashboard" className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2">
                <FaHome /> Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
