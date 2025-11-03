import ComboSubject from "../component/ComboSubject";
import Subject from "../component/Subject";
function ExploreCourses() {
  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">Individual Subjects</h3>
      <hr />
      <Subject withSpacing={false} />

      <h3 className="fw-bold my-2 mb-4 mt-4">Combo Subjects</h3>
      <hr />
      <ComboSubject withSpacing={false} />
    </div>
  );
}

export default ExploreCourses;
