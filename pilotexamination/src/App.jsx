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
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Account from './pages/Account.jsx';
import MeteorologySubscription from './component/DashComponent/MeterologySubscription.jsx';
import RegulationSubscription from './component/DashComponent/RegulationSubscription.jsx';
import NavigationSubscription from './component/DashComponent/NavigationSubscription.jsx';
import AtgSubscription from './component/DashComponent/AtgSubscription.jsx';
import AtsSubscription from './component/DashComponent/AtsSubscription.jsx';
import ComboSubjectSuscription from './component/DashComponent/ComboSubjectSuscription.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AtgPlan from './component/MyCourseCoponent/AtgPlan.jsx';
import NavigationPlan from './component/MyCourseCoponent/NavigationPlan.jsx'
import RegulationPlan from './component/MyCourseCoponent/RegulationPlan.jsx'
import ATSPlan from './component/MyCourseCoponent/ATSPlan.jsx'
import MetereologyPlan from './component/MyCourseCoponent/MetereologyPlan.jsx'
import MyCourseLayout from './layouts/MyCourseLayout.jsx';
import Etest from './component/ResultComponent/Etest.jsx';
import PracticeTest from './component/ResultComponent/PracticeTest.jsx';
import MockTest from './component/ResultComponent/MockTest.jsx';
import PlanEtest from './pages/PlanEtest.jsx';
import EtestAttempt from './pages/EtestAttempt.jsx';

function App() {
  const location = useLocation();

  //  Block access if user not logged in
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // if no token or user, only allow home routes
  if (!token || !user) {
    // if user tries to open anything other than home -> redirect
    if (location.pathname !== "/" && location.pathname !== "/home") {
      return <Navigate to="/home" replace />;
    }
  }

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
          <Route path="my-courses" element={<MyCourseLayout />}>
            <Route index element={<MyCourses />} />
            <Route path="atg-plans" element={<AtgPlan />} />
            <Route path="reg-plans" element={<RegulationPlan />} />
            <Route path="neg-plans" element={<NavigationPlan />} />
            <Route path="ats-plans" element={<ATSPlan />} />
            <Route path="metereology-plans" element={<MetereologyPlan />} />
            <Route path="e-test/:planId" element={<PlanEtest />} />
          </Route>

          <Route path="my-orders" element={<MyOrders />} />
          <Route path="explore-courses" element={<ExploreCourses />} />

          {/* ---------- Results Routes ---------- */}
          <Route path="results" element={<Results />}>
            <Route index element={<Navigate to="index" replace />} />
            <Route path="index" element={<Etest/>} />
            <Route path="practice-test" element={<PracticeTest/>} />
            <Route path="mock-test" element={<MockTest />} />
          </Route>

          <Route path="save-list" element={<SaveList />} />
          {/* ---------- Reported Questions ---------- */}
          <Route path="reported-question" element={<ReportedQuestion />}>
            <Route path="index" element={''} />
            <Route path="resolved" element={''} />
            <Route path="under-review" element={''} />
          </Route>


          <Route path="my-account" element={<Account />}>
            <Route index element={<Navigate to="index" replace />} />
            <Route path="index" element={''} />
            <Route path="change-password" element={''} />
          </Route>

        </Route>

        {/* ---------- Subscription Route ---------- */}
        <Route path="/plans" element={<MainLayout />}>
          <Route path="meterology" element={<MeteorologySubscription />} />
          <Route path="regulation" element={<RegulationSubscription />} />
          <Route path="navigation" element={<NavigationSubscription />} />
           <Route path="atg" element={<AtgSubscription />} />
            <Route path="ats" element={<AtsSubscription />} />
              <Route path="combo-subject" element={<ComboSubjectSuscription />} />
        </Route>

        {/* ---------- Public E-Test Attempt Route ---------- */}
        <Route path="/test_question" element={<MainLayout />}>
          <Route index element={<EtestAttempt />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
