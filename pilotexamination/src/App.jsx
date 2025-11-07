import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import DashNavbar from './component/DashNavbar';
import DashboardHome from './pages/DashboardHome';
import MyCourses from './pages/MyCourses';
import MyOrders from './pages/MyOrders';
import ExploreCourses from './pages/ExploreCourses';
import Results from './pages/Results';
import SaveList from './pages/SaveList';
import ReportedQuestion from './pages/ReportedQuestion';
import Sidebar from './component/Sidebar.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Account from './pages/Account.jsx';
import MeteorologySubscription from './component/DashComponent/MeterologySubscription.jsx';
import RegulationSubscription from './component/DashComponent/RegulationSubscription.jsx';
import NavigationSubscription from './component/DashComponent/NavigationSubscription.jsx';
import SubFooter from './component/SubFooter.jsx';
import info from './assets/images/info.svg';
import MainLayout from './layouts/MainLayout.jsx';


function InfoText({ title, text }) {
  return (
    <div className="col-md-12 ps-4 pb-5 mt-3">
      <p className="position-relative" style={{ paddingLeft: '2rem' }}>
        <img
          src={info}
          alt="info"
          className="position-absolute"
          style={{ left: '0rem' }}
        />
        <b>{title}</b>&nbsp;{text}
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/dashboard';

  const hideFooter =
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/dashboard';

  return (
    <>
      {/* Navbar visible only when not on home/dashboard */}
      {!hideNavbar && <DashNavbar />}

      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* ---------- Dashboard Routes ---------- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="explore-courses" element={<ExploreCourses />} />

          {/* ---------- Results Routes ---------- */}
          <Route path="results" element={<Results />}>
            <Route index element={<Navigate to="index" replace />} />
            <Route
              path="index"
              element={
                <InfoText
                  title="E-tests"
                  text="are topic wise test from each subject"
                />
              }
            />
            <Route
              path="practice-test"
              element={
                <InfoText
                  title="Practice Test"
                  text="are topic wise test from each subject"
                />
              }
            />
            <Route
              path="mock-test"
              element={
                <InfoText
                  title="Mock-Test"
                  text="are topic wise test from each subject"
                />
              }
            />
          </Route>

          {/* ---------- Save List ---------- */}
          <Route path="save-list" element={<SaveList />} />

          {/* ---------- Reported Questions ---------- */}
          <Route path="reported-question" element={<ReportedQuestion />}>
            <Route path="index" element={''} />
            <Route path="resolved" element={''} />
            <Route path="under-review" element={''} />
          </Route>

          {/* ---------- Account ---------- */}
          <Route path="my-account" element={<Account />}>
            <Route index element={<Navigate to="index" replace />} />
            <Route path="index" element={''} />
            <Route path="change-password" element={''} />
          </Route>
        </Route>

        {/* ---------- Subscription Route ---------- */}

        <Route path='/plans' element={<MainLayout/>}>
        <Route path="meterologyplans" element={<MeteorologySubscription />} />
        <Route path="regulationplans" element={<RegulationSubscription />} />
        <Route path="navigationplans" element={<NavigationSubscription />} />
        </Route>
      </Routes>

      {/* Footer (disabled for now) */}
      {/* {!hideFooter && <SubFooter />} */}
    </>
  );
}

export default App;
