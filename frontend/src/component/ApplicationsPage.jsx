import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import navigation hook

const ApplicationsPage = () => {
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/applications/details",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        setAcceptedJobs(response.data.acceptedJobs);
        setRejectedJobs(response.data.rejectedJobs);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="text-red-500">
          <p>{error}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <h2 className="text-green-600 text-lg font-semibold">Accepted Jobs</h2>
          <ul className="mb-4">
            {acceptedJobs.length > 0 ? (
              acceptedJobs.map((job) => (
                <li
                  key={job.id}
                  className="border p-3 rounded-md mb-2 flex justify-between items-center"
                >
                  <div>
                    <strong>{job.title}</strong> -{" "}
                    <button
                      onClick={() =>
                        navigate(`/company/${job.user.id}`)
                      }
                      className="text-blue-500 hover:underline"
                    >
                      {job.user.name}
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`/job/${job.id}/details`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <p>No accepted jobs</p>
            )}
          </ul>

          <h2 className="text-red-600 text-lg font-semibold">Rejected Jobs</h2>
          <ul>
            {rejectedJobs.length > 0 ? (
              rejectedJobs.map((job) => (
                <li key={job.id} className="border p-3 rounded-md mb-2">
                  <strong>{job.title}</strong> -{" "}
                  <button
                    onClick={() =>
                      navigate(`/company/${job.user.id}`)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {job.user.name}
                  </button>
                </li>
              ))
            ) : (
              <p>No rejected jobs</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;
