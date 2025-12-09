// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";
// import LeaveTestModal from "../component/LeaveTestModal";
// import usePreventBackExit from "../hooks/usePreventBackExit";


// const OPTION_LABELS = ["A", "B", "C"];

// export default function EtestAttempt() {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // -------- get meta data --------
//   const testMeta = location.state || {};
//   const userId = testMeta.userId || 10;

//   // ---- attempt_id: URL > state > localStorage ----
//   const attemptId =
//     searchParams.get("attempt_id") ||
//     testMeta.attemptId ||
//     localStorage.getItem("attempt_id");

//   // ------------------------------------------------
//   // SAFE: Load questions from state OR localStorage
//   // ------------------------------------------------
//   const initialQuestions =
//     testMeta.questions ||
//     JSON.parse(localStorage.getItem("questions") || "[]");

//   // ------------------------------------------------
//   // FORMAT QUESTIONS (UPDATED to include tq_id)
//   // ------------------------------------------------
//   const formattedQuestions = Array.isArray(initialQuestions)
//     ? initialQuestions.map((q) => ({
//       tq_id: q.tq_id,                  // ⭐ ADDED
//       id: q.quest_id,
//       question_id: q.question_id,      // optional but kept
//       question: q.question,
//       options: [
//         q.option_a || "N/A",
//         q.option_b || "N/A",
//         q.option_c || "N/A",
//       ]
//     }))
//     : [];

//   const [questions, setQuestions] = useState(formattedQuestions);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   const [showLeaveModal, setShowLeaveModal] = useState(false);

//   usePreventBackExit(() => setShowLeaveModal(true));


//   // -------------------------------------------------------
//   //  LOAD saved answers using get-attempt (NOW USING tq_id)
//   // -------------------------------------------------------
//   useEffect(() => {
//     (async function init() {
//       setLoading(true);

//       try {
//         if (!Array.isArray(questions) || questions.length === 0) {
//           console.warn("No questions received");
//           setQuestions([]);
//           setAnswers([]);
//           setLoading(false);
//           return;
//         }

//         // Format empty local answer state
//         const inicial = questions.map(() => ({
//           selected: null,
//           confirmed: false,
//           visited: false,
//         }));
//         setAnswers(inicial);

//         // --- fetch saved answers ---
//         const getAttemptRes = await axios.post(
//           "https://development.pilotexaminations.com/api/get-attempt",
//           { attempt_id: attemptId, user_id: userId }
//         );

//         if (
//           getAttemptRes?.data &&
//           !getAttemptRes.data.error &&
//           Array.isArray(getAttemptRes.data.questions)
//         ) {
//           const savedMap = new Map();

//           // ⭐ CHANGE 1: create map by tq_id
//           getAttemptRes.data.questions.forEach((s) => {
//             savedMap.set(Number(s.tq_id), {
//               saved_answer: s.saved_answer ?? "",
//               status: s.status ?? "",
//             });
//           });

//           // ⭐ CHANGE 2: merge using tq_id instead of question_id
//           const merged = questions.map((q) => {
//             const entry = savedMap.get(Number(q.tq_id));

//             if (!entry)
//               return { selected: null, confirmed: false, visited: false };

//             const saved = entry.saved_answer || "";
//             const selected =
//               saved === "" ? null : OPTION_LABELS.indexOf(saved);
//             const confirmed = saved !== "";
//             const visited = ["viewed", "answered"].includes(
//               (entry.status || "").toLowerCase()
//             );

//             return { selected, confirmed, visited };
//           });

//           setAnswers(merged);
//         }
//       } catch (err) {
//         console.warn("get-attempt", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [attemptId, questions]);

//   // -----------------
//   // SAME LOGIC BELOW
//   // -----------------

//   const paletteInfo = useMemo(
//     () =>
//       answers.map((entry, idx) => ({
//         index: idx,
//         selected: entry?.selected ?? null,
//         confirmed: entry?.confirmed ?? false,
//         visited: entry?.visited ?? false,
//       })),
//     [answers]
//   );

//   const showToast = (txt, ms = 1500) => {
//     setMessage(txt);
//     setTimeout(() => setMessage(""), ms);
//   };

//   const handleSelectOption = (optionIndex) => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex ? { ...entry, selected: optionIndex } : entry
//       )
//     );
//   };

//   // ----------------------------------------------------
//   // RESET ANSWER API UPDATED to use tq_id
//   // ----------------------------------------------------
//   const handleReset = async () => {
//     if (!questions[currentIndex]) return;

//     const tqid = questions[currentIndex].tq_id; // ⭐ UPDATED

//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex
//           ? { ...entry, selected: null, confirmed: false }
//           : entry
//       )
//     );

//     try {
//       await axios.post(
//         "https://development.pilotexaminations.com/api/reset-answer",
//         { tq_id: tqid, answer: answerLetter, } // ⭐ UPDATED
//       );
//       showToast("Answer reset!");
//     } catch {
//       showToast("Reset failed");
//     }
//   };

//   // ----------------------------------------------------
//   // CONFIRM / SAVE ANSWER API UPDATED to use tq_id
//   // ----------------------------------------------------
//   const handleConfirm = async () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     const tqid = questions[currentIndex].tq_id; // ⭐ UPDATED
//     const answerLetter = OPTION_LABELS[sel];

//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex
//           ? { ...entry, confirmed: true, visited: true }
//           : entry
//       )
//     );

//     try {
//       await axios.post(
//         "https://development.pilotexaminations.com/api/etest/save-answer",
//         {
//           tq_id: tqid,        // ⭐ UPDATED
//           answer: answerLetter,
//         }
//       );
//       showToast("Answer saved!");
//     } catch {
//       showToast("Save failed");
//     }

//     if (currentIndex < questions.length - 1) {
//       goToQuestion(currentIndex + 1);
//     }
//   };

//   const goToQuestion = (idx) => {
//     setAnswers((prev) =>
//       prev.map((a, i) =>
//         i === idx || i === currentIndex ? { ...a, visited: true } : a
//       )
//     );
//     setCurrentIndex(idx);
//   };

//   const goPrev = () => {
//     if (currentIndex > 0) goToQuestion(currentIndex - 1);
//   };

//   const goNext = () => {
//     if (currentIndex < questions.length - 1)
//       goToQuestion(currentIndex + 1);
//   };

//   const handleGoToPlan = () => {
//     if (testMeta.planPath) navigate(testMeta.planPath);
//     else navigate("/dashboard/my-courses");
//   };

//   const attemptedCount = answers.filter((a) => a.confirmed).length;
//   const unvisitedCount = answers.filter(
//     (a) => a.visited && !a.confirmed && a.selected === null
//   ).length;
//   const unattemptedCount = answers.filter((a) => !a.visited).length;

//   const submitFinalTest = async () => {
//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/etest/submit-test",
//         { attempt_id: attemptId, user_id: userId }
//       );

//       showToast("Test submitted!");

//       setTimeout(() => {
//         navigate(`/dashboard/test_result?attempt_id=${attemptId}`, {
//           state: { ...res.data, attempt_id: attemptId },
//           replace: true,
//         });
//       }, 800);
//     } catch {
//       showToast("Submit failed");
//     }
//   };

//   const handleSubmit = () => setShowSubmitModal(true);

//   // ---- loading guard ----
//   if (loading) {
//     return (
//       <div className="etest-shell">
//         <p className="loading-text">Loading Test Questions...</p>
//       </div>
//     );
//   }

//   if (!Array.isArray(questions)) {
//     return (
//       <div className="etest-shell">
//         <div className="etest-question-card">
//           <p>Questions failed to load. Please go back and start the test again.</p>
//         </div>
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return (
//       <div className="etest-shell">
//         <div className="etest-question-card">
//           <p>No questions available.</p>
//         </div>
//       </div>
//     );
//   }

//   const paletteBtnClass = (item) => {
//     if (item.confirmed) return "status-attempted";
//     if (item.visited) return "status-unvisited";
//     return "status-unattempted";
//   };

//   return (
//     <div className="etest-shell">
//       {/* toast */}
//       {message && <div className="etest-msg">{message}</div>}

//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <div className="etest-question-title">
//             <p className="etest-question-label">Question {currentIndex + 1}</p>
//             <h3>{questions[currentIndex].question}</h3>
//           </div>

//           <div className="etest-option-controls">
//             {Array.isArray(questions[currentIndex].options) &&
//               questions[currentIndex].options.map((opt, idx) => (
//                 <label
//                   key={idx}
//                   className={`etest-option-pill ${answers[currentIndex]?.selected === idx ? "is-active" : ""
//                     }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`q-${questions[currentIndex].tq_id}`}
//                     checked={answers[currentIndex]?.selected === idx}
//                     onChange={() => handleSelectOption(idx)}
//                   />
//                   {OPTION_LABELS[idx]}
//                 </label>
//               ))}

//             <button className="etest-reset" onClick={handleReset}>
//               Reset
//             </button>
//             <button
//               className="etest-confirm"
//               onClick={handleConfirm}
//               disabled={answers[currentIndex]?.selected === null}
//             >
//               Confirm
//             </button>
//           </div>

//           <div className="etest-options-list">
//             {Array.isArray(questions[currentIndex].options) &&
//               questions[currentIndex].options.map((opt, idx) => (
//                 <button
//                   key={idx}
//                   className={`etest-option-row ${answers[currentIndex]?.selected === idx ? "is-selected" : ""
//                     }`}
//                   onClick={() => handleSelectOption(idx)}
//                 >
//                   <span className="etest-option-label">
//                     {OPTION_LABELS[idx]}.
//                   </span>
//                   <span>{opt}</span>
//                 </button>
//               ))}
//           </div>
//         </div>

//         <div className="etest-nav-controls">
//           <button
//             className="etest-prev"
//             onClick={goPrev}
//             disabled={currentIndex === 0}
//           >
//             &lt; Previous
//           </button>

//           <button
//             className="etest-next"
//             onClick={goNext}
//             disabled={currentIndex === questions.length - 1}
//           >
//             Next &gt;
//           </button>
//         </div>
//       </div>

//       {/* SIDEBAR */}
//       <aside className="etest-sidebar">
//         <div className="etest-sidebar-header">
//           <div>
//             <button className="etest-sidebar-link" onClick={handleGoToPlan}>
//               E-Test
//             </button>
//             {testMeta.topic && (
//               <p className="etest-sidebar-subtitle">{testMeta.topic}</p>
//             )}
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button className="etest-submit py-2" onClick={handleSubmit}>
//             Submit Test
//           </button>
//         </div>

//         <div className="etest-palette">
//           <p className="etest-palette-heading">Questions</p>

//           <div className="etest-palette-scroll">
//             <div className="etest-palette-grid">
//               {paletteInfo.map((item) => (
//                 <button
//                   key={item.index}
//                   className={`etest-palette-btn ${item.index === currentIndex ? "is-active" : ""
//                     } ${paletteBtnClass(item)}`}
//                   onClick={() => goToQuestion(item.index)}
//                 >
//                   {item.index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* SUBMIT MODAL */}
//       {showSubmitModal && (
//         <div className="etest-modal-overlay">
//           <div className="etest-modal">
//             <div className="etest-modal-header">
//               <h4>Confirm Test Submission</h4>
//               <button
//                 className="modal-close"
//                 onClick={() => setShowSubmitModal(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="etest-modal-body">
//               <p className="summary-title">Test Summary</p>

//               <div className="summary-row">
//                 <div className="summary-item">
//                   <span className="summary-box attempted-box"></span>
//                   Attempted ({attemptedCount})
//                 </div>

//                 <div className="summary-item">
//                   <span className="summary-box unvisited-box"></span>
//                   Unvisited ({unvisitedCount})
//                 </div>

//                 <div className="summary-item">
//                   <span className="summary-box unattempted-box"></span>
//                   Unattempted ({unattemptedCount})
//                 </div>
//               </div>
//             </div>

//             <div className="etest-modal-footer">
//               <button className="end-test-btn" onClick={submitFinalTest}>
//                 End Test
//               </button>

//               <button
//                 className="review-test-btn"
//                 onClick={() => setShowSubmitModal(false)}
//               >
//                 Review Test
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* LEAVE TEST MODAL */}
//       <LeaveTestModal
//         visible={showLeaveModal}
//        onExit={() => navigate(testMeta.planPath || "/dashboard")}
//         onStay={() => setShowLeaveModal(false)}
//       />

//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./EtestAttempt.css";
import LeaveTestModal from "../component/LeaveTestModal";
import usePreventBackExit from "../hooks/usePreventBackExit";

const OPTION_LABELS = ["A", "B", "C"];

export default function EtestAttempt() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ---------- Coming from PlanEtest ----------
  const testMeta = location.state || {};
  const type = testMeta.type || "etest"; // ⭐ e-test OR practice-test
  const userId = testMeta.userId || JSON.parse(localStorage.getItem("user") || "{}").id;

  // ---------- FOR E-TEST ----------
  const attemptId =
    searchParams.get("attempt_id") ||
    testMeta.attemptId ||
    localStorage.getItem("attempt_id");

  // ---------- FOR PRACTICE TEST ----------
  const testId =
    searchParams.get("test_id") ||
    testMeta.testId ||
    localStorage.getItem("practice_test_id");

  // ---------- Get questions from state or localStorage ----------
  const storedQuestions =
    testMeta.questions ||
    JSON.parse(localStorage.getItem("questions") || "[]");

  const formattedQuestions = Array.isArray(storedQuestions)
    ? storedQuestions.map((q) => ({
        tq_id: q.tq_id,
        question: q.question,
        options: [q.option_a, q.option_b, q.option_c],
      }))
    : [];

  const [questions, setQuestions] = useState(formattedQuestions);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [message, setMessage] = useState("");

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  usePreventBackExit(() => setShowLeaveModal(true));

  // ======================================================
  // ⭐ AUTO FETCH SAVED ANSWERS (Both E-Test & Practice)
  // ======================================================
  useEffect(() => {
    (async function init() {
      setLoading(true);

      if (!questions.length) {
        setLoading(false);
        return;
      }

      // initial blank answer set
      const initAnswers = questions.map(() => ({
        selected: null,
        confirmed: false,
        visited: false,
      }));

      setAnswers(initAnswers);

      try {
        let res;

        if (type === "practice-test") {
          // ⭐ PRACTICE saved answers API
          res = await axios.post(
            "https://development.pilotexaminations.com/api/practice/attempt",
            { test_id: testId }
          );
        } else {
          // ⭐ E-TEST saved answers API
          res = await axios.post(
            "https://development.pilotexaminations.com/api/get-attempt",
            { attempt_id: attemptId, user_id: userId }
          );
        }

        if (
          res?.data?.questions &&
          Array.isArray(res.data.questions)
        ) {
          const savedMap = new Map();

          res.data.questions.forEach((s) => {
            savedMap.set(Number(s.tq_id), {
              saved_answer: s.saved_answer,
              status: s.status,
            });
          });

          const merged = questions.map((q) => {
            const entry = savedMap.get(Number(q.tq_id));

            if (!entry)
              return { selected: null, confirmed: false, visited: false };

            const saved = entry.saved_answer || "";
            const selected =
              saved === "" ? null : OPTION_LABELS.indexOf(saved);
            const confirmed = saved !== "";
            const visited =
              entry.status?.toLowerCase() === "answered" ||
              entry.status?.toLowerCase() === "viewed";

            return { selected, confirmed, visited };
          });

          setAnswers(merged);
        }
      } catch (err) {
        console.log("Error loading attempt:", err);
      }

      setLoading(false);
    })();
  }, [attemptId, testId, type]);

  // ======================================================
  // ⭐ UNIVERSAL SAVE ANSWER
  // ======================================================
  const handleConfirm = async () => {
    const sel = answers[currentIndex]?.selected;
    if (sel === null) return;

    const tqid = questions[currentIndex].tq_id;
    const answerLetter = OPTION_LABELS[sel];

    setAnswers((prev) =>
      prev.map((a, i) =>
        i === currentIndex ? { ...a, confirmed: true, visited: true } : a
      )
    );

    try {
      if (type === "practice-test") {
        // ⭐ PRACTICE save answer
        await axios.post(
          "https://development.pilotexaminations.com/api/practice/save-answer",
          { tq_id: tqid, answer: answerLetter }
        );
      } else {
        // ⭐ E-TEST save answer
        await axios.post(
          "https://development.pilotexaminations.com/api/etest/save-answer",
          { tq_id: tqid, answer: answerLetter }
        );
      }

      showToast("Answer saved!");
    } catch {
      showToast("Save failed");
    }

    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  // ======================================================
  // ⭐ UNIVERSAL RESET ANSWER
  // ======================================================
  const handleReset = async () => {
    const tqid = questions[currentIndex].tq_id;

    setAnswers((prev) =>
      prev.map((a, i) =>
        i === currentIndex ? { ...a, selected: null, confirmed: false } : a
      )
    );

    try {
      if (type === "practice-test") {
        await axios.post(
          "https://development.pilotexaminations.com/api/practice/reset-answer",
          { tq_id: tqid, answer: "" }
        );
      } else {
        await axios.post(
          "https://development.pilotexaminations.com/api/reset-answer",
          { tq_id: tqid, answer: "" }
        );
      }

      showToast("Answer reset!");
    } catch {
      showToast("Reset failed");
    }
  };

  // ======================================================
  // ⭐ UNIVERSAL SUBMIT TEST
  // ======================================================
  const submitFinalTest = async () => {
    try {
      let res;

      if (type === "practice-test") {
        res = await axios.post(
          "https://development.pilotexaminations.com/api/practice/submit",
          { test_id: testId }
        );
      } else {
        res = await axios.post(
          "https://development.pilotexaminations.com/api/etest/submit-test",
          { attempt_id: attemptId, user_id: userId }
        );
      }

      showToast("Test submitted!");

      setTimeout(() => {
        navigate(`/dashboard/test_result`, {
          state: { ...res.data, attempt_id: attemptId, test_id: testId, type },
          replace: true,
        });
      }, 800);
    } catch {
      showToast("Submit failed");
    }
  };

  // ======================================================
  // UI FUNCTIONS (unchanged)
  // ======================================================
  const goToQuestion = (idx) => {
    setAnswers((prev) =>
      prev.map((a, i) =>
        i === idx || i === currentIndex ? { ...a, visited: true } : a
      )
    );
    setCurrentIndex(idx);
  };

  const showToast = (txt, ms = 1500) => {
    setMessage(txt);
    setTimeout(() => setMessage(""), ms);
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) =>
      prev.map((entry, idx) =>
        idx === currentIndex ? { ...entry, selected: optionIndex } : entry
      )
    );
  };

  // ======================================================
  // RENDER
  // ======================================================

  if (loading) {
    return (
      <div className="etest-shell">
        <p className="loading-text">Loading Test Questions...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="etest-shell">
        <p>No questions available.</p>
      </div>
    );
  }

  const paletteInfo = answers.map((entry, idx) => ({
    index: idx,
    selected: entry.selected,
    confirmed: entry.confirmed,
    visited: entry.visited,
  }));

  const paletteBtnClass = (item) => {
    if (item.confirmed) return "status-attempted";
    if (item.visited) return "status-unvisited";
    return "status-unattempted";
  };

  return (
    <div className="etest-shell">
      {/* toast */}
      {message && <div className="etest-msg">{message}</div>}

      {/* ---- LEFT SIDE QUESTION PANEL ---- */}
      <div className="etest-question-panel">
        <div className="etest-question-card">
          <div className="etest-question-title">
            <p className="etest-question-label">Question {currentIndex + 1}</p>
            <h3>{questions[currentIndex].question}</h3>
          </div>

          <div className="etest-option-controls">
            {questions[currentIndex].options.map((opt, idx) => (
              <label
                key={idx}
                className={`etest-option-pill ${
                  answers[currentIndex]?.selected === idx ? "is-active" : ""
                }`}
              >
                <input
                  type="radio"
                  checked={answers[currentIndex]?.selected === idx}
                  onChange={() => handleSelectOption(idx)}
                />
                {OPTION_LABELS[idx]}
              </label>
            ))}

            <button className="etest-reset" onClick={handleReset}>
              Reset
            </button>
            <button
              className="etest-confirm"
              onClick={handleConfirm}
              disabled={answers[currentIndex]?.selected === null}
            >
              Confirm
            </button>
          </div>

          <div className="etest-options-list">
            {questions[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                className={`etest-option-row ${
                  answers[currentIndex]?.selected === idx ? "is-selected" : ""
                }`}
                onClick={() => handleSelectOption(idx)}
              >
                <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="etest-nav-controls">
          <button
            className="etest-prev"
            onClick={() => goToQuestion(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            &lt; Previous
          </button>

          <button
            className="etest-next"
            onClick={() => goToQuestion(currentIndex + 1)}
            disabled={currentIndex === questions.length - 1}
          >
            Next &gt;
          </button>
        </div>
      </div>

      {/* ---- RIGHT SIDEBAR ---- */}
      <aside className="etest-sidebar">
        <div className="etest-sidebar-header">
          <div>
            <button
              className="etest-sidebar-link"
              onClick={() => navigate(testMeta.planPath || "/dashboard")}
            >
              {type === "practice-test" ? "Practice Test" : "E-Test"}
            </button>

            <p className="etest-sidebar-meta">
              ID: {type === "practice-test" ? testId : attemptId}
            </p>
          </div>

          <button className="etest-submit py-2" onClick={() => setShowSubmitModal(true)}>
            Submit Test
          </button>
        </div>

        <div className="etest-palette">
          <p className="etest-palette-heading">Questions</p>

          <div className="etest-palette-scroll">
            <div className="etest-palette-grid">
              {paletteInfo.map((item) => (
                <button
                  key={item.index}
                  className={`etest-palette-btn ${
                    item.index === currentIndex ? "is-active" : ""
                  } ${paletteBtnClass(item)}`}
                  onClick={() => goToQuestion(item.index)}
                >
                  {item.index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ---- SUBMIT MODAL ---- */}
      {showSubmitModal && (
        <div className="etest-modal-overlay">
          <div className="etest-modal">
            <div className="etest-modal-header">
              <h4>Confirm Test Submission</h4>
              <button className="modal-close" onClick={() => setShowSubmitModal(false)}>
                ✕
              </button>
            </div>

            <div className="etest-modal-body">
              <p className="summary-title">Test Summary</p>

              <div className="summary-row">
                <div className="summary-item">
                  <span className="summary-box attempted-box"></span>
                  Attempted (
                  {answers.filter((a) => a.confirmed).length})
                </div>

                <div className="summary-item">
                  <span className="summary-box unvisited-box"></span>
                  Unvisited (
                  {answers.filter(
                    (a) => a.visited && !a.confirmed && a.selected === null
                  ).length}
                  )
                </div>

                <div className="summary-item">
                  <span className="summary-box unattempted-box"></span>
                  Unattempted (
                  {answers.filter((a) => !a.visited).length})
                </div>
              </div>
            </div>

            <div className="etest-modal-footer">
              <button className="end-test-btn" onClick={submitFinalTest}>
                End Test
              </button>

              <button
                className="review-test-btn"
                onClick={() => setShowSubmitModal(false)}
              >
                Review Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEAVE TEST MODAL */}
      <LeaveTestModal
        visible={showLeaveModal}
        onExit={() => navigate(testMeta.planPath || "/dashboard")}
        onStay={() => setShowLeaveModal(false)}
      />
    </div>
  );
}









































