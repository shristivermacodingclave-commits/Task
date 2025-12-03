import React from "react";
import "./EtestMyResult.css";

export default function EtestMyResult() {
  return (
    <div className="result-container">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Atmosphere</span> &gt; <span>E-Test</span> &gt; <span className="active">My Results</span>
      </div>

      {/* Header */}
      <div className="test-title-box">
        <div>
          <p className="sub-heading">Air Meteorology</p>
          <h2 className="test-title">Atmosphere</h2>
        </div>
        <div className="right-section">
          <button className="reattempt-btn">Re-attempt</button>
          <p className="date-text">02 December 2025</p>
        </div>
      </div>

      {/* Result Box */}
      <div className="result-box">
        <div className="result-left">
          <h4 className="result-heading">Result</h4>
          <h2 className="fail-text">Fail</h2>
          <p className="motivational-text">
            Don’t worry , with practice & consistency you can improve your score.
          </p>
        </div>

        <div className="result-right">
          <h4 className="percentage-title">Percentage</h4>
          <h2 className="percentage-value">0%</h2>
          <p className="passing-info">Passing Criteria : 70%</p>

          <div className="sad-face">☹️</div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-box">
        <div className="stat-card">
          <p className="stat-title">Correct</p>
          <p className="stat-value green">0</p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Incorrect</p>
          <p className="stat-value red">3</p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Unanswered</p>
          <p className="stat-value orange">97</p>
        </div>

        <button className="solution-btn">View Solution</button>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h3 className="review-heading">How was your test experience?</h3>
        <p className="sub-text">Your feedback will help us improve your test experience</p>

        <textarea
          className="review-input"
          placeholder="Write Your Review"
        ></textarea>
      </div>
    </div>
  );
}
