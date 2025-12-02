import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
      <footer className="text-light pt-5 pb-4 mt-5" id='footer'>
        <div className="container">
          <div className="row gy-4">

            {/* ========== Column 1: StudentFlow - Logo + Description ========== */}
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h6 className="text-uppercase fw-bold mb-3">StudentFlow</h6>
              <p className="small text-dark" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                StudentFlow is one of the world's leading and highest-ranked free online school management software platforms.
              </p>
              <p className="small mb-0 text-dark" style={{ fontSize: '14px' }}>
                Copyright © 2025 eSkooly (SMC Private) Ltd. – All rights reserved.
              </p>
            </div>

            {/* ========== Column 2: Quick Links ========== */}
            <div className="col-lg-4 col-md-4 col-sm-6">
              <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-decoration-none">Home</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-decoration-none">Pricing</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-decoration-none">Get started</a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">Help</a>
                </li>
              </ul>
            </div>

            {/* ========== Column 3: Resources ========== */}
            <div className="col-lg-4 col-md-4 col-sm-6">
              <h6 className="text-uppercase fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled mb-3">
                <li className="mb-2">
                  <a href="#" className="text-decoration-none">Terms of Service</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-decoration-none">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">SaaS Services</a>
                </li>
              </ul>
              
              {/* Social Icons */}
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="social-icon">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="lp-footer" style={{ 
          textAlign: "center", 
          paddingTop: "30px", 
          marginTop: "30px",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          color: "rgba(0, 0, 0, 0.918)" 
        }}>
          <p className="mb-0">© {new Date().getFullYear()} StudentFlow — Smart Management for Schools</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer