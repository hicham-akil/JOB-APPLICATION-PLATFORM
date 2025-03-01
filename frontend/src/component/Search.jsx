import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobSearch = () => {
    const [query, setQuery] = useState("");
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (value) => {
        setQuery(value);
        if (value.length > 0) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/jobs/search?query=${value}`);
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs", error);
            }
        } else {
            setJobs([]);
        }
    };

    const handleSelectJob = (id) => {
        navigate(`/jobs/${id}`); // Navigate to job details page
    };

    return (
        <div className="p-4 relative">
            <input
                type="text"
                placeholder="Search for a job..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="border p-2 rounded w-64"
            />

            {jobs.length > 0 && (
                <ul className="absolute bg-white border w-64 mt-1 rounded shadow-lg">
                    {jobs.map((job) => (
                        <li
                            key={job.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectJob(job.id)}
                        >
                            {job.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobSearch;
