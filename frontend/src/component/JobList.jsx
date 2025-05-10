import { useState, useEffect } from "react";
import axios from "axios";
import Applylogic from "./Applylogic";

const JobList = ({ userApplications = [] }) => {
  const [jobs, setJobs] = useState([]); // Store fetched jobs
  const [locations, setLocations] = useState([]); // Store fetched locations
  const [location, setLocation] = useState(''); // Currently selected location
  const [loadingJobs, setLoadingJobs] = useState(false); // Loading state for jobs
  const [loadingLocations, setLoadingLocations] = useState(false); // Loading state for locations

  // Fetch locations from backend
  const fetchLocations = async () => {
    setLoadingLocations(true); // Start loading locations
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/locations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLocations(response.data); // Assuming response.data is an array of locations
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoadingLocations(false); // Stop loading locations
    }
  };

  // Fetch all jobs or jobs based on location
  const fetchJobs = async (location = '') => {
    setLoadingJobs(true); // Start loading jobs
    try {
      let url = location
        ? `http://127.0.0.1:8000/api/jobs/location/${location}`
        : 'http://127.0.0.1:8000/api/jobs'; // Fetch all jobs if no location filter is applied
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setJobs(response.data); // Assuming response.data contains the job list
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false); // Stop loading jobs
    }
  };

  // Check if the user has applied for the job
  const isApplied = (jobId) => {
    return userApplications.some((application) => application.job_id === jobId);
  };

  // Delete application for a job
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

  // Fetch locations and jobs when the component is mounted
  useEffect(() => {
    fetchLocations();
    fetchJobs(); // Fetch all jobs initially
  }, []);

  // Fetch jobs when location changes
  useEffect(() => {
    fetchJobs(location);
  }, [location]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-opacity-90 p-6 rounded-lg shadow-lg space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Available Jobs</h2>

      {/* Location Filter */}
      <div className="mb-4 text-black">
        <label className="  block text-lg">Select Location:</label>
        <select
          className="p-2 border rounded"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          disabled={loadingLocations}
        >
          <option value="">Select Location</option>
          {locations.length > 0 ? (
            locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))
          ) : loadingLocations ? (
            <option>Loading locations...</option>
          ) : (
            <option>No locations found</option>
          )}
        </select>
      </div>

      {/* Display Jobs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loadingJobs ? (
          <p>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
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
          ))
        ) : (
          <p className="text-center text-gray-600">No job offers available.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
