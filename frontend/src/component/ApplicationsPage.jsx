import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplicationsPage = () => {
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        setAcceptedJobs(Array.isArray(response.data.acceptedJobs) ? response.data.acceptedJobs : []);
        setRejectedJobs(Array.isArray(response.data.rejectedJobs) ? response.data.rejectedJobs : []);
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Applications
      </h1>

      {loading && (
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center bg-red-100 p-4 rounded-md">
          <p>{error}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-3 hover:bg-red-600 transition-all"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Accepted Jobs Section */}
          <h2 className="text-green-600 text-xl font-semibold mt-6">
            ✅ Accepted Jobs
          </h2>
          <div className="grid gap-4">
            {acceptedJobs.length > 0 ? (
              acceptedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-green-400 p-4 rounded-lg shadow-md bg-green-50 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600">
                      By{" "}
                      <button
                        onClick={() => navigate(`/company/${job.user?.id}`)}
                        className="text-blue-500 hover:underline"
                      >
                        {job.user?.name || "Unknown Company"}
                      </button>
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/job/${job.id}/details`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No accepted jobs</p>
            )}
          </div>

          {/* Rejected Jobs Section */}
          <h2 className="text-red-600 text-xl font-semibold mt-6">
            ❌ Rejected Jobs
          </h2>
          <div className="grid gap-4">
            {rejectedJobs.length > 0 ? (
              rejectedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-red-400 p-4 rounded-lg shadow-md bg-red-50"
                >
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">
                    By{" "}
                    <button
                      onClick={() => navigate(`/company/${job.user?.id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      {job.user?.name || "Unknown Company"}
                    </button>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No rejected jobs</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;
