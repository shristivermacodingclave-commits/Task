import Button from "../component/Button";
import { NavLink } from "react-router-dom";
import './SaveList.css';

function SaveList() {
  return (
   <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">SaveList</h3>
      <hr />
      <div className="col-md-12 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card" style={{padding:"2.2rem 0rem 2.2em 0rem"}}>
        <NavLink to="savelist" className="results-link fs-5 " style={{fontWeight:"400"}}>
          All
        </NavLink>
        <NavLink to="savelist" className="results-link "  style={{ top:"-8px"}} >
          <span> No List</span>
        </NavLink>
        
      </div>

      {/* search bar */}

       <div className="col-md-12 pt-3 pb-3 px-4 mb-4 rounded gap-4 d-flex flex-row results-card">
         <div className="col-md-8 py-1">
          <input
          type="text"
          placeholder="Search"
          className="form-control mt-1 p-2 report-input"
          style={{border:"1px solid black"}}
        />
         </div>
          <div className="col-md-4 py-1 pe-4 ">
              <Button name="Search" className="btn-dark form-control" />
          </div>
      </div>


      <div className="col-md-12 pt-3 pb-3 text-center rounded gap-4 bookmark-card">
         <h3 className="text-center">No Bookmark Questions</h3>
      </div>
    </div>
  );
}

export default SaveList;
