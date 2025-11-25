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
      <section className="features">
        <h2>SWEEDU Student Management Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <img src={feature1} alt="Smart Class" />
            <h4>Smart Class</h4>
            <p>Conduct online classes with increased efficiency.</p>
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

          <div className="feature-card">
            <img src={feature5} alt="Homework Management" />
            <h4>Homework Management</h4>
            <p>View homework, progress reports and more.</p>
          </div>

          <div className="feature-card">
            <img src={feature6} alt="Timetable" />
            <h4>Timetable Management</h4>
            <p>Create class-wise timetables for students.</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits">
        <h2>Why Do You Need a Student Management System?</h2>
        <p>
          A student information system helps keep data organized and
          easily retrievable. It benefits students, teachers, parents,
          and administrators.
        </p>

        <img src={benefitsImg} alt="Benefits" className="benefits-img" />

        <div className="benefit-grid">
          <div className="benefit-card">
            <h3>Benefits for Students</h3>
            <ul>
              <li>Profile management</li>
              <li>View academic details</li>
              <li>Access timetables & announcements</li>
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

      {/* BLOG */}
      <section className="blog">
        <h2>Related Blog</h2>
        <div className="blog-grid">
          <div className="blog-card">
            <h4>Simplifying Success: User-Friendly Features of SWEEDU</h4>
            <p>April 30, 2024</p>
          </div>
          <div className="blog-card">
            <h4>Essential Features for Coaching Management</h4>
            <p>Nov 2, 2023</p>
          </div>
          <div className="blog-card">
            <h4>Guide to Teach Digital Citizenship</h4>
            <p>Sept 18, 2023</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What is a Student Management System?</h3>
          <p>A digital tool to manage student data, academics, attendance, communication and much more.</p>
        </div>
        <div className="faq-item">
          <h3>Is SWEEDU cloud-based?</h3>
          <p>Yes, SWEEDU uses cloud servers with SSL encryption for security.</p>
        </div>
        <div className="faq-item">
          <h3>Can parents track progress?</h3>
          <p>Yes, parents can view marks, attendance and reports in real-time.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>Contact Us</h3>
        <p>Email: sales@webmediaexperts.net</p>
        <p>Phone: +91 8000 338 338</p>
        <div className="footer-bottom">© {new Date().getFullYear()} SWEEDU - All Rights Reserved.</div>
      </footer>
    </div>
  );
}
// ...existing code...