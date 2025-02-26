import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobList from "./JobList";
import { motion } from "framer-motion";

const Page1 = () => {
    const [role, setRole] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [companyJobs, setCompanyJobs] = useState([]);
    const [userApplications, setUserApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudentData = async (userId) => {
        try {
            setLoading(true);
            const [jobsResponse, applicationsResponse] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/jobs", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }),
                axios.get(`http://127.0.0.1:8000/api/users/${userId}/applications`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }),
            ]);
            setJobs(jobsResponse.data);
            setUserApplications(applicationsResponse.data);
        } catch (error) {
            setError("Error fetching student data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanyData = async (userId) => {
        try {
            setLoading(true);
            const companyJobsResponse = await axios.get(`http://127.0.0.1:8000/api/companies/${userId}/jobs`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setCompanyJobs(companyJobsResponse.data);
        } catch (error) {
            setError("Error fetching company jobs.");
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (jobId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setCompanyJobs(companyJobs.filter(job => job.id !== jobId));
        } catch (error) {
            setError("Error deleting the job.");
        }
    };

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        const userId = localStorage.getItem("user_id");

        if (userRole && userId) {
            setRole(userRole);
            if (userRole === "student") {
                fetchStudentData(userId);
            } else if (userRole === "company") {
                fetchCompanyData(userId);
            }
        } else {
            setError("User not found or not logged in.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen p-6 flex items-center justify-center">
            {role === "student" ? (
                <JobList jobs={jobs} userApplications={userApplications} />
            ) : role === "company" ? (
                <motion.div
                    className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg space-y-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 2 }} // Increased duration for slower animation
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Your Posted Jobs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {companyJobs.length > 0 ? (
                            companyJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out p-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 2 }} // Slower animation for job items
                                >
                                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                    <p className="text-gray-600 mb-4">{job.description}</p>
                                    <div className="flex justify-between text-gray-500 mb-4">
                                        <p><strong>Location:</strong> {job.location}</p>
                                        <p><strong>Type:</strong> {job.type}</p>
                                    </div>
                                    <p className="text-lg font-bold mb-2"><strong>Salary:</strong> ${job.salary}</p>
                                    <p className="text-gray-500 mb-4"><strong>Applications:</strong> {job.applications_count}</p>
                                    <Link
                                        to={`/jobs/${job.id}/applications`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View applicants
                                    </Link>
                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="mt-4 text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">You haven't posted any jobs yet.</p>
                        )}
                    </div>
                </motion.div>
            ) : (
                <p className="text-center text-red-500">Unauthorized access.</p>
            )}
        </div>
    );
};

export default Page1;
