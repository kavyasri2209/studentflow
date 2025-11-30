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
import Footer from "./Footer";
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
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#how" onClick={() => setOpen(false)}>How It Works</a>
            <a href="#roles" onClick={() => setOpen(false)}>Roles</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
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

            <div className="hero-small-card hero-card">
              <img src={heroCardImg} alt="Preview small" />
              <div className="hero-card-events">Upcoming Events</div>
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
          <p>Everything your school needs is now in one powerful platform. StudentFlow helps you manage academics efficiently with smart tools designed for schools of all sizes. From attendance and assessments to timetables and progress tracking, every task becomes easier and more organized. Teachers can work more productively, students stay informed, and administrators gain complete visibility over academic operations. With StudentFlow, your school experiences smoother workflows, reduced manual effort, and improved overall performance.</p>

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
          <p>StudentFlow is designed to simplify student management from start to finish. First, you create your account and set up your basic details. Then, you can easily add students along with their profiles and academic information. Once everything is set up, StudentFlow allows you to track daily attendance, monitor grades, and maintain student records effortlessly. With all data stored in one place, you can instantly generate detailed reports for performance, attendance trends, and class insights. StudentFlow makes student management faster, smarter, and more organized.</p>
          <div className="main-steps-grid">
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
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="sf-section roles">
        <div className="container">
          <h2 className="center-title">Built for Every Role</h2>
          <p>Built for Every Role, StudentFlow adapts to the needs of administrators, teachers, and coordinators alike. Whether you’re managing student records, tracking attendance, or analyzing performance, the platform provides the right tools for every user. Each role gets a streamlined experience designed to save time, improve accuracy, and keep everyone connected.</p>
          <div className="roles-grid">
            <div className="role-card">
              <img src={workflowImg} alt="" />
              <h4>Administrators</h4>
              <ul > 
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
          <p>Loved by schools of all sizes, StudentFlow has become a trusted solution for simplifying academic and administrative tasks. Schools appreciate how easy it is to manage students, track attendance, and access reports—all from one clean dashboard. With reliable performance, intuitive design, and time-saving automation, StudentFlow helps educators focus more on teaching and less on paperwork. That’s why schools choose it, use it, and truly love it.</p>
          <div className="test-grid">
            <div className="test-card">
              <q>StudentFlow made data handling so smooth!</q>
              <div className="author">— Mrs. Tejas, Principal</div>
            </div>

            <div className="test-card">
              <q>Reports and attendance are now effortless.</q>
              <div className="author">— Mr. Teja, Coordinator</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sf-section faq">
        <div className="container">
          <h2 className="center-title">FAQ'S</h2>
          <div className="faq-grid">
            <div className="faq-questions">

              <details>
                <summary>Is StudentFlow free to use?</summary>
                <p>Yes — the core system is completely free with no hidden charges.</p>
              </details>

              <details>
                <summary>Can StudentFlow work without an internet connection?</summary>
                <p>Yes. StudentFlow is designed to work offline and automatically saves everything locally.</p>
              </details>

              <details>
                <summary>How secure is my school data?</summary>
                <p>Your data never leaves your device — it stays fully inside your browser for maximum privacy.</p>
              </details>

              <details>
                <summary>Does StudentFlow require any server or backend setup?</summary>
                <p>No. StudentFlow runs entirely on LocalStorage, so no server or backend is needed.</p>
              </details>

              <details>
                <summary>Can I back up or export my data?</summary>
                <p>Yes — you can easily export your data at any time to keep your own backups.</p>
              </details>

              <details>
                <summary>Does StudentFlow support multiple users or devices?</summary>
                <p>Yes, but because data is stored locally, syncing across devices requires manual export/import.</p>
              </details>

            </div>
            <div className="faq-grid">
              <img src="https://e1.pxfuel.com/desktop-wallpaper/401/742/desktop-wallpaper-ielts-student-female-students.jpg" alt="FAQ" className="faq-img" />
              <img src="https://st2.depositphotos.com/3889193/6856/i/450/depositphotos_68564281-stock-photo-beautiful-student-girl-posing-with.jpg" alt="FAQ" className="faq-img" />
              <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D" alt="FAQ" className="faq-img" />
              <img src="https://media.istockphoto.com/id/1419416580/photo/positive-confident-indian-or-arabian-male-student-of-university-in-stylish-casual-wear-with.jpg?s=612x612&w=0&k=20&c=SU0hixbCg6ChDJH9jPBwVgHDRt2vJR3OSJx0Bt5AWCE=" alt="FAQ" className="faq-img" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}