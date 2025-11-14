import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "../component/Button";
import airplane from "../assets/images/airplanflight.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { subjectPaths } from "../assets/subjectPaths";

function MyCourses() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://development.pilotexaminations.com/";

  const goTo = (path) => navigate(path);

  // Fetch Subjects API
  useEffect(() => {
    axios
      .get(`${BASE_URL}api/subjects`)
      .then((response) => {
        if (!response.data.error) {
          setSubjects(response.data.data);
        } else {
          setError("Error fetching subjects");
        }
      })
      .catch(() => setError("Failed to load subjects"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-5">Loading subjects...</p>;
  if (error) return <p className="text-center text-danger py-5">{error}</p>;

  // 🔹 Group by 3 for carousel slides
  const groupedSubjects = [];
  for (let i = 0; i < subjects.length; i += 3) {
    groupedSubjects.push(subjects.slice(i, i + 3));
  }

  return (
    <div className="container-fluid">
      {/* Related Subjects */}
      <div className="related-subjects">
        <h3 className="fw-bold my-2 mb-4 mt-4">Related Subjects</h3>
        <hr />

        {/* arousel with 3 cards per slide */}
        <Carousel
          indicators={true}
          controls={false}
          interval={3500}
          pause="hover"
          className="mt-4 subject-carousel"
        >
          {groupedSubjects.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                {group.map((subject) => {
                  const paths =
                    subjectPaths[subject.subject_name] || {
                      enrollplanPath: "/plans",
                      viewDetailPath: "/dashboard/my-courses",
                    };

                  const topics = subject.description
                    ? subject.description.split("/").map((t) => t.trim()).filter(Boolean)
                    : [];
                  const topicsToShow = topics.slice(0, 3);
                  const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

                  return (
                    <div className="col-md-4 mb-3" key={subject.subject_id}>
                      <div className="subject-card h-100 shadow-sm rounded-4">
                        {/* Header */}
                        <div
                          className="subject-header py-4 text-center rounded-top-4"
                          style={{ backgroundColor: subject.title_color || "#f9f9f9" }}
                        >
                          <h4 className="subject-title"  style={{ fontSize: "1.5rem", fontWeight: "normal", color: "black" }}>
                            {subject.subject_name}
                          </h4>
                          <img
                            src={
                              subject.icon?.startsWith("http")
                                ? subject.icon
                                : BASE_URL + subject.icon
                            }
                            alt={subject.subject_name}
                            className="subject-icon mt-2"
                            width="50"
                            onError={(e) => (e.target.style.display = "none")}
                            style={{height:"50px" , width:"50px"}}
                          />
                        </div>

                        {/* Topics */}
                        <div className="subject-topics p-3">
                          <div className="row mb-2">
                            <div className="col-6">
                              <h6>Topics Covered</h6>
                            </div>
                            <div className="col-6 text-end">
                              <Link
                                to={paths.viewDetailPath}
                                style={{
                                  color: "black",
                                  fontWeight: "bold",
                                }}
                                className="details-hover"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                          <ul className="ps-3">
                            {topicsToShow.map((topic, i) => (
                              <li key={i}>
                                <h6>{topic}</h6>
                              </li>
                            ))}
                            {remainingCount > 0 && (
                              <li className="text-muted">
                                +{remainingCount} more topics...
                              </li>
                            )}
                          </ul>
                        </div>

                        <hr className="m-0" />

                        {/* Footer */}
                        <div className="text-center p-3">
                          <p className=" mt-3 fw-semibold" style={{ color: "#20ba5c" }}>
                       ⚡ Prices Starting at just ₹{subject.starting_price || 0}
                          </p>


                          {/* Enroll Now */}
                          <Button
                            name="Enroll Now"
                            className="btn-dark fs-6 form-control mb-2 subscribe-button"
                            onClick={() => goTo(paths.enrollplanPath)}
                          />

                          {/* Take Demo MockTest → same path */}
                          <button
                            className="btn btn-link w-100 details-hover"
                            onClick={() => goTo(paths.viewDetailPath)}
                            style={{ color: "black", fontWeight: "500" }}
                          >
                            Take Demo MockTest
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Start Exploring Section */}
      <div
        className="start-exploring mt-5 py-5 text-center rounded-3"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h4 className="fw-bolder">Take Control of Your Learning</h4>
        <p className="fw-semibold">
          Discover subjects and choose your path to DCGA exam success
        </p>

        <div className="row">
          <div className="col-sm-4 col-md-4 text-center"></div>
          <div className="col-sm-4 col-md-4 text-center">
            <Button
              name="Start Exploring"
              className="btn-dark fs-6 btn-lg subscribe-button"
            />
          </div>
          <div className="col-sm-4 col-md-4 text-center">
            <img src={airplane} alt="airplane" style={{ marginTop: "-25px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
