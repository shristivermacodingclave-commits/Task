
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { FaSearch, FaBell, FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
// import userProfile from '../assets/images/default.svg';
// import logoutIcon from '../assets/images/Vector.svg';
// import logo from "../assets/images/footer-logo.svg";
// import "./DashNavbar.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function DashNavbar({ onToggleSidebar }) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();


//   // Logout Function
//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // Token not found — just clear and redirect
//       localStorage.removeItem("token");
//       localStorage.removeItem("user"); 
//       navigate("/home");
//       return;
//     }

//     try {
//       // Call API to revoke token
//       await axios.post(
//         "https://development.pilotexaminations.com/api/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // remove token and redirect
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");  
//       sessionStorage.clear();
//       alert("Logged out successfully!");
//       console.log("logout successfully");
//       navigate("/home");


//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       // Even if API fails, clear token locally
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       navigate("/home");
//     }
//   };

//   return (
//     <Navbar
//       bg="white"
//       className="px-3 py-0 position-fixed top-0 start-0 w-100 dashnavbar-box"
//       style={{ zIndex: 1050, height: "60px" }}
//     >
//       <Container
//         fluid
//         className="d-flex align-items-center justify-content-between dashnavbar"
//       >
//         {/* Left: logo */}
//         <div className="d-flex align-items-center gap-3">
//           <Navbar.Brand href="/" className="mb-0">
//             <img src={logo} alt="Logo" style={{ height: "35px" }} />
//           </Navbar.Brand>
//         </div>

//         {/* Right: icons */}
//         <div className="d-flex align-items-center gap-3">
//           <div className="d-flex align-items-center gap-3">
//             <FaSearch className="fs-5 text-dark details-hover" />
//             <div className="position-relative">
//               <FaBell className="fs-5 text-dark details-hover" />
//               <span
//                 className="badge position-absolute top-0 start-100 translate-middle px-2 ms-1"
//                 style={{
//                   borderRadius: "50%",
//                   backgroundColor: "red",
//                 }}
//               >
//                 1
//               </span>
//             </div>
//           </div>

//           {/* Profile Menu */}
//           <div className="position-relative d-none d-lg-block">
//             <div
//               onClick={() => setOpen(!open)}
//               className="d-flex align-items-center"
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={userProfile}
//                 alt="user"
//                 style={{
//                   height: "1.8rem",
//                   width: "1.8rem",
//                   marginRight: ".6rem",
//                 }}
//               />
//               <span className="fw-semibold details-hover">Ashish Sharma</span>
//             </div>

//             {open && (
//               <div
//                 className="position-absolute end-0 bg-white shadow-sm"
//                 style={{
//                   width: 180,
//                   padding: "8px 0",
//                   zIndex: 1000,
//                   borderRadius: "0px 0px 8px 8px",
//                   marginTop: "15px",
//                   boxShadow: "0px 0px 21px #E8E8E8",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: -6,
//                     right: 15,
//                     width: 12,
//                     height: 12,
//                     background: "white",
//                     transform: "rotate(45deg)",
//                     boxShadow: "0px 0px 21px #E8E8E8",
//                   }}
//                 />

//                 {/* My Account */}
//                 <div
//                   className="d-flex align-items-center px-3 py-1 text-dark"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     alert("My Account");
//                     setOpen(false);
//                   }}
//                 >
//                   <FaUser className="me-2" size={20} /> My Account
//                 </div>

//                 {/* Logout */}
//                 <div
//                   className="d-flex align-items-center px-3 mx-2 py-2 rounded"
//                   style={{
//                     background: "#fff5f5",
//                     borderTop: "1px solid #f3f3f3",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     setOpen(false);
//                     handleLogout(); // Logout handler
//                   }}
//                 >
//                   <img src={logoutIcon} alt="logout" className="me-2" />
//                   Logout
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Hamburger for small screens */}
//           <button
//             className="btn d-lg-none"
//             onClick={onToggleSidebar}
//             style={{ border: "none", background: "transparent" }}
//             aria-label="Open menu"
//           >
//             <FaBars className="fs-4 text-dark" />
//           </button>
//         </div>
//       </Container>
//     </Navbar>
//   );
// }




import { Navbar, Container } from "react-bootstrap";
import { FaSearch, FaBell, FaBars, FaUser } from "react-icons/fa";
import userProfileDefault from "../assets/images/default.svg";
import logoutIcon from "../assets/images/Vector.svg";
import logo from "../assets/images/footer-logo.svg";
import "./DashNavbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashNavbar({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Capitalize first letter of name
        if (parsedUser.name) {
          parsedUser.name =
            parsedUser.name.charAt(0).toUpperCase() +
            parsedUser.name.slice(1);
        }

        setUser(parsedUser);
      } catch {
        console.warn("Invalid user data in localStorage");
      }
    }
  }, []);

  // ✅ Logout Function
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/home");
      return;
    }

    try {
      await axios.post(
        "https://development.pilotexaminations.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      alert("Logged out successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/home");
    }
  };

  // ✅ Profile image logic
  const profileImage =
    user?.profile_photo_path && user?.profile_photo_path !== "null"
      ? `https://development.pilotexaminations.com/storage/${user.profile_photo_path}`
      : userProfileDefault;

  return (
    <Navbar
      bg="white"
      className="px-3 py-0 position-fixed top-0 start-0 w-100 dashnavbar-box"
      style={{ zIndex: 1050, height: "60px" }}
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-between dashnavbar"
      >
        {/* Left: logo */}
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand href="/" className="mb-0">
            <img src={logo} alt="Logo" style={{ height: "35px" }} />
          </Navbar.Brand>
        </div>

        {/* Right: icons */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <FaSearch className="fs-5 text-dark details-hover" />
            <div className="position-relative">
              <FaBell className="fs-5 text-dark details-hover" />
              <span
                className="dash-navbar__badge position-absolute top-0 start-100 translate-middle px-2 ms-1 text-white"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              >
                1
              </span>
            </div>
          </div>

          {/* Profile Menu */}
          <div className="position-relative d-none d-lg-block">
            <div
              onClick={() => setOpen(!open)}
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <img
                src={profileImage}
                alt="user"
                style={{
                  height: "1.8rem",
                  width: "1.8rem",
                  marginRight: ".6rem",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span className="fw-semibold details-hover">
                {user?.name || "Guest User"}
              </span>
            </div>

            {open && (
              <div
                className="position-absolute end-0 bg-white shadow-sm"
                style={{
                  width: 180,
                  padding: "8px 0",
                  zIndex: 1000,
                  borderRadius: "0px 0px 8px 8px",
                  marginTop: "15px",
                  boxShadow: "0px 0px 21px #E8E8E8",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: 15,
                    width: 12,
                    height: 12,
                    background: "white",
                    transform: "rotate(45deg)",
                    boxShadow: "0px 0px 21px #E8E8E8",
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
                  <FaUser className="me-2" size={20} /> My Account
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
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  <img src={logoutIcon} alt="logout" className="me-2" />
                  Logout
                </div>
              </div>
            )}
          </div>

          {/* Hamburger for small screens */}
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

