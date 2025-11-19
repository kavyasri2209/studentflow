import React from "react";
import "./ConfirmDialog.css";

function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-backdrop">
      <div className="confirm-box">
        <h3>Are you sure?</h3>
        <p>{message}</p>

        <div className="confirm-actions">
          <button className="btn" onClick={onCancel}>
            No
          </button>

          <button className="btn btn-danger" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
