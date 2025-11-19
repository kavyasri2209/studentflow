import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} StudentFlow — All Rights Reserved.
    </footer>
  );
}

export default Footer;
