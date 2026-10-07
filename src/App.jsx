import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

function parseReference(value) {
  return value
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

function fifo(reference, frameCount) {
  const frames = Array(frameCount).fill(null);
  let pointer = 0;
  let hits = 0;
  let faults = 0;
  const rows = [];

  reference.forEach((page, index) => {
    const hit = frames.includes(page);

    if (hit) {
      hits++;
    } else {
      faults++;
      frames[pointer] = page;
      pointer = (pointer + 1) % frameCount;
    }

    rows.push({
      step: index + 1,
      page,
      frames: [...frames],
      result: hit ? "Hit" : "Fault",
    });
  });

  return {
    rows,
    hits,
    faults,
  };
}

function lru(reference, frameCount) {
  const frames = Array(frameCount).fill(null);
  const lastUsed = new Map();

  let hits = 0;
  let faults = 0;
  const rows = [];

  reference.forEach((page, index) => {
    const hit = frames.includes(page);

    if (hit) {
      hits++;
    } else {
      faults++;

      const emptyIndex = frames.indexOf(null);

      if (emptyIndex !== -1) {
        frames[emptyIndex] = page;
      } else {
        let replaceIndex = 0;
        let oldest = Infinity;

        frames.forEach((frame, frameIndex) => {
          const used = lastUsed.has(frame)
            ? lastUsed.get(frame)
            : -1;

          if (used < oldest) {
            oldest = used;
            replaceIndex = frameIndex;
          }
        });

        frames[replaceIndex] = page;
      }
    }

    lastUsed.set(page, index);

    rows.push({
      step: index + 1,
      page,
      frames: [...frames],
      result: hit ? "Hit" : "Fault",
    });
  });

  return {
    rows,
    hits,
    faults,
  };
}

function optimal(reference, frameCount) {
  const frames = Array(frameCount).fill(null);

  let hits = 0;
  let faults = 0;

  const rows = [];

  reference.forEach((page, index) => {
    const hit = frames.includes(page);

    if (hit) {
      hits++;
    } else {
      faults++;

      const emptyIndex = frames.indexOf(null);

      if (emptyIndex !== -1) {
        frames[emptyIndex] = page;
      } else {
        let replaceIndex = 0;
        let farthest = -1;

        for (
          let frameIndex = 0;
          frameIndex < frameCount;
          frameIndex++
        ) {
          const currentPage = frames[frameIndex];

          const nextUse = reference.indexOf(
            currentPage,
            index + 1
          );

          if (nextUse === -1) {
            if (farthest !== Infinity) {
              replaceIndex = frameIndex;
              farthest = Infinity;
            }

            continue;
          }

          if (
            farthest !== Infinity &&
            nextUse > farthest
          ) {
            farthest = nextUse;
            replaceIndex = frameIndex;
          }
        }

        frames[replaceIndex] = page;
      }
    }

    rows.push({
      step: index + 1,
      page,
      frames: [...frames],
      result: hit ? "Hit" : "Fault",
    });
  });

  return {
    rows,
    hits,
    faults,
  };
}

function calculate(reference, frameCount, algorithm) {
  if (algorithm === "FIFO") {
    return fifo(reference, frameCount);
  }

  if (algorithm === "LRU") {
    return lru(reference, frameCount);
  }

  return optimal(reference, frameCount);
}

function App() {
  const [reference, setReference] = useState("");

  const [frameCount, setFrameCount] = useState("1");

  const [algorithm, setAlgorithm] = useState("FIFO");

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  function runSimulation() {
    const pages = parseReference(reference);

    if (pages.length === 0) {
      setError(
        "Please enter a valid reference string."
      );
      setResult(null);
      return;
    }

    setError("");

    const newResult = calculate(
      pages,
      Number(frameCount),
      algorithm
    );

    setResult(newResult);
  }

  function resetSimulation() {
    setReference("");
    setFrameCount("1");
    setAlgorithm("FIFO");
    setError("");
    setResult(null);
  }

  const total = result
    ? result.hits + result.faults
    : 0;

  const hitRatio =
    total > 0
      ? (
          (result.hits / total) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="sidebar-logo">
          OS
        </div>

        <Link
          to="/"
          className="sidebar-link active"
        >
          <span>⌂</span>
          Home
        </Link>

        <Link
          to="/about"
          className="sidebar-link"
        >
          <span>ⓘ</span>
          About
        </Link>

      </aside>

      <div className="main-content">

        <header className="header">

          <div className="brand">

            <div className="brand-logo">
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

          <div className="project-badge">
            OSY PROJECT
          </div>

        </header>

        <section className="hero">

          <div>

            <span className="hero-label">
              OPERATING SYSTEM
            </span>

            <h2>
              Page Replacement
              <span> Calculator</span>
            </h2>

            <p>
              Simulate FIFO, LRU and Optimal
              page replacement algorithms with
              a step-by-step frame table.
            </p>

          </div>

          <div className="memory-visual">

            <div className="memory-box">
              <small>FRAME 01</small>
              <strong>7</strong>
            </div>

            <div className="memory-box selected">
              <small>FRAME 02</small>
              <strong>0</strong>
            </div>

            <div className="memory-box">
              <small>FRAME 03</small>
              <strong>1</strong>
            </div>

            <div className="memory-box">
              <small>FRAME 04</small>
              <strong>2</strong>
            </div>

          </div>

        </section>

        <main className="container">

          <section className="settings-card">

            <div className="section-heading">

              <div className="section-icon">
                ⚙
              </div>

              <div>
                <h3>
                  Simulation Settings
                </h3>

                <p>
                  Enter reference string and
                  choose the algorithm.
                </p>
              </div>

            </div>

            <div className="input-grid">

              <div className="input-group reference-group">

                <label>
                  Reference String
                </label>

                <input
                  value={reference}
                  onChange={(e) =>
                    setReference(e.target.value)
                  }
                  placeholder="7 0 1 2 0 3 0 4"
                />

                <small>
                  Separate page numbers with
                  spaces or commas.
                </small>

              </div>

              <div className="input-group">

                <label>
                  Number of Frames
                </label>

                <select
                  value={frameCount}
                  onChange={(e) =>
                    setFrameCount(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value="1">
                    1 Frame
                  </option>

                  <option value="2">
                    2 Frames
                  </option>

                  <option value="3">
                    3 Frames
                  </option>

                  <option value="4">
                    4 Frames
                  </option>

                  <option value="5">
                    5 Frames
                  </option>

                  <option value="6">
                    6 Frames
                  </option>

                </select>

              </div>

              <div className="input-group">

                <label>
                  Algorithm
                </label>

                <select
                  value={algorithm}
                  onChange={(e) =>
                    setAlgorithm(e.target.value)
                  }
                >
                  <option value="FIFO">
                    FIFO
                  </option>

                  <option value="LRU">
                    LRU
                  </option>

                  <option value="OPTIMAL">
                    Optimal
                  </option>

                </select>

              </div>

            </div>

            {error && (
              <div className="error-box">
                ⚠ {error}
              </div>
            )}

            <div className="action-buttons">

              <button
                className="reset-button"
                onClick={resetSimulation}
              >
                ↻ Reset
              </button>

              <button
                className="run-button"
                onClick={runSimulation}
              >
                ▶ Run Simulation
              </button>

            </div>

          </section>

          {result && (
            <>
              <section className="stats-grid">

                <div className="stat-card fault-card">

                  <div className="stat-icon">
                    !
                  </div>

                  <div>
                    <span>
                      PAGE FAULTS
                    </span>

                    <strong>
                      {result.faults}
                    </strong>
                  </div>

                </div>

                <div className="stat-card hit-card">

                  <div className="stat-icon">
                    ✓
                  </div>

                  <div>
                    <span>
                      PAGE HITS
                    </span>

                    <strong>
                      {result.hits}
                    </strong>
                  </div>

                </div>

                <div className="stat-card total-card">

                  <div className="stat-icon">
                    #
                  </div>

                  <div>
                    <span>
                      TOTAL REFERENCES
                    </span>

                    <strong>
                      {total}
                    </strong>
                  </div>

                </div>

                <div className="stat-card ratio-card">

                  <div className="stat-icon">
                    %
                  </div>

                  <div>
                    <span>
                      HIT RATIO
                    </span>

                    <strong>
                      {hitRatio}%
                    </strong>
                  </div>

                </div>

              </section>

              <section className="result-card">

                <div className="result-header">

                  <div>

                    <span className="result-label">
                      SIMULATION RESULT
                    </span>

                    <h3>
                      Frame Table
                    </h3>

                  </div>

                  <div className="algorithm-badge">
                    {algorithm}
                  </div>

                </div>

                <div className="table-wrapper">

                  <table className="frame-table">

                    <thead>

                      <tr>

                        <th className="sticky-label">
                          REFERENCE
                        </th>

                        {result.rows.map(
                          (row) => (
                            <th
                              key={row.step}
                              className="reference-number"
                            >
                              {row.page}
                            </th>
                          )
                        )}

                      </tr>

                    </thead>

                    <tbody>

                      {Array.from(
                        {
                          length:
                            Number(frameCount),
                        },
                        (_, frameIndex) => (
                          <tr key={frameIndex}>

                            <th className="sticky-label frame-name">
                              FRAME{" "}
                              {frameIndex + 1}
                            </th>

                            {result.rows.map(
                              (row) => {

                                const value =
                                  row.frames[
                                    frameIndex
                                  ];

                                return (
                                  <td
                                    key={row.step}
                                  >

                                    {value === null ? (
                                      <span className="empty-frame">
                                        —
                                      </span>
                                    ) : (
                                      <span className="frame-number">
                                        {value}
                                      </span>
                                    )}

                                  </td>
                                );
                              }
                            )}

                          </tr>
                        )
                      )}

                      <tr className="status-row">

                        <th className="sticky-label frame-name">
                          STATUS
                        </th>

                        {result.rows.map(
                          (row) => (
                            <td key={row.step}>

                              <span
                                className={
                                  row.result === "Hit"
                                    ? "hit-mark"
                                    : "fault-mark"
                                }
                              >
                                {row.result === "Hit"
                                  ? "H"
                                  : "F"}
                              </span>

                            </td>
                          )
                        )}

                      </tr>

                      <tr className="step-row">

                        <th className="sticky-label frame-name">
                          STEP
                        </th>

                        {result.rows.map(
                          (row) => (
                            <td key={row.step}>
                              {row.step}
                            </td>
                          )
                        )}

                      </tr>

                    </tbody>

                  </table>

                </div>

                <div className="table-legend">

                  <div>
                    <span className="legend-box hit-mark">
                      H
                    </span>
                    Page Hit
                  </div>

                  <div>
                    <span className="legend-box fault-mark">
                      F
                    </span>
                    Page Fault
                  </div>

                  <div>
                    <span className="legend-box frame-number">
                      7
                    </span>
                    Page in Memory
                  </div>

                </div>

              </section>

            </>
          )}

          <section className="algorithm-grid">

            <div className="algorithm-card">

              <div className="algorithm-number">
                01
              </div>

              <div>
                <h3>
                  FIFO
                </h3>

                <p>
                  First In First Out replaces
                  the page that entered memory
                  first.
                </p>

                <span>
                  Queue Based
                </span>
              </div>

            </div>

            <div className="algorithm-card">

              <div className="algorithm-number">
                02
              </div>

              <div>
                <h3>
                  LRU
                </h3>

                <p>
                  Least Recently Used replaces
                  the page that has not been
                  used for the longest time.
                </p>

                <span>
                  Usage Based
                </span>
              </div>

            </div>

            <div className="algorithm-card">

              <div className="algorithm-number">
                03
              </div>

              <div>
                <h3>
                  Optimal
                </h3>

                <p>
                  Replaces the page whose next
                  use is farthest in the future.
                </p>

                <span>
                  Future Based
                </span>
              </div>

            </div>

          </section>

          <footer className="footer">

            <div>

              <strong>
                PAGE REPLACEMENT SIMULATOR
              </strong>

              <p>
                Operating System • OSY Project
              </p>

            </div>

            <div className="footer-right">
              FIFO
              <span>•</span>
              LRU
              <span>•</span>
              OPTIMAL
            </div>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default App;