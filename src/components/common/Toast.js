import React, { useEffect, useState } from "react";
import "./Toast.css";

export let showToast = () => {};

function Toast() {
  const [toast, setToast] = useState({
    message: "",
    type: "",
    visible: false,
  });

  // Exposed function to trigger toast
  showToast = (message, type = "info") => {
    setToast({ message, type, visible: true });

    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, type === "error" ? 5000 : 3000);
  };

  if (!toast.visible) return null;

  return (
    <div className={`toast ${toast.type}`}>
      {toast.message}
    </div>
  );
}

export default Toast;
