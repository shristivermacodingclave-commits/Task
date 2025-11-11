import ComboSubject from "../component/ComboSubject";
import DashSubject from "../component/DashSubject";
function ExploreCourses() {
  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">Individual Subjects</h3>
      <hr />
       <DashSubject showDescription={false} withSpacing={false}/>

      <h3 className="fw-bold my-2 mb-4 mt-4">Combo Subjects</h3>
      <hr />
      <ComboSubject withSpacing={false} />
    </div>
  );
}

export default ExploreCourses;
