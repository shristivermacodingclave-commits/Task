import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const DashboardHeader = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);

  // Helper: format like "my-orders" → "My Orders"
  const formatName = (name) =>
    name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Build breadcrumb paths dynamically
  const breadcrumbItems = path.map((segment, index) => {
    const fullPath = "/" + path.slice(0, index + 1).join("/");

    return {
      name: formatName(segment),
      path: fullPath,
    };
  });

  return (
    <div className="mb-2 ms-3">
      <div className="d-flex align-items-center text-muted small mb-1">
        {/* Home link */}
        <Link
          to="/dashboard"
          className="text-dark fs-5 d-flex align-items-center text-decoration-none"
        >
          <FaHome className="me-1" /> Home
        </Link>

        {/* Dynamically render breadcrumb trail */}
        {breadcrumbItems
          .filter((b) => b.name.toLowerCase() !== "dashboard") // skip 'dashboard'
          .map((b, idx) => (
            <React.Fragment key={b.path}>
              <span className="mx-1 fs-5">&gt;</span>
              {idx === breadcrumbItems.length - 2 ? (
                // Middle levels (clickable)
                <Link to={b.path} className="text-dark text-decoration-none fs-6">
                  {b.name}
                </Link>
              ) : (
                // Last item (not clickable)
                <span className="fs-6">{b.name}</span>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default DashboardHeader;

