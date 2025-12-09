// import React, { useState, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./PlanMocktest.css";
// import axios from "axios";

// const STATUS_TAGS = [
//   { key: "attempted", label: "Green for attempted" },
//   { key: "unattempted", label: "Yellow for unattempted" },
//   { key: "unvisited", label: "White for unvisited questions" },
// ];

// export default function PlanMocktest() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = storedUser?.id;

//   const {
//     subject = "Air Navigation",
//     topic = "Mock Test",
//     planPath = "/dashboard/my-courses",
//   } = location.state || {};

//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [wantTimer, setWantTimer] = useState(true);

//   const instructions = useMemo(
//     () => [
//       "The time remaining to complete the exam is displayed on your screen and at the top-right corner of your screen. When the time runs out, your exam ends.",
//       "The Questions palette at the right of the screen has one of the following statuses for each numbered question:",
//       "To answer a question, click the number on the question palette at the right of your screen or at the top of your screen (if you are in phone mode). You will be taken to that numbered question.",
//       "To read the entire paper, click on the All Questions button.",
//       "Change your responses by selecting a question and then clicking on the new answer choice followed by a click on Confirm.",
//       "Click Reset to clear your selected response.",
//       "Next and Previous buttons are provided so that you may navigate the test.",
//     ],
//     []
//   );

//   // ⭐ Start Mock Test
//   const handleStartMockTest = async () => {
//     if (!isConfirmed) return;

//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/start-mock-test",
//         {
//           user_id: userId,
//           timer_enabled: wantTimer ? 1 : 0,
//         }
//       );

//       if (!res.data || res.data.error) {
//         alert("Could not start mock test");
//         return;
//       }

//       const attempt_id = res.data.attempt_id;

//       localStorage.setItem("mock_attempt_id", attempt_id);
//       localStorage.setItem("mock_questions", JSON.stringify(res.data.questions));

//       navigate(`/mocktest/start?attempt_id=${attempt_id}`, {
//         state: {
//           subject,
//           topic,
//           attemptId: attempt_id,
//           questions: res.data.questions,
//         },
//       });
//     } catch (e) {
//       console.log("Mock test start failed", e);
//       alert("Something went wrong.");
//     }
//   };

//   return (
//     <div className="mock-view">
//       <div className="mock-card">

//         {/* HEADER */}
//         <div className="mock-card-header">
//           <div>
//             <h2>{subject}</h2>
//             <p className="mock-subtitle">General Instructions</p>
//           </div>

//           <button className="mock-tag">Mock Test</button>
//         </div>

//         {/* INSTRUCTIONS */}
//         <ol className="mock-instructions">
//           {instructions.map((item, index) => (
//             <li key={index}>
//               <p>{item}</p>

//               {index === 1 && (
//                 <div className="mock-legend">
//                   {STATUS_TAGS.map((status) => (
//                     <div
//                       key={status.key}
//                       className={`mock-legend-item mock-legend-${status.key}`}
//                     >
//                       <span className="mock-legend-swatch" />
//                       <span>{status.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>

//         {/* TIME & TOTAL QUESTIONS */}
//         <div className="mock-info-box">
//           <div className="mock-info-item">
//             <p className="mock-info-title">⏱ Time Allotted</p>
//             <p className="mock-info-value">3 Hours</p>
//           </div>
//           <div className="mock-info-item">
//             <p className="mock-info-title">📝 Total Questions</p>
//             <p className="mock-info-value">100</p>
//           </div>
//         </div>

//         {/* TIMER OPTION */}
//         <div className="mock-timer-section">
//           <div className="mock-timer-icon">
//             <i className="fa fa-clock-o" />
//           </div>

//           <div className="mock-timer-options">
//             <p>
//               Would you like to keep 15 seconds timer delay text on each
//               question (Similar to DGCA actual exam)
//             </p>

//             <label className="mock-option">
//               <input
//                 type="checkbox"
//                 checked={wantTimer}
//                 onChange={() => setWantTimer(true)}
//               />
//               Yes, Keep 15 secs Timer
//             </label>

//             <label className="mock-option">
//               <input
//                 type="checkbox"
//                 checked={!wantTimer}
//                 onChange={() => setWantTimer(false)}
//               />
//               No, I don’t want Timer
//             </label>
//           </div>
//         </div>

//         {/* CONFIRM CHECKBOX */}
//         <label className="mock-confirm">
//           <input
//             type="checkbox"
//             checked={isConfirmed}
//             onChange={(e) => setIsConfirmed(e.target.checked)}
//           />
//           <span>I have reviewed all instructions and I’m ready.</span>
//         </label>

//         {/* START BUTTON */}
//         <button
//           className="mock-start-btn"
//           disabled={!isConfirmed}
//           onClick={handleStartMockTest}
//         >
//           Start Mock Test
//         </button>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import "./PlanMocktest.css";
// import axios from "axios";

// const STATUS_TAGS = [
//   { key: "attempted", label: "Green for attempted" },
//   { key: "unattempted", label: "Yellow for unattempted" },
//   { key: "unvisited", label: "White for unvisited questions" },
// ];

// export default function PlanMocktest() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { planId } = useParams(); // subjectId from the route

//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = storedUser?.id;

//   // ⭐ VALUES COMING FROM PLAN PAGE
//   const {
//     subjectId = planId,
//     subjectName = "Mock Test",
//     testType = "Mock-Test",
//     planPath = "/dashboard/my-courses",
//   } = location.state || {};

//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [wantTimer, setWantTimer] = useState(true); // UI only, backend not used yet
//   const [totalQuestions, setTotalQuestions] = useState(0);

//   // ================================================================
//   // ⭐ PRELOAD QUESTIONS COUNT (BACKEND ONLY NEEDS user_id + subject_id)
//   // ================================================================
//   useEffect(() => {
//     if (!subjectId) return;

//     axios
//       .post("https://development.pilotexaminations.com/api/mock/start", {
//         user_id: userId,
//         subject_id: subjectId,
//       })
//       .then((res) => {
//         if (!res.data.error) {
//           setTotalQuestions(res.data.total_questions || 0);
//         }
//       })
//       .catch(() => console.log("Failed to preload mock test question count"));
//   }, [subjectId]);

//   // ================================================================
//   // ⭐ START MOCKTEST
//   // ================================================================
//   const handleStartMockTest = async () => {
//     if (!isConfirmed) return;

//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/mock/start",
//         {
//           user_id: userId,
//           subject_id: subjectId,

//         }
//       );

//       if (!res.data || res.data.error) {
//         alert("Could not start mock test");
//         return;
//       }

//       const attempt_id = res.data.test_id;

//       // Save attempt + questions
//       localStorage.setItem("mock_attempt_id", attempt_id);
//       localStorage.setItem("mock_questions", JSON.stringify(res.data.questions));

//       // ⭐ Navigate to SAME PAGE as E-Test Attempt
//       navigate(
//         `/test_question/mock_test?quest_no=1&attempt_id=${attempt_id}`,
//         {
//           state: {
//             subjectName,
//             subjectId,
//             testType: "Mock-Test",
//             questions: res.data.questions,
//             attemptId: attempt_id,
//             planPath,
//             userId,
//           },
//         }
//       );


//     } catch (e) {
//       console.log("Mock test start failed", e);
//       alert("Something went wrong.");
//     }
//   };

//   // ================================================================
//   // ⭐ INSTRUCTIONS LIST
//   // ================================================================
//   const instructions = useMemo(
//     () => [
//       "The time remaining to complete the exam is displayed on your screen.",
//       "The Questions palette at the right of the screen shows statuses:",
//       "Click on any question number to jump directly.",
//       "Use All Questions to view the entire paper.",
//       "Change your answer before submitting the test.",
//       "Click Reset to clear your selected answer.",
//       "Use Next & Previous to navigate smoothly.",
//     ],
//     []
//   );

//   return (
//     <div className="mock-view">
//       <div className="mock-card">

//         {/* ======================================================
//               HEADER
//         ======================================================= */}
//         <div className="mock-card-header">
//           <div>
//             <h2>{subjectName}</h2>
//             <p className="mock-subtitle">General Instructions</p>
//           </div>
//           <button className="mock-tag">{testType}</button>
//         </div>

//         {/* ======================================================
//               INSTRUCTIONS
//         ======================================================= */}
//         <ol className="mock-instructions">
//           {instructions.map((text, index) => (
//             <li key={index}>
//               <p>{text}</p>

//               {/* Legend under 2nd instruction */}
//               {index === 1 && (
//                 <div className="mock-legend">
//                   {STATUS_TAGS.map((tag) => (
//                     <div
//                       key={tag.key}
//                       className={`mock-legend-item mock-legend-${tag.key}`}
//                     >
//                       <span className="mock-legend-swatch" />
//                       <span>{tag.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>

//         {/* ======================================================
//               INFO BOX
//         ======================================================= */}
//         <div className="mock-info-box">
//           <div className="mock-info-item">
//             <p className="mock-info-title">⏱ Time Allotted</p>
//             <p className="mock-info-value">3 Hours</p>
//           </div>

//           <div className="mock-info-item">
//             <p className="mock-info-title">📝 Total Questions</p>
//             <p className="mock-info-value">{totalQuestions}</p>
//           </div>
//         </div>

//         {/* ======================================================
//               TIMER (UI ONLY)
//         ======================================================= */}
//         <div className="mock-timer-section">
//           <p>Would you like to keep 15 sec timer delay on each question?</p>

//           <label className="mock-option">
//             <input
//               type="radio"
//               name="timer-choice"
//               checked={wantTimer === true}
//               onChange={() => setWantTimer(true)}
//             />
//             Yes
//           </label>

//           <label className="mock-option">
//             <input
//               type="radio"
//               name="timer-choice"
//               checked={wantTimer === false}
//               onChange={() => setWantTimer(false)}
//             />
//             No
//           </label>
//         </div>

//         {/* ======================================================
//               CONFIRM CHECKBOX
//         ======================================================= */}
//         <label className="mock-confirm">
//           <input
//             type="checkbox"
//             checked={isConfirmed}
//             onChange={(e) => setIsConfirmed(e.target.checked)}
//           />
//           <span>I have reviewed all instructions and I am ready.</span>
//         </label>

//         {/* ======================================================
//               START BUTTON
//         ======================================================= */}
//         <button
//           className="mock-start-btn"
//           disabled={!isConfirmed}
//           onClick={handleStartMockTest}
//         >
//           Start Mock Test
//         </button>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import "./PlanEtest.css"; // 🔥 same styling as Etest
// import axios from "axios";

// const STATUS_TAGS = [
//   { key: "attempted", label: "Green for attempted" },
//   { key: "unattempted", label: "Yellow for unattempted" },
//   { key: "unvisited", label: "White for unvisited questions" },
// ];

// export default function PlanMocktest() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { planId } = useParams();

//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = storedUser?.id;

//   // From plan page
//   const {
//     subjectId = planId,
//     subjectName = "Mock Test",
//     testType = "Mock-Test",
//     planPath = "/dashboard/my-courses",
//   } = location.state || {};

//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [wantTimer, setWantTimer] = useState(true);
//   const [totalQuestions, setTotalQuestions] = useState(0);

//   // ⭐ Preload total questions count
//   useEffect(() => {
//     if (!subjectId) return;

//     axios
//       .post("https://development.pilotexaminations.com/api/mock/start", {
//         user_id: userId,
//         subject_id: subjectId,
//       })
//       .then((res) => {
//         if (!res.data.error) {
//           setTotalQuestions(res.data.total_questions || 0);
//         }
//       })
//       .catch(() => {});
//   }, [subjectId]);

//   const instructions = useMemo(
//     () => [
//       "The time remaining to complete the exam is displayed on your screen...",
//       "The Questions palette at the right of the screen has one of the following statuses...",
//       <>To answer a question, click the number on the question palette.</>,
//       <>To read the entire paper, click on the <strong>All Questions</strong> button.</>,
//       <>Change your responses by selecting a question then clicking <strong>Confirm</strong>.</>,
//       <>Click <strong>Reset</strong> to clear your selected response.</>,
//       <>Use <strong>Next</strong> and <strong>Previous</strong> buttons to navigate.</>,
//     ],
//     []
//   );

//   const handleStartMockTest = async () => {
//     if (!isConfirmed) return;

//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/mock/start",
//         {
//           user_id: userId,
//           subject_id: subjectId,
//         }
//       );

//       if (!res.data || res.data.error) {
//         alert("Could not start mock test");
//         return;
//       }

//       const attempt_id = res.data.test_id;

//       localStorage.setItem("mock_attempt_id", attempt_id);
//       localStorage.setItem("mock_questions", JSON.stringify(res.data.questions));

//       navigate(
//         `/test_question/mock_test?quest_no=1&attempt_id=${attempt_id}`,
//         {
//           state: {
//             subjectName,
//             subjectId,
//             testType: "Mock-Test",
//             questions: res.data.questions,
//             attemptId: attempt_id,
//             planPath,
//             userId,
//             wantTimer, // save timer state
//           },
//         }
//       );
//     } catch (e) {
//       alert("Something went wrong.");
//     }
//   };

//   return (
//     <div className="view-details">
//       <div className="view-details__card">

//         {/* HEADER */}
//         <div className="view-details__card-header">
//           <div>
//             <h2>{subjectName}</h2>
//             <p className="view-details__subtitle">General Instructions</p>
//           </div>

//           <button
//             type="button"
//             className="view-details__tag"
//             onClick={() => navigate(planPath)}
//           >
//             {testType}
//           </button>
//         </div>

//         {/* INSTRUCTIONS */}
//         <ol className="view-details__instructions">
//           {instructions.map((instruction, index) => (
//             <li key={index}>
//               <p>{instruction}</p>

//               {/* Legend under 2nd instruction */}
//               {index === 1 && (
//                 <div className="view-details__legend">
//                   {STATUS_TAGS.map((status) => (
//                     <div
//                       key={status.key}
//                       className={`view-details__legend-item view-details__legend-item--${status.key}`}
//                     >
//                       <span className="view-details__legend-swatch" />
//                       <span>{status.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>

//         {/* TOTAL QUESTIONS + TIMER */}
//         <div
//           style={{
//             marginTop: "24px",
//             padding: "20px",
//             background: "#fff9e4",
//             borderRadius: "12px",
//           }}
//         >
//           <p><strong>📝 Total Questions:</strong> {totalQuestions}</p>

//           <p style={{ marginTop: "12px", marginBottom: "8px" }}>
//             Would you like to enable 15 sec timer delay per question?
//           </p>

//           <div style={{ display: "flex", gap: "20px", marginTop: "6px" }}>
//             <label>
//               <input
//                 type="radio"
//                 name="timer"
//                 checked={wantTimer}
//                 onChange={() => setWantTimer(true)}
//               />{" "}
//               Yes
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 name="timer"
//                 checked={!wantTimer}
//                 onChange={() => setWantTimer(false)}
//               />{" "}
//               No
//             </label>
//           </div>
//         </div>

//         {/* CONFIRM */}
//         <label className="view-details__confirm">
//           <input
//             type="checkbox"
//             checked={isConfirmed}
//             onChange={(e) => setIsConfirmed(e.target.checked)}
//           />
//           <span>I have reviewed all instructions and I’m ready.</span>
//         </label>

//         {/* START BUTTON — SAME AS ETEST */}
//         <button
//           type="button"
//           className="view-details__start"
//           disabled={!isConfirmed}
//           onClick={handleStartMockTest}
//         >
//           Start Mock Test →
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./PlanMocktest.css"; // same styling as Etest
import axios from "axios";
import clock from '../assets/images/clock.svg'
const STATUS_TAGS = [
  { key: "attempted", label: "Green for attempted" },
  { key: "unattempted", label: "Yellow for unattempted" },
  { key: "unvisited", label: "White for unvisited questions" },
];

export default function PlanMocktest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = useParams();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?.id;

  const {
    subjectId = planId,
    subjectName = "Air Navigation",
    testType = "Mock Test",
    planPath = "/dashboard/my-courses",
  } = location.state || {};

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [wantTimer, setWantTimer] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Load total questions BEFORE starting test
  useEffect(() => {
    if (!subjectId) return;

    axios
      .post("https://development.pilotexaminations.com/api/mock/start", {
        user_id: userId,
        subject_id: subjectId,
      })
      .then((res) => {
        if (!res.data.error) {
          setTotalQuestions(res.data.total_questions || 0);
        }
      })
      .catch(() => { });
  }, [subjectId]);

  const instructions = useMemo(
    () => [
      "The time remaining to complete the exam is displayed on your screen and at the top-right corner of your screen. When the time runs out, your exam ends",
      "The Questions palette at the right of the screen has one of the following statuses for each of the numbered questions",
      <>To answer a question, click the number on the question palette at the right of your screen or at the top of your screen (if you are in phone mode). You will be taken to that numbered question</>,
      <>To read the entire paper, click on the <strong>All Questions</strong> button.</>,
      <>Change your responses by selecting a question and then clicking on the new answer choice followed by a click on Confirm.</>,
      <>Click <strong>Reset</strong> to clear your selected response.</>,
      <>Use <strong>Next</strong> and <strong>Previous</strong> buttons to navigate.</>,
    ],
    []
  );

  const handleStartMockTest = async () => {
    if (!isConfirmed) return;

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/mock/start",
        {
          user_id: userId,
          subject_id: subjectId,
        }
      );

      if (!res.data || res.data.error) {
        alert("Could not start mock test");
        return;
      }

      const attempt_id = res.data.test_id;

      localStorage.setItem("mock_attempt_id", attempt_id);
      localStorage.setItem("mock_questions", JSON.stringify(res.data.questions));

      navigate(
        `/test_question/mock_test?quest_no=1&attempt_id=${attempt_id}`,
        {
          state: {
            subjectName,
            subjectId,
            testType,
            questions: res.data.questions,
            attemptId: attempt_id,
            planPath,
            userId,
            wantTimer,         
            totalQuestions,
          },
        }
      );
    } catch (e) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="view-details">
      <div className="view-details__card">

        {/* HEADER */}
        <div className="view-details__card-header">
          <div>
            <h2>{subjectName}</h2>
            <p className="view-details__subtitle">General Instructions</p>
          </div>

          <button
            type="button"
            className="view-details__tag"
            onClick={() => navigate(planPath)}
          >
            {testType}
          </button>
        </div>

        {/* INSTRUCTIONS */}
        <ol className="view-details__instructions">
          {instructions.map((instruction, index) => (
            <li key={index}>
              <p>{instruction}</p>

              {index === 1 && (
                <div className="view-details__legend">
                  {STATUS_TAGS.map((status) => (
                    <div
                      key={status.key}
                      className={`view-details__legend-item view-details__legend-item--${status.key}`}
                    >
                      <span className="view-details__legend-swatch" />
                      <span>{status.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* TIME + TOTAL QUESTIONS (Matching Screenshot) */}
        <div className="view-details__info-row">
          <div className="view-details__info-item">
            <p className="view-details__info-label">⏱ Time Allotted</p>
            <p className="view-details__info-value">3 Hours</p>
          </div>

          <div className="view-details__info-item">
            <p className="view-details__info-label">📝 Total Questions</p>
            <p className="view-details__info-value">{totalQuestions}</p>
          </div>
        </div>

        {/* TIMER OPTION BOX */}
        <div className="view-details__timer-box">

          {/* You will paste your clock image here */}
          <div className="view-details__timer-icon">
            <img src={clock} alt="" />
          </div>

          <div className="view-details__timer-content">
            <p className="view-details__timer-title">
              Would you like to keep 15 seconds timer delay text on each question
              (Similar pattern to DGCA actual exam)
            </p>

            <div className="view-details__timer-options">
              <label className="view-details__timer-option">
                <input
                  type="radio"
                  name="timer"
                  checked={wantTimer}
                  onChange={() => setWantTimer(true)}
                />
                Yes, Keep 15 secs Timer
              </label>

              <label className="view-details__timer-option">
                <input
                  type="radio"
                  name="timer"
                  checked={!wantTimer}
                  onChange={() => setWantTimer(false)}
                />
                No, I don't want Timer
              </label>
            </div>
          </div>
        </div>

        {/* CONFIRM CHECKBOX */}
        <label className="view-details__confirm">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <span>I have reviewed all instructions and I’m ready.</span>
        </label>

        {/* START BUTTON */}
        <button
          type="button"
          className="view-details__start"
          disabled={!isConfirmed}
          onClick={handleStartMockTest}
        >
          Start Mock Test →
        </button>
      </div>
    </div>
  );
}
