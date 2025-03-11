import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplicationNotification = () => {
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchApplicationCounts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/applications/count",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        setAcceptedCount(response.data.acceptedCount);
        setRejectedCount(response.data.rejectedCount);
      } catch (err) {
        console.error("Error fetching application counts:", err);
        setError("Failed to fetch application counts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationCounts();
  }, []);

  const handleClick = () => {
    navigate("/applications"); 
  };

  return (
    <div className="fixed top-4 right-4">
      <button
        className="relative cursor-pointer duration-300 transition-all hover:bg-blue-300 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        onClick={handleClick} 
      >
        Applications
        {(acceptedCount > 0 || rejectedCount > 0) && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {acceptedCount + rejectedCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default ApplicationNotification;
