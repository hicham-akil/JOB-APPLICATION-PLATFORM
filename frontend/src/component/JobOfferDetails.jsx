import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobOfferDetails = () => {
  const { jobId } = useParams(); 
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/jobs/${jobId}/details`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setJob(response.data.job);
        setJobDetails(response.data.jobDetails);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Offer Details</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && job && (
        <div className="border p-4 rounded-md shadow-md bg-white">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-700">Company: {job.company_name || "N/A"}</p>
          <p className="text-gray-700">Location: {job.location || "Remote"}</p>
          <p className="text-gray-700">Salary: ${job.salary || "Not specified"}</p>
          <p className="mt-4">{job.description}</p>

          {/* Display Job Details */}
          {jobDetails && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <h3 className="font-semibold">Additional Details</h3>
              <p><strong>Requirements:</strong> {jobDetails.requirements || "Not specified"}</p>
              <p><strong>Responsibilities:</strong> {jobDetails.responsibilities || "Not specified"}</p>
              <p><strong>Company Website:</strong> <a href={jobDetails.company_website} target="_blank" rel="noopener noreferrer">{jobDetails.company_website || "Not available"}</a></p>
              <p><strong>Company Values:</strong> {jobDetails.company_values || "Not specified"}</p>
              <p><strong>How to Apply:</strong> {jobDetails.how_to_apply || "Not specified"}</p>
            </div>
          )}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default JobOfferDetails;
