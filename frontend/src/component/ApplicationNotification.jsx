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
        className="relative cursor-pointer duration-300 transition-all bg-blue-500 text-white px-4 py-2 rounded-md shadow-md flex items-center"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBell} className="mr-2" />
      
        {(acceptedCount > 0 || rejectedCount > 0) && (
          <span className="absolute -top-4 -right-2 text-red-700 text-xl font-bold px-2 py-1 rounded-full">
            {acceptedCount + rejectedCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default ApplicationNotification;
