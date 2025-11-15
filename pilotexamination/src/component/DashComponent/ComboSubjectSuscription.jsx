import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../component/Button";
import "./MeterologySubscription.css";
import Loader from "../Loader";
import comboImage from  '../../assets/images/comboimage.png'

const BASE_URL = "https://development.pilotexaminations.com/";

function ComboSubjectSuscription() {
  const [selected, setSelected] = useState(null);
  const [plans, setPlans] = useState([]);
  const [comboInfo, setComboInfo] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const res = await axios.get(
        "https://development.pilotexaminations.com/api/combo-3-subject?ids=1,2,3"
      );

      if (!res.data.error) {
        setComboInfo({
          name: res.data.combo_name,
          image: res.data.combo_image,
        });
        setSubjects(res.data.subjects || []);

        const formattedPlans = (res.data.plans || []).map((plan) => ({
          id: plan.combo_sub_id.toString(),
          duration: `${plan.months} Month${plan.months > 1 ? "s" : ""}`,
          months: plan.months,
          price: plan.selling_price,
          oldPrice: plan.plan_price,
          perMonth: plan.per_month,
          saveText: plan.discount_text || null,
          saveBg: "#fffbd2",
          saveColor: "#ecce39",
          recommended: plan.recommended,
          isShort: plan.months === 1,
        }));

        formattedPlans.sort((a, b) => b.months - a.months);
        setPlans(formattedPlans);
        setSelected(formattedPlans[0]?.id || null);
      }
    } catch (err) {
      console.error("Error fetching combo subscription plans:", err);
    }
  };

  return (
    <div className="container py-5 meteorology-container">
      {/* ---- Heading ---- */}
      <div className="row mb-5">
        <div className="col text-center">
          <h4 className="fw-semibold mb-1">Subscription Plans</h4>
          <p className="text-muted small mb-0">
            ⚡ Early Bird Discount for Limited Period Only
          </p>
        </div>
      </div>

      <div className="row justify-content-center align-items-start g-4">

        {/* LEFT CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            {comboInfo?.image && (
              <img
                src={comboImage}
                className="card-img-top rounded-top-4"
                alt={comboInfo?.name || "Combo Subjects"}
                style={{ height: "200px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h3 className="card-title my-3">
               DGCA - Three Subject Combo
              </h3>
              <p className="text-muted mb-3">Consists of 3 Subjects</p>

              {subjects.length === 0 ? (
                <Loader message="Loading subjects..." compact />
              ) : (
                <ul className="mb-0 ps-3 small fs-5">
                  {subjects.map((subj) => (
                    <li
                      key={subj.subject_id}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {subj.subject_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PLANS */}
        <div className="col-md-7">

          {plans.length === 0 ? (
            <Loader message="Loading plans..." />
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="plan-wrapper position-relative">
                {plan.recommended && (
                  <div className="recommended-badge">Recommended</div>
                )}

                <div
                  className={`plan-card d-flex align-items-center justify-content-between px-4 py-4 my-3 rounded-4 shadow-sm ${
                    selected === plan.id ? "active" : ""
                  } ${plan.isShort ? "short-card" : ""}`}
                  onClick={() => setSelected(plan.id)}
                >
                  <div className="d-flex align-items-center gap-5">
                    <input
                      type="radio"
                      className="plan-radio"
                      checked={selected === plan.id}
                      onChange={() => setSelected(plan.id)}
                    />

                    <div>
                      <h6 className="mb-1 fw-semibold">{plan.duration}</h6>

                      {plan.saveText && (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: plan.saveBg,
                            color: plan.saveColor,
                            borderRadius: "10px",
                          }}
                        >
                          {plan.saveText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-end">
                    <h5 className="mb-0 fw-bold">₹{plan.price}</h5>

                    <small className="text-muted text-decoration-line-through">
                      ₹{plan.oldPrice}
                    </small>

                    {!plan.isShort && (
                      <div className="small text-muted">
                        @ ₹{plan.perMonth} / month
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* COUPON + REVIEW BUTTON */}
          <form className="mt-4">
            <div
              className="coupon-card row g-3 align-items-center coupon-row my-5"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "0rem 1rem 1rem 1rem",
              }}
            >
              <div className="col-md-8 col-sm-8 col-7">
                <input
                  type="text"
                  className="form-control coupon-input"
                  placeholder="Have a Coupon Code?"
                />
              </div>

              <div className="col-md-4 col-sm-4 col-5">
                <Button
                  name="Apply Coupon"
                  className="btn-dark w-100 coupon-btn"
                />
              </div>

              <div className="mt-2">
                <p
                  className="small mb-0 fw-semibold invalid-text"
                  style={{ color: "#008000", fontSize: "1.1rem" }}
                >
                  Coupon code not valid or does not exist
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Button
                name={`Review Order →`}
                className="btn-dark w-100 py-3 fs-6"
              />
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default ComboSubjectSuscription;
