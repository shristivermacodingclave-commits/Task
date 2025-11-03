import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const DashboardHeader = ({ subBreadcrumb }) => {
  const location = useLocation();

  // find current route name (last part of the URL)
  const path = location.pathname.split("/").filter(Boolean);
  const current = path[path.length - 1] || "dashboard";

  // make it readable: "my-orders" → "My Orders"
  const formatName = (name) =>
    name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mb-2 ms-3">
      <div className="d-flex align-items-center text-muted small mb-1">
        <Link
          to="/dashboard"
          className="text-dark fs-5 d-flex align-items-center text-decoration-none"
        >
          <FaHome className="me-1" /> Home
        </Link>

        {path.length > 1 && (
          <>
            <span className="mx-1 fs-5">&gt;</span>
            <span className="fs-6">{formatName(current)}</span>
          </>
        )}

        {subBreadcrumb && ( // ✅ show inner breadcrumb
          <>
            <span className="mx-1 fs-5">&gt;</span>
            <span className="fs-6">{formatName(subBreadcrumb)}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
