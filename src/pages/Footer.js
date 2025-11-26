import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
       <footer className="text-light pt-5 pb-4 mt-5" id='footer'>
      <div className="container">
        <div className="row gy-4 align-items-start">
          
          {/* === Left Section: Logo + Description === */}
          <div className="col-lg-4 col-md-3">
             <h6 className="text-uppercase fw-bold  col-md-6 ">StudentFlow</h6>
            <p className="small text-dark fs-6">
             StudentFlow is one of the world’s leading and highest-ranked free online school management software platforms. 
              Copyright © 2025 StudentFlow (SMC Private) Ltd. – All rights reserved.
            </p>
            <p className="small mb-0 text-dark">
              Copyright © 2025 eSkooly (SMC Private) Ltd. – All rights reserved.
            </p>
          </div>

          {/* === Middle Left: eSkooly Links === */}
          <div className="col-lg-2 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3 ">eSkooly</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="http://localhost:3000/" className=" text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="http://localhost:3000/" className=" text-decoration-none">Pricing</a>
              </li>
              <li className="mb-2">
                <a href="http://localhost:3000/" className=" text-decoration-none">Get started</a>
              </li>
              <li>
                <a href="http://localhost:3000/" className=" text-decoration-none">Help</a>
              </li>
            </ul>
          </div>

          {/* === Middle Right: Terms === */}
          <div className="col-lg-2 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3 ">Terms</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="http://localhost:3000/" className=" text-decoration-none">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="http://localhost:3000/" className=" text-decoration-none">Privacy Policy</a>
              </li>
              <li>
                <a href="http://localhost:3000/" className="text-decoration-none">SaaS Services</a>
              </li>
            </ul>
          </div>

          {/* === Right Section: App Buttons + Socials === */}
          <div className="col-lg-2 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3 ">Download App</h6>
            <div className="d-flex flex-column flex-sm-row gap-3 mb-3">
              <a
                href="http://localhost:3000/"
                className="btn d-flex align-items-center justify-content-center px-3 rounded-pill "
                style={{
                  background: "linear-gradient(45deg, http://localhost:3000/6a11cb, http://localhost:3000/2575fc)",
                  border: "none"
                }}
              >
                <i className="bi bi-google-play me-2"></i> Get it on Google Play
              </a>
              <a
                href="http://localhost:3000/"
                className="btn d-flex align-items-center justify-content-center px-3 rounded-pill "
                style={{
                  background: "linear-gradient(45deg, http://localhost:3000/00c6ff, http://localhost:3000/0072ff)",
                  border: "none"
                }}
              >
                <i className="bi bi-apple me-2"></i> App Store
              </a>
            </div>

            {/* === Social Icons === */}
            <div className="d-flex gap-3">
              <a href="http://localhost:3000/" className="fs-5"><i className="bi bi-facebook"></i></a>
              <a href="http://localhost:3000/" className=" fs-5"><i className="bi bi-twitter"></i></a>
              <a href="http://localhost:3000/" className=" fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="http://localhost:3000/" className=" fs-5"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="lp-footer"
      
        style={{  textAlign: "center", paddingTop: "15px",color: "rgba(0, 0, 0, 0.918)" }}>
        <p>© {new Date().getFullYear()} StudentFlow — Smart Management for Schools</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer