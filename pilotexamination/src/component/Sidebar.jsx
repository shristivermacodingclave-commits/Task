import { NavLink } from "react-router-dom";
import userProfile from '../assets/images/default.svg';
import logout from '../assets/images/logout.svg';
import {
  FaHome,
  FaBookOpen,
  FaUser,
  FaClipboardList,
  FaExclamationTriangle,
  FaUserCircle,
} from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FaHome /> },
    { name: "My Courses", path: "/dashboard/my-courses", icon: <FaBookOpen /> },
    { name: "My Orders", path: "/dashboard/my-orders", icon: <MdShoppingBag /> },
    { name: "Explore Courses", path: "/dashboard/explore-courses", icon: <FaUser /> },
    { name: "Results", path: "/dashboard/results", icon: <FaClipboardList /> },
    { name: "SaveList", path: "/dashboard/save-list", icon: <BsBookmarkFill /> },
    { name: "Reported Question", path: "/dashboard/reported-question", icon: <FaExclamationTriangle /> },
    { name: "My Account", path: "/dashboard/my-account", icon: <FaUser /> },
  ];


  const mobileOverlayStyle = {
    position: "fixed",
    top: "60px",               // start below navbar so navbar remains visible
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 2000,
    transition: "opacity 250ms ease",
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const mobileSidebarWrapper = {
    position: "fixed",
    top: "60px",               // slide begins below navbar
    left: 0,
    width: "240px",
    height: "calc(100vh - 56px)",
    background: "#fff",
    zIndex: 2100,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 300ms cubic-bezier(.2,.9,.2,1)",
    overflowY: "auto",
    boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
  };

  return (
    <>
      {/* Desktop sidebar (unchanged) */}
      <div
        className="bg-white position-fixed start-0 d-none d-lg-flex flex-column"
        style={{
          width: "250px",
          height: "100vh",
          top: "60px",
          overflowY: "auto",
          zIndex: 1,
          paddingLeft: 1.2 + 'rem',
        }}
      >
        <ul className="nav flex-column py-3">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item py-2">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 px-4 py-2 ${isActive
                    ? "bg-light fw-semibold rounded-top-start rounded-bottom-start active-link"
                    : "text-dark"
                  }`
                }
                style={({ isActive }) => ({
                  fontSize: "15px"
                })}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile overlay (covers content but starts below navbar) */}
      <div
        style={mobileOverlayStyle}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Mobile sliding sidebar container */}
      <div
        className="d-lg-none"
        style={mobileSidebarWrapper}
        role="dialog"
        aria-hidden={!isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button (keeps your styling) */}
        <button
          type="button"
          className="btn-close ms-auto me-2 mt-2"
          aria-label="Close"
          onClick={onClose}
        />

        <ul className="nav flex-column py-3">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item py-2">
              <NavLink
                to={item.path}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 px-3 py-2 ${isActive ? "fw-semibold text-warning active-link" : "text-dark"
                  }`
                }
                style={{ fontSize: "15px" }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile at bottom (mobile only) */}
        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid #eee",
            padding: "16px",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src={userProfile}
              alt="user"
              style={{ height: "1.8rem", width: "1.8rem", marginRight: "0.6rem" }}
            />
            <span className="fw-semibold">Ashish Sharma</span>
          </div>

          {/* Logout button */}
          <button
            className="btn btn-outline-dark btn-md mt-3 w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => {
              // handle logout logic here
              onClose();
            }}
          >
            <img
              src={logout}
              alt="logout"
              style={{ height: "1rem", width: "1rem" }}
            />
            Logout
          </button>
        </div>


      </div>
    </>
  );
};

export default Sidebar;

