import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultDetail.css";
import Button from "../component/Button";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";

function PracticeResultDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || "";

  const testId = state?.testId || "";

  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [userRank, setUserRank] = useState(null);

  // ---------------- FETCH PRACTICE TEST SUMMARY ----------------
  useEffect(() => {
    const fetchPracticeDetails = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/practice-test/solution",
          {
            user_id: userId,
            test_id: testId,
          }
        );

        if (!res.data.error) {
          setSummary(res.data.summary);
          setQuestions(res.data.questions || []);
        }
      } catch (e) {
        console.log("Practice Test Detail Error:", e);
      }
    };

    fetchPracticeDetails();
  }, [testId, userId]);

  // ---------------- FETCH PRACTICE RANKING ----------------
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/practice-test/rankings",
          {
            user_id: userId,
          }
        );

        if (!res.data.error) {
          setRanking(res.data.top_rankers || []);

          setUserRank({
            rank: res.data.my_rank,
            percentage: res.data.my_percentage,
            test_date: res.data.my_test_date,
            name: user?.name || "You",
            member_since: res.data.my_member_since,
          });
        }
      } catch (e) {
        console.log("Ranking Error:", e);
      }
    };

    fetchRanking();
  }, [userId]);

  if (!summary) return <Loader message="Loading Practice Test..." />;

  // ---------------- Extract values ----------------
  const scorePercent = summary.score_percent || 0;
  const correct = summary.correct || 0;
  const incorrect = summary.incorrect || 0;
  const unanswered = summary.unanswered || 0;
  const resultLabel = summary.result || "Fail";

  const scrollToTop = () => {
    const container = document.querySelector(".dashboard-main");
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container-fluid result-detail-page">

      {/* ---------------- HEADER CARD ---------------- */}
      <div className="card shadow-sm border-0 mb-4 result-card">
        <div className="card-body px-0 pt-0 pb-0">

          <div className="result-top d-flex justify-content-between align-items-center gap-3 px-4 py-4">

            <div>
              <p>Practice Test</p>

              <div className="d-flex align-items-center gap-2">
                <h2 className="mb-0">Test ID: {summary.test_id}</h2>

                <button
                  className="btn btn-light border rounded-pill px-3 py-1"
                  onClick={() =>
                    window.location.assign("/dashboard/my-courses/practice")
                  }
                >
                  Practice Test
                </button>
              </div>
            </div>

            <Button
              name="View Solution"
              className="btn-dark px-3 fs-6"
              onClick={() =>
                navigate("/dashboard/results/practice-solution", {
                  state: { testId },
                })
              }
            />
          </div>

          {/* ---------------- SCORE SECTION ---------------- */}
          <div className="result-bottom px-4 py-4">
            <div className="row g-4 align-items-center">

              <div className="col-lg-6" style={{ borderRight: "1px solid white" }}>
                <p className="mb-2 text-danger">Result</p>

                <h4
                  className={`fw-bold mb-2 ${
                    resultLabel === "Fail" ? "text-danger" : "text-success"
                  }`}
                >
                  {resultLabel}
                </h4>

                <p className="mb-0">
                  😕 This test seems challenging. Keep practicing and you will improve!
                </p>
              </div>

              <div className="col-lg-6 d-flex justify-content-start">
                <div className="d-flex align-items-center gap-4">

                  <div className="score-wheel">
                    <div
                      className="score-fill"
                      style={{
                        background: `conic-gradient(#f65b61 ${
                          scorePercent * 3.6
                        }deg, #f7d9dd 0deg)`
                      }}
                    >
                      <div className="score-center">
                        <span className="score-value">{scorePercent}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="small">
                    <p className="text-danger mb-2" style={{ fontSize: "1.2rem" }}>
                      Test Score
                    </p>
                    <p
                      className="fw-bold text-danger mb-1"
                      style={{ fontSize: "1.6rem" }}
                    >
                      {scorePercent}%
                    </p>
                    <p className="mb-0" style={{ maxWidth: "12rem" }}>
                      Passing criteria 70%
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ---------------- OUTCOME SECTION ---------------- */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">

          <h6 className="fw-semibold mb-1">Test Outcome</h6>
          <p className="text-muted small mb-3">Your Performance Summary</p>

          <div className="row g-3 align-items-center outcome-row">

            <div className="col-12 col-md-2 d-flex justify-content-center">
              <div className="mini-chart">
                <div
                  className="mini-chart-fill"
                  style={{
                    background: `conic-gradient(
                      #7bc29c 0 ${correct * 3.6}deg,
                      #f65b61 ${correct * 3.6}deg ${
                      (correct + incorrect) * 3.6
                    }deg,
                      #d9d9d9 ${(correct + incorrect) * 3.6}deg 360deg
                    )`,
                    borderRight: "1px solid gray",
                  }}
                />
              </div>
            </div>

            <div className="col-12 col-md-2 text-center">
              <h2 className="text-success">{correct}</h2>
              <p className="text-muted small mb-0">Correct</p>
            </div>

            <div className="col-12 col-md-2 text-center">
              <h2 className="text-danger">{incorrect}</h2>
              <p className="text-muted small mb-0">Incorrect</p>
            </div>

            <div className="col-12 col-md-2 text-center">
              <h2 className="text-secondary">{unanswered}</h2>
              <p className="text-muted small mb-0">Unanswered</p>
            </div>

            <div className="col-12 col-md-4 text-center">
              <h1 className="text-dark mb-0">--</h1>
              <p className="text-muted small mb-0">Time Spent</p>
            </div>

          </div>

        </div>
      </div>

      {/* ---------------- RANKING SECTION ---------------- */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h6 className="fw-semibold mb-1">Where Do You Stand?</h6>
              <p className="text-muted mb-0 small">
                See where you rank among all the aspirants.
              </p>
            </div>

            <div className="text-muted small d-flex align-items-center gap-2">
              <span>Ranks refreshed every 3 hours</span>
              <span>•</span>
              <span>Last updated just now</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0 rank-table">
              <thead>
                <tr className="text-muted small">
                  <th className="d-none d-md-table-cell"></th>
                  <th>Rank</th>
                  <th>% Score</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Joined</th>
                  <th className="d-none d-md-table-cell"></th>
                </tr>
              </thead>

              <tbody>

                {/* TOP RANKERS */}
                {ranking.slice(0, 3).map((r, index) => (
                  <tr key={index}>
                    <td className="d-none d-md-table-cell"></td>
                    <td>{r.rank}</td>
                    <td>{r.percentage}%</td>
                    <td>{formatDate(r.test_date)}</td>
                    <td>{r.name}</td>
                    <td>Member since {r.member_since}</td>
                    <td className="d-none d-md-table-cell"></td>
                  </tr>
                ))}

                {/* Dots */}
                <tr className="rank-ellipsis text-muted">
                  <td className="d-none d-md-table-cell"></td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td className="d-none d-md-table-cell"></td>
                </tr>

                {/* CURRENT USER */}
                {userRank && (
                  <tr className="rank-highlight">

                    <td className="d-none d-md-table-cell text-start align-middle">
                      <span className="rank-arrow rank-arrow-left">❬</span>
                    </td>

                    <td className="fw-semibold text-danger">{userRank.rank}</td>
                    <td className="text-danger fw-semibold">{userRank.percentage}%</td>
                    <td>{formatDate(userRank.test_date)}</td>
                    <td className="text-danger fw-semibold">{userRank.name}</td>
                    <td>Member since {userRank.member_since}</td>

                    <td className="d-none d-md-table-cell text-end align-middle">
                      <span className="rank-arrow rank-arrow-right">❭</span>
                    </td>

                  </tr>
                )}

              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ---------------- NEXT SUGGESTIONS ---------------- */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">

          <div className="row g-3">
            <div className="col-lg-6">

              <h6 className="fw-semibold mb-3">What’s Next?</h6>
              <p className="mb-3">Tailored Suggestions for You</p>

              <p className="mb-3">
                <FaUser size={25} /> &nbsp;Message from our Captains
              </p>

              <div className="suggestion-box p-3 rounded-3">
                <p className="mb-2">Hi {user?.name || "Aspirant"},</p>
                <p className="mb-2">
                  Great attempt! Keep practicing more practice tests to improve your accuracy.
                </p>

                <Link className="text-black" to="#">
                  Take Another Practice Test &gt;
                </Link>
              </div>

            </div>

            <div className="col-lg-6">
              <div className="d-flex flex-column gap-3 mt-5">

                <div>
                  <p className="fw-semibold mb-2">Study Materials</p>
                  <div className="resource-card p-3 rounded-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                      <div className="resource-icon pdf-icon">PDF</div>
                      <div>
                        <p className="mb-0">Air Navigation Notes.pdf</p>
                        <small className="text-muted">20 Pages · 1.2 MB</small>
                      </div>
                    </div>
                    <span className="text-muted">&gt;</span>
                  </div>
                </div>

                <div>
                  <p className="fw-semibold mb-2">Videos</p>
                  <div className="resource-card p-3 rounded-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                      <div className="resource-icon youtube-icon">
                        <span className="triangle" />
                      </div>
                      <div>
                        <p className="mb-0">Understanding Navigation</p>
                        <small className="text-muted">12:30 | Capt. Lakshya</small>
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

      {/* ---------------- FEEDBACK ---------------- */}
      <div className="card shadow-sm border-0 mb-4 section-card py-5">
        <div className="card-body text-center">
          <h4 className="fw-semibold mb-1">How was your test experience?</h4>
          <p>Your feedback will help us improve your practice experience</p>

          <div className="d-flex justify-content-center gap-2 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star" style={{ fontSize: "4rem" }}>
                ☆
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- TOP BUTTON ---------------- */}
      <div className="text-center mb-4">
        <button
          className="btn btn-dark px-5 back-top-btn py-2"
          onClick={scrollToTop}
        >
          Go to top
        </button>
      </div>

    </div>
  );
}

export default PracticeResultDetail;
