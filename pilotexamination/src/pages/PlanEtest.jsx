
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

//   // ⭐ SIMPLE: Get logged-in userId from localStorage
//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = storedUser.id; //

//   // fallback if page refreshed
//   const {
//     subject = DEFAULT_SUBJECT,
//     topic = DEFAULT_TOPIC,
//     testType = DEFAULT_TYPE,
//     topicId: stateTopicId,
//     planPath = null,
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

//   // ⭐ Start Test API with correct userId from localStorage
//   const handleStartTest = async () => {
//     if (!isConfirmed) return;

//     try {
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/start-test",
//         {
//           user_id: userId,      // ⭐ dynamic user ID
//           topic_id: finalTopicId,
//         }
//       );

//       if (!res.data || res.data.error) {
//         alert("Failed to start test");
//         return;
//       }

//       const attempt_id = res.data.attempt_id;

//       // Store for safety
//       localStorage.setItem("attempt_id", attempt_id);
//       localStorage.setItem("topic_id", finalTopicId);
//       localStorage.setItem("questions", JSON.stringify(res.data.questions));

//       // Navigate to test page
//       navigate(
//         `/test_question?quest_no=1&attempt_id=${attempt_id}`,
//         {
//           state: {
//             subject,
//             topic,
//             topicId: finalTopicId,
//             planPath,
//             questions: res.data.questions,
//             attemptId: attempt_id,
//             userId, //  pass dynamic userId
//           },
//         }
//       );

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

  // ⭐ User ID (dynamic)
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser.id;

  // ⭐ Extract values sent from navigation
  const {
    subject = DEFAULT_SUBJECT,
    topic = DEFAULT_TOPIC,

    type = "e-test",                // 🔥 MAIN SWITCH (etest / practice-test)
    testType = DEFAULT_TYPE,        // Only for UI button label

    topicId: stateTopicId,
    miniSubjectId = 1,              // Default until DB gives real value

    planPath = null,
  } = location.state || {};

  // ⭐ Final ID for e-test
  const finalTopicId = stateTopicId || planId;

  // ⭐ Instructions list
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

  // ⭐ UNIVERSAL START TEST HANDLER
  const handleStartTest = async () => {
    if (!isConfirmed) return;

    try {
      let url = "";
      let payload = { user_id: userId };
      let responseKey = "";

      if (type === "practice-test") {
        // PRACTICE TEST API
        url = "https://development.pilotexaminations.com/api/practice/start";
        payload.mini_subject_id = miniSubjectId;
        responseKey = "test_id";
      } else {
        // E-TEST API
        url = "https://development.pilotexaminations.com/api/start-test";
        payload.topic_id = finalTopicId;
        responseKey = "attempt_id";
      }

      const res = await axios.post(url, payload);

      if (!res.data || res.data.error) {
        alert(res.data.message || "Failed to start test");
        return;
      }

      const attemptId = res.data[responseKey];

      // Save values
      localStorage.setItem("attempt_id", attemptId);
      localStorage.setItem("questions", JSON.stringify(res.data.questions));
      localStorage.setItem("test_type", type);

      if (type === "practice-test") {
        localStorage.setItem("practice_id", miniSubjectId);
      } else {
        localStorage.setItem("topic_id", finalTopicId);
      }

      // Navigate to test screen
      navigate(`/test_question?quest_no=1&attempt_id=${attemptId}`, {
        state: {
          subject,
          topic,
          topicId: finalTopicId,
          practiceId: miniSubjectId,
          planPath,
          questions: res.data.questions,
          attemptId,
          userId,
          type, // 🔥 needed for question page
        },
      });

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
          Start {testType} →
        </button>
      </div>
    </div>
  );
}

