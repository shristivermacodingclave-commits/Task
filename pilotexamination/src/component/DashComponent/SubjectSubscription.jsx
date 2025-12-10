import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../component/Button";
import Loader from "../Loader";
import "./SubjectSubscription.css";

// ⭐ STATIC SUBJECT MAP (temporary until backend sends subject info)
const SUBJECT_DATA = {
  1: { name: "Air Meteorology", image: "/images/meterology.png" },
  2: { name: "Air Regulation", image: "/images/regulation.png" },
  34: { name: "Cessna 152", image: "/images/cessna152.jpg" },
  // Add more subjects here...
};

export default function SubjectSubscription() {

  const { subjectId } = useParams();

  const [selected, setSelected] = useState("12");
  const [plans, setPlans] = useState([]);
  const [topics, setTopics] = useState([]);
  const [couponError, setCouponError] = useState(false);
  const [loading, setLoading] = useState(true);

  const subjectInfo = SUBJECT_DATA[subjectId] || {
    name: "Subscription",
    image: "/images/default.png",
  };

  useEffect(() => {
    fetchPlanData();
  }, [subjectId]);

  const fetchPlanData = async () => {
    try {
      const res = await axios.get(
        `https://development.pilotexaminations.com/api/payment-plans/${subjectId}`
      );

      setTopics(res.data.topics || []);

      // ⭐ Convert plans
      if (res.data.plans) {
        const apiPlans = res.data.plans.map((p) => {
          const discountPercent = p.plan_price
            ? Math.round(((p.plan_price - p.selling_price) / p.plan_price) * 100)
            : 0;

          return {
            id: p.months.toString(),
            duration: p.sub_title,
            price: p.selling_price,
            oldPrice: p.plan_price,
            perMonth:
              p.months > 1 && p.selling_price > 0
                ? Math.round(p.selling_price / p.months)
                : null,
            saveText:
              discountPercent > 0 ? `Save Extra ${discountPercent}%` : null,
            saveBg: p.months === 12 ? "#d8ebd1" : "#fffbd2",
            saveColor: p.months === 12 ? "green" : "#ecce39",
            recommended: p.months === 12,
            isShort: p.months === 1,
          };
        });

        // Sort plans in 12–6–3–1 order
        const order = ["12", "6", "3", "1"];
        apiPlans.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

        setPlans(apiPlans);
      }

    } catch (err) {
      console.error("Error fetching subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Loading subscription..." />;

  return (
    <div className="container py-5 meteorology-container">

      {/* TITLE */}
      <div className="row mb-5">
        <div className="col text-center">
          <h4 className="fw-semibold mb-1">
            {subjectInfo.name} Subscription Plans
          </h4>
          <p className="text-muted small mb-0">
            ⚡ Early Bird Discount for Limited Period Only
          </p>
        </div>
      </div>

      <div className="row justify-content-center align-items-start g-4">

        {/* LEFT CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            
            {/* SUBJECT IMAGE (STATIC) */}
            <img
              src={subjectInfo.image}
              className="card-img-top rounded-top-4"
              alt={subjectInfo.name}
              style={{ height: "200px", objectFit: "contain" }}
            />

            <div className="card-body">
              <h3 className="card-title my-3">{subjectInfo.name}</h3>

              <ul className="mb-0 ps-3 small fs-5">
                {topics.length === 0 ? (
                  <li><Loader message="Loading topics..." compact /></li>
                ) : (
                  topics.slice(0, 4).map((t) => (
                    <li key={t.topic_id}>{t.topic_name}</li>
                  ))
                )}

                {topics.length > 4 && <li>And More...</li>}
              </ul>
            </div>

          </div>
        </div>

        {/* RIGHT – PLANS */}
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
                  className={`plan-card d-flex align-items-center justify-content-between px-4 py-4 my-3 rounded-4 shadow-sm 
                    ${selected === plan.id ? "active" : ""} 
                    ${plan.isShort ? "short-card" : ""}`}
                  onClick={() => setSelected(plan.id)}
                >
                  <div className="d-flex align-items-center gap-4">
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
                          style={{ backgroundColor: plan.saveBg, color: plan.saveColor }}
                        >
                          {plan.saveText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-end">
                    <h5 className="mb-0 fw-bold">₹{plan.price}</h5>

                    {plan.oldPrice > 0 && (
                      <small className="text-muted text-decoration-line-through">
                        ₹{plan.oldPrice}
                      </small>
                    )}

                    {!plan.isShort && plan.perMonth && (
                      <div className="small text-muted">@ ₹{plan.perMonth} / month</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* COUPON SECTION */}
          <form className="mt-4">
            <div className="coupon-card row g-3 align-items-center coupon-row my-5">

              <div className="col-md-8 col-12">
                <input
                  type="text"
                  className="form-control coupon-input"
                  placeholder="Have a Coupon Code?"
                />
              </div>

              <div className="col-md-4 col-12">
                <Button
                  name="Apply Coupon"
                  className="btn-dark w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    setCouponError(true); // always invalid
                  }}
                />
              </div>

              {couponError && (
                <div className="col-12 mt-2">
                  <p className="small mb-0 fw-semibold text-danger">
                    Coupon code not valid or does not exist
                  </p>
                </div>
              )}
            </div>

            <Button name="Review Order →" className="btn-dark w-100 fs-6" />
          </form>

        </div>

      </div>
    </div>
  );
}
