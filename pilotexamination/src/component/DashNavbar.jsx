import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSearch, FaBell, FaUserCircle, FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import userProfile from '../assets/images/default.svg'
import logout from '../assets/images/Vector.svg';
import logo from "../assets/images/footer-logo.svg";
import "./DashNavbar.css";
import { useState } from "react";

export default function DashNavbar({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  return (
    <Navbar
      bg="white"
      className="px-3  py-0 position-fixed top-0 start-0 w-100"
      style={{ zIndex: 1050, height: "60px" }}
    >
      <Container fluid className="d-flex align-items-center justify-content-between  dashnavbar" >
        {/* Left: logo */}
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand href="/" className="mb-0">
            <img src={logo} alt="Logo" style={{ height: "35px" }} />
          </Navbar.Brand>
        </div>

        {/* Right: icons (always visible) and hamburger at the end (small screens) */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <FaSearch className="fs-5 text-dark" />
            <div className="position-relative">
              <FaBell className="fs-5 text-dark" />
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1">1</span>
            </div>
          </div>

          <div className="position-relative">
            {/* Profile toggle */}
            <div
              onClick={() => setOpen(!open)}
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <img
                src={userProfile}
                alt="user"
                style={{ height: "1.8rem", width: "1.8rem", marginRight: ".6rem" }}
              />
              <span className="fw-semibold">Ashish Sharma</span>
            </div>

            {/* Dropdown */}
            {open && (
              <div
                className="position-absolute end-0  bg-white shadow-sm"
                style={{ width: 180, padding: "8px 0", zIndex: 1000 , borderRadius:'0px 0px 8px 8px', marginTop:'15px',boxShadow:'0px 0px 21px #E8E8E8'}}
              >
                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: 15,
                    width: 12,
                    height: 12,
                    background: "white",
                    borderLeft: "1px solid #ffff",
                    borderTop: "1px solid #ffff",
                    transform: "rotate(45deg)",
                    backgroundColor:'#ffffff',
                    boxShadow:'0px 0px 21px #E8E8E8'
                  }}
                />

                {/* My Account */}
                <div
                  className="d-flex align-items-center px-3 py-1 text-dark"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    alert("My Account");
                    setOpen(false);
                  }}
                >
                  <FaUser className="me-2" size={20}/> My Account
                </div>

                {/* Logout */}
                <div
                  className="d-flex align-items-center px-3 mx-2 py-2 rounded"
                  style={{
                    background: "#fff5f5",
                    borderTop: "1px solid #f3f3f3",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onLogout?.();
                    setOpen(false);
                  }}
                >
                  <img src={logout} alt="logout" className="me-2"/> Logout
                </div>
              </div>
            )}
          </div>

          {/* Hamburger: visible only on small screens and placed AFTER icons */}
          <button
            className="btn d-lg-none"
            onClick={onToggleSidebar}
            style={{ border: "none", background: "transparent" }}
            aria-label="Open menu"
          >
            <FaBars className="fs-4 text-dark" />
          </button>
        </div>
      </Container>
    </Navbar>
  );
}
