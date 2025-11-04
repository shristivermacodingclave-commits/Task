// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../component/Sidebar";
// import DashNavbar from "../component/DashNavbar";
// import "./DashboardLayout.css";
// import DashboardHeader from "../component/DashboardHeader";

// const DashboardLayout = () => {
//   const [sidebarOpen , setSidebarOpen] = React.useState(false);
//   const year = new Date().getFullYear();
//   return (
//     <div className="bg-light dashboard-layout">
//       <DashNavbar  onToggleSidebar={() => setSidebarOpen(true)} />
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main Scrollable Content */}
//       <main className="dashboard-main">
//         <DashboardHeader />
//         <Outlet />
//       </main>

//       <div className="pe-strip p-4">
//         <p className="pe-strip__line">
//           {year} ©{" "}
//           <span className="pe-strip__brand">PilotExaminations.com</span> | All Rights Reserved
//         </p>
//         <p className="pe-strip__line">
//           Powered by <span className="pe-strip__brand">PilotExaminations</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import DashNavbar from "../component/DashNavbar";
import "./DashboardLayout.css";
import DashboardHeader from "../component/DashboardHeader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [subBreadcrumb, setSubBreadcrumb] = React.useState(""); // ✅ added
  const year = new Date().getFullYear();

  return (
    <div className="bg-light dashboard-layout">
      <DashNavbar onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Scrollable Content */}
      <main className="dashboard-main">
        <DashboardHeader subBreadcrumb={subBreadcrumb} /> {/* ✅ pass prop */}
        <Outlet context={{ setSubBreadcrumb }} /> {/* ✅ pass setter to child */}
      </main>

      <div className="pe-strip p-5">
        <p className="pe-strip__line">
          {year} ©{" "}
          <span className="pe-strip__brand">PilotExaminations.com</span> | All Rights Reserved
        </p>
        <p className="pe-strip__line">
          Powered by <span className="pe-strip__brand">PilotExaminations</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardLayout;
