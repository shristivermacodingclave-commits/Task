function DashboardCard({ title, topics }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="card-title fw-bold mb-3">{title}</h6>
          <p className="fw-semibold">Topics Covered</p>
          <ul className="mb-3">
            {topics.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <a href="#" className="fw-semibold text-decoration-none">View Details</a>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
