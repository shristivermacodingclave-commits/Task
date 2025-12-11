import React, { useState, useEffect } from "react";
import "./ResultSolution.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

function PracticeResultSolution() {
  const { state } = useLocation();

  const testId = state?.testId;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);

  /* ---------------- SAVE CATEGORY STATES ---------------- */
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [categoryList, setCategoryList] = useState([
    "Default",
    "Hard",
    "Medium",
    "Easy",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newListName, setNewListName] = useState("");
  const [createError, setCreateError] = useState("");
  const [savedCategories, setSavedCategories] = useState({});

  /* ---------------- REPORT STATES ---------------- */
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportQid, setReportQid] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportText, setReportText] = useState("");

  /* ---------------- POPUP ---------------- */
  const [openMenuFor, setOpenMenuFor] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const closePopup = () => setOpenMenuFor(null);
    window.addEventListener("click", closePopup);
    return () => window.removeEventListener("click", closePopup);
  }, []);

  /* ---------------- FETCH PRACTICE SOLUTION API ---------------- */
  useEffect(() => {
    if (!testId || !userId) return;

    const fetchSolution = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/practice-test/solution",
          { user_id: userId, test_id: testId }
        );

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

  /* ---------------- FETCH SAVED QUESTIONS STATUS ---------------- */
  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/get-save-list",
          { user_id: userId }
        );

        if (!res.data.error) {
          const map = {};
          res.data.results.forEach((item) => {
            map[item.question_id] = item.list_name;
          });
          setSavedCategories(map);
        }
      } catch (err) {
        console.log("Error fetching saved list:", err);
      }
    };

    fetchSavedList();
  }, [userId]);

  if (loading || !summary) {
    return (
      <div className="container-fluid text-center mt-4">
        <h5>Loading Practice Test Solution...</h5>
      </div>
    );
  }

  /* ---------------- SAVE LOGIC ---------------- */
  const openSaveModal = (qid) => {
    setActiveQuestion(qid);
    setSelectedCategory(savedCategories[qid] || "");
    setShowModal(true);
  };

  const closeSaveModal = () => {
    setShowModal(false);
    setActiveQuestion(null);
  };

  const handleSaveCategory = async () => {
    if (!activeQuestion || !selectedCategory) return;

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/list/save",
        {
          user_id: userId,
          question_id: activeQuestion,
          list_name: selectedCategory,
        }
      );

      if (!res.data.error) {
        setSavedCategories((prev) => ({
          ...prev,
          [activeQuestion]: selectedCategory,
        }));
        closeSaveModal();
      }
    } catch (err) {
      alert("Failed to save! Try again.");
    }
  };

  const handleUnsave = async (qid) => {
    const listName = savedCategories[qid];
    if (!listName) return;

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/list/unsave",
        {
          user_id: userId,
          list_name: listName,
          question_id: qid,
        }
      );

      if (!res.data.error) {
        setSavedCategories((prev) => {
          const updated = { ...prev };
          delete updated[qid];
          return updated;
        });
      }
    } catch (err) {
      console.error("Unsave API error:", err);
    }
  };

  /* ---------------- CREATE NEW CATEGORY LIST ---------------- */
  const handleCreateList = () => {
    const name = newListName.trim();

    if (!name) {
      setCreateError("Name cannot be empty");
      return;
    }
    if (
      categoryList.some((c) => c.toLowerCase() === name.toLowerCase())
    ) {
      setCreateError("List already exists");
      return;
    }

    setCategoryList([...categoryList, name]);
    setSelectedCategory(name);
    setShowCreateModal(false);
  };

  /* ---------------- REPORT FUNCTIONS ---------------- */
  const openReportModal = (qid) => {
    setReportQid(qid);
    setShowReportModal(true);
    setOpenMenuFor(null);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportReason("");
    setReportText("");
  };

  const handleReportSubmit = async () => {
    if (!reportReason || !reportText.trim()) {
      alert("Please select a reason & write message.");
      return;
    }

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/report-question",
        {
          user_id: userId,
          question_id: reportQid,
          reason: reportReason,
          explain: reportText,
        }
      );

      if (!res.data.error) {
        alert("Report submitted!");
        closeReportModal();
      } else {
        alert("Failed to submit report.");
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  /* ---------------- GO TO TOP ---------------- */
  const scrollToTop = () => {
    const container = document.querySelector(".dashboard-main");
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid result-detail-page">

      {/* SUMMARY CARD */}
      <div className="card shadow-sm border-0 mb-4 result-card">
        <div className="card-body px-0 pt-0 pb-0">
          <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">

            <div>
              <p>Practice Test</p>

              <h3 className="mb-0">Test ID: {summary.test_id}</h3>
            </div>

          </div>

          <div className="result-bottom px-4 py-4">
            <div className="row g-4 text-center summary-row">

              <div className="col-6 col-md-3">
                <p
                  className={`fw-bold mb-1 ${
                    summary.result === "Fail"
                      ? "text-danger"
                      : "text-success"
                  }`}
                  style={{ fontSize: "1.6rem" }}
                >
                  {summary.result}
                </p>
                <p className="text-muted small mb-0">Result</p>
              </div>

              <div className="col-6 col-md-3">
                <p className="text-danger fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
                  {summary.score_percent}%
                </p>
                <p className="text-muted small mb-0">Score</p>
              </div>

              <div className="col-4 col-md-2">
                <p className="fw-bold text-success mb-1">{summary.correct}</p>
                <p className="text-muted small mb-0">Correct</p>
              </div>

              <div className="col-4 col-md-2">
                <p className="fw-bold text-danger mb-1">{summary.incorrect}</p>
                <p className="text-muted small mb-0">Incorrect</p>
              </div>

              <div className="col-4 col-md-2">
                <p className="fw-bold text-secondary mb-1">{summary.unanswered}</p>
                <p className="text-muted small mb-0">Unanswered</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* QUESTIONS LIST */}
      {questions.map((q, index) => {
        let status = q.answer_status; // Correct / Incorrect / Unanswered
        const correctAns = q.correct_answer;
        const userAns = q.user_answer;

        const headerClass =
          status === "Correct"
            ? "solution-header-correct"
            : status === "Incorrect"
            ? "solution-header-incorrect"
            : "solution-header-unanswered";

        return (
          <div key={index} className="card mb-3 border-1 solution-card">
            <div className={`card-header d-flex justify-content-between ${headerClass}`}>
              <div className="d-flex align-items-center gap-2">
                <p className="mb-0 fw-bold">Question {q.sr_no}</p>

                <span
                  className={`badge fw-semibold ${
                    status === "Correct"
                      ? "bg-success-subtle text-success"
                      : status === "Incorrect"
                      ? "bg-danger-subtle text-danger"
                      : "bg-secondary-subtle text-secondary"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* SAVE + 3 DOTS */}
              <div className="d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-1"
                  onClick={() => {
                    if (savedCategories[q.sr_no]) {
                      handleUnsave(q.sr_no);
                    } else {
                      openSaveModal(q.sr_no);
                    }
                  }}
                >
                  {savedCategories[q.sr_no] ? (
                    <BsBookmarkFill style={{ fontSize: "18px", color: "black" }} />
                  ) : (
                    <BsBookmark style={{ fontSize: "18px", color: "black" }} />
                  )}
                  <span>{savedCategories[q.sr_no] ? "Unsave" : "Save"}</span>
                </button>

                <span
                  className="three-dots"
                  style={{ cursor: "pointer", fontSize: "22px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (openMenuFor === q.sr_no) {
                      setOpenMenuFor(null);
                      return;
                    }

                    const rect = e.target.getBoundingClientRect();
                    setPopupPos({
                      top: rect.bottom + 8,
                      left: rect.right - 180,
                    });

                    setOpenMenuFor(q.sr_no);
                  }}
                >
                  ⋯
                </span>
              </div>
            </div>

            {/* POPUP FOR REPORT */}
            {openMenuFor === q.sr_no && (
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
                  style={{ cursor: "pointer", backgroundColor: "#e3e3e3" }}
                  onClick={() => openReportModal(q.sr_no)}
                >
                  <span className="fs-6">Report this question</span>
                </div>
              </div>
            )}

            {/* OPTIONS */}
            <div className="card-body">
              <p className="mb-3">{q.question}</p>

              <div className="mb-3 option-list">
                {Object.entries(q.options).map(([key, value]) => {
                  let optionClass = "";
                  const isCorrect = key === correctAns;
                  const isUser = key === userAns;

                  if (status === "Correct" && isCorrect)
                    optionClass = "option-correct";

                  else if (status === "Incorrect") {
                    if (isUser) optionClass = "option-wrong";
                    if (isCorrect) optionClass = "option-correct";
                  }

                  else if (status === "Unanswered" && isCorrect)
                    optionClass = "option-correct";

                  return (
                    <div key={key} className={`option-row ${optionClass}`}>
                      <span className="fw-semibold me-2">{key}.</span>
                      <span>{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="fw-semibold mb-1">Correct answer</div>
              <p>{correctAns}</p>

              <div className="fw-semibold mb-1">Explanation</div>
              <p>{q.explanation || "No explanation provided."}</p>
            </div>
          </div>
        );
      })}

      {/* GO TO TOP */}
      <div className="text-center mb-4">
        <button className="btn btn-dark px-5 back-top-btn py-2" onClick={scrollToTop}>
          Go to top
        </button>
      </div>

      {/* --------------- SAVE MODAL --------------- */}
      {showModal && (
        <div className="save-modal-overlay" onClick={closeSaveModal}>
          <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
            <h6 className="fw-semibold mb-3">Save to a list</h6>

            {categoryList.map((cat) => (
              <div key={cat} className="d-flex align-items-center gap-2 mb-2">
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
              </div>
            ))}

            <div className="text-center text-muted my-2">or</div>

            <input
              type="text"
              className="form-control"
              placeholder="Create new list"
              readOnly
              onClick={() => setShowCreateModal(true)}
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

      {/* --------------- CREATE LIST MODAL --------------- */}
      {showCreateModal && (
        <div className="save-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
            <h5 className="fw-semibold mb-3">Create List</h5>

            <input
              type="text"
              className="form-control"
              placeholder="Enter list name"
              value={newListName}
              onChange={(e) => {
                setNewListName(e.target.value);
                setCreateError("");
              }}
            />

            {createError && (
              <p className="text-danger small mt-2">{createError}</p>
            )}

            <div className="text-end mt-3">
              <button className="btn btn-dark" onClick={handleCreateList}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------- REPORT MODAL --------------- */}
      {showReportModal && (
        <div className="save-modal-overlay" onClick={closeReportModal}>
          <div
            className="save-modal-box"
            style={{ maxWidth: "650px", width: "95%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between mb-3">
              <h5 className="fw-semibold">Report this question</h5>
              <button
                className="btn p-0 border-0 bg-transparent fs-4"
                onClick={closeReportModal}
              >
                ×
              </button>
            </div>

            <p className="fw-semibold mb-1">Reason</p>

            {["Question phrased incorrectly", "Wrong Options", "Wrong Solution"].map(
              (reason) => (
                <label key={reason} className="d-flex gap-2 mb-2">
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  {reason}
                </label>
              )
            )}

            <label className="fw-semibold mt-3">Explain your reason</label>
            <textarea
              rows="4"
              className="form-control"
              placeholder="Write your explanation..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-dark w-100" onClick={handleReportSubmit}>
                Submit Report
              </button>

              <button className="btn btn-light border w-100" onClick={closeReportModal}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default PracticeResultSolution;
