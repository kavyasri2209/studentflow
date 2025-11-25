// ...existing code...
import React from "react";
import "./LandingPage.css";

import heroImg from "../assets/hero.png";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature4 from "../assets/feature4.png";
import feature5 from "../assets/feature5.png";
import feature6 from "../assets/feature6.png";
import benefitsImg from "../assets/benefits.png";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            EXPERIENCE ULTIMATE <br />
            <span className="highlight">STUDENT MANAGEMENT</span><br /> with SWEEDU!
          </h1>

          <p>
            Revolutionize student and data management for schools, parents and
            students with our smart learning solution.
          </p>

          <button className="btn-primary">Start Free Trial</button>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Student Management Banner" />
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="intro">
        <h2>Student Management System</h2>
        <p>
          Students are the main stakeholders of any educational institution.
          With the advancing technology, schools now use modern student
          management systems through school management ERP software.
        </p>

        <p>
          A student management system manages student-related data, processes,
          and functions at school. SWEEDU’s Student Database Module ensures all
          necessary information is accessible when needed.
        </p>
      </section>

      {/* DIFFERENCE TABLE */}
      <section className="difference">
        <h2>Difference Between School Management Software & Student Management System</h2>

        <div className="table">
          <div className="table-column">
            <h3>School Management Software</h3>
            <ul>
              <li>Manages all processes related to school.</li>
              <li>Useful for students, parents, admin & staff.</li>
              <li>Complete ERP software by itself.</li>
            </ul>
          </div>

          <div className="table-column">
            <h3>Student Management System</h3>
            <ul>
              <li>Manages only student-related data.</li>
              <li>Useful for students, parents & staff.</li>
              <li>Standalone or part of bigger ERP.</li>
            </ul>
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
            <img src={feature2} alt="Video Tutorials" />
            <h4>Video Tutorials</h4>
            <p>Complete learning management system for students.</p>
          </div>

          <div className="feature-card">
            <img src={feature3} alt="Online Exam" />
            <h4>Online Exam</h4>
            <p>Robust online examination system for students.</p>
          </div>

          <div className="feature-card">
            <img src={feature4} alt="Attendance" />
            <h4>Attendance</h4>
            <p>Manage school attendance digitally and easily.</p>
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
              <ul>
                <li>Full Data Control</li>
                <li>Export Reports</li>
                <li>Manage Staff</li>
              </ul>
            </div>

          <div className="benefit-card">
            <h3>Benefits for Parents</h3>
            <ul>
              <li>Quick online admissions</li>
              <li>Pay school fees online</li>
              <li>Track child progress & attendance</li>
            </ul>
          </div>

          <div className="benefit-card">
            <h3>Benefits for Teachers</h3>
            <ul>
              <li>Easy access to student info</li>
              <li>Update attendance & marks</li>
              <li>Real-time communication</li>
            </ul>
          </div>

          <div className="benefit-card">
            <h3>Benefits for Administrators</h3>
            <ul>
              <li>Centralized student database</li>
              <li>Role-based access</li>
              <li>Cloud-secured data backup</li>
            </ul>
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
          <div className="faq-questions">
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
             <details>
              <summary>Is StudentFlow free?</summary>
              <p>Yes — the base version is fully free.</p>
            </details>
             <details>
              <summary>Is StudentFlow free?</summary>
              <p>Yes — the base version is fully free.</p>
            </details>
          </div>
          <div className="faq-grid">
            <img src="https://e1.pxfuel.com/desktop-wallpaper/401/742/desktop-wallpaper-ielts-student-female-students.jpg" alt="FAQ" className="faq-img"/>
            <img src="https://st2.depositphotos.com/3889193/6856/i/450/depositphotos_68564281-stock-photo-beautiful-student-girl-posing-with.jpg" alt="FAQ" className="faq-img"/>
            <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D" alt="FAQ" className="faq-img"/>
            <img src="https://media.istockphoto.com/id/1419416580/photo/positive-confident-indian-or-arabian-male-student-of-university-in-stylish-casual-wear-with.jpg?s=612x612&w=0&k=20&c=SU0hixbCg6ChDJH9jPBwVgHDRt2vJR3OSJx0Bt5AWCE=" alt="FAQ" className="faq-img"/>
          </div>
          </div>
        </div>
      </section>

    </div>
  );
}
// ...existing code...