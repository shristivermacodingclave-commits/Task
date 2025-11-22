// import Button from "../component/Button";
// import { NavLink } from "react-router-dom";
// import './SaveList.css';

// function SaveList() {
//   return (
//    <div className="container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">SaveList</h3>
//       <hr />
//       <div className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card" style={{padding:"2.2rem 0rem 2.2em 0rem"}}>
//         <NavLink to="savelist" className="results-link fs-5 " style={{fontWeight:"400"}}>
//           All
//         </NavLink>
//         <NavLink to="savelist" className="results-link "  style={{ top:"-8px"}} >
//           <span> No List</span>
//         </NavLink>

//       </div>

//       {/* search bar */}

//        <div className="col-md-12 pt-3 pb-3 px-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//          <div className="col-md-8 py-1">
//           <input
//           type="text"
//           placeholder="Search"
//           className="form-control mt-1 p-2 report-input"
//           style={{border:"1px solid black"}}
//         />
//          </div>
//           <div className="col-md-4 py-1 pe-4 ">
//               <Button name="Search" className="btn-dark form-control" />
//           </div>
//       </div>


//       <div className="col-md-12 pt-3 pb-3 text-center rounded gap-4 bookmark-card">
//          <h3 className="text-center">No Bookmark Questions</h3>
//       </div>
//     </div>
//   );
// }

// export default SaveList;







// import Button from "../component/Button";
// import { NavLink } from "react-router-dom";
// import "./SaveList.css";

// function SaveList() {

//   // 🔥 STATIC SAVED QUESTIONS (edit or empty this array)
//   const savedQuestions = [
//     {
//       id: 1,
//       category: "Hard",
//       question: "On the earth's ellipsoid one degree of latitude near the equator is:",
//       options: [
//         "A. More than 60 NM but less than 61 NM",
//         "B. More than 60 NM",
//         "C. Less than 60 NM",
//       ],
//       correct: "C. Less than 60 NM",
//       explanation:
//         "The earth is an oblate spheroid. Owing to its shape, the calculations of a Minute of Latitude at the Equator and at the Poles is not constant.",
//     },
//   ];

//   // To test empty case → use:
//   // const savedQuestions = [];

//   return (
//     <div className="container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">SaveList</h3>
//       <hr />

//       {/* -------- TOP TABS -------- */}
//       <div
//         className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card"
//         style={{ padding: "2.2rem 0rem 2.2em 0rem" }}
//       >
//         <NavLink to="savelist" className="results-link fs-5" style={{ fontWeight: "400" }}>
//           All
//         </NavLink>
//         <NavLink to="savelist" className="results-link" style={{ top: "-8px" }}>
//           <span>No List</span>
//         </NavLink>
//       </div>

//       {/* -------- SEARCH BAR -------- */}
//       <div className="col-md-12 pt-3 pb-3 px-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <div className="col-md-8 py-1">
//           <input
//             type="text"
//             placeholder="Search"
//             className="form-control mt-1 p-2 report-input"
//             style={{ border: "1px solid black" }}
//           />
//         </div>
//         <div className="col-md-4 py-1 pe-4">
//           <Button name="Search" className="btn-dark form-control" />
//         </div>
//       </div>

//       {/* -------- CONDITIONAL RENDERING -------- */}
//       {savedQuestions.length > 0 ? (
//         <>
//           {savedQuestions.map((item) => (
//             <div
//               key={item.id}
//               className="col-md-12 pt-4 pb-4 px-4 mb-4 rounded bookmark-card"
//             >
//               {/* Unsave button */}
//               <div className="d-flex justify-content-end mb-2">
//                 <i className="bi bi-bookmark-fill me-1"></i> Unsave
//               </div>

//               {/* Question */}
//               <h5 className="fw-semibold">{item.question}</h5>

//               {/* Options */}
//               <div className="mt-3">
//                 {item.options.map((op, idx) => (
//                   <p key={idx} className="mb-1">
//                     {op}
//                   </p>
//                 ))}
//               </div>

//               {/* Solution */}
//               <p className="fw-semibold mt-3 mb-1">Solution</p>
//               <p>{item.correct}</p>

//               {/* Explanation */}
//               <p className="fw-semibold mb-1">Explanation</p>
//               <p className="mb-0">{item.explanation}</p>
//             </div>
//           ))}
//         </>
//       ) : (
//         /* -------- NO BOOKMARK QUESTIONS -------- */
//         <div className="col-md-12 pt-3 pb-3 text-center rounded gap-4 bookmark-card">
//           <h3 className="text-center">No Bookmark Questions</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SaveList;



// import React, { useEffect, useState } from "react";
// import Button from "../component/Button";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import "./SaveList.css";

// function SaveList() {
//   const [savedQuestions, setSavedQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || "";

//   useEffect(() => {
//     const fetchSavedList = async () => {
//       try {
//         const response = await axios.post(
//           "https://development.pilotexaminations.com/api/get-save-list",
//           { user_id: userId },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.data.error) {
//           // Map API data to UI-friendly format
//           const mapped = response.data.results.map((item) => ({
//             id: item.save_id,
//             category: item.list_name || "All",
//             question: item.question,
//             options: [
//               `A. ${item.option_a}`,
//               `B. ${item.option_b}`,
//               `C. ${item.option_c}`,
//             ],
//             correct: item.correct_answer,
//             explanation: item.explanation,
//           }));

//           setSavedQuestions(mapped);
//         }
//       } catch (err) {
//         console.log("Error fetching saved list:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedList();
//   }, [userId, token]);

//   if (loading) {
//     return (
//       <div className="container-fluid text-center mt-4">
//         <h5>Loading saved questions...</h5>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">SaveList</h3>
//       <hr />

//       {/* TABS */}
//       <div
//         className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card"
//         style={{ padding: "2.2rem 0rem 2.2em 0rem" }}
//       >
//         <NavLink to="savelist" className="results-link fs-5" style={{ fontWeight: "400" }}>
//           All
//         </NavLink>
//         <NavLink to="savelist" className="results-link" style={{ top: "-8px" }}>
//           <span>No List</span>
//         </NavLink>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="col-md-12 pt-3 pb-3 px-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <div className="col-md-8 py-1">
//           <input
//             type="text"
//             placeholder="Search"
//             className="form-control mt-1 p-2 report-input"
//             style={{ border: "1px solid black" }}
//           />
//         </div>
//         <div className="col-md-4 py-1 pe-4">
//           <Button name="Search" className="btn-dark form-control" />
//         </div>
//       </div>

//       {/* DYNAMIC QUESTIONS */}
//       {savedQuestions.length > 0 ? (
//         <>
//           {savedQuestions.map((item) => (
//             <div
//               key={item.id}
//               className="col-md-12 pt-4 pb-4 px-4 mb-4 rounded bookmark-card"
//             >
//               {/* Unsave button */}
//               <div className="d-flex justify-content-end mb-2">
//                 <i className="bi bi-bookmark-fill me-1"></i> Unsave
//               </div>

//               {/* Question */}
//               <h5 className="fw-semibold">{item.question}</h5>

//               {/* Options */}
//               <div className="mt-3">
//                 {item.options.map((op, idx) => (
//                   <p key={idx} className="mb-1">
//                     {op}
//                   </p>
//                 ))}
//               </div>

//               {/* Correct Answer */}
//               <p className="fw-semibold mt-3 mb-1">Correct Answer</p>
//               <p>{item.correct}</p>

//               {/* Explanation */}
//               <p className="fw-semibold mb-1">Explanation</p>
//               <p className="mb-0">{item.explanation}</p>
//             </div>
//           ))}
//         </>
//       ) : (
//         <div className="col-md-12 pt-3 pb-3 text-center rounded gap-4 bookmark-card">
//           <h3 className="text-center">No Bookmark Questions</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SaveList;


// import React, { useEffect, useState } from "react";
// import Button from "../component/Button";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import "./SaveList.css";

// function SaveList() {
//   const [savedQuestions, setSavedQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const categories = ["All", "Hard", "Medium", "Easy"];
//   const [activeCategory, setActiveCategory] = useState("All");

//   const token = localStorage.getItem("token");
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || "";

//   useEffect(() => {
//     const fetchSavedList = async () => {
//       try {
//         const response = await axios.post(
//           "https://development.pilotexaminations.com/api/get-save-list",
//           { user_id: userId },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             }
//           }
//         );

//         if (!response.data.error) {
//           const mapped = response.data.results.map((item) => {
//             // Difficulty Mapping
//             let level = "All";
//             if (item.difficulty_level?.toLowerCase().includes("hard")) level = "Hard";
//             else if (item.difficulty_level?.toLowerCase().includes("moderate")) level = "Medium";
//             else if (item.difficulty_level?.toLowerCase().includes("easy")) level = "Easy";

//             return {
//               id: item.save_id,
//               category: level,
//               question: item.question,
//               options: [
//                 `A. ${item.option_a}`,
//                 `B. ${item.option_b}`,
//                 `C. ${item.option_c}`,
//               ],
//               correct: item.correct_answer,
//               explanation: item.explanation,
//             };
//           });

//           setSavedQuestions(mapped);
//         }
//       } catch (err) {
//         console.log("Error fetching saved list:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedList();
//   }, [userId, token]);

//   if (loading) {
//     return (
//       <div className="container-fluid text-center mt-4">
//         <h5>Loading saved questions...</h5>
//       </div>
//     );
//   }

//   // Filter questions based on active category
//   const filteredQuestions =
//     activeCategory === "All"
//       ? savedQuestions
//       : savedQuestions.filter((q) => q.category === activeCategory);

//   return (
//     <div className="container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">SaveList</h3>
//       <hr />

//       {/* CATEGORY TABS */}
//       {/* <div
//         className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card"
//         style={{ padding: "2.2rem 0rem 2.2rem 0rem" }}
//       >
//         {categories.map((cat, i) => (
//           <span
//             key={i}
//             onClick={() => setActiveCategory(cat)}
//             className="results-link fs-5"
//             style={{
//               fontWeight: activeCategory === cat ? "700" : "400",
//               cursor: "pointer",
//             }}
//           >
//             {cat}
//           </span>
//         ))}
//       </div> */}

//       <div
//   className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card"
//   style={{ padding: "2.2rem 0rem 2.2rem 0rem" }}
// >
//   {categories.map((cat, i) => (
//     <span
//       key={i}
//       onClick={() => setActiveCategory(cat)}
//       className={`results-link ${activeCategory === cat ? "active-tab" : ""}`}
//       style={{
//         cursor: "pointer",
//         position: "relative",
//         marginRight: "20px",
//         paddingBottom: "5px",
//         marginTop: "5px",
//       }}
//     >
//       {cat}
//     </span>
//   ))}
// </div>


//       {/* SEARCH BAR */}
//       <div className="col-md-12 pt-3 pb-3 px-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <div className="col-md-8 py-1">
//           <input
//             type="text"
//             placeholder="Search"
//             className="form-control mt-1 p-2 report-input"
//             style={{ border: "1px solid black" }}
//           />
//         </div>
//         <div className="col-md-4 py-1 pe-4">
//           <Button name="Search" className="btn-dark form-control" />
//         </div>
//       </div>

//       {/* QUESTIONS LIST */}
//       {filteredQuestions.length > 0 ? (
//         <>
//           {filteredQuestions.map((item) => (
//             <div
//               key={item.id}
//               className="col-md-12 pt-4 pb-4 px-4 mb-4 rounded bookmark-card"
//             >
//               {/* Unsave button */}
//               <div className="d-flex justify-content-end mb-2">
//                 <i className="bi bi-bookmark-fill me-1"></i> Unsave
//               </div>

//               {/* Question */}
//               <h5 className="fw-semibold">{item.question}</h5>

//               {/* Options */}
//               <div className="mt-3">
//                 {item.options.map((op, idx) => (
//                   <p key={idx} className="mb-1">
//                     {op}
//                   </p>
//                 ))}
//               </div>

//               {/* Correct Answer */}
//               <p className="fw-semibold mt-3 mb-1">Correct Answer</p>
//               <p>{item.correct}</p>

//               {/* Explanation */}
//               <p className="fw-semibold mb-1">Explanation</p>
//               <p className="mb-0">{item.explanation}</p>
//             </div>
//           ))}
//         </>
//       ) : (
//         <div className="col-md-12 pt-3 pb-3 text-center rounded gap-4 bookmark-card">
//           <h3 className="text-center">No Bookmark Questions</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SaveList;



import React, { useEffect, useState } from "react";
import Button from "../component/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./SaveList.css";
import { BsBookmarkFill } from "react-icons/bs";
import Loader from "../component/Loader";

function SaveList() {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [categories, setCategories] = useState(["All"]); // All is static
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || "";

  /* ---------------- UNSAVE ---------------- */
  const handleUnsave = async (saveId, originalQuestionId, listName) => {
    try {
      // prefer sending original question id if available, otherwise fall back to save_id
      const questionIdToSend = originalQuestionId ?? saveId;

      // helpful console note if originalQuestionId is missing
      if (!originalQuestionId) {
        console.warn(
          `Original question_id missing for save_id ${saveId}. Falling back to sending save_id as question_id. Prefer backend field "question_id" in the get-save-list response.`
        );
      }

      const res = await axios.post(
        "https://development.pilotexaminations.com/api/list/unsave",
        {
          user_id: userId,
          list_name: listName ?? "saved",
          question_id: questionIdToSend,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data.error) {
        // Remove from UI by save id
        setSavedQuestions((prev) => prev.filter((q) => q.save_id !== saveId));

        // simple toast - replace with react-toastify if you prefer
        window.alert("Question unsaved successfully!");
        // If you want react-toastify:
        // toast.success("Question unsaved successfully!");
      } else {
        console.error("Unsave API returned error:", res.data);
        window.alert("Unable to unsave. Try again.");
      }
    } catch (err) {
      console.error("Unsave error:", err);
      window.alert("Failed to unsave. Check console.");
    }
  };

  /* ---------------- FETCH CATEGORY LIST ---------------- */
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/list/all",
          { user_id: userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.data.error) {
          const dynamicCats = res.data.lists
            .map((item) => item.name)
            .filter((name) => name && name.trim().length > 0); // remove null

          setCategories(["All", ...dynamicCats]);
        }
      } catch (err) {
        console.log("Error fetching dynamic lists:", err);
      }
    };

    fetchCategoryList();
  }, [token, userId]);

  /* ---------------- FETCH SAVED QUESTIONS ---------------- */
  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const response = await axios.post(
          "https://development.pilotexaminations.com/api/get-save-list",
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.error) {
          // map and keep both save_id and original question_id (if present)
          const mapped = response.data.results.map((item) => {
            // try common possible keys for original question id
            const originalQuestionId =
              item.question_id ?? item.questionId ?? item.qid ?? item.question_id_from_api ?? null;

            return {
              // keep save_id for UI removal
              save_id: item.save_id,
              // original question id needed by unsave API (if backend expects it)
              question_id: originalQuestionId,
              list_name: item.list_name, // ← category comes from API
              question: item.question,
              options: [
                item.option_a ? `A. ${item.option_a}` : null,
                item.option_b ? `B. ${item.option_b}` : null,
                item.option_c ? `C. ${item.option_c}` : null,
              ].filter(Boolean),
              correct: item.correct_answer,
              explanation: item.explanation,
              // keep raw item if you need later
              __raw: item,
            };
          });

          setSavedQuestions(mapped);
        } else {
          console.error("get-save-list returned error:", response.data);
        }
      } catch (err) {
        console.log("Error fetching saved list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedList();
  }, [userId, token]);

    if (loading) return <Loader message="Loading savelist....." />;

  /* ---------------- FILTER BY ACTIVE CATEGORY ---------------- */
  const filteredQuestions =
    activeCategory === "All"
      ? savedQuestions
      : savedQuestions.filter((q) =>
          q.list_name?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">SaveList</h3>
      <hr />

      {/* ------ CATEGORY TABS ------ */}
      <div
        className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card"
        style={{ padding: "2.2rem 0rem 2.2rem 0rem" }}
      >
        {categories.map((cat, i) => (
          <span
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`results-link ${activeCategory === cat ? "active-tab" : ""}`}
            style={{
              cursor: "pointer",
              position: "relative",
              marginRight: "20px",
              paddingBottom: "5px",
              marginTop: "5px",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* ------ SEARCH BAR ------ */}
      <div className="col-md-12 pt-3 pb-3 px-4 mb-4 rounded gap-4 d-flex flex-row results-card">
        <div className="col-md-8 py-1">
          <input
            type="text"
            placeholder="Search"
            className="form-control mt-1 p-2 report-input"
            style={{ border: "1px solid black" }}
          />
        </div>
        <div className="col-md-4 py-1 pe-4">
          <Button name="Search" className="btn-dark form-control" />
        </div>
      </div>

      {/* ------ QUESTION LIST ------ */}
      {filteredQuestions.length > 0 ? (
        <>
          {filteredQuestions.map((item) => (
            <div
              key={item.save_id}
              className="col-md-12 pt-4 pb-4 px-4 mb-4 rounded bookmark-card"
            >
              <div
                className="d-flex justify-content-end mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleUnsave(item.save_id, item.question_id, item.list_name)}
              >
                <BsBookmarkFill style={{ fontSize: "18px", marginRight: "6px" }} />
                Unsave
              </div>

              <h5 className="fw-semibold">{item.question}</h5>

              <div className="mt-3">
                {item.options.map((op, idx) => (
                  <p key={idx} className="mb-1">
                    {op}
                  </p>
                ))}
              </div>

              <p className="fw-semibold mt-3 mb-1">Correct Answer</p>
              <p>{item.correct}</p>

              <p className="fw-semibold mb-1">Explanation</p>
              <p className="mb-0">{item.explanation}</p>
            </div>
          ))}
        </>
      ) : (
        <div className="col-md-12 pt-3 pb-3 text-center rounded gap-4 bookmark-card">
          <h3 className="text-center">No Bookmark Questions</h3>
        </div>
      )}
    </div>
  );
}

export default SaveList;
