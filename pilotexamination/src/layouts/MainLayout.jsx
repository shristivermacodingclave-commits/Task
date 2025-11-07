import DashNavbar from "../component/DashNavbar";
import SubFooter from "../component/SubFooter";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <DashNavbar />
      <main className="flex-grow-1 mt-5" style={{backgroundColor:"#f9faf7"}}>
        <Outlet />
      </main>
      <SubFooter />
    </div>
  );
}
