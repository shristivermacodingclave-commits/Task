import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PlanEtest.css"; // same UI styling
import axios from "axios";

const DEFAULT_SUBJECT = "Practice Test";
const DEFAULT_TOPIC = "Practice Test";
const DEFAULT_TYPE = "Practice Test";

const STATUS_TAGS = [
    { key: "attempted", label: "Green for attempted" },
    { key: "unattempted", label: "Yellow for unattempted" },
    { key: "unvisited", label: "White for unvisited questions" },
];

export default function PlanPracticeTest() {
    const navigate = useNavigate();
    const location = useLocation();
    const { miniSubjectId } = useParams(); // ⭐ dynamic mini subject ID

    const [isConfirmed, setIsConfirmed] = useState(false);

    // Get logged-in userId
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = storedUser.id;

    // fallback if page refresh
    const {
        subject = DEFAULT_SUBJECT,
        topic = DEFAULT_TOPIC,
        planPath = null,
    } = location.state || {};

    const instructions = useMemo(
        () => [
            "The time remaining to complete the exam is displayed on your screen...",
            "The Questions palette at the right of the screen has one of the following statuses...",
            <>To answer a question, click the number on the question palette.</>,
            <>To read the entire paper, click on the <strong>All Questions</strong> button.</>,
            <>Change your responses by selecting a question then clicking <strong>Confirm</strong>.</>,
            <>Click <strong>Reset</strong> to clear your selected response.</>,
            <>Use <strong>Next</strong> and <strong>Previous</strong> buttons to navigate.</>,
        ],
        []
    );

    const handleGoToPlan = () => {
        if (planPath) navigate(planPath);
        else navigate("/dashboard/my-courses");
    };

    // ⭐ PRACTICE TEST START API — REAL ENDPOINT
    const handleStartPractice = async () => {
        if (!isConfirmed) return;

        try {
            const res = await axios.post(
                "https://development.pilotexaminations.com/api/practice/start",
                {
                    user_id: userId,
                    mini_subject_id: miniSubjectId, // ⭐ correct field according to API
                }
            );

            if (res.data.error) {
                alert("Failed to start practice test");
                return;
            }

            const testId = res.data.test_id;

            // CLEAR ALL OLD TEST DATA
            localStorage.removeItem("questions");
            localStorage.removeItem("attempt_id");
            localStorage.removeItem("topic_id");
            localStorage.removeItem("test_type");

            localStorage.removeItem("mock_questions");
            localStorage.removeItem("mock_attempt_id");

            // Important: Remove old practice data BEFORE starting a new one
            localStorage.removeItem("practice_questions");
            localStorage.removeItem("practice_test_id");
            localStorage.removeItem("mini_subject_id");


            // Save temporary data
            localStorage.setItem("practice_test_id", testId);
            localStorage.setItem("practice_questions", JSON.stringify(res.data.questions));
            localStorage.setItem("mini_subject_id", miniSubjectId);


            //  Navigate to practice attempt page
            navigate(
                `/test_question?quest_no=1&test_id=${testId}`, // test_id (NOT attempt_id)
                {
                    replace:true,
                    state: {
                        testId,
                        questions: res.data.questions,
                        miniSubjectId,
                        subject,
                        topic,
                        planPath,
                        type: "practice-test",
                        userId,
                    },
                }
            );

        } catch (err) {
            console.error("Practice test start failed:", err);
            alert("Something went wrong while starting the practice test");
        }
    };

    return (
        <div className="view-details">
            <div className="view-details__card">

                <div className="view-details__card-header">
                    <div>
                        <h2>{topic}</h2>
                        <p className="view-details__subtitle">General Instructions</p>
                    </div>

                    <button
                        type="button"
                        className="view-details__tag"
                        onClick={handleGoToPlan}
                    >
                        Practice Test
                    </button>
                </div>

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

                {/* Confirmation */}
                <label className="view-details__confirm">
                    <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                    />
                    <span>I have reviewed all instructions and I’m ready.</span>
                </label>

                {/* Start Button */}
                <button
                    type="button"
                    className="view-details__start"
                    disabled={!isConfirmed}
                    onClick={handleStartPractice}
                >
                    Start Practice Test→
                </button>
            </div>
        </div>
    );
}
