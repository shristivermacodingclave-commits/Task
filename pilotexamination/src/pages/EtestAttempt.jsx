// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

// const SAMPLE_QUESTIONS = [
//   {
//     id: 1,
//     question: "The diameter of the Earth is approximately?",
//     options: ["12,700 km", "40,000 km", "18,500 km", "8,000 km"],
//   },
//   {
//     id: 2,
//     question: "Which layer of the atmosphere contains the ozone layer?",
//     options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
//   },
//   {
//     id: 3,
//     question: "What instrument measures atmospheric pressure?",
//     options: ["Barometer", "Hygrometer", "Altimeter", "Anemometer"],
//   },
//   {
//     id: 4,
//     question: "The ICAO standard atmosphere assumes which sea level temperature?",
//     options: ["0°C", "10°C", "15°C", "20°C"],
//   },
//   {
//     id: 5,
//     question: "Which navigation aid provides bearing information only?",
//     options: ["VOR", "ADF", "DME", "ILS"],
//   },
// ];

// const OPTION_LABELS = ["A", "B", "C", "D"];

// function EtestAttempt() {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const testMeta = location.state || {};
//   const testId = searchParams.get("test_id") || testMeta.topicId || "demo";
//   const questionNo = searchParams.get("quest_no") || "1";
//   const initialIndex = (() => {
//     const parsed = parseInt(questionNo, 10);
//     if (Number.isNaN(parsed) || parsed < 1) return 0;
//     return Math.min(SAMPLE_QUESTIONS.length - 1, parsed - 1);
//   })();

//   const [answers, setAnswers] = useState(() =>
//     SAMPLE_QUESTIONS.map(() => ({ selected: null, confirmed: false }))
//   );
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);

//   const currentQuestion = SAMPLE_QUESTIONS[currentIndex];

//   const paletteInfo = useMemo(
//     () =>
//       answers.map((entry, idx) => ({
//         index: idx,
//         selected: entry.selected,
//         confirmed: entry.confirmed,
//       })),
//     [answers]
//   );

//   const handleSelectOption = (optionIndex) => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//           idx === currentIndex
//             ? { ...entry, selected: optionIndex, confirmed: false }
//             : entry
//         )
//     );
//   };

//   const handleReset = () => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex ? { selected: null, confirmed: false } : entry
//       )
//     );
//   };

//   const handleConfirm = () => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex ? { ...entry, confirmed: entry.selected !== null } : entry
//       )
//     );
//   };

//   const goToQuestion = (idx) => setCurrentIndex(idx);

//   const goNext = () => {
//     if (currentIndex < SAMPLE_QUESTIONS.length - 1) {
//       setCurrentIndex((idx) => idx + 1);
//     }
//   };

//   const handleSubmit = () => {
//     const totalAttempted = answers.filter((a) => a.confirmed).length;
//     alert(`Test ${testId} submitted.\nAttempted: ${totalAttempted}`);
//     navigate("/dashboard/results");
//   };

//   const handleGoToPlan = () => {
//     if (testMeta.planPath) {
//       navigate(testMeta.planPath);
//     } else {
//       navigate("/dashboard/my-courses");
//     }
//   };

//   return (
//     <div className="etest-shell">
//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <div className="etest-question-title">
//             <p className="etest-question-label">
//               Question {currentIndex + 1}
//             </p>
//             <h3>{currentQuestion.question}</h3>
//           </div>

//           <div className="etest-option-controls">
//             {currentQuestion.options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${
//                   answers[currentIndex].selected === idx ? "is-active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name={`question-${currentQuestion.id}-pill`}
//                   value={idx}
//                   checked={answers[currentIndex].selected === idx}
//                   onChange={() => handleSelectOption(idx)}
//                 />
//                 {OPTION_LABELS[idx]}
//               </label>
//             ))}

//             <button
//               type="button"
//               className="etest-reset"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//             <button
//               type="button"
//               className="etest-confirm"
//               onClick={handleConfirm}
//               disabled={answers[currentIndex].selected === null}
//             >
//               Confirm
//             </button>
//           </div>

//           <div className="etest-options-list">
//             {currentQuestion.options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${
//                   answers[currentIndex].selected === idx ? "is-selected" : ""
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

//         <div className="etest-nav-controls">
//           <button
//             type="button"
//             className="etest-next"
//             onClick={goNext}
//             disabled={currentIndex === SAMPLE_QUESTIONS.length - 1}
//           >
//             Next &gt;
//           </button>
//         </div>
//       </div>

//       <aside className="etest-sidebar">
//         <div className="etest-sidebar-header">
//           <div>
//             <button
//               type="button"
//               className="etest-sidebar-link"
//               onClick={handleGoToPlan}
//             >
//               E-Test
//             </button>
//             {testMeta.topic && (
//               <p className="etest-sidebar-subtitle">{testMeta.topic}</p>
//             )}
//             {testId && (
//               <p className="etest-sidebar-meta">Test ID: {testId}</p>
//             )}
//           </div>
//           <button type="button" className="etest-submit" onClick={handleSubmit}>
//             Submit Test
//           </button>
//         </div>

//         <div className="etest-palette">
//           <p className="etest-palette-heading">Question</p>
//           <div className="etest-palette-grid">
//             {paletteInfo.map((item) => (
//               <button
//                 key={`palette-${item.index}`}
//                 className={`etest-palette-btn ${
//                   item.index === currentIndex ? "is-active" : ""
//                 } ${item.confirmed ? "is-confirmed" : ""}`}
//                 onClick={() => goToQuestion(item.index)}
//               >
//                 {item.index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// }

// export default EtestAttempt;





// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

// const OPTION_LABELS = ["A", "B", "C"];

// function EtestAttempt() {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const testMeta = location.state || {};
//   const topicId = testMeta.topicId || searchParams.get("topic_id");
//   const userId = testMeta.userId || 10;

//   const [questions, setQuestions] = useState([]);
//   const [attemptId, setAttemptId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);


//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   // -----------------------------
//   // 🔥 FETCH QUESTIONS FROM API
//   // -----------------------------
//   useEffect(() => {
//     startTest();
//   }, []);

//   const startTest = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/start-test",
//         {
//           user_id: userId,
//           topic_id: topicId,
//         }
//       );

//       if (!res.data.error) {
//         setAttemptId(res.data.attempt_id);

//         const formattedQuestions = res.data.questions.map((q) => ({
//           id: q.quest_id,
//           question: q.question,
//           options: [
//             q.option_a,
//             q.option_b,
//             q.option_c,
//           ],
//           correct: q.correct_answer,
//           explanation: q.explanation,
//         }));

//         setQuestions(formattedQuestions);

//         // initialize answers array
//         setAnswers(
//           formattedQuestions.map(() => ({ selected: null, confirmed: false, visited: false }))
//         );
//       }
//     } catch (err) {
//       console.error("Test load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentQuestion = questions[currentIndex];

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

//   const handleSelectOption = (optionIndex) => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex
//           ? { ...entry, selected: optionIndex, confirmed: false }
//           : entry
//       )
//     );
//   };

//   const handleReset = () => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex ? { selected: null, confirmed: false } : entry
//       )
//     );
//   };

//   const handleConfirm = () => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex
//           ? { ...entry, confirmed: entry.selected !== null }
//           : entry
//       )
//     );
//   };

//   const goPrev = () => {
//     if (currentIndex > 0) {
//       setAnswers(prev =>
//         prev.map((a, i) =>
//           i === currentIndex - 1 ? { ...a, visited: true } : a
//         )
//       );
//       setCurrentIndex((idx) => idx - 1);
//     }
//   };


//   const goNext = () => {
//     if (currentIndex < questions.length - 1) {
//       setAnswers(prev =>
//         prev.map((a, i) =>
//           i === currentIndex + 1 ? { ...a, visited: true } : a
//         )
//       );
//       setCurrentIndex((idx) => idx + 1);
//     }
//   };


//   // const goToQuestion = (idx) => setCurrentIndex(idx);

//   const goToQuestion = (idx) => {
//     setAnswers(prev =>
//       prev.map((a, i) =>
//         i === idx ? { ...a, visited: true } : a
//       )
//     );
//     setCurrentIndex(idx);
//   };




//   const handleGoToPlan = () => {
//     if (testMeta.planPath) navigate(testMeta.planPath);
//     else navigate("/dashboard/my-courses");

//   };


//   const attemptedCount = answers.filter(a => a.confirmed === true).length;

//   const unvisitedCount = answers.filter(a =>
//     a.visited === true && a.selected === null && a.confirmed === false
//   ).length;

//   const unattemptedCount = answers.filter(a =>
//     a.visited === false
//   ).length;



//   const handleSubmit = () => {
//     setShowSubmitModal(true); // open modal instead of alert
//   };


//   // -----------------------------
//   // 🔥 LOADING UI
//   // -----------------------------
//   if (loading) {
//     return (
//       <div className="etest-shell">
//         <p className="loading-text">Loading Test Questions...</p>
//       </div>
//     );
//   }


//   // submit final test

//   const submitFinalTest = async () => {
//     try {
//       const payload = {
//         attempt_id: attemptId,
//         answers: answers.map((a, index) => ({
//           question_id: questions[index].id,
//           answer: a.selected !== null ? OPTION_LABELS[a.selected] : null
//         }))
//       };

//       // 1) SAVE ALL ANSWERS IN test_questions
//       await axios.post("https://development.pilotexaminations.com/api/save-answer", payload);

//       // 2) FINAL SUBMIT API
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/submit-test",
//         { attempt_id: attemptId }
//       );

//       // STORE RESULT & REDIRECT
//       navigate("/dashboard/results", {
//         state: {
//           attempt_id: attemptId,
//           correct: res.data.correct,
//           wrong: res.data.wrong,
//           unanswered: res.data.unanswered,
//           percentage: res.data.percentage,
//           result: res.data.result,
//           message: res.data.message
//         }
//       });

//     } catch (err) {
//       console.error("Test submit error", err);
//       alert("Something went wrong while submitting test");
//     }
//   };


//   // -----------------------------
//   // 🔥 MAIN UI
//   // -----------------------------
//   return (
//     <div className="etest-shell">
//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <div className="etest-question-title">
//             <p className="etest-question-label">
//               Question {currentIndex + 1}
//             </p>
//             <h3>{currentQuestion.question}</h3>
//           </div>

//           <div className="etest-option-controls">
//             {currentQuestion.options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${answers[currentIndex].selected === idx ? "is-active" : ""
//                   }`}
//               >
//                 <input
//                   type="radio"
//                   name={`q-${currentQuestion.id}`}
//                   checked={answers[currentIndex].selected === idx}
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
//               disabled={answers[currentIndex].selected === null}
//             >
//               Confirm
//             </button>
//           </div>

//           <div className="etest-options-list">
//             {currentQuestion.options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${answers[currentIndex].selected === idx ? "is-selected" : ""
//                   }`}
//                 onClick={() => handleSelectOption(idx)}
//               >
//                 <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* <div className="etest-nav-controls">
//           <button
//             className="etest-next"
//             onClick={goNext}
//             disabled={currentIndex === questions.length - 1}
//           >
//             Next &gt;
//           </button>
//         </div> */}

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
//             <button
//               className="etest-sidebar-link"
//               onClick={handleGoToPlan}
//             >
//               E-Test
//             </button>
//             {testMeta.topic && (
//               <p className="etest-sidebar-subtitle">{testMeta.topic}</p>
//             )}
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button className="etest-submit" onClick={handleSubmit}>
//             Submit Test
//           </button>
//         </div>

//         <div className="etest-palette">
//           <p className="etest-palette-heading">Questions</p>


//  <div className="etest-palette-scroll"> 
//           <div className="etest-palette-grid">
//             {paletteInfo.map((item) => (
//               // <button
//               //   key={item.index}
//               //   className={`etest-palette-btn ${item.index === currentIndex ? "is-active" : ""
//               //     } ${item.confirmed ? "is-confirmed" : ""}`}
//               //   onClick={() => goToQuestion(item.index)}
//               // >
//               //   {item.index + 1}
//               // </button>
//   //             <button
//   //               key={item.index}
//   //               className={`etest-palette-btn
//   //   ${item.index === currentIndex ? "is-active" : ""}
//   //   ${item.confirmed ? "status-attempted" : ""}
//   //   ${!item.confirmed && item.visited && item.selected === null ? "status-unvisited" : ""}
//   //   ${!item.confirmed && !item.visited ? "status-unattempted" : ""}
//   // `}
//   //               onClick={() => goToQuestion(item.index)}
//   //             >
//   //               {item.index + 1}
//   //             </button>

//   <button
//   key={item.index}
//   className={`etest-palette-btn
//     ${item.index === currentIndex ? "is-active" : ""}
//     ${item.confirmed ? "status-attempted" : ""}
//     ${
//       !item.confirmed && item.visited
//         ? "status-unvisited"   // ALWAYS orange if visited but NOT confirmed
//         : ""
//     }
//     ${
//       !item.visited
//         ? "status-unattempted" // black ONLY if never visited
//         : ""
//     }
//   `}
//   onClick={() => goToQuestion(item.index)}
// >
//   {item.index + 1}
// </button>


//             ))}
//           </div>
//     </div>
//         </div>
//       </aside>


//       {/* sumit modal */}

//       {/* SUBMIT CONFIRMATION MODAL */}
//       {showSubmitModal && (
//         <div className="etest-modal-overlay">
//           <div className="etest-modal">
//             <div className="etest-modal-header">
//               <h4>Confirm Test Submission</h4>
//               <button className="modal-close" onClick={() => setShowSubmitModal(false)}>✕</button>
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


//               <button className="review-test-btn" onClick={() => setShowSubmitModal(false)}>
//                 Review Test
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default EtestAttempt;


// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

// const OPTION_LABELS = ["A", "B", "C"];

// export default function EtestAttempt() {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const testMeta = location.state || {};
//   const topicId = testMeta.topicId || searchParams.get("topic_id");
//   const userId = testMeta.userId || testMeta.userId || 10;

//   const [questions, setQuestions] = useState([]);
//   const [attemptId, setAttemptId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]); // { selected, confirmed, visited }
//   const [message, setMessage] = useState(""); // toast message

//   // -----------------------------
//   // 🔥 FETCH QUESTIONS
//   // -----------------------------
//   useEffect(() => {
//     startTest();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const startTest = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/start-test",
//         { user_id: userId, topic_id: topicId }
//       );

//       if (!res.data.error && Array.isArray(res.data.questions)) {
//         setAttemptId(res.data.attempt_id);

//         const formattedQuestions = res.data.questions.map((q) => ({
//           id: q.quest_id,
//           question: q.question,
//           options: [q.option_a ?? "N/A", q.option_b ?? "N/A", q.option_c ?? "N/A"],
//           correct: q.correct_answer,
//           explanation: q.explanation,
//         }));

//         setQuestions(formattedQuestions);

//         // Option B: initial visited = false for all
//         setAnswers(
//           formattedQuestions.map(() => ({
//             selected: null,
//             confirmed: false,
//             visited: false,
//           }))
//         );

//         setCurrentIndex(0);
//       } else {
//         console.error("start-test invalid response:", res.data);
//         alert("Failed to load test questions.");
//       }
//     } catch (err) {
//       console.error("Test load error:", err);
//       alert("Failed to load test. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentQuestion = questions[currentIndex];

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

//   // -----------------------------
//   // Helpers: toast
//   // -----------------------------
//   const showToast = (text, ms = 1500) => {
//     setMessage(text);
//     setTimeout(() => setMessage(""), ms);
//   };

//   // -----------------------------
//   // SELECT (local only)
//   // -----------------------------
//   const handleSelectOption = (optionIndex) => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) =>
//         idx === currentIndex ? { ...entry, selected: optionIndex, confirmed: false } : entry
//       )
//     );
//   };

//   // -----------------------------
//   // RESET (local + API)
//   // -----------------------------
//   const handleReset = async () => {
//     if (!currentQuestion) return;
//     const qid = currentQuestion.id;

//     setAnswers((prev) =>
//       prev.map((entry, idx) => (idx === currentIndex ? { ...entry, selected: null, confirmed: false } : entry))
//     );

//     try {
//       await axios.post("https://development.pilotexaminations.com/api/reset-answer", { quest_id: qid });
//       showToast("Answer reset!");
//     } catch (err) {
//       console.error("Reset API error:", err);
//       showToast("Reset failed");
//     }
//   };

//   // -----------------------------
//   // CONFIRM (local + API) and AUTO-NEXT
//   // -----------------------------
//   const handleConfirm = async () => {
//     if (!currentQuestion) return;
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null || sel === undefined) return; // disabled in UI

//     const qid = currentQuestion.id;
//     const answerLetter = OPTION_LABELS[sel];

//     // optimistic local update
//     setAnswers((prev) =>
//       prev.map((entry, idx) => (idx === currentIndex ? { ...entry, confirmed: true, visited: true } : entry))
//     );

//     try {
//       await axios.post("https://development.pilotexaminations.com/api/etest/save-answer", {
//         quest_id: qid,
//         answer: answerLetter,
//       });
//       showToast("Answer saved!");
//     } catch (err) {
//       console.error("Save API error:", err);
//       showToast("Save failed");
//       // optionally revert confirmed flag here
//     }

//     // auto-next if not last
//     if (currentIndex < questions.length - 1) {
//       // mark next visited and current visited
//       goToQuestion(currentIndex + 1);
//     } else {
//       // last question: stay (you chose A)
//       // do nothing
//     }
//   };

//   // -----------------------------
//   // NAVIGATION: goToQuestion marks both current and target visited
//   // -----------------------------
//   const goToQuestion = (idx) => {
//     setAnswers((prev) =>
//       prev.map((a, i) => {
//         if (i === idx || i === currentIndex) return { ...a, visited: true };
//         return a;
//       })
//     );
//     setCurrentIndex(idx);
//   };

//   const goPrev = () => {
//     if (currentIndex > 0) goToQuestion(currentIndex - 1);
//   };

//   const goNext = () => {
//     if (currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
//   };

//   const handleGoToPlan = () => {
//     if (testMeta.planPath) navigate(testMeta.planPath);
//     else navigate("/dashboard/my-courses");
//   };

//   // -----------------------------
//   // COUNTS (website rules)
//   // -----------------------------
//   const attemptedCount = answers.filter((a) => a.confirmed === true).length;

//   const unvisitedCount = answers.filter((a) => a.visited === true && a.selected === null && a.confirmed === false).length;

//   const unattemptedCount = answers.filter((a) => a.visited === false).length;

//   // -----------------------------
//   // SUBMIT FINAL TEST
//   // -----------------------------
//   const submitFinalTest = async () => {
//     try {
//       const res = await axios.post("https://development.pilotexaminations.com/api/submit-test", {
//         attempt_id: attemptId,

//       });
//       console.log(attemptId);

//       showToast("Test submitted!");
//       setTimeout(() => {
//         navigate("/dashboard/results", {
//           state: {
//             attempt_id: attemptId,
//             correct: res.data.correct,
//             wrong: res.data.wrong,
//             unanswered: res.data.unanswered,
//             percentage: res.data.percentage,
//             result: res.data.result,
//             message: res.data.message,
//           },
//         });
//       }, 800);
//     } catch (err) {
//       console.error("Submit API error:", err);
//       showToast("Submit failed");
//     }
//   };

//   const handleSubmit = () => setShowSubmitModal(true);

//   // -----------------------------
//   // Loading guard
//   // -----------------------------
//   if (loading) {
//     return (
//       <div className="etest-shell">
//         <p className="loading-text">Loading Test Questions...</p>
//       </div>
//     );
//   }

//   if (!questions || questions.length === 0) {
//     return (
//       <div className="etest-shell">
//         <div className="etest-question-card">
//           <p>No questions available.</p>
//         </div>
//       </div>
//     );
//   }

//   // -----------------------------
//   // UI
//   // -----------------------------
//   return (
//     <div className="etest-shell">
//       {/* toast */}
//       {message && <div className="etest-msg">{message}</div>}

//       <div className="etest-question-panel">
//         <div className="etest-question-card">
//           <div className="etest-question-title">
//             <p className="etest-question-label">Question {currentIndex + 1}</p>
//             <h3>{currentQuestion.question}</h3>
//           </div>

//           <div className="etest-option-controls">
//             {currentQuestion.options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${answers[currentIndex]?.selected === idx ? "is-active" : ""}`}
//               >
//                 <input
//                   type="radio"
//                   name={`q-${currentQuestion.id}`}
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

//           <div className="etest-options-list">
//             {currentQuestion.options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${answers[currentIndex]?.selected === idx ? "is-selected" : ""}`}
//                 onClick={() => handleSelectOption(idx)}
//               >
//                 <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="etest-nav-controls">
//           <button className="etest-prev" onClick={goPrev} disabled={currentIndex === 0}>
//             &lt; Previous
//           </button>

//           <button className="etest-next" onClick={goNext} disabled={currentIndex === questions.length - 1}>
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
//             {testMeta.topic && <p className="etest-sidebar-subtitle">{testMeta.topic}</p>}
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button className="etest-submit" onClick={handleSubmit}>
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
//                   className={`etest-palette-btn ${item.index === currentIndex ? "is-active" : ""} ${
//                     item.confirmed ? "status-attempted" : item.visited ? "status-unvisited" : "status-unattempted"
//                   }`}
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
//               <button className="modal-close" onClick={() => setShowSubmitModal(false)}>
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

//               <button className="review-test-btn" onClick={() => setShowSubmitModal(false)}>
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
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

// const OPTION_LABELS = ["A", "B", "C"];

// export default function EtestAttempt() {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const testMeta = location.state || {};
//   const topicId = testMeta.topicId || searchParams.get("topic_id");
//   const userId = testMeta.userId || testMeta.userId || 10;

//   const [questions, setQuestions] = useState([]); // { id: quest_id, question, options[], correct, explanation }
//   const [attemptId, setAttemptId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   // answers[i] = { selected: 0|1|2|null, confirmed: boolean, visited: boolean }
//   const [answers, setAnswers] = useState([]);
//   const [message, setMessage] = useState("");

//   // ---- load test (start-test) and then load attempt state ----
//   useEffect(() => {
//     (async function init() {
//       setLoading(true);
//       try {
//         // 1) start test
//         const startRes = await axios.post("https://development.pilotexaminations.com/api/start-test", {
//           user_id: userId,
//           topic_id: topicId,
//         });

//         if (!startRes?.data || startRes.data.error) {
//           throw new Error("Failed to start test");
//         }

//         const attempt_id = startRes.data.attempt_id;
//         setAttemptId(attempt_id);

//         const formatted = (startRes.data.questions || []).map((q) => ({
//           id: q.quest_id, // will map to question_id from attempt/get
//           question: q.question,
//           options: [q.option_a ?? "N/A", q.option_b ?? "N/A", q.option_c ?? "N/A"],
//           correct: q.correct_answer,
//           explanation: q.explanation,
//         }));

//         setQuestions(formatted);

//         // initialize answers (Option B: visited false initially)
//         const initialAnswers = formatted.map(() => ({
//           selected: null,
//           confirmed: false,
//           visited: false,
//         }));
//         setAnswers(initialAnswers);

//         // 2) fetch saved attempt state using attempt_id passed as test_id
//         // Note: server expects { test_id: <value> } — we send attempt_id as requested
//         try {
//           const getAttemptRes = await axios.post("https://development.pilotexaminations.com/api/attempt/get", {
//             test_id: attempt_id,
//           });

//           if (getAttemptRes?.data && !getAttemptRes.data.error && Array.isArray(getAttemptRes.data.questions)) {
//             const savedList = getAttemptRes.data.questions; // objects with question_id, saved_answer, status
//             // Build a map by question_id for quick lookup
//             const savedMap = new Map();
//             savedList.forEach((s) => {
//               // question_id -> { saved_answer, status }
//               savedMap.set(Number(s.question_id), {
//                 saved_answer: s.saved_answer ?? "",
//                 status: s.status ?? "",
//               });
//             });

//             // Merge saved answers into local answers state
//             const merged = formatted.map((fq) => {
//               const entry = savedMap.get(Number(fq.id));
//               if (!entry) return { selected: null, confirmed: false, visited: false };
//               const saved = entry.saved_answer || "";
//               const selected = saved === "" ? null : OPTION_LABELS.indexOf(saved);
//               const confirmed = saved !== "";
//               const visited = ["viewed", "answered"].includes((entry.status || "").toLowerCase());
//               return { selected, confirmed, visited };
//             });

//             setAnswers(merged);
//           } else {
//             // no saved data — keep initial answers
//           }
//         } catch (err) {
//           // don't break startup if attempt/get fails — we at least have questions
//           console.warn("attempt/get failed:", err);
//         }
//       } catch (err) {
//         console.error("start-test/init error:", err);
//         alert("Failed to load test. Check console.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // palette derived
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

//   // toast helper
//   const showToast = (txt, ms = 1500) => {
//     setMessage(txt);
//     setTimeout(() => setMessage(""), ms);
//   };

//   // ---- selection (local only) ----
//   const handleSelectOption = (optionIndex) => {
//     setAnswers((prev) =>
//       prev.map((entry, idx) => (idx === currentIndex ? { ...entry, selected: optionIndex } : entry))
//     );
//   };

//   // ---- reset (local + API) ----
//   const handleReset = async () => {
//     if (!questions[currentIndex]) return;
//     const qid = questions[currentIndex].id;

//     // local update
//     setAnswers((prev) =>
//       prev.map((entry, idx) => (idx === currentIndex ? { ...entry, selected: null, confirmed: false } : entry))
//     );

//     try {
//       await axios.post("https://development.pilotexaminations.com/api/reset-answer", { quest_id: qid });
//       showToast("Answer reset!");
//     } catch (err) {
//       console.error("reset-answer API error:", err);
//       showToast("Reset failed");
//     }
//   };

//   // ---- confirm (local + API) + auto-next ----
//   const handleConfirm = async () => {
//     if (!questions[currentIndex]) return;
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null || sel === undefined) return; // nothing selected

//     const qid = questions[currentIndex].id;
//     const answerLetter = OPTION_LABELS[sel];

//     // optimistic local update: mark confirmed and visited
//     setAnswers((prev) =>
//       prev.map((entry, idx) => (idx === currentIndex ? { ...entry, confirmed: true, visited: true } : entry))
//     );

//     try {
//       await axios.post("https://development.pilotexaminations.com/api/etest/save-answer", {
//         quest_id: qid,
//         answer: answerLetter,
//       });
//       showToast("Answer saved!");
//     } catch (err) {
//       console.error("save-answer API error:", err);
//       showToast("Save failed");
//     }

//     // auto-next if not last
//     if (currentIndex < questions.length - 1) {
//       goToQuestion(currentIndex + 1);
//     } else {
//       // last question -> do nothing (you chose A)
//     }
//   };

//   // ---- navigation ----
//   const goToQuestion = (idx) => {
//     setAnswers((prev) =>
//       prev.map((a, i) => {
//         if (i === idx || i === currentIndex) return { ...a, visited: true };
//         return a;
//       })
//     );
//     setCurrentIndex(idx);
//   };

//   const goPrev = () => {
//     if (currentIndex > 0) goToQuestion(currentIndex - 1);
//   };

//   const goNext = () => {
//     if (currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
//   };

//   const handleGoToPlan = () => {
//     if (testMeta.planPath) navigate(testMeta.planPath);
//     else navigate("/dashboard/my-courses");
//   };

//   // ---- counts ----
//   const attemptedCount = answers.filter((a) => a.confirmed === true).length;
//   const unvisitedCount = answers.filter((a) => a.visited === true && a.selected === null && a.confirmed === false)
//     .length;
//   const unattemptedCount = answers.filter((a) => a.visited === false).length;

//   // ---- submit final test ----
//   const submitFinalTest = async () => {
//     if (!attemptId) {
//       showToast("No attempt id");
//       return;
//     }
//     try {
//       const res = await axios.post("https://development.pilotexaminations.com/api/etest/submit-test", {
//         attempt_id: attemptId,
//       });

//       showToast("Test submitted!");
//       setTimeout(() => {
//         navigate("/dashboard/results", {
//           state: {
//             attempt_id: attemptId,
//             correct: res.data.correct,
//             wrong: res.data.wrong,
//             unanswered: res.data.unanswered,
//             percentage: res.data.percentage,
//             result: res.data.result,
//             message: res.data.message,
//           },
//         });
//       }, 800);
//     } catch (err) {
//       console.error("submit-test API error:", err);
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

//   if (!questions || questions.length === 0) {
//     return (
//       <div className="etest-shell">
//         <div className="etest-question-card">
//           <p>No questions available.</p>
//         </div>
//       </div>
//     );
//   }

//   // ---- helpers for sidebar classes (colors) ----
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
//             {questions[currentIndex].options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${answers[currentIndex]?.selected === idx ? "is-active" : ""}`}
//               >
//                 <input
//                   type="radio"
//                   name={`q-${questions[currentIndex].id}`}
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

//           <div className="etest-options-list">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${answers[currentIndex]?.selected === idx ? "is-selected" : ""}`}
//                 onClick={() => handleSelectOption(idx)}
//               >
//                 <span className="etest-option-label">{OPTION_LABELS[idx]}.</span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="etest-nav-controls">
//           <button className="etest-prev" onClick={goPrev} disabled={currentIndex === 0}>
//             &lt; Previous
//           </button>

//           <button className="etest-next" onClick={goNext} disabled={currentIndex === questions.length - 1}>
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
//             {testMeta.topic && <p className="etest-sidebar-subtitle">{testMeta.topic}</p>}
//             <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
//           </div>

//           <button className="etest-submit" onClick={handleSubmit}>
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
//                   className={`etest-palette-btn ${item.index === currentIndex ? "is-active" : ""} ${paletteBtnClass(
//                     item
//                   )}`}
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
//               <button className="modal-close" onClick={() => setShowSubmitModal(false)}>
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

//               <button className="review-test-btn" onClick={() => setShowSubmitModal(false)}>
//                 Review Test
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










// testing the new mthod


// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

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

//   // ---- questions: from PlanEtest ----
//   const initialQuestions = testMeta.questions || [];

//   const [questions, setQuestions] = useState(initialQuestions);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   // -------------------------------------------------------
//   //  LOAD saved answers using attempt/get (NOT start-test)
//   // -------------------------------------------------------
//   useEffect(() => {
//     (async function init() {
//       setLoading(true);

//       try {
//         if (questions.length === 0) {
//           console.warn("No questions received from PlanEtest");
//           setQuestions([]);
//           setAnswers([]);
//           setLoading(false);
//           return;
//         }

//         // Format answers array initially
//         const inicial = questions.map(() => ({
//           selected: null,
//           confirmed: false,
//           visited: false,
//         }));
//         setAnswers(inicial);

//         // fetch saved answers
//         const getAttemptRes = await axios.post(
//           "https://development.pilotexaminations.com/api/get-attempt",
//           { attempt_id: attemptId }
//         );

//         if (
//           getAttemptRes?.data &&
//           !getAttemptRes.data.error &&
//           Array.isArray(getAttemptRes.data.questions)
//         ) {
//           const savedMap = new Map();

//           getAttemptRes.data.questions.forEach((s) => {
//             savedMap.set(Number(s.question_id), {
//               saved_answer: s.saved_answer ?? "",
//               status: s.status ?? "",
//             });
//           });

//           const merged = questions.map((q) => {
//             const entry = savedMap.get(Number(q.id));
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

//   const handleReset = async () => {
//     if (!questions[currentIndex]) return;

//     const qid = questions[currentIndex].id;

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
//         { quest_id: qid }
//       );
//       showToast("Answer reset!");
//     } catch (err) {
//       showToast("Reset failed");
//     }
//   };

//   const handleConfirm = async () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     const qid = questions[currentIndex].id;
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
//           quest_id: qid,
//           answer: answerLetter,
//         }
//       );
//       showToast("Answer saved!");
//     } catch (err) {
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
//         { attempt_id: attemptId }
//       );

//       showToast("Test submitted!");

//       setTimeout(() => {
//         navigate("/dashboard/results", {
//           state: { ...res.data, attempt_id: attemptId },
//         });
//       }, 800);
//     } catch (err) {
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

//   if (!questions || questions.length === 0) {
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

//   // ----------------------------------------------------------
//   //           FULL JSX BELOW — EXACT SAME AS YOU GAVE
//   // ----------------------------------------------------------
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
//             {questions[currentIndex].options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`etest-option-pill ${
//                   answers[currentIndex]?.selected === idx ? "is-active" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name={`q-${questions[currentIndex].id}`}
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

//           <div className="etest-options-list">
//             {questions[currentIndex].options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 className={`etest-option-row ${
//                   answers[currentIndex]?.selected === idx ? "is-selected" : ""
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

//           <button className="etest-submit" onClick={handleSubmit}>
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
//     </div>
//   );
// }



// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

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

//   const [questions, setQuestions] = useState(initialQuestions);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   // -------------------------------------------------------
//   //  LOAD saved answers using attempt/get (NOT start-test)
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
//           { attempt_id: attemptId }
//         );

//         if (
//           getAttemptRes?.data &&
//           !getAttemptRes.data.error &&
//           Array.isArray(getAttemptRes.data.questions)
//         ) {
//           const savedMap = new Map();

//           getAttemptRes.data.questions.forEach((s) => {
//             savedMap.set(Number(s.question_id), {
//               saved_answer: s.saved_answer ?? "",
//               status: s.status ?? "",
//             });
//           });

//           const merged = questions.map((q) => {
//             const entry = savedMap.get(Number(q.id));
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

//   const handleReset = async () => {
//     if (!questions[currentIndex]) return;

//     const qid = questions[currentIndex].id;

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
//         { quest_id: qid }
//       );
//       showToast("Answer reset!");
//     } catch (err) {
//       showToast("Reset failed");
//     }
//   };

//   const handleConfirm = async () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     const qid = questions[currentIndex].id;
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
//           quest_id: qid,
//           answer: answerLetter,
//         }
//       );
//       showToast("Answer saved!");
//     } catch (err) {
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
//         { attempt_id: attemptId }
//       );

//       showToast("Test submitted!");

//       setTimeout(() => {
//         navigate("/dashboard/results", {
//           state: { ...res.data, attempt_id: attemptId },
//         });
//       }, 800);
//     } catch (err) {
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

//   // -------------------------------------
//   // SAFE GUARD: Prevent undefined.map() crash
//   // -------------------------------------
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

//   // ----------------------------------------------------------
//   //                      FULL JSX UI (UNCHANGED)
//   // ----------------------------------------------------------
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
//             {/* SAFE: Prevent undefined.options.map */}
//             {Array.isArray(questions[currentIndex].options) &&
//               questions[currentIndex].options.map((opt, idx) => (
//                 <label
//                   key={idx}
//                   className={`etest-option-pill ${
//                     answers[currentIndex]?.selected === idx ? "is-active" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`q-${questions[currentIndex].id}`}
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
//             {/* SAFE AGAIN */}
//             {Array.isArray(questions[currentIndex].options) &&
//               questions[currentIndex].options.map((opt, idx) => (
//                 <button
//                   key={idx}
//                   className={`etest-option-row ${
//                     answers[currentIndex]?.selected === idx ? "is-selected" : ""
//                   }`}
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

//           <button className="etest-submit" onClick={handleSubmit}>
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
//     </div>
//   );
// }





// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import "./EtestAttempt.css";

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
//   // FORMAT QUESTIONS (VERY IMPORTANT FOR UI)
//   // ------------------------------------------------
//   const formattedQuestions = Array.isArray(initialQuestions)
//     ? initialQuestions.map((q) => ({
//         id: q.quest_id,
//         question: q.question,
//         options: [
//           q.option_a || "N/A",
//           q.option_b || "N/A",
//           q.option_c || "N/A",
//         ],
//         correct: q.correct_answer,
//         explanation: q.explanation,
//       }))
//     : [];

//   const [questions, setQuestions] = useState(formattedQuestions);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [message, setMessage] = useState("");

//   // -------------------------------------------------------
//   //  LOAD saved answers using get-attempt (NOT start-test)
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
//           { attempt_id: attemptId , user_id:userId }
//         );

//         if (
//           getAttemptRes?.data &&
//           !getAttemptRes.data.error &&
//           Array.isArray(getAttemptRes.data.questions)
//         ) {
//           const savedMap = new Map();

//           getAttemptRes.data.questions.forEach((s) => {
//             savedMap.set(Number(s.question_id), {
//               saved_answer: s.saved_answer ?? "",
//               status: s.status ?? "",
//             });
//           });

//           const merged = questions.map((q) => {
//             const entry = savedMap.get(Number(q.id));
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

//   const handleReset = async () => {
//     if (!questions[currentIndex]) return;

//     const qid = questions[currentIndex].id;

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
//         { quest_id: qid }
//       );
//       showToast("Answer reset!");
//     } catch {
//       showToast("Reset failed");
//     }
//   };

//   const handleConfirm = async () => {
//     const sel = answers[currentIndex]?.selected;
//     if (sel === null) return;

//     const qid = questions[currentIndex].id;
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
//           quest_id: qid,
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
//         { attempt_id: attemptId ,user_id: userId }
//       );

//       showToast("Test submitted!");

//       setTimeout(() => {
//         navigate(`/dashboard/test_result?attempt_id=${attemptId}`, {
//           state: { ...res.data, attempt_id: attemptId },
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

//   // -------------------------------------
//   // SAFE GUARD: Prevent undefined.map() crash
//   // -------------------------------------
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

//   // ----------------------------------------------------------
//   //                      FULL JSX UI (UNCHANGED)
//   // ----------------------------------------------------------
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
//                   className={`etest-option-pill ${
//                     answers[currentIndex]?.selected === idx ? "is-active" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`q-${questions[currentIndex].id}`}
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
//                   className={`etest-option-row ${
//                     answers[currentIndex]?.selected === idx ? "is-selected" : ""
//                   }`}
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

//           <button className="etest-submit" onClick={handleSubmit}>
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
//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./EtestAttempt.css";

const OPTION_LABELS = ["A", "B", "C"];

export default function EtestAttempt() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // -------- get meta data --------
  const testMeta = location.state || {};
  const userId = testMeta.userId || 10;

  // ---- attempt_id: URL > state > localStorage ----
  const attemptId =
    searchParams.get("attempt_id") ||
    testMeta.attemptId ||
    localStorage.getItem("attempt_id");

  // ------------------------------------------------
  // SAFE: Load questions from state OR localStorage
  // ------------------------------------------------
  const initialQuestions =
    testMeta.questions ||
    JSON.parse(localStorage.getItem("questions") || "[]");

  // ------------------------------------------------
  // FORMAT QUESTIONS (UPDATED to include tq_id)
  // ------------------------------------------------
  const formattedQuestions = Array.isArray(initialQuestions)
    ? initialQuestions.map((q) => ({
        tq_id: q.tq_id,                  // ⭐ ADDED
        id: q.quest_id,
        question_id: q.question_id,      // optional but kept
        question: q.question,
        options: [
          q.option_a || "N/A",
          q.option_b || "N/A",
          q.option_c || "N/A",
        ]
      }))
    : [];

  const [questions, setQuestions] = useState(formattedQuestions);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [message, setMessage] = useState("");

  // -------------------------------------------------------
  //  LOAD saved answers using get-attempt (NOW USING tq_id)
  // -------------------------------------------------------
  useEffect(() => {
    (async function init() {
      setLoading(true);

      try {
        if (!Array.isArray(questions) || questions.length === 0) {
          console.warn("No questions received");
          setQuestions([]);
          setAnswers([]);
          setLoading(false);
          return;
        }

        // Format empty local answer state
        const inicial = questions.map(() => ({
          selected: null,
          confirmed: false,
          visited: false,
        }));
        setAnswers(inicial);

        // --- fetch saved answers ---
        const getAttemptRes = await axios.post(
          "https://development.pilotexaminations.com/api/get-attempt",
          { attempt_id: attemptId, user_id: userId }
        );

        if (
          getAttemptRes?.data &&
          !getAttemptRes.data.error &&
          Array.isArray(getAttemptRes.data.questions)
        ) {
          const savedMap = new Map();

          // ⭐ CHANGE 1: create map by tq_id
          getAttemptRes.data.questions.forEach((s) => {
            savedMap.set(Number(s.tq_id), {
              saved_answer: s.saved_answer ?? "",
              status: s.status ?? "",
            });
          });

          // ⭐ CHANGE 2: merge using tq_id instead of question_id
          const merged = questions.map((q) => {
            const entry = savedMap.get(Number(q.tq_id));

            if (!entry)
              return { selected: null, confirmed: false, visited: false };

            const saved = entry.saved_answer || "";
            const selected =
              saved === "" ? null : OPTION_LABELS.indexOf(saved);
            const confirmed = saved !== "";
            const visited = ["viewed", "answered"].includes(
              (entry.status || "").toLowerCase()
            );

            return { selected, confirmed, visited };
          });

          setAnswers(merged);
        }
      } catch (err) {
        console.warn("get-attempt", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [attemptId, questions]);

  // -----------------
  // SAME LOGIC BELOW
  // -----------------

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

  // ----------------------------------------------------
  // RESET ANSWER API UPDATED to use tq_id
  // ----------------------------------------------------
  const handleReset = async () => {
    if (!questions[currentIndex]) return;

    const tqid = questions[currentIndex].tq_id; // ⭐ UPDATED

    setAnswers((prev) =>
      prev.map((entry, idx) =>
        idx === currentIndex
          ? { ...entry, selected: null, confirmed: false }
          : entry
      )
    );

    try {
      await axios.post(
        "https://development.pilotexaminations.com/api/reset-answer",
        { tq_id: tqid , answer: answerLetter, } // ⭐ UPDATED
      );
      showToast("Answer reset!");
    } catch {
      showToast("Reset failed");
    }
  };

  // ----------------------------------------------------
  // CONFIRM / SAVE ANSWER API UPDATED to use tq_id
  // ----------------------------------------------------
  const handleConfirm = async () => {
    const sel = answers[currentIndex]?.selected;
    if (sel === null) return;

    const tqid = questions[currentIndex].tq_id; // ⭐ UPDATED
    const answerLetter = OPTION_LABELS[sel];

    setAnswers((prev) =>
      prev.map((entry, idx) =>
        idx === currentIndex
          ? { ...entry, confirmed: true, visited: true }
          : entry
      )
    );

    try {
      await axios.post(
        "https://development.pilotexaminations.com/api/etest/save-answer",
        {
          tq_id: tqid,        // ⭐ UPDATED
          answer: answerLetter,
        }
      );
      showToast("Answer saved!");
    } catch {
      showToast("Save failed");
    }

    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const goToQuestion = (idx) => {
    setAnswers((prev) =>
      prev.map((a, i) =>
        i === idx || i === currentIndex ? { ...a, visited: true } : a
      )
    );
    setCurrentIndex(idx);
  };

  const goPrev = () => {
    if (currentIndex > 0) goToQuestion(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1)
      goToQuestion(currentIndex + 1);
  };

  const handleGoToPlan = () => {
    if (testMeta.planPath) navigate(testMeta.planPath);
    else navigate("/dashboard/my-courses");
  };

  const attemptedCount = answers.filter((a) => a.confirmed).length;
  const unvisitedCount = answers.filter(
    (a) => a.visited && !a.confirmed && a.selected === null
  ).length;
  const unattemptedCount = answers.filter((a) => !a.visited).length;

  const submitFinalTest = async () => {
    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/etest/submit-test",
        { attempt_id: attemptId, user_id: userId }
      );

      showToast("Test submitted!");

      setTimeout(() => {
        navigate(`/dashboard/test_result?attempt_id=${attemptId}`, {
          state: { ...res.data, attempt_id: attemptId },
        });
      }, 800);
    } catch {
      showToast("Submit failed");
    }
  };

  const handleSubmit = () => setShowSubmitModal(true);

  // ---- loading guard ----
  if (loading) {
    return (
      <div className="etest-shell">
        <p className="loading-text">Loading Test Questions...</p>
      </div>
    );
  }

  if (!Array.isArray(questions)) {
    return (
      <div className="etest-shell">
        <div className="etest-question-card">
          <p>Questions failed to load. Please go back and start the test again.</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="etest-shell">
        <div className="etest-question-card">
          <p>No questions available.</p>
        </div>
      </div>
    );
  }

  const paletteBtnClass = (item) => {
    if (item.confirmed) return "status-attempted";
    if (item.visited) return "status-unvisited";
    return "status-unattempted";
  };

  return (
    <div className="etest-shell">
      {/* toast */}
      {message && <div className="etest-msg">{message}</div>}

      <div className="etest-question-panel">
        <div className="etest-question-card">
          <div className="etest-question-title">
            <p className="etest-question-label">Question {currentIndex + 1}</p>
            <h3>{questions[currentIndex].question}</h3>
          </div>

          <div className="etest-option-controls">
            {Array.isArray(questions[currentIndex].options) &&
              questions[currentIndex].options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`etest-option-pill ${
                    answers[currentIndex]?.selected === idx ? "is-active" : ""
                  }`}
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
            <button
              className="etest-confirm"
              onClick={handleConfirm}
              disabled={answers[currentIndex]?.selected === null}
            >
              Confirm
            </button>
          </div>

          <div className="etest-options-list">
            {Array.isArray(questions[currentIndex].options) &&
              questions[currentIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`etest-option-row ${
                    answers[currentIndex]?.selected === idx ? "is-selected" : ""
                  }`}
                  onClick={() => handleSelectOption(idx)}
                >
                  <span className="etest-option-label">
                    {OPTION_LABELS[idx]}.
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
          </div>
        </div>

        <div className="etest-nav-controls">
          <button
            className="etest-prev"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            &lt; Previous
          </button>

          <button
            className="etest-next"
            onClick={goNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next &gt;
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="etest-sidebar">
        <div className="etest-sidebar-header">
          <div>
            <button className="etest-sidebar-link" onClick={handleGoToPlan}>
              E-Test
            </button>
            {testMeta.topic && (
              <p className="etest-sidebar-subtitle">{testMeta.topic}</p>
            )}
            <p className="etest-sidebar-meta">Attempt ID: {attemptId}</p>
          </div>

          <button className="etest-submit" onClick={handleSubmit}>
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

      {/* SUBMIT MODAL */}
      {showSubmitModal && (
        <div className="etest-modal-overlay">
          <div className="etest-modal">
            <div className="etest-modal-header">
              <h4>Confirm Test Submission</h4>
              <button
                className="modal-close"
                onClick={() => setShowSubmitModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="etest-modal-body">
              <p className="summary-title">Test Summary</p>

              <div className="summary-row">
                <div className="summary-item">
                  <span className="summary-box attempted-box"></span>
                  Attempted ({attemptedCount})
                </div>

                <div className="summary-item">
                  <span className="summary-box unvisited-box"></span>
                  Unvisited ({unvisitedCount})
                </div>

                <div className="summary-item">
                  <span className="summary-box unattempted-box"></span>
                  Unattempted ({unattemptedCount})
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
    </div>
  );
}
