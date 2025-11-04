import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import DashNavbar from './component/DashNavbar';
import DashboardHome from "./pages/DashboardHome";
import MyCourses from "./pages/MyCourses";
import MyOrders from "./pages/MyOrders";
import ExploreCourses from "./pages/ExploreCourses";
import Results from "./pages/Results";
import SaveList from "./pages/SaveList";
import ReportedQuestion from "./pages/ReportedQuestion";
import Sidebar from './component/Sidebar.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Account from './pages/Account.jsx';
import Footer from './component/Footer.jsx';
import info from './assets/images/info.svg'
import { Navigate } from 'react-router-dom';
function App() {
  const location = useLocation();
  // const hideNavbar = location.pathname === '/' || location.pathname === '/home';

  return (
    <>
      {/* Show navbar only if not on home */}
      {/* {!hideNavbar && <DashNavbar />} */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="explore-courses" element={<ExploreCourses />} />
          <Route path="results" element={<Results />} >
            <Route index element={<Navigate to="index" replace />} />
            <Route path="index" element={<div className="col-md-12 ps-4  pb-5 mt-3">
              <p className='position-relative ' style={{ paddingLeft: "2rem" }}><img src={info} alt="info" className='position-absolute' style={{ left: '0rem' }} /> <b>E-tests</b>&nbsp;are topic wise test from each subject</p>
            </div>} />
            <Route path="practice-test" element={<div className="col-md-12 ps-4  pb-5 mt-3">
              <p className='position-relative ' style={{ paddingLeft: "2rem" }}><img src={info} alt="info" className='position-absolute' style={{ left: '0rem' }} /> <b>Practice Test</b>&nbsp;are topic wise test from each subject</p>
            </div>} />
            <Route path="mock-test" element={<div className="col-md-12 ps-4  pb-5 mt-3">
              <p className='position-relative ' style={{ paddingLeft: "2rem" }}><img src={info} alt="info" className='position-absolute' style={{ left: '0rem' }} /> <b>Mock-Test</b>&nbsp;are topic wise test from each subject</p>
            </div>} />
          </Route>
          <Route path="save-list" element={<SaveList />} />
          <Route path="reported-question" element={<ReportedQuestion />} >
            <Route path="index" element={''} />
            <Route path="resolved" element={""} />
            <Route path="under-review" element={""} />
          </Route>
          <Route path="my-account" element={<Account />}>
            <Route index element={<Navigate to="index" replace />} />
            <Route path="index" element={''} />
            <Route path="change-password" element={''} />
          </Route>
        </Route>
      </Routes>

    </>
  );
}


export default App;
