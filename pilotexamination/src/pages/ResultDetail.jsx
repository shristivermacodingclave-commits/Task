import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultDetail.css";
import { Link } from "react-router-dom";
import Button from '../component/Button'
import defaultImg from '../assets/images/user.png'
import { FaUser} from "react-icons/fa";

function ResultDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const subject = state?.subject || "Air Navigation";
  const topic = state?.topic || "The Earth & Direction, Latitude and Longitude";
  const scorePercent = Number.isFinite(state?.percentage)
    ? state.percentage
    : 14;
  const resultLabel = state?.result || (scorePercent >= 70 ? "Pass" : "Fail");
  const examDate = state?.examDate || "09 Apr, 2024";
  const scrollToTop = () => {
    const container = document.querySelector(".dashboard-main");

    if (container && container.scrollTo) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  return (
    <div className="container-fluid result-detail-page">
      {/* Header Card */}
      <div className="card shadow-sm border-0 mb-4 result-card">
        <div className="card-body px-0 pt-0 pb-0">
          {/* Top bar */}
          <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
            <div>
              <p className="d-block ">{subject}</p>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <h2 className="mb-0">{topic}</h2>
                <button
                  className="btn btn-light border rounded-pill px-3 py-1"
                  onClick={() => window.location.assign("/dashboard/my-courses/e-test/plan")}
                >
                  E-Test
                </button>
              </div>
            </div>
            {/* <button className="btn btn-dark px-4">View Solution</button> */}
            <Button
              name="View Solution"
              className="btn-dark px-3 fs-6"
              onClick={() =>
                navigate("/dashboard/results/solution", {
                  state: {
                    subject,
                    topic,
                    scorePercent,
                    correct: 5,
                    incorrect: 3,
                    unanswered: 27,
                    resultLabel,
                  },
                })
              }
            />
          </div>

          {/* Bottom gradient section */}
          <div className="result-bottom px-4 py-4">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6 " style={{ borderRight: "1px solid white" }}>
                <p className="mb-2 text-danger">Result</p>
                <h4 className={`fw-bold mb-2 ${resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"}`}>
                  {resultLabel}
                </h4>
                <p className=" mb-0">
                  <span role="img" aria-label="info">😕</span> It seems like this test was tough, but don’t lose heart. Consistent practice
                  will surely lead to improvement
                </p>
              </div>

              <div className="col-lg-6 d-flex justify-content-start">
                <div className="d-flex align-items-center gap-4">
                  <div className="score-wheel" aria-label="Score">
                    <div
                      className="score-fill"
                      style={{
                        background: `conic-gradient(#f65b61 ${Math.max(0, Math.min(scorePercent, 100)) * 3.6}deg, #f7d9dd 0deg)`,
                      }}
                    >
                      <div className="score-center">
                        <span className="score-value">{scorePercent}%</span>
                      </div>
                    </div>
                  </div>
                  <div className=" small">
                    <p className=" text-danger mb-2" style={{ fontSize: "1.2rem" }}>Test Score</p>
                    <p className="fw-bold text-danger mb-1" style={{ fontSize: "1.6rem" }}>
                      {scorePercent}%
                    </p>
                    <p className="mb-0" style={{ maxWidth: "12rem" }}>
                      Passing criteria 70% as per the DGCA exam pattern
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">
          <h6 className="fw-semibold mb-1">Test Outcome</h6>
          <p className="text-muted small mb-3">Your Performance Summary</p>
          <div className="row g-3 align-items-center outcome-row">
            <div className="col-12 col-md-2 col-lg-2 d-flex justify-content-center">
              <div className="mini-chart">
                <div
                  className="mini-chart-fill"
                  style={{
                    background: `conic-gradient(#7bc29c 0 180deg, #f65b61 180deg 288deg, #d9d9d9 288deg 360deg)`, borderRight: "1px solid gray"
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-2" >
              <div className="stat-block text-center">
                <h2 className="text-success  mb-1">5</h2>
                <p className="text-muted mb-0 small">Correct</p>
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-2" >
              <div className="stat-block text-center">
                <h2 className="text-danger  mb-1">3</h2>
                <p className="text-muted mb-0 small">In-Correct</p>
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-2" >
              <div className="stat-block text-center">
                <h2 className="text-secondary  mb-1">27</h2>
                <p className="text-muted mb-0 small">Un-answered</p>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="stat-block time-block text-center">
                <div className="d-flex justify-content-center align-items-center gap-2 mb-1">
                  <span className="time-icon" aria-hidden="true"></span>
                  <h1 className="mb-0 text-dark">15m 28s</h1>
                </div>
                <p className="text-muted mb-0 small">Time Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h6 className="fw-semibold mb-1">Where Do You Stand?</h6>
              <p className="text-muted mb-0 small">See where you rank among all the aspirants.</p>
            </div>
            <div className="text-muted small d-flex align-items-center gap-2">
              <span>Ranks refreshed every 3 hours</span>
              <span className="text-muted">•</span>
              <span>Last updated just now</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0 rank-table">
              <thead>
                <tr className="text-muted small">
                  <th scope="col" className="d-none d-md-table-cell"></th>
                  <th scope="col">Rank</th>
                  <th scope="col">% Score</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Joined</th>
                  <th scope="col" className="d-none d-md-table-cell"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="d-none d-md-table-cell"></td>
                  <td>1</td>
                  <td>100%</td>
                  <td>7th Oct, 13:16</td>
                  <td>Vaishnavi Kaikwani</td>
                  <td>Member since Oct 2023</td>
                  <td className="d-none d-md-table-cell"></td>
                </tr>
                <tr>
                  <td className="d-none d-md-table-cell"></td>
                  <td>2</td>
                  <td>100%</td>
                  <td>26th Mar, 09:53</td>
                  <td>Hitain Sudan</td>
                  <td>Member since Mar 2022</td>
                  <td className="d-none d-md-table-cell"></td>
                </tr>
                <tr>
                  <td className="d-none d-md-table-cell"></td>
                  <td>3</td>
                  <td>100%</td>
                  <td>21st Mar, 21:43</td>
                  <td>Aryan Agarwal</td>
                  <td>Member since Mar 2022</td>
                  <td className="d-none d-md-table-cell"></td>
                </tr>
                <tr className="rank-ellipsis text-muted">
                  <td className="d-none d-md-table-cell"></td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td className="d-none d-md-table-cell"></td>
                </tr>
                <tr className="rank-highlight">
                  <td className="d-none d-md-table-cell text-start align-middle">
                    <span className="rank-arrow rank-arrow-left" aria-hidden="true">❬</span>
                  </td>
                  <td className="fw-semibold text-danger">104</td>
                  <td className="text-danger fw-semibold">71%</td>
                  <td>9th Apr, 21:15</td>
                  <td className="text-danger fw-semibold">Sakshi Shinde</td>
                  <td>Member since Apr 2023</td>
                  <td className="d-none d-md-table-cell text-end align-middle">
                    <span className="rank-arrow rank-arrow-right" aria-hidden="true">❭</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-6">
              <h6 className="fw-semibold mb-3">What’s Next?</h6>
              <p className="mb-3">Tailored Suggestions for You</p>
              <p className="mb-3"><FaUser size={25}/> &nbsp;Message from our Captains</p>
              <div className="suggestion-box p-3  rounded-3">
                <p className="mb-2">Hi Anuj Kumar,</p>
                <p className="mb-2">
                  You’ve mastered this test, but there’s always room for growth. Try our advanced level tests.
                </p>
                <Link className="text-black" to="#" >
                  Take Another Test &gt;
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="d-flex flex-column gap-3 mt-5">
                <div>
                  <p className="fw-semibold mb-2">Explore Learning Resources</p>
                  <p className="text-muted small mb-1">Study Materials</p>
                  <div className="resource-card p-3 rounded-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="resource-icon pdf-icon">PDF</div>
                      <div>
                        <p className="mb-0">Air Meterology_RK Bali .pdf</p>
                        <small className="text-muted">28 Pages · 1.64MB</small>
                      </div>
                    </div>
                    <span className="text-muted">&gt;</span>
                  </div>
                </div>

                <div>
                  <p className="text-muted small mb-1">Videos</p>
                  <div className="resource-card p-3 rounded-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="resource-icon youtube-icon">
                        <span className="triangle" />
                      </div>
                      <div>
                        <p className="mb-0">Understanding Atmosphere</p>
                        <small className="text-muted">14:23 | by Capt. Lakshya</small>
                      </div>
                    </div>
                    <span className="text-muted">&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="card shadow-sm border-0 mb-4 section-card py-5">
        <div className="card-body text-center">
          <h4 className="fw-semibold mb-1">How was your test experience?</h4>
          <p className="">Your feedback will help us improve your test experience</p>
          <div className="d-flex justify-content-center gap-2 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star" style={{ fontSize: "4rem" }}>☆</span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button
          className="btn btn-dark px-5 back-top-btn py-2"
          type="button"
          onClick={scrollToTop}
        >
          Go to top
        </button>
      </div>
    </div>
  );
}

export default ResultDetail;
