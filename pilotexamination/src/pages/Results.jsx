import { NavLink , Outlet  } from "react-router-dom";
import './Results.css'
import info from '../assets/images/info.svg'

function Results() {
  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">Results</h3>
      <hr />
      <div className='col-md-12 pt-3 pb-3 ps-4 pe-4 rounded gap-4 d-flex flex-row results-card'>
        <NavLink to="index" className="results-link fw-semibold">
          E-Test
        </NavLink>
        <NavLink to="practice-test" className="results-link fw-semibold">
          Practice Test
        </NavLink>
        <NavLink to="mock-test" className="results-link fw-semibold">
          Mock Test
        </NavLink>
      </div>


     {/* dynamic content */}
      <Outlet/>

    </div>
  );
}

export default Results;


