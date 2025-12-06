// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaHome } from "react-icons/fa";

// const DashboardHeader = () => {
//   const location = useLocation();
//   const path = location.pathname.split("/").filter(Boolean);
//   const locationState = location.state || {};

//   // Helper: format segment names and special labels
//   const formatName = (name) => {
//     const lower = name.toLowerCase();
//     if (lower === "results") return "My Results";
//     if (lower === "e-test") return "E-Test";
//     if (lower === "detail") return "Detail";
//     return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
//   };

//   // Build breadcrumb paths dynamically
//   const breadcrumbItems = path.map((segment, index) => {
//     const fullPath = "/" + path.slice(0, index + 1).join("/");

//     return {
//       name: formatName(segment),
//       path: fullPath,
//     };
//   });

//   let filteredItems = breadcrumbItems.filter(
//     (b) => b.name.toLowerCase() !== "dashboard"
//   );

//   let displayItems = filteredItems;

//   const isPlanEtestRoute = location.pathname.includes(
//     "/dashboard/my-courses/e-test"
//   );

//   if (isPlanEtestRoute && locationState.subject && locationState.topic) {
//     displayItems = filteredItems.filter((item, index) => {
//       const lower = item.name.toLowerCase();
//       const isLast = index === filteredItems.length - 1;
//       return lower !== "e test" && !isLast;
//     });

//     displayItems.push(
//       { name: locationState.subject, path: null },
//       { name: locationState.topic, path: null }
//     );
//   }

//   const isResultDetailRoute = location.pathname.includes("/dashboard/results/detail");
//   if (isResultDetailRoute) {
//     const subjectName = locationState.subject || "Air Navigation";
//     // remove "Detail" placeholder if present
//     displayItems = filteredItems.filter((item) => item.name.toLowerCase() !== "detail");
//     // ensure "E-Test" is present
//     const hasETest = displayItems.some((item) => item.name.toLowerCase() === "e-test");
//     if (!hasETest) {
//       displayItems.push({ name: "E-Test", path: null });
//     }
//     displayItems.push({ name: subjectName, path: null });
//   }

//   return (
//     <div className="mb-2 ms-3">
//       <div className="d-flex align-items-center text-muted small mb-1">
//         {/* Home link */}
//         <Link
//           to="/dashboard"
//           className="text-dark fs-5 d-flex align-items-center text-decoration-none"
//         >
//           <FaHome className="me-1" /> Home
//         </Link>

//         {/* Dynamically render breadcrumb trail */}
//         {displayItems.map((item, idx) => {
//           const isLast = idx === displayItems.length - 1;
//           const isClickable = item.path && !isLast;

//           return (
//             <React.Fragment key={`${item.path || item.name}-${idx}`}>
//               <span className="mx-1 fs-5">&gt;</span>
//               {isClickable ? (
//                 <Link
//                   to={item.path}
//                   className="text-dark text-decoration-none fs-6"
//                 >
//                   {item.name}
//                 </Link>
//               ) : (
//                 <span className="fs-6">{item.name}</span>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;





import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const DashboardHeader = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);
  const locationState = location.state || {};

  const formatName = (name) => {
    const lower = name.toLowerCase();
    if (lower === "results") return "My Results";
    if (lower === "e-test") return "E-Test";
    if (lower === "detail") return "Detail";
    return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  let breadcrumbItems = path.map((segment, index) => {
    const fullPath = "/" + path.slice(0, index + 1).join("/");
    return { name: formatName(segment), path: fullPath };
  });

  let filteredItems = breadcrumbItems.filter(
    (b) => b.name.toLowerCase() !== "dashboard"
  );

  let displayItems = filteredItems;

  // ---------------------------------------------------------
  // ✅ NEW FIXED LOGIC FOR /dashboard/test_result
  // ---------------------------------------------------------
  const isTestResultPage = location.pathname === "/dashboard/test_result";

  if (isTestResultPage) {
    const subject = locationState.subject || "Air Meteorology";
    const topic = locationState.topic || "Atmosphere";

    displayItems = [
      { name: topic, path: null },
      { name: "E-Test", path: null },
      { name: "My Results", path: null },
    ];
  }

  // ---------------------------------------------------------
  // Existing custom logic for E-Test detail pages (unchanged)
  // ---------------------------------------------------------
  const isPlanEtestRoute = location.pathname.includes(
    "/dashboard/my-courses/e-test"
  );

  if (isPlanEtestRoute && locationState.subject && locationState.topic) {
    displayItems = filteredItems.filter((item, index) => {
      const lower = item.name.toLowerCase();
      const isLast = index === filteredItems.length - 1;
      return lower !== "e test" && !isLast;
    });

    displayItems.push(
      { name: locationState.subject, path: null },
      { name: locationState.topic, path: null }
    );
  }

  const isResultDetailRoute = location.pathname.includes(
    "/dashboard/results/detail"
  );

  if (isResultDetailRoute) {
    const subjectName = locationState.subject || "Air Navigation";
    displayItems = filteredItems.filter(
      (item) => item.name.toLowerCase() !== "detail"
    );

    const hasETest = displayItems.some(
      (item) => item.name.toLowerCase() === "e-test"
    );

    if (!hasETest) {
      displayItems.push({ name: "E-Test", path: null });
    }

    displayItems.push({ name: subjectName, path: null });
  }

  return (
    <div className="mb-2 ms-3">
      <div className="d-flex align-items-center text-muted small mb-1">
        <Link
          to="/dashboard"
          className="text-dark fs-5 d-flex align-items-center text-decoration-none"
        >
          <FaHome className="me-1" /> Home
        </Link>

        {displayItems.map((item, idx) => {
          const isLast = idx === displayItems.length - 1;
          const isClickable = item.path && !isLast;

          return (
            <React.Fragment key={idx}>
              <span className="mx-1 fs-5">&gt;</span>
              {isClickable ? (
                <Link
                  to={item.path}
                  className="text-dark text-decoration-none fs-6"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="fs-6">{item.name}</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHeader;

