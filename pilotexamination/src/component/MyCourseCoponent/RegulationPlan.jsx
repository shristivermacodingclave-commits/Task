import React, { useMemo, useState } from "react";
import './AtgPlan.css'
import Button from '../../component/Button'
import lock from '../../assets/images/lock.svg'
import lockpad from '../../assets/images/lock-pad.svg'
import RegLogo from '../../assets/images/AirReg.svg'

const COURSE = {
    title: "Air Regulation",
    description:
        "Air Regulation",
    stats: [
        { label: "Topics Covered", value: 59 },
        { label: "Questions", value: 3692 },
        { label: "Happy Students", value: 6 },
    ],
    tabs: [
        "Principles Of Flight (POF)",
        "Aircraft Airframes and Systems",
        "Electrics and Electronics",
        "PowerPlant",
        "Important Questions",
    ],
    topics: new Array(10).fill(null).map((_, i) => ({
        id: i + 1,
        title: i === 0 ? "Basic" : `Topic ${i + 1}`,
    })),
};

export default function RegulationPlan() {
    const [activeTab, setActiveTab] = useState(0);
    const tabItems = useMemo(() => COURSE.tabs, []);

    return (
        <div className="bg-light min-vh-100 mt-3">
            {/* HERO CARD */}

            <div className="container-fluid pb-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* === Top Row === */}
                    <div className="py-4" style={{ backgroundColor: "#fefff2" }}>
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                {/* Left Column (Logo) */}
                                <div className="col-md-2 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                                    <img
                                        src={RegLogo}
                                        alt="ATGlogo"
                                        style={{ height: "100px", width: "200px", objectFit: "contain" }}
                                    />
                                </div>

                                {/* Right Column (Title + Description) */}
                                <div className="col-md-10">
                                    <h1 className="h2 mb-2 fw-semibold">{COURSE.title}</h1>
                                    <p className="mb-0 text-dark">{COURSE.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === Bottom Row === */}
                    <div className="py-4" style={{ backgroundColor: "#f5f6e2", minHeight: "130px" }}>
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                {/* Left Column (Empty) */}
                                <div className="col-md-1"></div>

                                {/* Right Column (Stats + Button) */}
                                <div className="col-md-11 border-red ">
                                    <div className="row  align-items-center">
                                        {/* Stats Section */}
                                        <div className="col-12 col-md-8">
                                            <div className="row row-cols-3 text-center m-0">
                                                {COURSE.stats.map((s, i) => (
                                                    <div key={i} className="col">
                                                        <div className="fs-6 fw-semibold lh-1 py-2">{s.value}</div>
                                                        <div className="small fs-6 ">{s.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Enroll Button */}
                                        <div className="col-12 col-md-4 text-md-center mt-3 mt-md-0 ">
                                            <Button name="Enroll now" className="btn-dark w-100 " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Tabs with separators */}
            <div className="container-fluid">
                <div className="border-bottom pb-3 d-flex flex-wrap align-items-center">
                    {tabItems.map((t, i) => (
                        <div key={t} className="d-flex align-items-center me-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab(i)}
                                className={`btn btn-link px-0 text-decoration-none ${i === activeTab ? "fw-semibold text-dark" : "text-dark"
                                    }`}
                            >
                                {t}
                            </button>
                            {i < tabItems.length - 1 && (
                                <span className="mx-2 text-secondary">|</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Topics header */}
            <div className="container-fluid pt-4">
                <div className="h6 text-secondary mb-3">Topics (10)</div>
            </div>

            {/* Topics list (cards) */}
            <div className="container-fluid">
                <div className="d-flex flex-column gap-3">
                    {COURSE.topics.map((topic) => {
                        const isFree = topic.id === 1;
                        return (
                            <div
                                key={topic.id}
                                className="rounded-2 "
                                style={{
                                    background: "#ffffff",
                                    border: "none",
                                }}
                            >
                                <div
                                    className="px-4 d-flex align-items-center justify-content-between atg-plans-card"
                                    style={{
                                        minHeight: 100, // a little taller
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className="rounded-circle"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                background: "#fff3cd",
                                                color: "#856404",
                                                fontWeight: 600,
                                                display: "grid",
                                                placeItems: "center",
                                            }}
                                        >
                                            {topic.id}
                                        </div>
                                        <div className="fs-5">{topic.title}</div>
                                    </div>

                                    {isFree ? (
                                        <button className="btn btn-outline-dark rounded-3 px-4 py-2">
                                            Attempt For Free
                                        </button>
                                    ) : (
                                        <span className="fs-4" aria-hidden="true" title="Locked">
                                            <img src={lock} alt="lock" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="container-fluid my-5">

                <div className="card border-0 mb-4 atg-plans-card">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center text-center py-4">
                        <p className="mb-4">
                            Practice Test for <b>Principles Of Flight (POF)</b>
                        </p>
                        <img src={lock} alt="lock" />
                    </div>
                </div>


                {/* Heading */}
                <h5 className="fw-semibold mb-3">
                    Unlimited Access to Aircraft Technical General (ATG) Mock Tests
                </h5>

                {/* Blue plan card */}
                <div
                    className="rounded-4 overflow-hidden shadow-sm py-3"
                    style={{ background: "#bcd6ff" }}
                >
                    {/* plan row */}
                    <div className="d-flex align-items-center justify-content-between px-3 px-md-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                                style={{ width: 44, height: 44 }}
                            >
                                <img src={lockpad} alt="lockpad" />
                            </div>
                            <div>
                                <div className="fw-semibold">
                                    Aircraft Technical General (ATG) - Full Syllabus Mocktest
                                </div>
                                <div className="small text-dark">
                                    Every topic is included, following the DGCA&apos;s prescribed
                                    format.
                                </div>
                            </div>
                        </div>
                        <div className="fs-5" aria-hidden="true">

                            <img src={lock} alt="lock" />
                        </div>
                    </div>

                    {/* price strip — right half & right-aligned */}

                </div>

                <div
                    className="px-3 px-md-4 py-4"

                >

                    {/* my code for bottom div */}

                    <div className="row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6 d-flex">
                            <div className="text">
                                <h3 className=" fs-2">₹ 1083 / month</h3>
                                <p style={{ fontSize: "0.7rem" }}>When subscribed for 12 months plan</p>
                            </div>
                            <div className="ms-5">
                                <button className="btn rounded-pill px-4 fw-semibold" style={{ backgroundColor: "#d2f4c7", color: "#30904c" }}>Save Extra 50%</button>
                            </div>
                        </div>
                    </div>

                    {/* enroll button */}
                    <div className="row mt-3">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6">
                            <Button name="Enroll now" className="btn-dark w-100 fs-6 " />
                            <p className="text-center mt-3  fw-bold" style={{ fontSize: "0.8rem" }}> <span className="me-2" aria-hidden="true">⚡</span>Early Bird Discount for Limited Period Only</p>
                        </div>
                    </div>

                </div>

            </div>
            {/* ===== End Screenshot Section ===== */}
        </div>
    );
}


