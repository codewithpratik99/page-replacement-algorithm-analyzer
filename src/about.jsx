import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

function About() {
  return (
    <div className="about-page">

      <aside className="sidebar">

        <div className="sidebar-logo">
          OS
        </div>

        <Link
          to="/"
          className="sidebar-link"
        >
          <span>⌂</span>
          Home
        </Link>

        <Link
          to="/about"
          className="sidebar-link active"
        >
          <span>ⓘ</span>
          About
        </Link>

      </aside>

      <div className="about-main-content">

        <header className="about-header">

          <div className="about-brand">

            <div className="about-logo">
              OS
            </div>

            <div>
              <h1>
                Page Replacement Algorithm Analyzer
              </h1>

              <p>
                Operating System Simulator
              </p>
            </div>

          </div>

        </header>

        <main className="about-container">

          <section className="about-hero">

            <div className="about-hero-content">

              <span className="about-tag">
                ABOUT & POLICIES
              </span>

              <h2>
                Understanding
                <span> Page Replacement</span>
              </h2>

              <p>
                Learn how FIFO, LRU and Optimal page replacement
                algorithms work and how our simulator calculates
                page faults, page hits and hit ratio.
              </p>

            </div>

            <div className="about-visual">

              <div className="visual-frame">
                <small>FRAME 01</small>
                <strong>7</strong>
              </div>

              <div className="visual-frame active-frame">
                <small>FRAME 02</small>
                <strong>0</strong>
              </div>

              <div className="visual-frame">
                <small>FRAME 03</small>
                <strong>1</strong>
              </div>

            </div>

          </section>

          <section className="info-section">

            <div className="section-title">

              <span>01</span>

              <div>
                <small>CONCEPT</small>
                <h2>What is Page Replacement?</h2>
              </div>

            </div>

            <div className="info-box">

              <p>
                Page replacement is a memory management technique
                used by an operating system when a new page needs
                to be loaded into main memory but all available
                frames are already occupied.
              </p>

              <p>
                In this situation, the operating system selects
                one existing page and removes it from memory.
                The new page is then loaded into the available
                frame.
              </p>

              <p>
                The main purpose of page replacement algorithms
                is to reduce the number of page faults and improve
                the overall performance of memory management.
              </p>

            </div>

          </section>

          <section className="algorithms-section">

            <div className="section-title">

              <span>02</span>

              <div>
                <small>ALGORITHMS</small>
                <h2>Page Replacement Algorithms</h2>
              </div>

            </div>

            <article className="algorithm-detail">

              <div className="algorithm-top">

                <div className="algorithm-icon">
                  01
                </div>

                <div>

                  <span className="algorithm-label">
                    FIRST IN FIRST OUT
                  </span>

                  <h3>FIFO</h3>

                </div>

                <div className="algorithm-type">
                  Queue Based
                </div>

              </div>

              <div className="algorithm-content">

                <div>

                  <h4>What is FIFO?</h4>

                  <p>
                    FIFO stands for First In First Out.
                    It replaces the page that has been
                    present in memory for the longest time.
                    The page which entered first is removed first.
                  </p>

                </div>

                <div>

                  <h4>How it works</h4>

                  <ol>

                    <li>
                      Pages are loaded into memory one by one.
                    </li>

                    <li>
                      The order of pages is maintained like a queue.
                    </li>

                    <li>
                      When a page fault occurs and all frames are
                      full, the oldest page is removed.
                    </li>

                    <li>
                      The new page is inserted in its place.
                    </li>

                  </ol>

                </div>

                <div className="example-box">

                  <h4>Example</h4>

                  <div className="example-flow">
                    <span>7</span>
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <b>→</b>
                    <span className="remove">7</span>
                    <span className="new">3</span>
                  </div>

                  <p>
                    If 7 entered memory first, FIFO removes
                    7 when a replacement is required.
                  </p>

                </div>

              </div>

              <div className="pros-cons">

                <div className="advantage">

                  <h4>✓ Advantages</h4>

                  <p>
                    Simple to understand and easy to implement.
                    It does not require tracking how frequently
                    pages are used.
                  </p>

                </div>

                <div className="limitation">

                  <h4>! Limitation</h4>

                  <p>
                    FIFO may remove an important page that is
                    still being used frequently. It can also
                    suffer from Belady's anomaly.
                  </p>

                </div>

              </div>

            </article>

            <article className="algorithm-detail">

              <div className="algorithm-top">

                <div className="algorithm-icon">
                  02
                </div>

                <div>

                  <span className="algorithm-label">
                    LEAST RECENTLY USED
                  </span>

                  <h3>LRU</h3>

                </div>

                <div className="algorithm-type">
                  Usage Based
                </div>

              </div>

              <div className="algorithm-content">

                <div>

                  <h4>What is LRU?</h4>

                  <p>
                    LRU stands for Least Recently Used.
                    It replaces the page that has not been
                    used for the longest period of time.
                  </p>

                </div>

                <div>

                  <h4>How it works</h4>

                  <ol>

                    <li>
                      The algorithm keeps track of page usage.
                    </li>

                    <li>
                      When a page is accessed, its usage information
                      is updated.
                    </li>

                    <li>
                      When a page fault occurs, the least recently
                      used page is selected.
                    </li>

                    <li>
                      The new page replaces that page.
                    </li>

                  </ol>

                </div>

                <div className="example-box">

                  <h4>Example</h4>

                  <div className="example-flow">

                    <span>7</span>
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>

                    <b>→</b>

                    <span className="remove">
                      7
                    </span>

                    <span className="new">
                      3
                    </span>

                  </div>

                  <p>
                    If 7 has not been used for the longest
                    time, LRU selects 7 for replacement.
                  </p>

                </div>

              </div>

              <div className="pros-cons">

                <div className="advantage">

                  <h4>✓ Advantages</h4>

                  <p>
                    Usually performs better than FIFO because
                    it considers recent page usage.
                  </p>

                </div>

                <div className="limitation">

                  <h4>! Limitation</h4>

                  <p>
                    It requires additional information to track
                    page usage, making implementation more complex.
                  </p>

                </div>

              </div>

            </article>

            <article className="algorithm-detail optimal-detail">

              <div className="algorithm-top">

                <div className="algorithm-icon">
                  03
                </div>

                <div>

                  <span className="algorithm-label">
                    OPTIMAL PAGE REPLACEMENT
                  </span>

                  <h3>Optimal</h3>

                </div>

                <div className="algorithm-type">
                  Future Based
                </div>

              </div>

              <div className="algorithm-content">

                <div>

                  <h4>What is Optimal?</h4>

                  <p>
                    The Optimal page replacement algorithm replaces
                    the page whose next use is farthest in the future.
                    If a page will never be used again, it becomes
                    a strong candidate for replacement.
                  </p>

                </div>

                <div>

                  <h4>How it works</h4>

                  <ol>

                    <li>
                      The current reference is checked.
                    </li>

                    <li>
                      If the page is already in memory, it is a hit.
                    </li>

                    <li>
                      If a page fault occurs, the future reference
                      string is examined.
                    </li>

                    <li>
                      The page whose next use occurs farthest in
                      the future is replaced.
                    </li>

                    <li>
                      If multiple pages will never be used again,
                      the simulator follows the defined tie-breaking
                      policy.
                    </li>

                  </ol>

                </div>

                <div className="example-box">

                  <h4>Example</h4>

                  <div className="example-flow">

                    <span>3</span>
                    <span>0</span>
                    <span>4</span>
                    <span>2</span>

                    <b>→</b>

                    <span className="remove">
                      3
                    </span>

                    <span className="new">
                      1
                    </span>

                  </div>

                  <p>
                    If 3 will not be used again while 0, 4 and 2
                    are needed later, 3 can be selected for replacement.
                  </p>

                </div>

              </div>

              <div className="pros-cons">

                <div className="advantage">

                  <h4>✓ Advantages</h4>

                  <p>
                    It provides the minimum possible number of
                    page faults for a given reference string.
                  </p>

                </div>

                <div className="limitation">

                  <h4>! Limitation</h4>

                  <p>
                    It requires knowledge of future page references,
                    which is not normally available in a real system.
                  </p>

                </div>

              </div>

            </article>

          </section>

          <section className="comparison-section">

            <div className="section-title">

              <span>03</span>

              <div>
                <small>COMPARISON</small>
                <h2>FIFO vs LRU vs Optimal</h2>
              </div>

            </div>

            <div className="comparison-table-wrapper">

              <table className="comparison-table">

                <thead>

                  <tr>
                    <th>Feature</th>
                    <th>FIFO</th>
                    <th>LRU</th>
                    <th>Optimal</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>Full Form</td>
                    <td>First In First Out</td>
                    <td>Least Recently Used</td>
                    <td>Optimal Page Replacement</td>
                  </tr>

                  <tr>
                    <td>Replacement Basis</td>
                    <td>Oldest page</td>
                    <td>Least recently used</td>
                    <td>Farthest future use</td>
                  </tr>

                  <tr>
                    <td>Future Knowledge</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes</td>
                  </tr>

                  <tr>
                    <td>Implementation</td>
                    <td>Easy</td>
                    <td>Moderate</td>
                    <td>Complex</td>
                  </tr>

                  <tr>
                    <td>Performance</td>
                    <td>Moderate</td>
                    <td>Good</td>
                    <td>Best theoretical</td>
                  </tr>

                  <tr>
                    <td>Practical Use</td>
                    <td>Simple systems</td>
                    <td>Widely useful</td>
                    <td>Mainly theoretical</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </section>

          <section className="policies-section">

            <div className="section-title">

              <span>04</span>

              <div>
                <small>SIMULATOR POLICIES</small>
                <h2>Simulation Rules</h2>
              </div>

            </div>

            <div className="policy-grid">

              <div className="policy-card">

                <div className="policy-icon">
                  01
                </div>

                <h3>Reference String</h3>

                <p>
                  Page numbers should be entered using spaces
                  or commas between individual references.
                </p>

              </div>

              <div className="policy-card">

                <div className="policy-icon">
                  02
                </div>

                <h3>Page Hit</h3>

                <p>
                  A page hit occurs when the requested page
                  is already present in one of the available frames.
                </p>

              </div>

              <div className="policy-card">

                <div className="policy-icon">
                  03
                </div>

                <h3>Page Fault</h3>

                <p>
                  A page fault occurs when the requested page
                  is not present in memory and must be loaded.
                </p>

              </div>

              <div className="policy-card">

                <div className="policy-icon">
                  04
                </div>

                <h3>Frame Management</h3>

                <p>
                  The selected algorithm determines which frame
                  and page should be replaced during a fault.
                </p>

              </div>

              <div className="policy-card">

                <div className="policy-icon">
                  05
                </div>

                <h3>Optimal Tie-Breaking</h3>

                <p>
                  When multiple pages have the same future-use
                  condition, the simulator follows a consistent
                  left-to-right frame selection policy.
                </p>

              </div>

              <div className="policy-card">

                <div className="policy-icon">
                  06
                </div>

                <h3>Hit Ratio</h3>

                <p>
                  Hit ratio is calculated using page hits divided
                  by total references and multiplied by 100.
                </p>

              </div>

            </div>

          </section>

          <section className="formula-section">

            <div className="formula-card">

              <span>PAGE FAULTS</span>

              <strong>
                Total References − Page Hits
              </strong>

            </div>

            <div className="formula-card">

              <span>HIT RATIO</span>

              <strong>
                (Page Hits / Total References) × 100
              </strong>

            </div>

          </section>

          <section className="purpose-section">

            <div>

              <span className="about-tag">
                PROJECT PURPOSE
              </span>

              <h2>
                Learn Page Replacement
                Through Simulation
              </h2>

              <p>
                This project is designed to provide a simple
                and interactive way to understand page replacement
                algorithms used in operating systems. Instead of
                calculating every step manually, students can enter
                a reference string and observe how pages move
                through memory frames.
              </p>

            </div>

            <Link
              to="/"
              className="start-button"
            >
              Start Simulation →
            </Link>

          </section>

          <footer className="about-footer">

            <div>

              <strong>
                PAGE REPLACEMENT SIMULATOR
              </strong>

              <p>
                Operating System • OSY Project
              </p>

            </div>

            <div>
              FIFO • LRU • OPTIMAL
            </div>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default About;