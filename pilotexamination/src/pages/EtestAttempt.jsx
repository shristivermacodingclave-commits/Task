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





import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./EtestAttempt.css";

const OPTION_LABELS = ["A", "B", "C", "D"];

function EtestAttempt() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const testMeta = location.state || {};
  const topicId = testMeta.topicId || searchParams.get("topic_id");
  const userId = testMeta.userId || 10;

  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);


  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // -----------------------------
  // 🔥 FETCH QUESTIONS FROM API
  // -----------------------------
  useEffect(() => {
    startTest();
  }, []);

  const startTest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/start-test",
        {
          user_id: userId,
          topic_id: topicId,
        }
      );

      if (!res.data.error) {
        setAttemptId(res.data.attempt_id);

        const formattedQuestions = res.data.questions.map((q) => ({
          id: q.quest_id,
          question: q.question,
          options: [
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d || "N/A",
          ],
          correct: q.correct_answer,
          explanation: q.explanation,
        }));

        setQuestions(formattedQuestions);

        // initialize answers array
        setAnswers(
          formattedQuestions.map(() => ({ selected: null, confirmed: false }))
        );
      }
    } catch (err) {
      console.error("Test load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIndex];

  const paletteInfo = useMemo(
    () =>
      answers.map((entry, idx) => ({
        index: idx,
        selected: entry.selected,
        confirmed: entry.confirmed,
      })),
    [answers]
  );

  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) =>
      prev.map((entry, idx) =>
        idx === currentIndex
          ? { ...entry, selected: optionIndex, confirmed: false }
          : entry
      )
    );
  };

  const handleReset = () => {
    setAnswers((prev) =>
      prev.map((entry, idx) =>
        idx === currentIndex ? { selected: null, confirmed: false } : entry
      )
    );
  };

  const handleConfirm = () => {
    setAnswers((prev) =>
      prev.map((entry, idx) =>
        idx === currentIndex
          ? { ...entry, confirmed: entry.selected !== null }
          : entry
      )
    );
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const goToQuestion = (idx) => setCurrentIndex(idx);



  const handleGoToPlan = () => {
    if (testMeta.planPath) navigate(testMeta.planPath);
    else navigate("/dashboard/my-courses");

  };


  const attemptedCount = answers.filter(a => a.confirmed).length;
  const unvisitedCount = answers.filter(a => a.selected === null && a.confirmed === false).length;
  const unattemptedCount = answers.filter(a => a.selected !== null && a.confirmed === false).length;


  const handleSubmit = () => {
    setShowSubmitModal(true); // open modal instead of alert
  };


  // -----------------------------
  // 🔥 LOADING UI
  // -----------------------------
  if (loading) {
    return (
      <div className="etest-shell">
        <p className="loading-text">Loading Test Questions...</p>
      </div>
    );
  }


  // submit final test

  const submitFinalTest = async () => {
    try {
      const payload = {
        attempt_id: attemptId,
        answers: answers.map((a, index) => ({
          question_id: questions[index].id,
          answer: a.selected !== null ? OPTION_LABELS[a.selected] : null
        }))
      };

      // 1) SAVE ALL ANSWERS IN test_questions
      await axios.post("https://development.pilotexaminations.com/api/save-answer", payload);

      // 2) FINAL SUBMIT API
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/submit-test",
        { attempt_id: attemptId }
      );

      // STORE RESULT & REDIRECT
      navigate("/dashboard/results", {
        state: {
          attempt_id: attemptId,
          correct: res.data.correct,
          wrong: res.data.wrong,
          unanswered: res.data.unanswered,
          percentage: res.data.percentage,
          result: res.data.result,
          message: res.data.message
        }
      });

    } catch (err) {
      console.error("Test submit error", err);
      alert("Something went wrong while submitting test");
    }
  };


  // -----------------------------
  // 🔥 MAIN UI
  // -----------------------------
  return (
    <div className="etest-shell">
      <div className="etest-question-panel">
        <div className="etest-question-card">
          <div className="etest-question-title">
            <p className="etest-question-label">
              Question {currentIndex + 1}
            </p>
            <h3>{currentQuestion.question}</h3>
          </div>

          <div className="etest-option-controls">
            {currentQuestion.options.map((opt, idx) => (
              <label
                key={idx}
                className={`etest-option-pill ${answers[currentIndex].selected === idx ? "is-active" : ""
                  }`}
              >
                <input
                  type="radio"
                  name={`q-${currentQuestion.id}`}
                  checked={answers[currentIndex].selected === idx}
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
              disabled={answers[currentIndex].selected === null}
            >
              Confirm
            </button>
          </div>

          <div className="etest-options-list">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                className={`etest-option-row ${answers[currentIndex].selected === idx ? "is-selected" : ""
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
            <button
              className="etest-sidebar-link"
              onClick={handleGoToPlan}
            >
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

          <div className="etest-palette-grid">
            {paletteInfo.map((item) => (
              <button
                key={item.index}
                className={`etest-palette-btn ${item.index === currentIndex ? "is-active" : ""
                  } ${item.confirmed ? "is-confirmed" : ""}`}
                onClick={() => goToQuestion(item.index)}
              >
                {item.index + 1}
              </button>
            ))}
          </div>
        </div>
      </aside>


      {/* sumit modal */}

      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="etest-modal-overlay">
          <div className="etest-modal">
            <div className="etest-modal-header">
              <h4>Confirm Test Submission</h4>
              <button className="modal-close" onClick={() => setShowSubmitModal(false)}>✕</button>
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


              <button className="review-test-btn" onClick={() => setShowSubmitModal(false)}>
                Review Test
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default EtestAttempt;

