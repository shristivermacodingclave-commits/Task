import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EtestMyResult.css"; // SAME STYLES
import Button from "../../component/Button";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export default function PracticeMyresult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ Meta coming from practice test page
  const testMeta = location.state || {};

  // ⭐ PRACTICE TEST ID
  const testId =
    searchParams.get("test_id") ||
    testMeta.test_id ||
    localStorage.getItem("practice_test_id");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // ------------------------------
  // ⭐ RE-ATTEMPT PRACTICE TEST
  // ------------------------------
  const handleReAttempt = () => {
    const miniId = testMeta.miniSubjectId || data.mini_subject_id || 1;

    navigate(`/dashboard/my-courses/practice/${miniId}`, {
      state: {
        type: "practice-test",
        miniSubjectId: miniId,
        subject: data.subject_name || "Practice Test",
        topic: "Practice Test",
        testType: "Practice Test",
        planPath: testMeta.planPath,
      },
    });
  };

  // ------------------------------
  // ⭐ FETCH PRACTICE RESULT
  // ------------------------------
  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/practice/submit",
          { test_id: testId }
        );

        if (!res.data.error) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Practice result fetch failed", err);
      } finally {
        setLoading(false);
      }
    }

    if (testId) fetchResult();
  }, [testId]);

  // ------------------------------
  // LOADING UI
  // ------------------------------
  if (loading)
    return (
      <div className="etest-result-container mt-4">
        <p>Loading Result...</p>
      </div>
    );

  if (!data)
    return (
      <div className="etest-result-container mt-4">
        <p>Failed to load result.</p>
      </div>
    );

  // ------------------------------
  // NORMALIZED RESULT FIELDS
  // ------------------------------
  const {
    subject_name = "Practice Test",
    result,
    percentage,
    correct,
    incorrect,
    unanswered,
    date = "",
    message = "",
  } = data;

  const isPass = result?.toLowerCase() === "pass";

  // ------------------------------
  // UI RENDER
  // ------------------------------
  return (
    <div className="etest-result-container mt-4">

      {/* HEADER */}
      <div className="etest-result-header">
        <div className="etest-result-left">
          <p className="etest-result-subject">{subject_name}</p>
          <h2 className="etest-result-topic">Practice Test Result</h2>
        </div>

        <div className="etest-result-right">
          <button className="etest-reattempt-btn" onClick={handleReAttempt}>
            Re-attempt
          </button>
          {date && <p className="etest-result-date">{date}</p>}
        </div>
      </div>

      {/* SUMMARY BOX */}
      <div className="etest-summary-box">
        <div className="etest-summary-left">
          <h3 className="etest-result-heading">Result</h3>

          <h2 className={isPass ? "etest-result-pass" : "etest-result-fail"}>
            {result}
          </h2>

          <p className="etest-result-message">{message}</p>
        </div>

        <div className="etest-summary-right">
          <h4 className="etest-percentage-label">Percentage</h4>
          <h2 className="etest-percentage-value">{percentage}%</h2>

          <div className="etest-sad-icon">
            {isPass ? "😊" : "☹️"}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="etest-stats-wrapper">
        <div className="etest-stats-card">
          <p className="etest-stats-title">Correct</p>
          <p className="etest-stats-green">{correct}</p>
        </div>

        <div className="etest-stats-card">
          <p className="etest-stats-title">Incorrect</p>
          <p className="etest-stats-red">{incorrect}</p>
        </div>

        <div className="etest-stats-card">
          <p className="etest-stats-title">Unanswered</p>
          <p className="etest-stats-orange">{unanswered}</p>
        </div>

        <Button name="View Solution" className="btn-dark fs-6 px-5" />
      </div>

      <hr className="etest-divider" />

      {/* REVIEW SECTION */}
      <div className="etest-review-box">
        <h3 className="etest-review-heading">How was your test experience?</h3>
        <p className="etest-review-subtext">
          Your feedback will help us improve your test experience
        </p>

        <textarea
          className="etest-review-input"
          placeholder="Write Your Review"
        ></textarea>

        <div className="etest-rating-stars">★★★★★</div>

        <Button name="Send Review" className="btn-dark fs-6" />
      </div>

    </div>
  );
}
