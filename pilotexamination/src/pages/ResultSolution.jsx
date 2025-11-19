// import React, { useMemo, useState } from "react";
// import "./ResultDetail.css";
// import { useLocation } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     status: "correct",
//     question: "A pilot filing a flight plan should indicate whether the flight involves navigation by GNSS. Why?",
//     options: ["Yes", "No"],
//     correct: "Yes",
//     explanation:
//       "Because GNSS has no continuity of service and prediction of availability is needed on the intended route.",
//   },
//   {
//     id: 2,
//     status: "incorrect",
//     question: "The Earth rotates from:",
//     options: ["East to west", "West to east"],
//     correct: "West to east",
//     explanation: "The Earth rotates west to east, making celestial bodies appear to move east to west.",
//   },
//   {
//     id: 3,
//     status: "correct",
//     question: "Why is variation different across the globe?",
//     options: ["The magnetic and true poles are not in the same place", "The Earth’s axis is tilted"],
//     correct: "The magnetic and true poles are not in the same place",
//     explanation:
//       "Variation exists because magnetic and geographic poles differ in position, and lines of magnetic meridian are not parallel to true meridians.",
//   },
//   {
//     id: 4,
//     status: "incorrect",
//     question: "How is variation determined on a chart?",
//     options: [
//       "By comparing true north and magnetic north",
//       "By comparing true meridian and magnetic meridian through the point",
//     ],
//     correct: "By comparing true meridian and magnetic meridian through the point",
//     explanation:
//       "Chart variation is measured as the angle between true and magnetic meridians at a point; it changes with position and time.",
//   },
//   {
//     id: 5,
//     status: "correct",
//     question: "What is agonic line?",
//     options: [
//       "A line of zero variation",
//       "A line joining places of equal deviation",
//     ],
//     correct: "A line of zero variation",
//     explanation:
//       "An agonic line connects points with zero variation, where true and magnetic north coincide.",
//   },
// ];

// const badge = (status) =>
//   status === "correct"
//     ? { text: "Correct", className: "badge bg-success-subtle text-success fw-semibold" }
//     : { text: "Incorrect", className: "badge bg-danger-subtle text-danger fw-semibold" };

// function ResultSolution() {
//   const { state } = useLocation();
//   const subject = state?.subject || "Air Navigation";
//   const topic = state?.topic || "The Earth & Direction, Latitude and Longitude";
//   const scorePercent = Number.isFinite(state?.scorePercent) ? state.scorePercent : 14;
//   const correct = Number.isFinite(state?.correct) ? state.correct : 5;
//   const incorrect = Number.isFinite(state?.incorrect) ? state.incorrect : 3;
//   const unanswered = Number.isFinite(state?.unanswered) ? state.unanswered : 27;
//   const resultLabel = state?.resultLabel || (scorePercent >= 70 ? "Pass" : "Fail");

//   const [showModal, setShowModal] = useState(false);
//   const [activeQuestion, setActiveQuestion] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("medium");
//   const [savedCategories, setSavedCategories] = useState({});

//   const openSaveModal = (qid) => {
//     setActiveQuestion(qid);
//     setSelectedCategory(savedCategories[qid] || "medium");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setActiveQuestion(null);
//   };

//   const handleSaveCategory = () => {
//     if (!activeQuestion) return;
//     setSavedCategories((prev) => ({ ...prev, [activeQuestion]: selectedCategory }));
//     closeModal();
//   };

//   return (
//     <div className="container-fluid result-detail-page">
//       <div className="card shadow-sm border-0 mb-4 result-card">
//         <div className="card-body px-0 pt-0 pb-0">
//           <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
//             <div>
//               <p className="d-block">{subject}</p>
//               <div className="d-flex align-items-center flex-wrap gap-2">
//                 <h3 className="mb-0">{topic}</h3>
//                 <span className="btn btn-light border rounded-pill px-3 py-1">E-Test</span>
//               </div>
//             </div>
//           </div>

//           <div className="result-bottom px-4 py-4">
//             <div className="row g-4 text-center summary-row">
//               <div className="col-6 col-md-3">
//                 <p className={`fw-bold mb-1 ${resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"}`} style={{ fontSize: "1.6rem" }}>
//                   {resultLabel}
//                 </p>
//                 <p className="text-muted small mb-0">Result</p>
//               </div>
//               <div className="col-6 col-md-3">
//                 <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>{scorePercent}%</p>
//                 <p className="text-muted small mb-0">Test Score</p>
//               </div>
//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-success">{correct}</p>
//                 <p className="text-muted small mb-0">Correct</p>
//               </div>
//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-danger">{incorrect}</p>
//                 <p className="text-muted small mb-0">In-Correct</p>
//               </div>
//               <div className="col-12 col-md-2">
//                 <p className="fw-bold mb-1 text-secondary">{unanswered}</p>
//                 <p className="text-muted small mb-0">Un-answered</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {questions.map((q) => {
//         const isCorrect = q.status === "correct";
//         return (
//           <div
//             key={q.id}
//             className={`card mb-3 border-0 solution-card ${isCorrect ? "solution-card-correct" : "solution-card-incorrect"}`}
//           >
//             <div className={`card-header d-flex justify-content-between align-items-center border-0 ${isCorrect ? "solution-header-correct" : "solution-header-incorrect"}`}>
//               <div className="d-flex align-items-center gap-2 flex-wrap">
//                 <p className="mb-0 fw-bold">Question {q.id}</p>
//                 <span className="fw-semibold">{badge(q.status).text}</span>
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-link text-decoration-none text-muted p-0"
//                 onClick={() => openSaveModal(q.id)}
//               >
//                 {savedCategories[q.id] ? `Saved (${savedCategories[q.id]})` : "save"}
//               </button>
//             </div>
//             <div className="card-body">
//               <p className="mb-3">{q.question}</p>
//               <div className="mb-3 option-list">
//                 {q.options.map((o, idx) => {
//                   const letter = String.fromCharCode(65 + idx);
//                   const isAns = o === q.correct;
//                   return (
//                     <div
//                       key={idx}
//                       className={`option-row ${isAns ? "option-correct" : ""}`}
//                     >
//                       <span className="me-2 fw-semibold">{letter}.</span>
//                       <span className="fw-semibold">{o}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="fw-semibold mb-1">Correct answer</div>
//               <p className="mb-3">C. {q.correct}</p>

//               <div className="fw-semibold mb-1">Explanation</div>
//               <p className="mb-0">{q.explanation}</p>
//             </div>
//           </div>
//         );
//       })}

//       <div className="text-center my-4">
//         <button className="btn btn-dark px-4">Take another test</button>
//       </div>

//       {showModal && (
//         <div className="save-modal-overlay" onClick={closeModal}>
//           <div className="save-modal" onClick={(e) => e.stopPropagation()}>
//             <h6 className="fw-semibold mb-3">Save question</h6>
//             <p className="text-muted small mb-3">Choose difficulty category</p>
//             <div className="d-flex flex-column gap-2">
//               {["easy", "medium", "hard"].map((cat) => (
//                 <label key={cat} className="d-flex align-items-center gap-2">
//                   <input
//                     type="radio"
//                     name="save-category"
//                     value={cat}
//                     checked={selectedCategory === cat}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   />
//                   <span className="text-capitalize">{cat}</span>
//                 </label>
//               ))}
//             </div>
//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button className="btn btn-light" onClick={closeModal}>Cancel</button>
//               <button className="btn btn-dark" onClick={handleSaveCategory}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResultSolution;



// import React, { useMemo, useState } from "react";
// import "./ResultDetail.css";
// import { useLocation } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     status: "correct",
//     question: "A pilot filing a flight plan should indicate whether the flight involves navigation by GNSS. Why?",
//     options: ["Yes", "No"],
//     correct: "Yes",
//     explanation:
//       "Because GNSS has no continuity of service and prediction of availability is needed on the intended route.",
//   },
//   {
//     id: 2,
//     status: "incorrect",
//     question: "The Earth rotates from:",
//     options: ["East to west", "West to east"],
//     correct: "West to east",
//     explanation: "The Earth rotates west to east, making celestial bodies appear to move east to west.",
//   },
//   {
//     id: 3,
//     status: "correct",
//     question: "Why is variation different across the globe?",
//     options: ["The magnetic and true poles are not in the same place", "The Earth’s axis is tilted"],
//     correct: "The magnetic and true poles are not in the same place",
//     explanation:
//       "Variation exists because magnetic and geographic poles differ in position, and lines of magnetic meridian are not parallel to true meridians.",
//   },
//   {
//     id: 4,
//     status: "incorrect",
//     question: "How is variation determined on a chart?",
//     options: [
//       "By comparing true north and magnetic north",
//       "By comparing true meridian and magnetic meridian through the point",
//     ],
//     correct: "By comparing true meridian and magnetic meridian through the point",
//     explanation:
//       "Chart variation is measured as the angle between true and magnetic meridians at a point; it changes with position and time.",
//   },
//   {
//     id: 5,
//     status: "correct",
//     question: "What is agonic line?",
//     options: ["A line of zero variation", "A line joining places of equal deviation"],
//     correct: "A line of zero variation",
//     explanation: "An agonic line connects points with zero variation, where true and magnetic north coincide.",
//   },
// ];

// const badge = (status) =>
//   status === "correct"
//     ? { text: "Correct", className: "badge bg-success-subtle text-success fw-semibold" }
//     : { text: "Incorrect", className: "badge bg-danger-subtle text-danger fw-semibold" };

// function ResultSolution() {
//   const { state } = useLocation();
//   const subject = state?.subject || "Air Navigation";
//   const topic = state?.topic || "The Earth & Direction, Latitude and Longitude";
//   const scorePercent = Number.isFinite(state?.percentage) ? state.percentage : 14;
//   const correct = Number.isFinite(state?.correct) ? state.correct : 5;
//   const incorrect = Number.isFinite(state?.incorrect) ? state.incorrect : 3;
//   const unanswered = Number.isFinite(state?.unanswered) ? state.unanswered : 27;
//   const resultLabel = scorePercent >= 70 ? "Pass" : "Fail";

//   /* --------------------------- MODAL STATES --------------------------- */
//   const [showModal, setShowModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [activeQuestion, setActiveQuestion] = useState(null);

//   const [categoryList, setCategoryList] = useState([
//     "Default",
//     "Hard",
//     "Medium",
//     "Easy",
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [newListName, setNewListName] = useState("");

//   const [savedCategories, setSavedCategories] = useState({});

//   const openSaveModal = (qid) => {
//     setActiveQuestion(qid);
//     setSelectedCategory(savedCategories[qid] || "");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setActiveQuestion(null);
//   };

//   const handleSaveCategory = () => {
//     if (!activeQuestion || !selectedCategory) return;
//     setSavedCategories((prev) => ({
//       ...prev,
//       [activeQuestion]: selectedCategory,
//     }));
//     closeModal();
//   };

//   return (
//     <div className="container-fluid result-detail-page">
//       <div className="card shadow-sm border-0 mb-4 result-card">
//         <div className="card-body px-0 pt-0 pb-0">
//           <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
//             <div>
//               <p className="d-block">{subject}</p>
//               <div className="d-flex align-items-center flex-wrap gap-2">
//                 <h3 className="mb-0">{topic}</h3>
//                 <span className="btn btn-light border rounded-pill px-3 py-1">E-Test</span>
//               </div>
//             </div>
//           </div>

//           <div className="result-bottom px-4 py-4">
//             <div className="row g-4 text-center summary-row">
//               <div className="col-6 col-md-3">
//                 <p
//                   className={`fw-bold mb-1 ${
//                     resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"
//                   }`}
//                   style={{ fontSize: "1.6rem" }}
//                 >
//                   {resultLabel}
//                 </p>
//                 <p className="text-muted small mb-0">Result</p>
//               </div>
//               <div className="col-6 col-md-3">
//                 <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
//                   {scorePercent}%
//                 </p>
//                 <p className="text-muted small mb-0">Test Score</p>
//               </div>
//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-success">{correct}</p>
//                 <p className="text-muted small mb-0">Correct</p>
//               </div>
//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-danger">{incorrect}</p>
//                 <p className="text-muted small mb-0">In-Correct</p>
//               </div>
//               <div className="col-12 col-md-2">
//                 <p className="fw-bold mb-1 text-secondary">{unanswered}</p>
//                 <p className="text-muted small mb-0">Un-answered</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {questions.map((q) => {
//         const isCorrect = q.status === "correct";
//         return (
//           <div
//             key={q.id}
//             className={`card mb-3 border-0 solution-card ${
//               isCorrect ? "solution-card-correct" : "solution-card-incorrect"
//             }`}
//           >
//             <div
//               className={`card-header d-flex justify-content-between align-items-center border-0 ${
//                 isCorrect ? "solution-header-correct" : "solution-header-incorrect"
//               }`}
//             >
//               <div className="d-flex align-items-center gap-2 flex-wrap">
//                 <p className="mb-0 fw-bold">Question {q.id}</p>
//                 <span className="fw-semibold">{badge(q.status).text}</span>
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-link text-decoration-none text-muted p-0"
//                 onClick={() => openSaveModal(q.id)}
//               >
//                 {savedCategories[q.id]
//                   ? `Saved (${savedCategories[q.id]})`
//                   : "Save"}
//               </button>
//             </div>
//             <div className="card-body">
//               <p className="mb-3">{q.question}</p>
//               <div className="mb-3 option-list">
//                 {q.options.map((o, idx) => {
//                   const letter = String.fromCharCode(65 + idx);
//                   const isAns = o === q.correct;
//                   return (
//                     <div key={idx} className={`option-row ${isAns ? "option-correct" : ""}`}>
//                       <span className="me-2 fw-semibold">{letter}.</span>
//                       <span className="fw-semibold">{o}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="fw-semibold mb-1">Correct answer</div>
//               <p className="mb-3">{q.correct}</p>

//               <div className="fw-semibold mb-1">Explanation</div>
//               <p className="mb-0">{q.explanation}</p>
//             </div>
//           </div>
//         );
//       })}

//       <div className="text-center my-4">
//         <button className="btn btn-dark px-4">Take another test</button>
//       </div>

//       {/* --------------------------- SAVE MODAL --------------------------- */}
//       {showModal && (
//         <div className="save-modal-overlay" onClick={closeModal}>
//           <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h6 className="fw-semibold mb-0">
//                 Save to a list, Question {activeQuestion}
//               </h6>
//               <button
//                 className="btn p-0 border-0 bg-transparent fs-4"
//                 onClick={closeModal}
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Category List */}
//             <div className="d-flex flex-column gap-2">
//               {categoryList.map((cat, idx) => (
//                 <input
//                   key={idx}
//                   type="text"
//                   readOnly
//                   className="form-control"
//                   value={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   style={{
//                     cursor: "pointer",
//                     borderColor:
//                       selectedCategory === cat ? "#000" : "#ccc",
//                   }}
//                 />
//               ))}
//             </div>

//             <div className="text-center my-3 text-muted">or</div>

//             {/* Open Create Modal */}
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Create"
//               onClick={() => setShowCreateModal(true)}
//               readOnly
//             />

//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button className="btn btn-light" onClick={closeModal}>
//                 Cancel
//               </button>
//               <button className="btn btn-dark" onClick={handleSaveCategory}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ------------------------ CREATE LIST MODAL ------------------------ */}
//       {showCreateModal && (
//         <div
//           className="save-modal-overlay"
//           onClick={() => setShowCreateModal(false)}
//         >
//           <div
//             className="save-modal-box"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="fw-semibold mb-0">Create List</h5>
//               <button
//                 className="btn p-0 border-0 bg-transparent fs-4"
//                 onClick={() => setShowCreateModal(false)}
//               >
//                 &times;
//               </button>
//             </div>

//             <label className="fw-semibold mb-2">List Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Create List Name..."
//               value={newListName}
//               onChange={(e) => setNewListName(e.target.value)}
//             />

//             <div className="text-end mt-4">
//               <button
//                 className="btn btn-dark"
//                 onClick={() => {
//                   if (newListName.trim() !== "") {
//                     setCategoryList([...categoryList, newListName]);
//                     setSelectedCategory(newListName);
//                     setNewListName("");
//                     setShowCreateModal(false);
//                   }
//                 }}
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResultSolution;



// import React, { useState } from "react";
// import "./ResultDetail.css";
// import { useLocation } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     status: "correct",
//     question:
//       "A pilot filing a flight plan should indicate whether the flight involves navigation by GNSS. Why?",
//     options: ["Yes", "No"],
//     correct: "Yes",
//     explanation:
//       "Because GNSS has no continuity of service and prediction of availability is needed on the intended route.",
//   },
//   {
//     id: 2,
//     status: "incorrect",
//     question: "The Earth rotates from:",
//     options: ["East to west", "West to east"],
//     correct: "West to east",
//     explanation: "The Earth rotates west to east, making celestial bodies appear to move east to west.",
//   },
//   {
//     id: 3,
//     status: "correct",
//     question: "Why is variation different across the globe?",
//     options: [
//       "The magnetic and true poles are not in the same place",
//       "The Earth’s axis is tilted",
//     ],
//     correct: "The magnetic and true poles are not in the same place",
//     explanation:
//       "Variation exists because magnetic and geographic poles differ in position, and lines of magnetic meridian are not parallel to true meridians.",
//   },
//   {
//     id: 4,
//     status: "incorrect",
//     question: "How is variation determined on a chart?",
//     options: [
//       "By comparing true north and magnetic north",
//       "By comparing true meridian and magnetic meridian through the point",
//     ],
//     correct: "By comparing true meridian and magnetic meridian through the point",
//     explanation:
//       "Chart variation is measured as the angle between true and magnetic meridians at a point; it changes with position and time.",
//   },
//   {
//     id: 5,
//     status: "correct",
//     question: "What is agonic line?",
//     options: ["A line of zero variation", "A line joining places of equal deviation"],
//     correct: "A line of zero variation",
//     explanation: "An agonic line connects points with zero variation, where true and magnetic north coincide.",
//   },
// ];

// const badge = (status) =>
//   status === "correct"
//     ? { text: "Correct", className: "badge bg-success-subtle text-success fw-semibold" }
//     : { text: "Incorrect", className: "badge bg-danger-subtle text-danger fw-semibold" };

// function ResultSolution() {
//   const { state } = useLocation();
//   const subject = state?.subject || "Air Navigation";
//   const topic = state?.topic || "The Earth & Direction, Latitude and Longitude";
//   const scorePercent = Number.isFinite(state?.percentage) ? state.percentage : 14;
//   const correct = Number.isFinite(state?.correct) ? state.correct : 5;
//   const incorrect = Number.isFinite(state?.incorrect) ? state.incorrect : 3;
//   const unanswered = Number.isFinite(state?.unanswered) ? state.unanswered : 27;
//   const resultLabel = scorePercent >= 70 ? "Pass" : "Fail";

//   /* --------------------------- MODAL STATES --------------------------- */
//   const [showModal, setShowModal] = useState(false); // Save modal
//   const [showCreateModal, setShowCreateModal] = useState(false); // Create modal
//   const [activeQuestion, setActiveQuestion] = useState(null);

//   const [categoryList, setCategoryList] = useState(["Default", "Hard", "Medium", "Easy"]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [newListName, setNewListName] = useState("");
//   const [createError, setCreateError] = useState("");
//   const [openMenuFor, setOpenMenuFor] = useState(null);


//   // savedCategories maps questionId -> categoryName
//   const [savedCategories, setSavedCategories] = useState({});

//   const openSaveModal = (qid) => {
//     setActiveQuestion(qid);
//     setSelectedCategory(savedCategories[qid] || "");
//     setShowModal(true);
//   };

//   const closeSaveModal = () => {
//     setShowModal(false);
//     setActiveQuestion(null);
//   };

//   // When opening Create modal, close the Save modal first (as requested)
//   const openCreateModal = () => {
//     setShowModal(false); // close save modal
//     setCreateError("");
//     setNewListName("");
//     setShowCreateModal(true);
//   };

//   const closeCreateModal = () => {
//     setShowCreateModal(false);
//     setCreateError("");
//     setNewListName("");
//   };

//   const handleSaveCategory = () => {
//     if (!activeQuestion || !selectedCategory) {
//       // optionally show a toast; for now do nothing
//       return;
//     }
//     setSavedCategories((prev) => ({ ...prev, [activeQuestion]: selectedCategory }));
//     closeSaveModal();
//   };

//   // Create new list, prevent duplicates (case-insensitive)
//   const handleCreateList = () => {
//     const candidate = newListName.trim();
//     if (!candidate) {
//       setCreateError("List name cannot be empty");
//       return;
//     }
//     const exists = categoryList.some((c) => c.toLowerCase() === candidate.toLowerCase());
//     if (exists) {
//       setCreateError("A list with this name already exists");
//       return;
//     }
//     const updated = [...categoryList, candidate];
//     setCategoryList(updated);
//     setSelectedCategory(candidate);
//     setNewListName("");
//     setCreateError("");
//     // Close create modal. User can re-open save modal to save question into this list.
//     setShowCreateModal(false);
//   };

//   // Delete a list (confirm). Do not allow deleting "Default"
//   const handleDeleteList = (catToDelete) => {
//     if (catToDelete === "Default") {
//       return; // optionally alert user
//     }
//     const ok = window.confirm(`Delete list "${catToDelete}"? This will remove it permanently from your lists.`);
//     if (!ok) return;
//     const updated = categoryList.filter((c) => c !== catToDelete);
//     setCategoryList(updated);
//     // If the deleted list was selected, clear selection
//     if (selectedCategory === catToDelete) setSelectedCategory("");
//     // Remove assignment from savedCategories if any question was saved to this category
//     setSavedCategories((prev) => {
//       const copy = { ...prev };
//       Object.keys(copy).forEach((qid) => {
//         if (copy[qid] === catToDelete) delete copy[qid];
//       });
//       return copy;
//     });
//   };

//   return (
//     <div className="container-fluid result-detail-page">
//       <div className="card shadow-sm border-0 mb-4 result-card">
//         <div className="card-body px-0 pt-0 pb-0">
//           <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
//             <div>
//               <p className="d-block">{subject}</p>
//               <div className="d-flex align-items-center flex-wrap gap-2">
//                 <h3 className="mb-0">{topic}</h3>
//                 <span className="btn btn-light border rounded-pill px-3 py-1">E-Test</span>
//               </div>
//             </div>
//           </div>

//           <div className="result-bottom px-4 py-4">
//             <div className="row g-4 text-center summary-row">
//               <div className="col-6 col-md-3">
//                 <p
//                   className={`fw-bold mb-1 ${
//                     resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"
//                   }`}
//                   style={{ fontSize: "1.6rem" }}
//                 >
//                   {resultLabel}
//                 </p>
//                 <p className="text-muted small mb-0">Result</p>
//               </div>
//               <div className="col-6 col-md-3">
//                 <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
//                   {scorePercent}%
//                 </p>
//                 <p className="text-muted small mb-0">Test Score</p>
//               </div>
//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-success">{correct}</p>
//                 <p className="text-muted small mb-0">Correct</p>
//               </div>
//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-danger">{incorrect}</p>
//                 <p className="text-muted small mb-0">In-Correct</p>
//               </div>
//               <div className="col-12 col-md-2">
//                 <p className="fw-bold mb-1 text-secondary">{unanswered}</p>
//                 <p className="text-muted small mb-0">Un-answered</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {questions.map((q) => {
//         const isCorrect = q.status === "correct";
//         return (
//           <div
//             key={q.id}
//             className={`card mb-3 border-0 solution-card ${
//               isCorrect ? "solution-card-correct" : "solution-card-incorrect"
//             }`}
//           >
//             <div
//               className={`card-header d-flex justify-content-between align-items-center border-0 ${
//                 isCorrect ? "solution-header-correct" : "solution-header-incorrect"
//               }`}
//             >
//               <div className="d-flex align-items-center gap-2 flex-wrap">
//                 <p className="mb-0 fw-bold">Question {q.id}</p>
//                 <span className="fw-semibold">{badge(q.status).text}</span>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-link text-decoration-none text-muted p-0"
//                 onClick={() => openSaveModal(q.id)}
//               >
//                 {savedCategories[q.id] ? `Saved (${savedCategories[q.id]})` : "Save"}
//               </button>


//             </div>
//             <div className="card-body">
//               <p className="mb-3">{q.question}</p>
//               <div className="mb-3 option-list">
//                 {q.options.map((o, idx) => {
//                   const letter = String.fromCharCode(65 + idx);
//                   const isAns = o === q.correct;
//                   return (
//                     <div key={idx} className={`option-row ${isAns ? "option-correct" : ""}`}>
//                       <span className="me-2 fw-semibold">{letter}.</span>
//                       <span className="fw-semibold">{o}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="fw-semibold mb-1">Correct answer</div>
//               <p className="mb-3">{q.correct}</p>

//               <div className="fw-semibold mb-1">Explanation</div>
//               <p className="mb-0">{q.explanation}</p>
//             </div>
//           </div>
//         );
//       })}

//       <div className="text-center my-4">
//         <button className="btn btn-dark px-4">Take another test</button>
//       </div>

//       {/* --------------------------- SAVE MODAL --------------------------- */}
//       {showModal && (
//         <div className="save-modal-overlay top-modal" onClick={closeSaveModal}>
//           <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h6 className="fw-semibold mb-0">Save to a list, Question {activeQuestion}</h6>
//               <button className="btn p-0 border-0 bg-transparent fs-4" onClick={closeSaveModal}>
//                 &times;
//               </button>
//             </div>

//             {/* Category List (dynamic) */}
//             <div className="d-flex flex-column gap-2">
//               {categoryList.map((cat, idx) => (
//                 <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//                   <input
//                     type="text"
//                     readOnly
//                     className="form-control"
//                     value={cat}
//                     onClick={() => setSelectedCategory(cat)}
//                     style={{
//                       cursor: "pointer",
//                       borderColor: selectedCategory === cat ? "#000" : "#ccc",
//                       flex: 1,
//                     }}
//                   />
//                   {/* show delete icon except for "Default" */}
//                   {cat !== "Default" && (
//                     <button
//                       className="btn btn-sm btn-outline-dark"
//                       onClick={() => handleDeleteList(cat)}
//                       title={`Delete ${cat}`}
//                       style={{height:"39px"}}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="text-center my-3 text-muted">or</div>

//             {/* Create input opens Create Modal (and closes Save modal first) */}
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Create"
//               onClick={openCreateModal}
//               readOnly
//             />

//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button className="btn btn-light" onClick={closeSaveModal}>
//                 Cancel
//               </button>
//               <button className="btn btn-dark" onClick={handleSaveCategory}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ------------------------ CREATE LIST MODAL ------------------------ */}
//       {showCreateModal && (
//         <div className="save-modal-overlay top-modal" onClick={closeCreateModal}>
//           <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="fw-semibold mb-0">Create List</h5>
//               <button className="btn p-0 border-0 bg-transparent fs-4" onClick={closeCreateModal}>
//                 &times;
//               </button>
//             </div>

//             <label className="fw-semibold mb-2">List Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Create List Name..."
//               value={newListName}
//               onChange={(e) => {
//                 setNewListName(e.target.value);
//                 setCreateError("");
//               }}
//             />
//             {createError && <div className="text-danger small mt-2">{createError}</div>}

//             <div className="text-end mt-4">
//               <button
//                 className="btn btn-dark"
//                 onClick={() => {
//                   handleCreateList();
//                 }}
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResultSolution;


// import React, { useState, useEffect } from "react";
// import "./ResultDetail.css";
// import { useLocation } from "react-router-dom";

// const questions = [
//   {
//     id: 1,
//     status: "correct",
//     question:
//       "A pilot filing a flight plan should indicate whether the flight involves navigation by GNSS. Why?",
//     options: ["Yes", "No"],
//     correct: "Yes",
//     explanation:
//       "Because GNSS has no continuity of service and prediction of availability is needed on the intended route.",
//   },
//   {
//     id: 2,
//     status: "incorrect",
//     question: "The Earth rotates from:",
//     options: ["East to west", "West to east"],
//     correct: "West to east",
//     explanation: "The Earth rotates west to east, making celestial bodies appear to move east to west.",
//   },
//   {
//     id: 3,
//     status: "correct",
//     question: "Why is variation different across the globe?",
//     options: [
//       "The magnetic and true poles are not in the same place",
//       "The Earth’s axis is tilted",
//     ],
//     correct: "The magnetic and true poles are not in the same place",
//     explanation:
//       "Variation exists because magnetic and geographic poles differ in position, and lines of magnetic meridian are not parallel to true meridians.",
//   },
//   {
//     id: 4,
//     status: "incorrect",
//     question: "How is variation determined on a chart?",
//     options: [
//       "By comparing true north and magnetic north",
//       "By comparing true meridian and magnetic meridian through the point",
//     ],
//     correct: "By comparing true meridian and magnetic meridian through the point",
//     explanation:
//       "Chart variation is measured as the angle between true and magnetic meridians at a point; it changes with position and time.",
//   },
//   {
//     id: 5,
//     status: "correct",
//     question: "What is agonic line?",
//     options: ["A line of zero variation", "A line joining places of equal deviation"],
//     correct: "A line of zero variation",
//     explanation: "An agonic line connects points with zero variation, where true and magnetic north coincide.",
//   },
// ];

// const badge = (status) =>
//   status === "correct"
//     ? { text: "Correct", className: "badge bg-success-subtle text-success fw-semibold" }
//     : { text: "Incorrect", className: "badge bg-danger-subtle text-danger fw-semibold" };

// function ResultSolution() {
//   const { state } = useLocation();
//   const subject = state?.subject || "Air Navigation";
//   const topic = state?.topic || "The Earth & Direction, Latitude and Longitude";
//   const scorePercent = Number.isFinite(state?.percentage) ? state.percentage : 14;
//   const correct = Number.isFinite(state?.correct) ? state.correct : 5;
//   const incorrect = Number.isFinite(state?.incorrect) ? state.incorrect : 3;
//   const unanswered = Number.isFinite(state?.unanswered) ? state.unanswered : 27;
//   const resultLabel = scorePercent >= 70 ? "Pass" : "Fail";

//   /* --------------------------- MODAL STATES --------------------------- */
//   const [showModal, setShowModal] = useState(false); // Save modal
//   const [showCreateModal, setShowCreateModal] = useState(false); // Create modal
//   const [activeQuestion, setActiveQuestion] = useState(null);

//   const [categoryList, setCategoryList] = useState(["Default", "Hard", "Medium", "Easy"]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [newListName, setNewListName] = useState("");
//   const [createError, setCreateError] = useState("");

//   const [savedCategories, setSavedCategories] = useState({});

//   /* POPUP for 3-dots */
//   const [openMenuFor, setOpenMenuFor] = useState(null);
//   const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

//   useEffect(() => {
//     const closePopup = () => setOpenMenuFor(null);
//     window.addEventListener("click", closePopup);
//     return () => window.removeEventListener("click", closePopup);
//   }, []);

//   const openSaveModal = (qid) => {
//     setActiveQuestion(qid);
//     setSelectedCategory(savedCategories[qid] || "");
//     setShowModal(true);
//   };

//   const closeSaveModal = () => {
//     setShowModal(false);
//     setActiveQuestion(null);
//   };

//   const openCreateModal = () => {
//     setShowModal(false);
//     setCreateError("");
//     setNewListName("");
//     setShowCreateModal(true);
//   };

//   const closeCreateModal = () => {
//     setShowCreateModal(false);
//     setCreateError("");
//     setNewListName("");
//   };

//   const handleSaveCategory = () => {
//     if (!activeQuestion || !selectedCategory) return;

//     setSavedCategories((prev) => ({
//       ...prev,
//       [activeQuestion]: selectedCategory,
//     }));

//     closeSaveModal();
//   };

//   const handleCreateList = () => {
//     const name = newListName.trim();
//     if (!name) {
//       setCreateError("List name cannot be empty");
//       return;
//     }
//     if (categoryList.some((c) => c.toLowerCase() === name.toLowerCase())) {
//       setCreateError("A list with this name already exists");
//       return;
//     }

//     setCategoryList([...categoryList, name]);
//     setSelectedCategory(name);
//     setNewListName("");
//     closeCreateModal();
//   };

//   const handleDeleteList = (name) => {
//     if (name === "Default") return;
//     if (!window.confirm(`Delete list "${name}"?`)) return;

//     setCategoryList(categoryList.filter((c) => c !== name));

//     setSavedCategories((prev) => {
//       const copy = { ...prev };
//       Object.keys(copy).forEach((qid) => {
//         if (copy[qid] === name) delete copy[qid];
//       });
//       return copy;
//     });
//   };

//   return (
//     <div className="container-fluid result-detail-page">

//       {/* ---------------------- SUMMARY CARD ---------------------- */}
//       <div className="card shadow-sm border-0 mb-4 result-card">
//         <div className="card-body px-0 pt-0 pb-0">
//           <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
//             <div>
//               <p className="d-block">{subject}</p>
//               <div className="d-flex align-items-center flex-wrap gap-2">
//                 <h3 className="mb-0">{topic}</h3>
//                 <span className="btn btn-light border rounded-pill px-3 py-1">E-Test</span>
//               </div>
//             </div>
//           </div>

//           <div className="result-bottom px-4 py-4">
//             <div className="row g-4 text-center summary-row">
//               <div className="col-6 col-md-3">
//                 <p
//                   className={`fw-bold mb-1 ${
//                     resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"
//                   }`}
//                   style={{ fontSize: "1.6rem" }}
//                 >
//                   {resultLabel}
//                 </p>
//                 <p className="text-muted small mb-0">Result</p>
//               </div>

//               <div className="col-6 col-md-3">
//                 <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
//                   {scorePercent}%
//                 </p>
//                 <p className="text-muted small mb-0">Test Score</p>
//               </div>

//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-success">{correct}</p>
//                 <p className="text-muted small mb-0">Correct</p>
//               </div>

//               <div className="col-6 col-md-2">
//                 <p className="fw-bold mb-1 text-danger">{incorrect}</p>
//                 <p className="text-muted small mb-0">In-Correct</p>
//               </div>

//               <div className="col-12 col-md-2">
//                 <p className="fw-bold mb-1 text-secondary">{unanswered}</p>
//                 <p className="text-muted small mb-0">Un-answered</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---------------------- QUESTIONS LIST ---------------------- */}
//       {questions.map((q) => {
//         const isCorrect = q.status === "correct";

//         return (
//           <div
//             key={q.id}
//             className={`card mb-3 border-0 solution-card ${
//               isCorrect ? "solution-card-correct" : "solution-card-incorrect"
//             }`}
//           >
//             <div
//               className={`card-header d-flex justify-content-between align-items-center border-0 ${
//                 isCorrect ? "solution-header-correct" : "solution-header-incorrect"
//               }`}
//             >
//               <div className="d-flex align-items-center gap-2 flex-wrap">
//                 <p className="mb-0 fw-bold">Question {q.id}</p>
//                 <span className="fw-semibold">{badge(q.status).text}</span>
//               </div>

//               {/* ---------------- SAVE + 3 DOTS ---------------- */}
//               <div className="d-flex align-items-center gap-3">

//                 {/* SAVE ICON + TEXT */}
//                 <button
//                   type="button"
//                   className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-1"
//                   onClick={() => openSaveModal(q.id)}
//                 >
//                   <span style={{ fontSize: "17px" }}>🔖</span>
//                   <span>
//                     {savedCategories[q.id]
//                       ? `Saved (${savedCategories[q.id]})`
//                       : "Save"}
//                   </span>
//                 </button>

//                 {/* THREE DOTS */}
//                 <span
//                   className="three-dots"
//                   style={{ cursor: "pointer", fontSize: "22px", userSelect: "none" }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     const rect = e.target.getBoundingClientRect();
//                     setPopupPos({
//                       top: rect.bottom + 8,
//                       left: rect.right - 180,
//                     });
//                     setOpenMenuFor(q.id);
//                   }}
//                 >
//                   ⋯
//                 </span>
//               </div>
//             </div>

//             {/* -------- POPUP FLOATING -------- */}
//             {openMenuFor === q.id && (
//               <div
//                 className="popup-menu shadow-sm"
//                 style={{
//                   position: "fixed",
//                   top: popupPos.top,
//                   left: popupPos.left,
//                   width: "12rem",
//                   background: "#fff",
//                   border: "1px solid #ddd",
//                   borderRadius: "0px 6px 6px 6px",
//                   zIndex: 99999,
//                 }}
//               >
//                 <p className="mb-1 fs-6 px-2 py-1">Found some error?</p>
//                 <div
//                   className="d-flex align-items-center report-line py-2 px-2"
//                   style={{ cursor: "pointer" ,  width:"100%",backgroundColor:"#d2d2d2ff",}}
//                 >
//                   <span className="fs-6">Report this question</span>
//                 </div>
//               </div>
//             )}

//             <div className="card-body">
//               <p className="mb-3">{q.question}</p>

//               <div className="mb-3 option-list">
//                 {q.options.map((o, idx) => {
//                   const letter = String.fromCharCode(65 + idx);
//                   const isAns = o === q.correct;

//                   return (
//                     <div key={idx} className={`option-row ${isAns ? "option-correct" : ""}`}>
//                       <span className="me-2 fw-semibold">{letter}.</span>
//                       <span className="fw-semibold">{o}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="fw-semibold mb-1">Correct answer</div>
//               <p className="mb-3">{q.correct}</p>

//               <div className="fw-semibold mb-1">Explanation</div>
//               <p className="mb-0">{q.explanation}</p>
//             </div>
//           </div>
//         );
//       })}

//       {/* ---------------------- TAKE ANOTHER TEST BUTTON ---------------------- */}
//       <div className="text-center my-4">
//         <button className="btn btn-dark px-4">Take another test</button>
//       </div>

//       {/* --------------------------- SAVE MODAL --------------------------- */}
//       {showModal && (
//         <div className="save-modal-overlay top-modal" onClick={closeSaveModal}>
//           <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h6 className="fw-semibold mb-0">
//                 Save to a list, Question {activeQuestion}
//               </h6>
//               <button className="btn p-0 border-0 bg-transparent fs-4" onClick={closeSaveModal}>
//                 &times;
//               </button>
//             </div>

//             {/* Category List */}
//             <div className="d-flex flex-column gap-2">
//               {categoryList.map((cat, idx) => (
//                 <div key={idx} className="d-flex align-items-center gap-2">
//                   <input
//                     type="text"
//                     readOnly
//                     value={cat}
//                     onClick={() => setSelectedCategory(cat)}
//                     className="form-control"
//                     style={{
//                       cursor: "pointer",
//                       borderColor: selectedCategory === cat ? "#000" : "#ccc",
//                     }}
//                   />

//                   {cat !== "Default" && (
//                     <button
//                       className="btn btn-sm btn-outline-dark"
//                       onClick={() => handleDeleteList(cat)}
//                       style={{ height: "39px" }}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="text-center my-3 text-muted">or</div>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Create"
//               readOnly
//               onClick={openCreateModal}
//             />

//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button className="btn btn-light" onClick={closeSaveModal}>
//                 Cancel
//               </button>
//               <button className="btn btn-dark" onClick={handleSaveCategory}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ------------------------ CREATE LIST MODAL ------------------------ */}
//       {showCreateModal && (
//         <div className="save-modal-overlay top-modal" onClick={closeCreateModal}>
//           <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="fw-semibold mb-0">Create List</h5>
//               <button className="btn p-0 border-0 bg-transparent fs-4" onClick={closeCreateModal}>
//                 &times;
//               </button>
//             </div>

//             <label className="fw-semibold mb-2">List Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Create List Name..."
//               value={newListName}
//               onChange={(e) => {
//                 setNewListName(e.target.value);
//                 setCreateError("");
//               }}
//             />

//             {createError && (
//               <div className="text-danger small mt-2">{createError}</div>
//             )}

//             <div className="text-end mt-4">
//               <button className="btn btn-dark" onClick={handleCreateList}>
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default ResultSolution;

import React, { useState, useEffect } from "react";
import "./ResultDetail.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

const badge = (status) =>
  status === "correct"
    ? { text: "Correct", className: "badge bg-success-subtle text-success fw-semibold" }
    : { text: "Incorrect", className: "badge bg-danger-subtle text-danger fw-semibold" };

function ResultSolution() {
  const { state } = useLocation();

  const testId = state?.testId;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);

  /* -------------------- SAVE CATEGORY STATES -------------------- */
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [categoryList, setCategoryList] = useState(["Default", "Hard", "Medium", "Easy"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newListName, setNewListName] = useState("");
  const [savedCategories, setSavedCategories] = useState({});
  const [createError, setCreateError] = useState("");

  /* ---------------------- 3 DOTS POPUP ---------------------- */
  const [openMenuFor, setOpenMenuFor] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const closePopup = () => setOpenMenuFor(null);
    window.addEventListener("click", closePopup);
    return () => window.removeEventListener("click", closePopup);
  }, []);

  /* --------------------- FETCH SOLUTION API --------------------- */
  useEffect(() => {
    if (!testId || !userId) return;

    const fetchSolution = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/etest/solution",
          {
            user_id: userId,
            test_id: testId,
          }
        );

        console.log("API RESPONSE:", res.data);

        if (!res.data.error) {
          setSummary(res.data.summary);
          setQuestions(res.data.questions);
        }

        setLoading(false);
      } catch (err) {
        console.log("API Error:", err);
        setLoading(false);
      }
    };

    fetchSolution();
  }, [testId, userId]);

  if (loading || !summary) {
    return (
      <div className="container-fluid text-center mt-4">
        <h5>Loading...</h5>
      </div>
    );
  }


  const scrollToTop = () => {
    const container = document.querySelector(".dashboard-main");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* Extract summary values */
  const subject = summary.subject_name || "Air Navigation";
  const topic = summary.topic_name || "";
  const scorePercent = summary.percentage || 0;
  const correct = summary.correct || 0;
  const incorrect = summary.incorrect || 0;
  const unanswered = summary.unanswered || 0;
  const resultLabel = summary.result || "Fail";

  /* ---------------- SAVE - MODAL FUNCTIONS ---------------- */
  const openSaveModal = (qid) => {
    setActiveQuestion(qid);
    setSelectedCategory(savedCategories[qid] || "");
    setShowModal(true);
  };

  const closeSaveModal = () => {
    setShowModal(false);
    setActiveQuestion(null);
  };

  const openCreateModal = () => {
    setShowModal(false);
    setCreateError("");
    setNewListName("");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCreateError("");
    setNewListName("");
  };

  const handleSaveCategory = () => {
    if (!activeQuestion || !selectedCategory) return;

    setSavedCategories((prev) => ({
      ...prev,
      [activeQuestion]: selectedCategory,
    }));

    closeSaveModal();
  };

  const handleCreateList = () => {
    const name = newListName.trim();
    if (!name) {
      setCreateError("List name cannot be empty");
      return;
    }
    if (categoryList.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setCreateError("A list with this name already exists");
      return;
    }

    setCategoryList([...categoryList, name]);
    setSelectedCategory(name);
    closeCreateModal();
  };

  const handleDeleteList = (name) => {
    if (name === "Default") return;
    if (!window.confirm(`Delete list "${name}"?`)) return;

    setCategoryList(categoryList.filter((c) => c !== name));

    setSavedCategories((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((qid) => {
        if (updated[qid] === name) delete updated[qid];
      });
      return updated;
    });
  };

  return (
    <div className="container-fluid result-detail-page">
      {/* ---------------------- SUMMARY CARD ---------------------- */}
      <div className="card shadow-sm border-0 mb-4 result-card">
        <div className="card-body px-0 pt-0 pb-0">
          <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
            <div>
              <p className="d-block">{subject}</p>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <h3 className="mb-0">{topic}</h3>
                <span className="btn btn-light border rounded-pill px-3 py-1">E-Test</span>
              </div>
            </div>
          </div>

          <div className="result-bottom px-4 py-4">
            <div className="row g-4 text-center summary-row">
              <div className="col-6 col-md-3">
                <p
                  className={`fw-bold mb-1 ${resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"
                    }`}
                  style={{ fontSize: "1.6rem" }}
                >
                  {resultLabel}
                </p>
                <p className="text-muted small mb-0">Result</p>
              </div>

              <div className="col-6 col-md-3">
                <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
                  {scorePercent}%
                </p>
                <p className="text-muted small mb-0">Test Score</p>
              </div>

              <div className="col-6 col-md-2">
                <p className="fw-bold mb-1 text-success">{correct}</p>
                <p className="text-muted small mb-0">Correct</p>
              </div>

              <div className="col-6 col-md-2">
                <p className="fw-bold mb-1 text-danger">{incorrect}</p>
                <p className="text-muted small mb-0">In-Correct</p>
              </div>

              <div className="col-12 col-md-2">
                <p className="fw-bold mb-1 text-secondary">{unanswered}</p>
                <p className="text-muted small mb-0">Un-answered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- QUESTIONS LIST ---------------------- */}
      {questions.map((q, index) => {
        const isCorrect = q.is_correct;
        const questionNumber = index + 1;

        return (
          <div
            key={q.question_id}
            className={`card mb-3 border-0 solution-card ${isCorrect ? "solution-card-correct" : "solution-card-incorrect"
              }`}
          >
            <div
              className={`card-header d-flex justify-content-between align-items-center border-0 ${isCorrect ? "solution-header-correct" : "solution-header-incorrect"
                }`}
            >
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <p className="mb-0 fw-bold">Question {questionNumber}</p>
                <span className="fw-semibold">{badge(isCorrect ? "correct" : "incorrect").text}</span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-1"
                  onClick={() => openSaveModal(q.question_id)}
                >
                  {/* Icon changes dynamically */}
                  {savedCategories[q.question_id] ? (
                    <BsBookmarkFill style={{ fontSize: "18px", color: "black" }} />
                  ) : (
                    <BsBookmark style={{ fontSize: "18px", color: "black" }} />
                  )}

                  {/* Text changes dynamically */}
                  <span style={{ fontWeight: savedCategories[q.question_id] ? "600" : "400" }}>
                    {savedCategories[q.question_id]
                      ? `Saved (${savedCategories[q.question_id]})`
                      : "Save"}
                  </span>
                </button>


                <span
                  className="three-dots"
                  style={{ cursor: "pointer", fontSize: "22px", userSelect: "none" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.target.getBoundingClientRect();
                    setPopupPos({
                      top: rect.bottom + 8,
                      left: rect.right - 180,
                    });
                    setOpenMenuFor(q.question_id);
                  }}
                >
                  ⋯
                </span>
              </div>
            </div>

            {openMenuFor === q.question_id && (
              <div
                className="popup-menu shadow-sm"
                style={{
                  position: "fixed",
                  top: popupPos.top,
                  left: popupPos.left,
                  width: "12rem",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "0px 6px 6px 6px",
                  zIndex: 99999,
                }}
              >
                <p className="mb-1 fs-6 px-2 py-1">Found some error?</p>
                <div
                  className="d-flex align-items-center report-line py-2 px-2"
                  style={{ cursor: "pointer", width: "100%", backgroundColor: "#d2d2d2ff" }}
                >
                  <span className="fs-6">Report this question</span>
                </div>
              </div>
            )}

            <div className="card-body">
              <p className="mb-3">{q.question}</p>

              <div className="mb-3 option-list">
                {Object.entries(q.options).map(([key, value]) => {
                  const isAns = key === q.correct_answer;
                  return (
                    <div
                      key={key}
                      className={`option-row ${isAns ? "option-correct" : ""}`}
                    >
                      <span className="me-2 fw-semibold">{key}.</span>
                      <span className="fw-semibold">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="fw-semibold mb-1">Correct answer</div>
              <p className="mb-3">{q.correct_answer}</p>

              <div className="fw-semibold mb-1">Explanation</div>
              <p className="mb-0">{q.explanation}</p>
            </div>
          </div>
        );
      })}

      {/* go to top button */}
      <div className="text-center mb-4">
        <button className="btn btn-dark px-5 back-top-btn py-2" onClick={scrollToTop}>
          Go to top
        </button>
      </div>

      {/* --------------------------- SAVE MODAL --------------------------- */}
      {showModal && (
        <div className="save-modal-overlay top-modal" onClick={closeSaveModal}>
          <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">
                Save to a list, Question {activeQuestion}
              </h6>
              <button className="btn p-0 border-0 bg-transparent fs-4" onClick={closeSaveModal}>
                &times;
              </button>
            </div>

            <div className="d-flex flex-column gap-2">
              {categoryList.map((cat) => (
                <div key={cat} className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="form-control"
                    style={{
                      cursor: "pointer",
                      borderColor: selectedCategory === cat ? "#000" : "#ccc",
                    }}
                  />

                  {cat !== "Default" && (
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => handleDeleteList(cat)}
                      style={{ height: "39px" }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center my-3 text-muted">or</div>

            <input
              type="text"
              className="form-control"
              placeholder="Create"
              readOnly
              onClick={openCreateModal}
            />

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="btn btn-light" onClick={closeSaveModal}>
                Cancel
              </button>
              <button className="btn btn-dark" onClick={handleSaveCategory}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------ CREATE LIST MODAL ------------------------ */}
      {showCreateModal && (
        <div className="save-modal-overlay top-modal" onClick={closeCreateModal}>
          <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold mb-0">Create List</h5>
              <button className="btn p-0 border-0 bg-transparent fs-4" onClick={closeCreateModal}>
                &times;
              </button>
            </div>

            <label className="fw-semibold mb-2">List Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Create List Name..."
              value={newListName}
              onChange={(e) => {
                setNewListName(e.target.value);
                setCreateError("");
              }}
            />

            {createError && (
              <div className="text-danger small mt-2">{createError}</div>
            )}

            <div className="text-end mt-4">
              <button className="btn btn-dark" onClick={handleCreateList}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultSolution;
