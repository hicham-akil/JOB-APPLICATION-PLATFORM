import React, { useState } from "react";
import axios from "axios";

const StatusChanger = ({ applicationId, currentStatus, onUpdate }) => {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

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
            setStatus(newStatus);
            onUpdate(applicationId, newStatus);
        } catch (error) {
            console.error("Error updating status:", error);
        }
        setLoading(false);
    };

    return (
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
    );
};

export default StatusChanger;
