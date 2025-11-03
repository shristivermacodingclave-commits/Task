import Button from '../component/Button'
import { NavLink } from 'react-router-dom';
import info from '../assets/images/info.svg'

function ReportedQuestion() {
  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">Reported Question</h3>
      <hr />

      {/* Nav Links */}
      <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
        <NavLink to="/results/e-test" className="results-link fw-semibold">
          All
        </NavLink>
        <NavLink to="/results/practice-test" className="results-link fw-semibold">
          Resolved
        </NavLink>
        <NavLink to="/mock-test/mock-test" className="results-link fw-semibold">
          Under Review
        </NavLink>
      </div>

      {/* Search Bar */}
      <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
         <div className="col-md-8 ">
          <input
          type="text"
          placeholder="Search"
          className="form-control mt-1 p-2 report-input"
          style={{border:"1px solid black"}}
        />
         </div>
          <div className="col-md-4 pe-4">
              <Button name="Search" className="btn-dark form-control" />
          </div>
      </div>

      <div className="col-md-12 ps-4  pb-5">
        <p className='position-relative ' style={{paddingLeft:"2rem"}}><img src={info} alt="info" className='position-absolute' style={{left:'0rem'}} />To report any question, please go to the Result sectio and click on the triple dot.</p>
      </div>

      {/* Bottom Button Centered */}
      <div className="row">

        <div className="col-4"></div>
        <div className="col-4">
          <Button
          name="Go to top"
          className="btn-dark form-control w-100"
        />
        </div>
        <div className="col-4"></div>
        
      </div>
    </div>
  );
}

export default ReportedQuestion;
