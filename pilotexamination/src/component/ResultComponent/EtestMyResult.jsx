// import React from "react";
// import "./EtestMyResult.css";

// export default function EtestMyResult() {
//   return (
//     <div className="result-container">
    
//       {/* Header */}
//       <div className="test-title-box">
//         <div>
//           <p className="sub-heading">Air Meteorology</p>
//           <h2 className="test-title">Atmosphere</h2>
//         </div>
//         <div className="right-section">
//           <button className="reattempt-btn">Re-attempt</button>
//           <p className="date-text">02 December 2025</p>
//         </div>
//       </div>

//       {/* Result Box */}
//       <div className="result-box">
//         <div className="result-left">
//           <h4 className="result-heading">Result</h4>
//           <h2 className="fail-text">Fail</h2>
//           <p className="motivational-text">
//             Don’t worry , with practice & consistency you can improve your score.
//           </p>
//         </div>

//         <div className="result-right">
//           <h4 className="percentage-title">Percentage</h4>
//           <h2 className="percentage-value">0%</h2>
//           <p className="passing-info">Passing Criteria : 70%</p>

//           <div className="sad-face">☹️</div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="stats-box">
//         <div className="stat-card">
//           <p className="stat-title">Correct</p>
//           <p className="stat-value green">0</p>
//         </div>

//         <div className="stat-card">
//           <p className="stat-title">Incorrect</p>
//           <p className="stat-value red">3</p>
//         </div>

//         <div className="stat-card">
//           <p className="stat-title">Unanswered</p>
//           <p className="stat-value orange">97</p>
//         </div>

//         <button className="solution-btn">View Solution</button>
//       </div>

//       {/* Review Section */}
//       <div className="review-section">
//         <h3 className="review-heading">How was your test experience?</h3>
//         <p className="sub-text">Your feedback will help us improve your test experience</p>

//         <textarea
//           className="review-input"
//           placeholder="Write Your Review"
//         ></textarea>
//       </div>
//     </div>
//   );
// }



// import React, { useContext, useEffect } from "react";
// import "./EtestMyResult.css";

// export default function EtestMyResult() {
 

//   // Topic & subject (you will replace with API data later)
//   const subject = "Air Meteorology";
//   const topic = "Atmosphere";

//   // Set breadcrumb on page load
//   useEffect(() => {
//     setBreadcrumb([
//       { label: "Home", link: "/" },
//       { label: topic, link: "#" },
//       { label: "E-Test", link: "#" },
//       { label: "My Results" }
//     ]);
//   }, [topic]);

//   return (
//     <div className="result-container">
    
//       {/* Header */}
//       <div className="test-title-box">
//         <div>
//           <p className="sub-heading">{subject}</p>
//           <h2 className="test-title">{topic}</h2>
//         </div>
//         <div className="right-section">
//           <button className="reattempt-btn">Re-attempt</button>
//           <p className="date-text">02 December 2025</p>
//         </div>
//       </div>

//       {/* Result Box */}
//       <div className="result-box">
//         <div className="result-left">
//           <h4 className="result-heading">Result</h4>
//           <h2 className="fail-text">Fail</h2>
//           <p className="motivational-text">
//             Don’t worry , with practice & consistency you can improve your score.
//           </p>
//         </div>

//         <div className="result-right">
//           <h4 className="percentage-title">Percentage</h4>
//           <h2 className="percentage-value">0%</h2>
//           <p className="passing-info">Passing Criteria : 70%</p>

//           <div className="sad-face">☹️</div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="stats-box">
//         <div className="stat-card">
//           <p className="stat-title">Correct</p>
//           <p className="stat-value green">0</p>
//         </div>

//         <div className="stat-card">
//           <p className="stat-title">Incorrect</p>
//           <p className="stat-value red">3</p>
//         </div>

//         <div className="stat-card">
//           <p className="stat-title">Unanswered</p>
//           <p className="stat-value orange">97</p>
//         </div>

//         <button className="solution-btn">View Solution</button>
//       </div>

//       {/* Review Section */}
//       <div className="review-section">
//         <h3 className="review-heading">How was your test experience?</h3>
//         <p className="sub-text">Your feedback will help us improve your test experience</p>

//         <textarea
//           className="review-input"
//           placeholder="Write Your Review"
//         ></textarea>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import "./EtestMyResult.css";

// export default function EtestMyResult() {
 
//   const subject = "Air Meteorology";
//   const topic = "Atmosphere";

//   return (
//     <div className="result-container">
    
//       {/* Header */}
//       <div className="test-title-box">
//         <div>
//           <p className="sub-heading">{subject}</p>
//           <h2 className="test-title">{topic}</h2>
//         </div>
//         <div className="right-section">
//           <button className="reattempt-btn">Re-attempt</button>
//           <p className="date-text">02 December 2025</p>
//         </div>
//       </div>

//       {/* Result Box */}
//       <div className="result-box">
//         <div className="result-left">
//           <h4 className="result-heading">Result</h4>
//           <h2 className="fail-text">Fail</h2>
//           <p className="motivational-text">
//             Don’t worry , with practice & consistency you can improve your score.
//           </p>
//         </div>

//         <div className="result-right">
//           <h4 className="percentage-title">Percentage</h4>
//           <h2 className="percentage-value">0%</h2>
//           <p className="passing-info">Passing Criteria : 70%</p>

//           <div className="sad-face">☹️</div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="stats-box">
//         <div className="stat-card">
//           <p className="stat-title">Correct</p>
//           <p className="stat-value green">0</p>
//         </div>

//         <div className="stat-card">
//           <p className="stat-title">Incorrect</p>
//           <p className="stat-value red">3</p>
//         </div>

//         <div className="stat-card">
//           <p className="stat-title">Unanswered</p>
//           <p className="stat-value orange">97</p>
//         </div>

//         <button className="solution-btn">View Solution</button>
//       </div>

//       {/* Review Section */}
//       <div className="review-section">
//         <h3 className="review-heading">How was your test experience?</h3>
//         <p className="sub-text">Your feedback will help us improve your test experience</p>

//         <textarea
//           className="review-input"
//           placeholder="Write Your Review"
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./EtestMyResult.css";
// import Button from '../../component/Button'

// export default function EtestMyResult() {
  
//   const subject = "Air Meteorology";
//   const topic = "Atmosphere";

//   return (
//     <div className="etest-result-container mt-4">

//       {/* HEADER + SUMMARY */}
//       <div>
//         {/* HEADER */}
//         <div className="etest-result-header">
//           <div className="etest-result-left">
//             <p className="etest-result-subject">{subject}</p>
//             <h2 className="etest-result-topic">{topic}</h2>
//           </div>

//           <div className="etest-result-right">
//             <button className="etest-reattempt-btn">Re-attempt</button>
//             <p className="etest-result-date">04 December 2025</p>
//           </div>
//         </div>

//         {/* SUMMARY BOX */}
//         <div className="etest-summary-box">
//           <div className="etest-summary-left">
//             <h3 className="etest-result-heading">Result</h3>
//             <h2 className="etest-result-fail">Fail</h2>

//             <p className="etest-result-message">
//               Don’t worry, with practice & consistency you can improve your score.
//             </p>
//           </div>

//           <div className="etest-summary-right">
//             <h4 className="etest-percentage-label">Percentage</h4>
//             <h2 className="etest-percentage-value">0%</h2>
//             <p className="etest-passing-info">Passing Criteria : 70%</p>
//             <div className="etest-sad-icon">☹️</div>
//           </div>
//         </div>
//       </div>

//       {/* STATS BOX */}
//       <div className="etest-stats-wrapper">
//         <div className="etest-stats-card">
//           <p className="etest-stats-title">Correct</p>
//           <p className="etest-stats-green">0</p>
//         </div>

//         <div className="etest-stats-card">
//           <p className="etest-stats-title">Incorrect</p>
//           <p className="etest-stats-red">0</p>
//         </div>

//         <div className="etest-stats-card">
//           <p className="etest-stats-title">Unanswered</p>
//           <p className="etest-stats-orange">100</p>
//         </div>

//         <Button name="View Solution" className="btn-dark fs-6 px-5" />
//       </div>

//       {/* DIVIDER */}
//       <hr className="etest-divider" />

//       {/* REVIEW SECTION */}
//       <div className="etest-review-box">
//         <h3 className="etest-review-heading">How was your test experience?</h3>
//         <p className="etest-review-subtext">
//           Your feedback will help us improve your test experience
//         </p>

//         <textarea
//           className="etest-review-input"
//           placeholder="Write Your Review"
//         ></textarea>

//         <div className="etest-rating-stars">
//           ★★★★★
//         </div>

//         {/* <button className="etest-submit-review-btn">Send Review</button> */}

//         <Button name="Send Review" className="btn-dark fs-6" />
//       </div>

//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EtestMyResult.css";
import Button from "../../component/Button";
import { useSearchParams } from "react-router-dom";

export default function EtestMyResult() {
  const [searchParams] = useSearchParams();
  const attemptId =
    searchParams.get("attempt_id") ||
    localStorage.getItem("attempt_id");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // ------------------------------
  // FETCH RESULT DATA
  // ------------------------------
  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/etest/result",
          { attempt_id: attemptId }
        );

        if (!res.data.error) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Result fetch failed", err);
      } finally {
        setLoading(false);
      }
    }

    if (attemptId) fetchResult();
  }, [attemptId]);

  // ------------------------------
  // LOADING UI
  // ------------------------------
  if (loading) {
    return (
      <div className="etest-result-container mt-4">
        <p>Loading Result...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="etest-result-container mt-4">
        <p>Failed to load result.</p>
      </div>
    );
  }

  // ------------------------------
  // EXTRACT VALUES FROM API
  // ------------------------------
  const {
    subject_name,
    topic_name,
    result,
    percentage,
    correct,
    incorrect,
    unanswered,
    passing_criteria,
    date,
    message,
  } = data;

  const isPass = result?.toLowerCase() === "pass";

  return (
    <div className="etest-result-container mt-4">

      {/* HEADER */}
      <div className="etest-result-header">
        <div className="etest-result-left">
          <p className="etest-result-subject">{subject_name}</p>
          <h2 className="etest-result-topic">{topic_name}</h2>
        </div>

        <div className="etest-result-right">
          <button className="etest-reattempt-btn">Re-attempt</button>
          <p className="etest-result-date">{date}</p>
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

          <p className="etest-passing-info">
            Passing Criteria : {passing_criteria}
          </p>

          <div className="etest-sad-icon">
            {isPass ? "😊" : "☹️"}
          </div>
        </div>
      </div>

      {/* STATS BOX */}
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
