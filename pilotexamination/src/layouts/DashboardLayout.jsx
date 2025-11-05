import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import DashNavbar from "../component/DashNavbar";
import "./DashboardLayout.css";
import DashboardHeader from "../component/DashboardHeader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const year = new Date().getFullYear();

  return (
    <div className="bg-light dashboard-layout">
      <DashNavbar onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="dashboard-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-main">
        <DashboardHeader  /> 
        <Outlet  /> 
      </main>
      </div>
      <div className="pe-strip p-4">
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
