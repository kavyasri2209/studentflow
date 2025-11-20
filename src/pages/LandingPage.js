import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FiMenu,
  FiLogIn,
  FiUsers,
  FiBookOpen,
  FiBarChart2,
  FiBell,
} from "react-icons/fi";
import "./LandingPage.css";
import { useAuth } from "../context/AuthContext";

// Replace with your actual images
import heroImg from "../Images/s1.jpg";
import heroCardImg from "../Images/s2.jpg";
import workflowImg from "../Images/s3.jpg";

export default function LandingPage() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  // 🚀 If user is already logged in → skip landing page
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="sf-lp">

      {/* NAVBAR */}
      <header className="sf-nav">
        <div className="sf-nav-inner">
          <div className="sf-brand">StudentFlow</div>

          <nav className={`sf-links ${open ? "open" : ""}`}>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#roles">Roles</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="sf-actions">

            {/* Only LOGIN button */}
            <Link to="/login" className="btn primary">
              <FiLogIn /> Login
            </Link>

            <button
              className="sf-burger"
              onClick={() => setOpen((prev) => !prev)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="sf-hero">
        <div className="sf-hero-inner">

          <div className="hero-left">
            <span className="badge">Smart Management for Modern Schools</span>

            <h1>
              Manage Students, Attendance & Reports <br />
              <span className="muted">All in one clean dashboard.</span>
            </h1>

            <p className="lead">
              StudentFlow helps schools stay organized with effortless student
              management, attendance tracking, grade handling, and instant reporting.
              All data stored safely in your browser via LocalStorage.
            </p>

            <div className="hero-cta">
              <Link to="/login" className="btn cta">
                Start Now
              </Link>
            </div>

            {/* HERO STATS */}
            <div className="hero-stats">
              <div className="stat">
                <div className="num">150+</div>
                <div className="label">Institutions</div>
              </div>

              <div className="stat">
                <div className="num">1M+</div>
                <div className="label">Records Tracked</div>
              </div>

              <div className="stat">
                <div className="num">99.9%</div>
                <div className="label">Uptime</div>
              </div>

              <div className="stat">
                <div className="num">4.9★</div>
                <div className="label">User Rating</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hero-right">
            <div className="hero-card">
              <img src={heroImg} alt="Dashboard preview" />
              <div className="hero-card-badge">Attendance Overview</div>
              <div className="hero-card-notice">New Notice Published</div>
            </div>

            <div className="hero-small-card">
              <img src={heroCardImg} alt="Preview small" />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="sf-section features">
        <div className="container">
          <h2>Everything your school needs</h2>
          <p className="sub">
            Manage academics efficiently with StudentFlow.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <FiUsers className="f-ico" />
              <h3>Student Management</h3>
              <p>Add, organize, and manage student data easily.</p>
            </div>

            <div className="feature-card">
              <FiBarChart2 className="f-ico" />
              <h3>Attendance</h3>
              <p>Mark daily attendance & generate reports.</p>
            </div>

            <div className="feature-card">
              <FiBookOpen className="f-ico" />
              <h3>Grades</h3>
              <p>Track academic performance instantly.</p>
            </div>

            <div className="feature-card">
              <FiBell className="f-ico" />
              <h3>Notices</h3>
              <p>Announcements & exam alerts at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="how" className="sf-section workflow">
        <div className="container">
          <h2 className="center-title">How StudentFlow Works</h2>

          <div className="steps-grid">
            {[1, 2, 3, 4].map((num) => (
              <div className="step-card" key={num}>

                <div className="step-img">
                  <img src={workflowImg} alt="workflow" />
                </div>

                <div className="step-body">
                  {num === 1 && <><h4>Create Your Account</h4><p>Start instantly.</p></>}
                  {num === 2 && <><h4>Add Students</h4><p>Organize class data.</p></>}
                  {num === 3 && <><h4>Track Attendance & Grades</h4><p>Easy teacher screens.</p></>}
                  {num === 4 && <><h4>Generate Reports</h4><p>One-click summaries.</p></>}
                </div>

                <div className="step-no">{String(num).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="sf-section roles">
        <div className="container">
          <h2 className="center-title">Built for Every Role</h2>

          <div className="roles-grid">
            <div className="role-card">
              <img src={workflowImg} alt="" />
              <h4>Administrators</h4>
              <ul>
                <li>Full Data Control</li>
                <li>Export Reports</li>
                <li>Manage Staff</li>
              </ul>
            </div>

            <div className="role-card">
              <img src={workflowImg} alt="" />
              <h4>Coordinators</h4>
              <ul>
                <li>Monitor Sections</li>
                <li>Track Attendance</li>
                <li>Manage Notices</li>
              </ul>
            </div>

            <div className="role-card">
              <img src={workflowImg} alt="" />
              <h4>Teachers</h4>
              <ul>
                <li>Mark Attendance</li>
                <li>Enter Grades</li>
                <li>Review Performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sf-section testimonials">
        <div className="container">
          <h2 className="center-title">Loved By Schools</h2>

          <div className="test-grid">
            <div className="test-card">
              <q>StudentFlow made data handling so smooth!</q>
              <div className="author">— Mrs. Kavitha, Principal</div>
            </div>

            <div className="test-card">
              <q>Reports and attendance are now effortless.</q>
              <div className="author">— Mr. Ajay Kumar, Coordinator</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sf-section faq">
        <div className="container">
          <h2 className="center-title">FAQ</h2>

          <div className="faq-grid">
            <details>
              <summary>Is StudentFlow free?</summary>
              <p>Yes — the base version is fully free.</p>
            </details>

            <details>
              <summary>Does it work offline?</summary>
              <p>A complete offline-ready system.</p>
            </details>

            <details>
              <summary>Is the data secure?</summary>
              <p>All data remains in your browser.</p>
            </details>

            <details>
              <summary>Do we need a backend?</summary>
              <p>No. Everything runs on LocalStorage.</p>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sf-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} StudentFlow — Smart Management for Schools</p>
        </div>
      </footer>

    </div>
  );
}
