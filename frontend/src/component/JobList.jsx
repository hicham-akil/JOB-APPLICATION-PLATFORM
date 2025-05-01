import React from "react";
import Applylogic from "./Applylogic";
import axios from "axios";

const JobList = ({ jobs, userApplications = [] }) => {
    const isApplied = (jobId) => {
        return userApplications.some(application => application.job_id === jobId);
    };

    const deleteApply = async (jobId) => {
        try {
            const token = localStorage.getItem("token"); 

            const resp = await axios.delete(`http://127.0.0.1:8000/api/applications/${jobId}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });

            if (resp.status === 200) {
                console.log("Application deleted successfully");
            } else {
                console.log("Failed to delete application");
            }
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-opacity-90 p-6 rounded-lg shadow-lg space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Available Jobs</h2>
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => {
                        return (
                            <div
                                key={job.id}
                                className="bg-gray-100 rounded-lg shadow-lg p-6"
                            >
                                <h3 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">{job.title}</h3>

                                <div className="space-y-4">
                                    <p className="text-gray-700">{job.description}</p>
                                    <div className="flex justify-between text-gray-600">
                                        <p><strong>Location:</strong> {job.location}</p>
                                        <p><strong>Type:</strong> {job.type}</p>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800"><strong>Salary:</strong> ${job.salary}</p>

                                    {isApplied(job.id) ? (
                                        <>
                                            <p className="text-green-500 font-semibold">✅ You have already applied for this job</p>
                                            <button 
                                                onClick={() => deleteApply(job.id)} 
                                                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
                                            >
                                                Cancel Application
                                            </button>
                                        </>
                                    ) : (
                                        <Applylogic jobId={job.id} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-600">No job offers available.</p>
            )}
        </div>
    );
};

export default JobList;
