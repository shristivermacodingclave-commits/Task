import React, { useMemo, useState } from "react";
import "./ResultDetail.css";
import { useLocation } from "react-router-dom";

const questions = [
  {
    id: 1,
    status: "correct",
    question: "A pilot filing a flight plan should indicate whether the flight involves navigation by GNSS. Why?",
    options: ["Yes", "No"],
    correct: "Yes",
    explanation:
      "Because GNSS has no continuity of service and prediction of availability is needed on the intended route.",
  },
  {
    id: 2,
    status: "incorrect",
    question: "The Earth rotates from:",
    options: ["East to west", "West to east"],
    correct: "West to east",
    explanation: "The Earth rotates west to east, making celestial bodies appear to move east to west.",
  },
  {
    id: 3,
    status: "correct",
    question: "Why is variation different across the globe?",
    options: ["The magnetic and true poles are not in the same place", "The Earth’s axis is tilted"],
    correct: "The magnetic and true poles are not in the same place",
    explanation:
      "Variation exists because magnetic and geographic poles differ in position, and lines of magnetic meridian are not parallel to true meridians.",
  },
  {
    id: 4,
    status: "incorrect",
    question: "How is variation determined on a chart?",
    options: [
      "By comparing true north and magnetic north",
      "By comparing true meridian and magnetic meridian through the point",
    ],
    correct: "By comparing true meridian and magnetic meridian through the point",
    explanation:
      "Chart variation is measured as the angle between true and magnetic meridians at a point; it changes with position and time.",
  },
  {
    id: 5,
    status: "correct",
    question: "What is agonic line?",
    options: [
      "A line of zero variation",
      "A line joining places of equal deviation",
    ],
    correct: "A line of zero variation",
    explanation:
      "An agonic line connects points with zero variation, where true and magnetic north coincide.",
  },
];

const badge = (status) =>
  status === "correct"
    ? { text: "Correct", className: "badge bg-success-subtle text-success fw-semibold" }
    : { text: "Incorrect", className: "badge bg-danger-subtle text-danger fw-semibold" };

function ResultSolution() {
  const { state } = useLocation();
  const subject = state?.subject || "Air Navigation";
  const topic = state?.topic || "The Earth & Direction, Latitude and Longitude";
  const scorePercent = Number.isFinite(state?.scorePercent) ? state.scorePercent : 14;
  const correct = Number.isFinite(state?.correct) ? state.correct : 5;
  const incorrect = Number.isFinite(state?.incorrect) ? state.incorrect : 3;
  const unanswered = Number.isFinite(state?.unanswered) ? state.unanswered : 27;
  const resultLabel = state?.resultLabel || (scorePercent >= 70 ? "Pass" : "Fail");

  const [showModal, setShowModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("medium");
  const [savedCategories, setSavedCategories] = useState({});

  const openSaveModal = (qid) => {
    setActiveQuestion(qid);
    setSelectedCategory(savedCategories[qid] || "medium");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveQuestion(null);
  };

  const handleSaveCategory = () => {
    if (!activeQuestion) return;
    setSavedCategories((prev) => ({ ...prev, [activeQuestion]: selectedCategory }));
    closeModal();
  };

  return (
    <div className="container-fluid result-detail-page">
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
                <p className={`fw-bold mb-1 ${resultLabel.toLowerCase() === "fail" ? "text-danger" : "text-success"}`} style={{ fontSize: "1.6rem" }}>
                  {resultLabel}
                </p>
                <p className="text-muted small mb-0">Result</p>
              </div>
              <div className="col-6 col-md-3">
                <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>{scorePercent}%</p>
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

      {questions.map((q) => {
        const isCorrect = q.status === "correct";
        return (
          <div
            key={q.id}
            className={`card mb-3 border-0 solution-card ${isCorrect ? "solution-card-correct" : "solution-card-incorrect"}`}
          >
            <div className={`card-header d-flex justify-content-between align-items-center border-0 ${isCorrect ? "solution-header-correct" : "solution-header-incorrect"}`}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <p className="mb-0 fw-bold">Question {q.id}</p>
                <span className="fw-semibold">{badge(q.status).text}</span>
              </div>
              <button
                type="button"
                className="btn btn-link text-decoration-none text-muted p-0"
                onClick={() => openSaveModal(q.id)}
              >
                {savedCategories[q.id] ? `Saved (${savedCategories[q.id]})` : "save"}
              </button>
            </div>
            <div className="card-body">
              <p className="mb-3">{q.question}</p>
              <div className="mb-3 option-list">
                {q.options.map((o, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isAns = o === q.correct;
                  return (
                    <div
                      key={idx}
                      className={`option-row ${isAns ? "option-correct" : ""}`}
                    >
                      <span className="me-2 fw-semibold">{letter}.</span>
                      <span className="fw-semibold">{o}</span>
                    </div>
                  );
                })}
              </div>
              <div className="fw-semibold mb-1">Correct answer</div>
              <p className="mb-3">C. {q.correct}</p>

              <div className="fw-semibold mb-1">Explanation</div>
              <p className="mb-0">{q.explanation}</p>
            </div>
          </div>
        );
      })}

      <div className="text-center my-4">
        <button className="btn btn-dark px-4">Take another test</button>
      </div>

      {showModal && (
        <div className="save-modal-overlay" onClick={closeModal}>
          <div className="save-modal" onClick={(e) => e.stopPropagation()}>
            <h6 className="fw-semibold mb-3">Save question</h6>
            <p className="text-muted small mb-3">Choose difficulty category</p>
            <div className="d-flex flex-column gap-2">
              {["easy", "medium", "hard"].map((cat) => (
                <label key={cat} className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="save-category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span className="text-capitalize">{cat}</span>
                </label>
              ))}
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="btn btn-light" onClick={closeModal}>Cancel</button>
              <button className="btn btn-dark" onClick={handleSaveCategory}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultSolution;
