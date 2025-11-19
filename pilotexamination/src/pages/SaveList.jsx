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

function SaveList() {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [categories, setCategories] = useState(["All"]); // All is static
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || "";

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
  }, [token]);

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
            }
          }
        );

        if (!response.data.error) {
          const mapped = response.data.results.map((item) => {
            return {
              id: item.save_id,
              list_name: item.list_name, // ← category comes from API
              question: item.question,
              options: [
                `A. ${item.option_a}`,
                `B. ${item.option_b}`,
                `C. ${item.option_c}`,
              ],
              correct: item.correct_answer,
              explanation: item.explanation,
            };
          });

          setSavedQuestions(mapped);
        }
      } catch (err) {
        console.log("Error fetching saved list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedList();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="container-fluid text-center mt-4">
        <h5>Loading saved questions...</h5>
      </div>
    );
  }

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
              key={item.id}
              className="col-md-12 pt-4 pb-4 px-4 mb-4 rounded bookmark-card"
            >
              <div className="d-flex justify-content-end mb-2">
               <BsBookmarkFill className="text-center"/> Unsave
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
