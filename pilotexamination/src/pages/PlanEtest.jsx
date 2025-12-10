
// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import "./PlanEtest.css";
// import axios from "axios";

// const DEFAULT_SUBJECT = "Air Regulation";
// const DEFAULT_TOPIC = "International Organisations and Conventions";
// const DEFAULT_TYPE = "E-Test";

// const STATUS_TAGS = [
//   { key: "attempted", label: "Green for attempted" },
//   { key: "unattempted", label: "Yellow for unattempted" },
//   { key: "unvisited", label: "White for unvisited questions" },
// ];

// export default function PlanEtest() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { planId } = useParams();

//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // fallback if page refreshed
//   const {
//     subject = DEFAULT_SUBJECT,
//     topic = DEFAULT_TOPIC,
//     testType = DEFAULT_TYPE,
//     topicId: stateTopicId,
//     planPath = null,
//     userId = 10,
//   } = location.state || {};

//   const finalTopicId = stateTopicId || planId;

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

//   const handleGoToPlan = () => {
//     if (planPath) navigate(planPath);
//     else navigate("/dashboard/my-courses");
//   };

//   // ⭐ Correct: Start Test only ONCE here
//   const handleStartTest = async () => {
//     if (!isConfirmed) return;

//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/start-test",
//         {
//           user_id: userId,
//           topic_id: finalTopicId,
//         }
//       );

//       if (!res.data || res.data.error) {
//         alert("Failed to start test");
//         return;
//       }

//       const attempt_id = res.data.attempt_id;

//       // Store attempt_id for refresh safety (optional)
//       localStorage.setItem("attempt_id", attempt_id);
//       localStorage.setItem("topic_id", finalTopicId);
//       localStorage.setItem("questions", JSON.stringify(res.data.questions));


//       // Navigate with URL attempt_id + state data
//    navigate(`/test_question?quest_no=1&attempt_id=${attempt_id}`, 
//  {
//         state: {
//           subject,
//           topic,
//           topicId: finalTopicId,
//           planPath,
//           questions: res.data.questions, // pass initial question list
//           attemptId: attempt_id,
//           userId,
//         },
//       });

//     } catch (err) {
//       console.error("start-test failed:", err);
//       alert("Something went wrong starting test");
//     }
//   };

//   return (
//     <div className="view-details">
//       <div className="view-details__card">
//         <div className="view-details__card-header">
//           <div>
//             <h2>{topic}</h2>
//             <p className="view-details__subtitle">General Instructions</p>
//           </div>
//           <button
//             type="button"
//             className="view-details__tag"
//             onClick={handleGoToPlan}
//           >
//             {testType}
//           </button>
//         </div>

//         <ol className="view-details__instructions">
//           {instructions.map((instruction, index) => (
//             <li key={index}>
//               <p>{instruction}</p>
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

//         <label className="view-details__confirm">
//           <input
//             type="checkbox"
//             checked={isConfirmed}
//             onChange={(e) => setIsConfirmed(e.target.checked)}
//           />
//           <span>I have reviewed all instructions and I’m ready.</span>
//         </label>

//         <button
//           type="button"
//           className="view-details__start"
//           disabled={!isConfirmed}
//           onClick={handleStartTest}
//         >
//           Start E-Test →
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PlanEtest.css";
import axios from "axios";

const DEFAULT_SUBJECT = "Air Regulation";
const DEFAULT_TOPIC = "International Organisations and Conventions";
const DEFAULT_TYPE = "E-Test";

const STATUS_TAGS = [
  { key: "attempted", label: "Green for attempted" },
  { key: "unattempted", label: "Yellow for unattempted" },
  { key: "unvisited", label: "White for unvisited questions" },
];

export default function PlanEtest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = useParams();

  const [isConfirmed, setIsConfirmed] = useState(false);

  // ⭐ SIMPLE: Get logged-in userId from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser.id; //

  // fallback if page refreshed
  const {
    subject = DEFAULT_SUBJECT,
    topic = DEFAULT_TOPIC,
    testType = DEFAULT_TYPE,
    topicId: stateTopicId,
    planPath = null,
  } = location.state || {};

  const finalTopicId = stateTopicId || planId;

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

  // ⭐ Start Test API with correct userId from localStorage
  const handleStartTest = async () => {
    if (!isConfirmed) return;

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/start-test",
        {
          user_id: userId,      // dynamic user ID
          topic_id: finalTopicId,
        }
      );

      if (!res.data || res.data.error) {
        alert("Failed to start test");
        return;
      }

      const attempt_id = res.data.attempt_id;

      // CLEAR ALL OLD TEST DATA FIRST
      localStorage.removeItem("questions");
      localStorage.removeItem("attempt_id");
      localStorage.removeItem("topic_id");
      localStorage.removeItem("test_type");

      localStorage.removeItem("practice_questions");
      localStorage.removeItem("practice_test_id");

      localStorage.removeItem("mock_questions");
      localStorage.removeItem("mock_attempt_id");



      // Store for safety
      localStorage.setItem("test_type", "e-test");
      localStorage.setItem("attempt_id", attempt_id);
      localStorage.setItem("topic_id", finalTopicId);
      localStorage.setItem("questions", JSON.stringify(res.data.questions));

      // Navigate to test page
      navigate(
        `/test_question?quest_no=1&attempt_id=${attempt_id}`,
        {
          state: {
            subject,
            topic,
            topicId: finalTopicId,
            planPath,
            questions: res.data.questions,
            attemptId: attempt_id,
            userId, //  pass dynamic userId
          },
        }
      );

    } catch (err) {
      console.error("start-test failed:", err);
      alert("Something went wrong starting test");
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
            {testType}
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

        <label className="view-details__confirm">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <span>I have reviewed all instructions and I’m ready.</span>
        </label>

        <button
          type="button"
          className="view-details__start"
          disabled={!isConfirmed}
          onClick={handleStartTest}
        >
          Start E-Test →
        </button>
      </div>
    </div>
  );
}




