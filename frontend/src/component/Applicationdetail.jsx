import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import StatusChanger from "./StatusChanger"; 
const Applicationdetail = () => {
    const [applications, setApplications] = useState([]);
    const { jobId } = useParams(); // Get the jobId from the URL

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/jobs/${jobId}/applications`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, [jobId]);
    const handleStatusUpdate = (id, newStatus) => {
        setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Applicants for Job #{jobId}</h2>

            {applications.length > 0 ? (
                <ul className="space-y-4">
                    {applications.map((application) => (
                        <li key={application.id} className="border-b pb-4">
                            <h3 className="text-xl font-semibold">{application.name} {application.prenom}</h3>
                            <p className="text-gray-600">{application.email}</p>
                            <div className="flex justify-between text-gray-500">
                                <p><strong>Status:</strong> {application.status}</p>
                                <p><strong>Applied On:</strong> {moment(application.created_at).format('LL')}</p>
                            </div>

                            <p><strong>Phone:</strong> {application.phone}</p>
                            <p><strong>CIN:</strong> {application.cin}</p>
                            <p><strong>LinkedIn:</strong> <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{application.linkedin}</a></p>
                            <p><strong>Portfolio:</strong> <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{application.portfolio}</a></p>
                            <p><strong>Expected Salary:</strong> {application.expected_salary}</p>
                            <p><strong>Start Date:</strong> {moment(application.start_date).format('LL')}</p>
                            <p><strong>Experience:</strong> {application.experience}</p>
                            <p><strong>Education:</strong> {application.education}</p>
                            <p><strong>Skills:</strong> {application.skills}</p>
                            <p><strong>Interview Availability:</strong> {application.interview_availability}</p>
                            <p><strong>Referral Source:</strong> {application.referral_source}</p>
                            <p><strong>Relocate:</strong> {application.relocate ? 'Yes' : 'No'}</p>
                            <p><strong>Languages:</strong> {application.languages}</p>
                            <p><strong>GitHub:</strong> <a href={application.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{application.github}</a></p>
                            <p><strong>Nationality:</strong> {application.nationality}</p>

                            {application.resume && (
                                <a
                                    href={`http://127.0.0.1:8000/storage/${application.resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View Resume
                                </a>
                            )}

<StatusChanger
applicationId={application.id}
currentStatus={application.status}
onUpdate={handleStatusUpdate}
/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No applications yet.</p>
            )}
        </div>
    );
};

export default Applicationdetail;
