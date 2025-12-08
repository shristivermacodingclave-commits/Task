// // ---------------------------------------------
// // MockTestAttempt.jsx
// // ---------------------------------------------
// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css"; // SAME CSS → same UI look

// const OPTION_LABELS = ["A", "B", "C"];

// export default function MockTestAttempt() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ------------------------------
//   // META DATA FROM PlanMocktest
//   // ------------------------------
//   const testMeta = location.state || {};
//   const userId = testMeta.userId || 10;

//   const attemptId =
//     searchParams.get("attempt_id") ||
//     testMeta.attemptId ||
//     localStorage.getItem("mock_attempt_id");

//   // ---------------------------------------
//   // LOAD QUESTIONS FROM STATE OR LOCALSTORE
//   // ---------------------------------------
//   const initialQuestions =
//     testMeta.questions ||
//     JSON.parse(localStorage.getItem("mock_questions") || "[]");

//   const formattedQuestions = Array.isArray(initialQuestions)
//     ? initialQuestions.map((q) => ({
//         tq_id: q.tq_id,
//         question: q.question,
//         options: [
//           q.option_a || "N/A",
//           q.option_b || "N/A",
//           q.option_c || "N/A",
//         ],
//       }))
//     : [];

//   const [questions, setQuestions] = useState(formattedQuestions);

//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   // ------------------------------
//   // INIT ANSWERS LOCALLY
//   // ------------------------------
//   useEffect(() => {
//     setLoading(true);

//     if (!questions.length) {
//       setAnswers([]);
//       setLoading(false);
//       return;
//     }

//     // MockTest DOES NOT fetch saved answers from API
//     const local = questions.map(() => ({
//       selected: null,
//       confirmed: false,
//       visited: false,
//     }));

//     setAnswers(local);
//     setLoading(false);
//   }, [questions]);

//   // ------------------------------
//   // PALLETE INFO
//   // ------------------------------
//   const paletteInfo = useMemo(
//     () =>
//       answers.map((entry, idx) => ({
//         index: idx,
//         selected: entry.selected,
//         confirmed: entry.confirmed,
//         visited: entry.visited,
//       })),
//     [answers]
//   );

//   const showToast = (msg, ms = 1500) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(""), ms);
//   };

//   // ------------------------------
//   // HANDLE SELECT OPTION
//   // ------------------------------
//   const handleSelectOption = (optionIndex) => {
//     setAnswers((prev) =>
//       prev.map((ans, idx) =>
//         idx === currentIndex ? { ...ans, selected: optionIndex } : ans
//       )
//     );
//   };

//   // ------------------------------
//   // RESET OPTION (LOCAL ONLY)
//   // ------------------------------
//   const handleReset = () => {
//     setAnswers((prev) =>
//       prev.map((ans, idx) =>
//         idx === currentIndex
//           ? { ...ans, selected: null, confirmed: false }
//           : ans
//       )
//     );
//     showToast("Answer reset!");
//   };

//   // ------------------------------
//   // CONFIRM ANSWER (LOCAL ONLY)
//   // ------------------------------
//   const handleConfirm = () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     setAnswers((prev) =>
//       prev.map((ans, idx) =>
//         idx === currentIndex
//           ? { ...ans, confirmed: true, visited: true }
//           : ans
//       )
//     );

//     showToast("Answer saved!");

//     if (currentIndex < questions.length - 1) {
//       goToQuestion(currentIndex + 1);
//     }
//   };

//   const goToQuestion = (idx) => {
//     setAnswers((prev) =>
//       prev.map((ans, i) =>
//         i === idx ? { ...ans, visited: true } : ans
//       )
//     );
//     setCurrentIndex(idx);
//   };

//   const goPrev = () => currentIndex > 0 && goToQuestion(currentIndex - 1);
//   const goNext = () =>
//     currentIndex < questions.length - 1 && goToQuestion(currentIndex + 1);

//   // ------------------------------
//   // SUBMIT MOCK TEST (LOCAL)
//   // ------------------------------
//   const submitMockTest = () => {
//     showToast("Mock Test Submitted!");

//     setTimeout(() => {
//       navigate(`/dashboard/test_result?attempt_id=${attemptId}`, {
//         state: {
//           attempt_id: attemptId,
//           mock: true,
//           questions,
//           answers,
//         },
//       });
//     }, 800);
//   };

//   if (loading) {
//     return (
//       <div className="etest-shell">
//         <p className="loading-text">Loading Mock Test...</p>
//       </div>
//     );
//   }

//   if (!questions.length) {
//     return (
//       <div className="etest-shell">
//         <p>No mock test questions available.</p>
//       </div>
//     );
//   }

//   const attemptedCount = answers.filter((a) => a.confirmed).length;
//   const unvisitedCount = answers.filter((a) => !a.visited).length;
//   const unattemptedCount = answers.length - attemptedCount - unvisitedCount;

//   const paletteBtnClass = (item) => {
//     if (item.confirmed) return "status-attempted";
//     if (item.visited) return "status-unvisited";
//     return "status-unattempted";
//   };

//   return (
//     <div className="etest-shell">
//       {message && <div className="etest-msg">{message}</div>}

//       {/* MAIN QUESTION PANEL */}
//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <p className="etest-question-label">Question {currentIndex + 1}</p>
//           <h3>{questions[currentIndex].question}</h3>

//           {/* OPTIONS PILLS */}
//           <div className="etest-option-controls">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${
//                   answers[currentIndex]?.selected === idx ? "is-active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   checked={answers[currentIndex]?.selected === idx}
//                   onChange={() => handleSelectOption(idx)}
//                 />
//                 {OPTION_LABELS[idx]}
//               </label>
//             ))}

//             <button className="etest-reset" onClick={handleReset}>
//               Reset
//             </button>

//             <button
//               className="etest-confirm"
//               disabled={answers[currentIndex]?.selected === null}
//               onClick={handleConfirm}
//             >
//               Confirm
//             </button>
//           </div>

//           {/* FULL WIDTH OPTION ROWS */}
//           <div className="etest-options-list">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${
//                   answers[currentIndex]?.selected === idx ? "is-selected" : ""
//                 }`}
//                 onClick={() => handleSelectOption(idx)}
//               >
//                 <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         <div className="etest-nav-controls">
//           <button onClick={goPrev} disabled={currentIndex === 0}>
//             ‹ Previous
//           </button>
//           <button
//             onClick={goNext}
//             disabled={currentIndex === questions.length - 1}
//           >
//             Next ›
//           </button>
//         </div>
//       </div>

//       {/* SIDEBAR */}
//       <aside className="etest-sidebar">
//         <div className="etest-sidebar-header">
//           <div>
//             <button className="etest-sidebar-link">Mock Test</button>
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button className="etest-submit" onClick={() => setShowSubmitModal(true)}>
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
//                   className={`etest-palette-btn ${
//                     item.index === currentIndex ? "is-active" : ""
//                   } ${paletteBtnClass(item)}`}
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
//               <h4>Submit Mock Test</h4>
//               <button className="modal-close" onClick={() => setShowSubmitModal(false)}>
//                 ✕
//               </button>
//             </div>

//             <div className="etest-modal-body">
//               <p className="summary-title">Summary</p>
//               <div className="summary-row">
//                 <p>Attempted: {attemptedCount}</p>
//                 <p>Unvisited: {unvisitedCount}</p>
//                 <p>Unattempted: {unattemptedCount}</p>
//               </div>
//             </div>

//             <div className="etest-modal-footer">
//               <button className="end-test-btn" onClick={submitMockTest}>
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
//     </div>
//   );
// }





// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css"; // same css → same UI

// const OPTION_LABELS = ["A", "B", "C"];

// export default function MockTestAttempt() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const testMeta = location.state || {};
//   const userId = testMeta.userId || 10;

//   const attemptId =
//     searchParams.get("attempt_id") ||
//     testMeta.attemptId ||
//     localStorage.getItem("mock_attempt_id");

//   // ------------------------------
//   // LOAD MOCK QUESTIONS
//   // ------------------------------
//   const initialQuestions =
//     testMeta.questions ||
//     JSON.parse(localStorage.getItem("mock_questions") || "[]");

//   const formattedQuestions = Array.isArray(initialQuestions)
//     ? initialQuestions.map((q) => ({
//         tq_id: q.tq_id,
//         question: q.question,
//         options: [
//           q.option_a || "N/A",
//           q.option_b || "N/A",
//           q.option_c || "N/A",
//         ],
//       }))
//     : [];

//   const [questions, setQuestions] = useState(formattedQuestions);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   // ------------------------------
//   // INITIAL ANSWER SETUP
//   // ------------------------------
//   useEffect(() => {
//     setLoading(true);

//     if (!questions.length) {
//       setAnswers([]);
//       setLoading(false);
//       return;
//     }

//     const localAnswers = questions.map(() => ({
//       selected: null,
//       confirmed: false,
//       visited: false,
//     }));

//     setAnswers(localAnswers);
//     setLoading(false);
//   }, [questions]);

//   // ------------------------------
//   // PALETTE INFO
//   // ------------------------------
//   const paletteInfo = useMemo(
//     () =>
//       answers.map((entry, idx) => ({
//         index: idx,
//         selected: entry.selected,
//         confirmed: entry.confirmed,
//         visited: entry.visited,
//       })),
//     [answers]
//   );

//   const showToast = (msg, ms = 1500) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(""), ms);
//   };

//   // ------------------------------
//   // HANDLE SELECT OPTION
//   // ------------------------------
//   const handleSelectOption = (optIndex) => {
//     setAnswers((prev) =>
//       prev.map((ans, idx) =>
//         idx === currentIndex ? { ...ans, selected: optIndex } : ans
//       )
//     );
//   };

//   // ------------------------------
//   // HANDLE RESET (LOCAL)
//   // ------------------------------
//   const handleReset = () => {
//     setAnswers((prev) =>
//       prev.map((ans, idx) =>
//         idx === currentIndex
//           ? { ...ans, selected: null, confirmed: false }
//           : ans
//       )
//     );
//     showToast("Answer reset!");
//   };

//   // ------------------------------
//   // HANDLE CONFIRM (LOCAL)
//   // ------------------------------
//   const handleConfirm = () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     setAnswers((prev) =>
//       prev.map((ans, idx) =>
//         idx === currentIndex
//           ? { ...ans, confirmed: true, visited: true }
//           : ans
//       )
//     );

//     showToast("Answer saved!");
//     if (currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
//   };

//   const goToQuestion = (idx) => {
//     setAnswers((prev) =>
//       prev.map((ans, i) =>
//         i === idx ? { ...ans, visited: true } : ans
//       )
//     );
//     setCurrentIndex(idx);
//   };

//   const goPrev = () => currentIndex > 0 && goToQuestion(currentIndex - 1);
//   const goNext = () =>
//     currentIndex < questions.length - 1 && goToQuestion(currentIndex + 1);

//   // ------------------------------
//   // SUBMIT MOCK TEST
//   // ------------------------------
//   const submitMockTest = () => {
//     showToast("Mock Test Submitted!");

//     setTimeout(() => {
//       navigate(`/dashboard/test_result?attempt_id=${attemptId}`, {
//         state: {
//           mock: true,
//           attempt_id: attemptId,
//           questions,
//           answers,
//         },
//       });
//     }, 900);
//   };

//   // ------------------------------
//   // LOADING HANDLING
//   // ------------------------------
//   if (loading) {
//     return (
//       <div className="etest-shell">
//         <p className="loading-text">Loading Mock Test...</p>
//       </div>
//     );
//   }

//   if (!questions.length) {
//     return (
//       <div className="etest-shell">
//         <div className="etest-question-card">
//           <p>No mock test questions available.</p>
//         </div>
//       </div>
//     );
//   }

//   // ------------------------------
//   // COUNTS
//   // ------------------------------
//   const attemptedCount = answers.filter((a) => a.confirmed).length;
//   const unvisitedCount = answers.filter((a) => !a.visited).length;
//   const unattemptedCount = answers.length - attemptedCount - unvisitedCount;

//   const paletteBtnClass = (item) => {
//     if (item.confirmed) return "status-attempted";
//     if (item.visited) return "status-unvisited";
//     return "status-unattempted";
//   };

//   // ------------------------------
//   // MAIN UI RETURN
//   // ------------------------------
//   return (
//     <div className="etest-shell">
//       {message && <div className="etest-msg">{message}</div>}

//       {/* LEFT PANEL */}
//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <div className="etest-question-title">
//             <p className="etest-question-label">Question {currentIndex + 1}</p>
//             <h3>{questions[currentIndex].question}</h3>
//           </div>

//           {/* OPTION PILLS */}
//           <div className="etest-option-controls">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${
//                   answers[currentIndex]?.selected === idx ? "is-active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   checked={answers[currentIndex]?.selected === idx}
//                   onChange={() => handleSelectOption(idx)}
//                 />
//                 {OPTION_LABELS[idx]}
//               </label>
//             ))}

//             <button className="etest-reset" onClick={handleReset}>
//               Reset
//             </button>

//             <button
//               className="etest-confirm"
//               disabled={answers[currentIndex]?.selected === null}
//               onClick={handleConfirm}
//             >
//               Confirm
//             </button>
//           </div>

//           {/* FULL ROW OPTIONS */}
//           <div className="etest-options-list">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${
//                   answers[currentIndex]?.selected === idx ? "is-selected" : ""
//                 }`}
//                 onClick={() => handleSelectOption(idx)}
//               >
//                 <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         <div className="etest-nav-controls">
//           <button className="etest-prev" onClick={goPrev} disabled={currentIndex === 0}>
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

//       {/* RIGHT SIDEBAR */}
//       <aside className="etest-sidebar">
//         <div className="etest-sidebar-header">
//           <div>
//             <button className="etest-sidebar-link">Mock Test</button>
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button className="etest-submit" onClick={() => setShowSubmitModal(true)}>
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
//                   className={`etest-palette-btn ${
//                     item.index === currentIndex ? "is-active" : ""
//                   } ${paletteBtnClass(item)}`}
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
//               <h4>Submit Mock Test</h4>
//               <button className="modal-close" onClick={() => setShowSubmitModal(false)}>
//                 ✕
//               </button>
//             </div>

//             <div className="etest-modal-body">
//               <p className="summary-title">Summary</p>
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
//               <button className="end-test-btn" onClick={submitMockTest}>
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
//     </div>
//   );
// }





// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import "./EtestAttempt.css"; // use same UI

// const OPTION_LABELS = ["A", "B", "C"];

// export default function MockTestAttempt() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const testMeta = location.state || {};
//   const userId = testMeta.userId || 0;

//   const attemptId =
//     searchParams.get("attempt_id") ||
//     testMeta.attemptId ||
//     localStorage.getItem("mock_attempt_id");

//   // ------------------------
//   // LOAD QUESTIONS
//   // ------------------------
//   const initialQuestions =
//     testMeta.questions ||
//     JSON.parse(localStorage.getItem("mock_questions") || "[]");

//   const formattedQuestions = Array.isArray(initialQuestions)
//     ? initialQuestions.map((q) => ({
//         tq_id: q.tq_id,
//         question: q.question,
//         options: [q.option_a, q.option_b, q.option_c],
//       }))
//     : [];

//   const [questions, setQuestions] = useState(formattedQuestions);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   const showToast = (msg, ms = 1500) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(""), ms);
//   };

//   // ------------------------
//   // LOAD SAVED ANSWERS (MOCK)
//   // ------------------------
//   useEffect(() => {
//     (async () => {
//       if (!attemptId || questions.length === 0) {
//         setAnswers([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.post(
//           "https://development.pilotexaminations.com/api/mock/get-attempt",
//           { test_id: attemptId }
//         );

//         if (!res.data.error && Array.isArray(res.data.questions)) {
//           const savedMap = new Map();
//           res.data.questions.forEach((q) => {
//             savedMap.set(Number(q.tq_id), {
//               saved_answer: q.saved_answer,
//               status: q.status,
//             });
//           });

//           const merged = questions.map((q) => {
//             const entry = savedMap.get(q.tq_id);
//             if (!entry)
//               return { selected: null, confirmed: false, visited: false };

//             const selected =
//               entry.saved_answer === "" || entry.saved_answer === null
//                 ? null
//                 : OPTION_LABELS.indexOf(entry.saved_answer.toUpperCase());

//             const confirmed = selected !== null;
//             const visited =
//               entry.status === "answered" || entry.status === "viewed";

//             return { selected, confirmed, visited };
//           });

//           setAnswers(merged);
//         } else {
//           setAnswers(
//             questions.map(() => ({
//               selected: null,
//               confirmed: false,
//               visited: false,
//             }))
//           );
//         }
//       } catch (e) {
//         console.log("Mock get-attempt failed", e);
//         setAnswers(
//           questions.map(() => ({
//             selected: null,
//             confirmed: false,
//             visited: false,
//           }))
//         );
//       }

//       setLoading(false);
//     })();
//   }, [questions, attemptId]);

//   // ------------------------
//   // SELECT ANSWER
//   // ------------------------
//   const handleSelectOption = (idx) => {
//     setAnswers((prev) =>
//       prev.map((ans, i) =>
//         i === currentIndex ? { ...ans, selected: idx } : ans
//       )
//     );
//   };

//   // ------------------------
//   // RESET ANSWER (API)
//   // ------------------------
//   const handleReset = async () => {
//     const tqid = questions[currentIndex].tq_id;

//     setAnswers((prev) =>
//       prev.map((ans, i) =>
//         i === currentIndex
//           ? { ...ans, selected: null, confirmed: false }
//           : ans
//       )
//     );

//     try {
//       await axios.post(
//         "https://development.pilotexaminations.com/api/mock/reset-answer",
//         {
//           tq_id: tqid,
//           answer: "", // backend ignores answer for reset
//         }
//       );
//       showToast("Answer reset!");
//     } catch (err) {
//       showToast("Reset failed!");
//     }
//   };

//   // ------------------------
//   // CONFIRM ANSWER (API)
//   // ------------------------
//   const handleConfirm = async () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     const tqid = questions[currentIndex].tq_id;
//     const answerLetter = OPTION_LABELS[sel];

//     setAnswers((prev) =>
//       prev.map((ans, i) =>
//         i === currentIndex
//           ? { ...ans, confirmed: true, visited: true }
//           : ans
//       )
//     );

//     try {
//       await axios.post(
//         "https://development.pilotexaminations.com/api/mock/save-answer",
//         {
//           tq_id: tqid,
//           answer: answerLetter,
//         }
//       );
//       showToast("Answer saved!");
//     } catch {
//       showToast("Save failed!");
//     }

//     if (currentIndex < questions.length - 1) {
//       goToQuestion(currentIndex + 1);
//     }
//   };

//   const goToQuestion = (idx) => {
//     setAnswers((prev) =>
//       prev.map((ans, i) =>
//         i === idx ? { ...ans, visited: true } : ans
//       )
//     );
//     setCurrentIndex(idx);
//   };

//   const goPrev = () => currentIndex > 0 && goToQuestion(currentIndex - 1);
//   const goNext = () =>
//     currentIndex < questions.length - 1 && goToQuestion(currentIndex + 1);

//   // ------------------------
//   // SUBMIT MOCK TEST
//   // ------------------------
//   const submitMockTest = () => {
//     showToast("Mock Test Submitted!");

//     setTimeout(() => {
//       navigate(`/dashboard/test_result?attempt_id=${attemptId}`, {
//         state: {
//           mock: true,
//           attempt_id: attemptId,
//           questions,
//           answers,
//         },
//       });
//     }, 800);
//   };

//   // ------------------------
//   // UI RENDER
//   // ------------------------
//   if (loading)
//     return (
//       <div className="etest-shell">
//         <p className="loading-text">Loading Mock Test...</p>
//       </div>
//     );

//   const attemptedCount = answers.filter((a) => a.confirmed).length;
//   const unvisitedCount = answers.filter((a) => !a.visited).length;
//   const unattemptedCount = answers.length - attemptedCount - unvisitedCount;

//   const paletteBtnClass = (item) => {
//     if (item.confirmed) return "status-attempted";
//     if (item.visited) return "status-unvisited";
//     return "status-unattempted";
//   };

//   return (
//     <div className="etest-shell">
//       {message && <div className="etest-msg">{message}</div>}

//       {/* Question Panel */}
//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <p className="etest-question-label">
//             Question {currentIndex + 1}
//           </p>
//           <h3>{questions[currentIndex].question}</h3>

//           {/* Option Pills */}
//           <div className="etest-option-controls">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${
//                   answers[currentIndex]?.selected === idx ? "is-active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   checked={answers[currentIndex]?.selected === idx}
//                   onChange={() => handleSelectOption(idx)}
//                 />
//                 {OPTION_LABELS[idx]}
//               </label>
//             ))}

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

//           {/* Full List Options */}
//           <div className="etest-options-list">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${
//                   answers[currentIndex]?.selected === idx
//                     ? "is-selected"
//                     : ""
//                 }`}
//                 onClick={() => handleSelectOption(idx)}
//               >
//                 <span className="etest-option-label">
//                   {OPTION_LABELS[idx]}.
//                 </span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="etest-nav-controls">
//           <button onClick={goPrev} disabled={currentIndex === 0}>
//             ‹ Previous
//           </button>
//           <button
//             onClick={goNext}
//             disabled={currentIndex === questions.length - 1}
//           >
//             Next ›
//           </button>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <aside className="etest-sidebar">
//         <div className="etest-sidebar-header">
//           <div>
//             <button className="etest-sidebar-link">Mock Test</button>
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button
//             className="etest-submit"
//             onClick={() => setShowSubmitModal(true)}
//           >
//             Submit Test
//           </button>
//         </div>

//         <div className="etest-palette">
//           <p className="etest-palette-heading">Questions</p>

//           <div className="etest-palette-scroll">
//             <div className="etest-palette-grid">
//               {answers.map((item, idx) => (
//                 <button
//                   key={idx}
//                   className={`etest-palette-btn ${
//                     idx === currentIndex ? "is-active" : ""
//                   } ${paletteBtnClass(item)}`}
//                   onClick={() => goToQuestion(idx)}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Submit Modal */}
//       {showSubmitModal && (
//         <div className="etest-modal-overlay">
//           <div className="etest-modal">
//             <h4>Submit Mock Test</h4>

//             <div className="summary-row">
//               <p>Attempted: {attemptedCount}</p>
//               <p>Unvisited: {unvisitedCount}</p>
//               <p>Unattempted: {unattemptedCount}</p>
//             </div>

//             <button className="end-test-btn" onClick={submitMockTest}>
//               End Test
//             </button>

//             <button
//               className="review-test-btn"
//               onClick={() => setShowSubmitModal(false)}
//             >
//               Review Test
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./EtestAttempt.css"; // make sure only ONE import exists in project (see checklist)

const OPTION_LABELS = ["A", "B", "C"];

export default function MockTestAttempt() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const testMeta = location.state || {};
  const userId = testMeta.userId || 0;

  const attemptId =
    searchParams.get("attempt_id") ||
    testMeta.attemptId ||
    localStorage.getItem("mock_attempt_id");

  // load questions from state or mock_questions
  const initialQuestions =
    testMeta.questions ||
    JSON.parse(localStorage.getItem("mock_questions") || "[]");

  const formattedQuestions = Array.isArray(initialQuestions)
    ? initialQuestions.map((q) => ({
        tq_id: q.tq_id,
        question: q.question,
        options: [q.option_a || "N/A", q.option_b || "N/A", q.option_c || "N/A"],
      }))
    : [];

  const [questions, setQuestions] = useState(formattedQuestions);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [message, setMessage] = useState("");

  // initialize answers and (optionally) load saved answers from mock/get-attempt
  useEffect(() => {
    (async () => {
      setLoading(true);

      if (!questions.length) {
        setAnswers([]);
        setLoading(false);
        return;
      }

      // prepare default answer objects
      const base = questions.map(() => ({
        selected: null,
        confirmed: false,
        visited: false,
      }));

      // if attemptId present, try to load saved answers from API
      if (attemptId) {
        try {
          const res = await axios.post(
            "https://development.pilotexaminations.com/api/mock/get-attempt",
            { test_id: attemptId }
          );

          if (!res.data.error && Array.isArray(res.data.questions)) {
            // map saved answers by tq_id
            const savedMap = new Map();
            res.data.questions.forEach((s) => {
              savedMap.set(Number(s.tq_id), {
                saved_answer: s.saved_answer ?? "",
                status: s.status ?? "",
              });
            });

            const merged = questions.map((q) => {
              const entry = savedMap.get(Number(q.tq_id));
              if (!entry) return { ...base[0] }; // default

              const saved = (entry.saved_answer || "").toUpperCase();
              const selected = saved === "" ? null : OPTION_LABELS.indexOf(saved);
              const confirmed = selected !== null;
              const visited = ["viewed", "answered"].includes((entry.status || "").toLowerCase());

              return { selected, confirmed, visited };
            });

            setAnswers(merged);
            setLoading(false);
            return;
          }
        } catch (err) {
          // ignore, fallback to local
          console.warn("mock/get-attempt failed", err);
        }
      }

      // fallback: use local defaults
      setAnswers(base);
      setLoading(false);
    })();
  }, [questions, attemptId]);

  // palette info derived from answers
  const paletteInfo = useMemo(
    () =>
      answers.map((entry, idx) => ({
        index: idx,
        selected: entry?.selected ?? null,
        confirmed: entry?.confirmed ?? false,
        visited: entry?.visited ?? false,
      })),
    [answers]
  );

  const showToast = (txt, ms = 1400) => {
    setMessage(txt);
    setTimeout(() => setMessage(""), ms);
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) =>
      prev.map((entry, idx) => (idx === currentIndex ? { ...entry, selected: optionIndex } : entry))
    );
  };

  // reset via API
  const handleReset = async () => {
    const q = questions[currentIndex];
    if (!q) return;

    const tq_id = q.tq_id;
    // update UI immediately
    setAnswers((prev) =>
      prev.map((entry, idx) => (idx === currentIndex ? { ...entry, selected: null, confirmed: false } : entry))
    );

    try {
      await axios.post("https://development.pilotexaminations.com/api/mock/reset-answer", {
        tq_id,
        answer: "",
      });
      showToast("Answer reset!");
    } catch (err) {
      showToast("Reset failed");
    }
  };

  // confirm/save via API
  const handleConfirm = async () => {
    const sel = answers[currentIndex]?.selected;
    if (sel === null) return;

    const q = questions[currentIndex];
    if (!q) return;
    const tq_id = q.tq_id;
    const answerLetter = OPTION_LABELS[sel];

    // optimistic UI update
    setAnswers((prev) =>
      prev.map((entry, idx) => (idx === currentIndex ? { ...entry, confirmed: true, visited: true } : entry))
    );

    try {
      await axios.post("https://development.pilotexaminations.com/api/mock/save-answer", {
        tq_id,
        answer: answerLetter,
      });
      showToast("Answer saved!");
    } catch (err) {
      showToast("Save failed");
    }

    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const goToQuestion = (idx) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? { ...a, visited: true } : a)));
    setCurrentIndex(idx);
  };

  const goPrev = () => currentIndex > 0 && goToQuestion(currentIndex - 1);
  const goNext = () => currentIndex < questions.length - 1 && goToQuestion(currentIndex + 1);

  const submitMockTest = () => {
    showToast("Mock Test Submitted!");
    setTimeout(() => {
      navigate(`/dashboard/test_result_mock?attempt_id=${attemptId}`, {
        state: { mock: true, attempt_id: attemptId, questions, answers },
      });
    }, 800);
  };

  if (loading) {
    return (
      <div className="etest-shell">
        <p className="loading-text">Loading Mock Test...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="etest-shell">
        <div className="etest-question-card">
          <p>No mock test questions available.</p>
        </div>
      </div>
    );
  }

  const attemptedCount = answers.filter((a) => a.confirmed).length;
  const unvisitedCount = answers.filter((a) => !a.visited).length;
  const unattemptedCount = answers.length - attemptedCount - unvisitedCount;

  const paletteBtnClass = (item) => {
    if (item.confirmed) return "status-attempted";
    if (item.visited) return "status-unvisited";
    return "status-unattempted";
  };

  return (
    <div className="etest-shell">
      {message && <div className="etest-msg">{message}</div>}

      {/* LEFT: question panel */}
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
                className={`etest-option-pill ${answers[currentIndex]?.selected === idx ? "is-active" : ""}`}
              >
                <input
                  type="radio"
                  name={`q-${questions[currentIndex].tq_id}`}
                  checked={answers[currentIndex]?.selected === idx}
                  onChange={() => handleSelectOption(idx)}
                />
                {OPTION_LABELS[idx]}
              </label>
            ))}

            <button className="etest-reset" onClick={handleReset}>
              Reset
            </button>
            <button className="etest-confirm" onClick={handleConfirm} disabled={answers[currentIndex]?.selected === null}>
              Confirm
            </button>
          </div>

          <div className="etest-options-list">
            {questions[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                className={`etest-option-row ${answers[currentIndex]?.selected === idx ? "is-selected" : ""}`}
                onClick={() => handleSelectOption(idx)}
              >
                <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="etest-nav-controls">
          <button className="etest-prev" onClick={goPrev} disabled={currentIndex === 0}>
            &lt; Previous
          </button>
          <button className="etest-next" onClick={goNext} disabled={currentIndex === questions.length - 1}>
            Next &gt;
          </button>
        </div>
      </div>

      {/* RIGHT: sidebar */}
      <aside className="etest-sidebar">
        <div className="etest-sidebar-header">
          <div>
            <button className="etest-sidebar-link">Mock Test</button>
            <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
          </div>

          <button className="etest-submit" onClick={() => setShowSubmitModal(true)}>
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
                  className={`etest-palette-btn ${item.index === currentIndex ? "is-active" : ""} ${paletteBtnClass(item)}`}
                  onClick={() => goToQuestion(item.index)}
                >
                  {item.index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {showSubmitModal && (
        <div className="etest-modal-overlay">
          <div className="etest-modal">
            <div className="etest-modal-header">
              <h4>Submit Mock Test</h4>
              <button className="modal-close" onClick={() => setShowSubmitModal(false)}>
                ✕
              </button>
            </div>

            <div className="etest-modal-body">
              <p className="summary-title">Summary</p>
              <div className="summary-row">
                <div className="summary-item">
                  <span className="summary-box attempted-box"></span> Attempted ({attemptedCount})
                </div>
                <div className="summary-item">
                  <span className="summary-box unvisited-box"></span> Unvisited ({unvisitedCount})
                </div>
                <div className="summary-item">
                  <span className="summary-box unattempted-box"></span> Unattempted ({unattemptedCount})
                </div>
              </div>
            </div>

            <div className="etest-modal-footer">
              <button className="end-test-btn" onClick={submitMockTest}>End Test</button>
              <button className="review-test-btn" onClick={() => setShowSubmitModal(false)}>Review Test</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
