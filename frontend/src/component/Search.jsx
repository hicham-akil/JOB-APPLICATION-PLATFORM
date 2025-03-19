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
        setQuery(""); 
        setJobs([]); 
        navigate(`/jobs/${id}`);
    };
    

    return (
        <div className="p-4 relative flex justify-center items-center">
            <input
                type="text"
                placeholder="Search for a job..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-gray-500 text-black p-2 rounded-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:italic"
            />

            {jobs.length > 0 && (
                <ul className="absolute bg-white mt-20 z-10 border w-full max-w-xs sm:max-w-md lg:max-w-lg rounded shadow-lg">
                    {jobs.map((job) => (
                        <li
                            key={job.id}
                            className="p-2 hover:bg-blue-100 text-black cursor-pointer"
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
