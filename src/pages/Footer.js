import React from 'react'

function Footer() {
  return (
    <div>
       <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row gy-4 align-items-start">
          
          {/* === Left Section: Logo + Description === */}
          <div className="col-lg-4 col-md-6">
            <img
              src="your-logo.png"
              alt="Logo"
              style={{ height: "45px", marginBottom: "15px" }}
            />
            <p className="small text-secondary">
              eSkooly is the world's best and http://localhost:3000/1 ranked free online school management
              software. Our school management software has more features than any
              school software in the market.
            </p>
            <p className="small mb-0 text-secondary">
              Copyright © 2025 eSkooly (SMC Private) Ltd. – All rights reserved.
            </p>
          </div>

          {/* === Middle Left: eSkooly Links === */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3 text-info">eSkooly</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="http://localhost:3000/" className="text-light text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="http://localhost:3000/" className="text-light text-decoration-none">Pricing</a>
              </li>
              <li className="mb-2">
                <a href="http://localhost:3000/" className="text-light text-decoration-none">Get started</a>
              </li>
              <li>
                <a href="http://localhost:3000/" className="text-light text-decoration-none">Help</a>
              </li>
            </ul>
          </div>

          {/* === Middle Right: Terms === */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3 text-info">Terms</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="http://localhost:3000/" className="text-light text-decoration-none">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="http://localhost:3000/" className="text-light text-decoration-none">Privacy Policy</a>
              </li>
              <li>
                <a href="http://localhost:3000/" className="text-light text-decoration-none">SaaS Services</a>
              </li>
            </ul>
          </div>

          {/* === Right Section: App Buttons + Socials === */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3 text-info">Download App</h6>
            <div className="d-flex flex-column flex-sm-row gap-3 mb-3">
              <a
                href="http://localhost:3000/"
                className="btn d-flex align-items-center justify-content-center px-3 rounded-pill text-white"
                style={{
                  background: "linear-gradient(45deg, http://localhost:3000/6a11cb, http://localhost:3000/2575fc)",
                  border: "none"
                }}
              >
                <i className="bi bi-google-play me-2"></i> Get it on Google Play
              </a>
              <a
                href="http://localhost:3000/"
                className="btn d-flex align-items-center justify-content-center px-3 rounded-pill text-white"
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
              <a href="http://localhost:3000/" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
              <a href="http://localhost:3000/" className="text-light fs-5"><i className="bi bi-twitter"></i></a>
              <a href="http://localhost:3000/" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="http://localhost:3000/" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="lp-footer">
        <p>© {new Date().getFullYear()} StudentFlow — Smart Management for Schools</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer