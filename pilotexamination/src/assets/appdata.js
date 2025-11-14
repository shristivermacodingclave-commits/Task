
// function App() {
//   const location = useLocation();

//   const hideNavbar =
//     location.pathname === '/' ||
//     location.pathname === '/home' ||
//     location.pathname === '/dashboard';

//   const hideFooter =
//     location.pathname === '/' ||
//     location.pathname === '/home' ||
//     location.pathname === '/dashboard';

//   return (
//     <>
//       {/* Navbar visible only when not on home/dashboard */}
//       {!hideNavbar && <DashNavbar />}

//       <Routes>
//         {/* ---------- Public Routes ---------- */}
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />

//         {/* ---------- Dashboard Routes ---------- */}
//         <Route path="/dashboard" element={<DashboardLayout />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="my-courses" element={<MyCourseLayout />}>
//             <Route index element={<MyCourses />} />
//             <Route path="atg-plans" element={<AtgPlan/>} />
//               <Route path="reg-plans" element={<RegulationPlan/>} />
//                <Route path="neg-plans" element={< NavigationPlan/>} />
//                 <Route path="ats-plans" element={<ATSPlan/>} />
//                  <Route path="metereology-plans" element={<MetereologyPlan/>} />
//           </Route>

//           <Route path="my-orders" element={<MyOrders />} />
//           <Route path="explore-courses" element={<ExploreCourses />} />

//           {/* ---------- Results Routes ---------- */}
//           <Route path="results" element={<Results />}>
//             <Route index element={<Navigate to="index" replace />} />
//             <Route
//               path="index"
//               element={
//                 <InfoText
//                   title="E-tests"
//                   text="are topic wise test from each subject"
//                 />
//               }
//             />
//             <Route
//               path="practice-test"
//               element={
//                 <InfoText
//                   title="Practice Test"
//                   text="are topic wise test from each subject"
//                 />
//               }
//             />
//             <Route
//               path="mock-test"
//               element={
//                 <InfoText
//                   title="Mock-Test"
//                   text="are topic wise test from each subject"
//                 />
//               }
//             />
//           </Route>

//           {/* ---------- Save List ---------- */}
//           <Route path="save-list" element={<SaveList />} />

//           {/* ---------- Reported Questions ---------- */}
//           <Route path="reported-question" element={<ReportedQuestion />}>
//             <Route path="index" element={''} />
//             <Route path="resolved" element={''} />
//             <Route path="under-review" element={''} />
//           </Route>

//           {/* ---------- Account ---------- */}
//           <Route path="my-account" element={<Account />}>
//             <Route index element={<Navigate to="index" replace />} />
//             <Route path="index" element={''} />
//             <Route path="change-password" element={''} />
//           </Route>
//         </Route>

//         {/* ---------- Subscription Route ---------- */}

//         <Route path='/plans' element={<MainLayout />}>
//           <Route path="meterologyplans" element={<MeteorologySubscription />} />
//           <Route path="regulationplans" element={<RegulationSubscription />} />
//           <Route path="navigationplans" element={<NavigationSubscription />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;
