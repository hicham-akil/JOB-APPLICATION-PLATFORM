import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

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

        setAcceptedCount(response.data?.acceptedCount || 0);
        setRejectedCount(response.data?.rejectedCount || 0);
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
        className="relative flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg transition-all duration-300 
        hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBell} className="text-xl" />

        {(acceptedCount > 0 || rejectedCount > 0) && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce">
            {acceptedCount + rejectedCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default ApplicationNotification;
