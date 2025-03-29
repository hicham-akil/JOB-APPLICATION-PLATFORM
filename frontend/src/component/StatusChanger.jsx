import React, { useState } from "react";
import axios from "axios";

const StatusChanger = ({ applicationId, currentStatus, onUpdate, jobPosterUserId }) => {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const applicantUserId = localStorage.getItem("user_id"); 

    const handleStatusChange = async (newStatus) => {
        setLoading(true);
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/applications/${applicationId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

          
        } catch (error) {
            console.error("Error updating status or sending message:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
                <select
                    className="border p-2 rounded-md"
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={loading}
                >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                {loading && <span className="text-sm text-gray-500">Updating...</span>}
            </div>


            <button
                onClick={() => handleStatusChange(status)}
                className="border p-2 rounded-md bg-blue-500 text-white"
            >
                Send Status Update
            </button>
        </div>
    );
};

export default StatusChanger;
