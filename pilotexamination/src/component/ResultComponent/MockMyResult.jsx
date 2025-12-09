// import React from "react";
// import "./EtestMyResult.css";
// import Button from "../../component/Button";

// export default function MockTestMyResult() {

//   // You will replace these with API data later
//   const subject = "Mock Test";
//   const topic = "Full Mock Examination";

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
//             <button className="etest-reattempt-btn">Re-attempt Mock Test</button>
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
//         <h3 className="etest-review-heading">How was your mock test experience?</h3>
//         <p className="etest-review-subtext">
//           Your feedback will help us improve your mock test environment
//         </p>

//         <textarea
//           className="etest-review-input"
//           placeholder="Write Your Review"
//         ></textarea>

//         <div className="etest-rating-stars">★★★★★</div>

//         <Button name="Send Review" className="btn-dark fs-6" />
//       </div>

//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EtestMyResult.css";
import Button from "../../component/Button";
import { useSearchParams , useNavigate } from "react-router-dom";

export default function MockTestMyResult() {
  const [searchParams] = useSearchParams();
  const testId =
    searchParams.get("test_id") ||
    localStorage.getItem("mock_attempt_id"); // your mock test_id

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);


  const navigate = useNavigate();




   const handleReAttempt = () => {
    if (data?.subject_id) {
      navigate(`/dashboard/my-courses/mock-test/${data.subject_id}`, {
        state: {
          subject: data.subject_name,
          subjectId: data.subject_id,
          testType: "MockTest",
          planPath: `/dashboard/my-courses/${data.subject_id}/plans`,
        },
      });
    }
  };

  // -------------------------------------
  // FETCH MOCK TEST RESULT USING API
  // -------------------------------------
  useEffect(() => {
    async function fetchMockResult() {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/mock/submit",
          { test_id: testId }
        );

        if (!res.data.error) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Mock result fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    if (testId) fetchMockResult();
  }, [testId]);

  // -------------------------------------
  // LOADING STATE
  // -------------------------------------
  if (loading) {
    return (
      <div className="etest-result-container mt-4">
        <p>Loading Mock Test Result...</p>
      </div>
    );
  }

  // -------------------------------------
  // ERROR / NO DATA
  // -------------------------------------
  if (!data) {
    return (
      <div className="etest-result-container mt-4">
        <p>Failed to load mock test result.</p>
      </div>
    );
  }

  // -------------------------------------
  // EXTRACT VALUES FROM API RESPONSE
  // -------------------------------------
  const {
    subject_name,
    result,
    percentage,
    correct,
    incorrect,
    unanswered,
    passing_criteria,
    submitted_at,
    total_questions,
  } = data;

  const topic = subject_name; // YOU SAID → topic = subject_name
  const isPass = result?.toLowerCase() === "pass";

  return (
    <div className="etest-result-container mt-4">

      {/* HEADER */}
      <div className="etest-result-header">
        <div className="etest-result-left">
          <p className="etest-result-subject">{subject_name}</p>
          <h2 className="etest-result-topic">{topic}</h2>
        </div>

        <div className="etest-result-right">
          <button 
            className="etest-reattempt-btn"
            onClick={handleReAttempt}
          >
            Re-attempt
          </button>
          <p className="etest-result-date">{submitted_at}</p>
        </div>
      </div>

      {/* SUMMARY BOX */}
      <div className="etest-summary-box">
        <div className="etest-summary-left">
          <h3 className="etest-result-heading">Result</h3>

          <h2 className={isPass ? "etest-result-pass" : "etest-result-fail"}>
            {result}
          </h2>

          <p className="etest-result-message">
            {isPass
              ? "Great job! You passed the mock test."
              : "Don’t worry, with practice & consistency you can improve your score."}
          </p>
        </div>

        <div className="etest-summary-right">
          <h4 className="etest-percentage-label">Percentage</h4>
          <h2 className="etest-percentage-value">{percentage}%</h2>
          <p className="etest-passing-info">
            Passing Criteria : {passing_criteria}
          </p>

          <div className="etest-sad-icon">{isPass ? "😊" : "☹️"}</div>
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
        <h3 className="etest-review-heading">How was your mock test experience?</h3>
        <p className="etest-review-subtext">
          Your feedback will help us improve your mock test environment
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
