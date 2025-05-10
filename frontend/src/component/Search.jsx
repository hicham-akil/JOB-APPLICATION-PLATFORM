import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobSearch = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim() !== "" || location.trim() !== "") {
                fetchJobs();
            } else {
                setJobs([]);
            }
        }, 300); // debounce input

        return () => clearTimeout(delayDebounce);
    }, [query, location]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/jobs/search", {
                params: {
                    query,
                    location,
                },
            });
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };

    const handleSelectJob = (id) => {
        setQuery("");
        setLocation("");
        setJobs([]);
        navigate(`/jobs/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 pt-20">
            <div className="p-4 relative flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search for a job title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-500 text-black p-2 rounded-2xl w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:italic"
                />

                <input
                    type="text"
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-500 text-black p-2 rounded-2xl w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:italic"
                />
            </div>

            {jobs.length > 0 && (
                <ul className="absolute bg-white mt-4 z-10 border w-full sm:w-[75%] max-w-4xl rounded shadow-lg mx-auto">
                    {jobs.map((job) => (
                        <li
                            key={job.id}
                            className="p-2 hover:bg-blue-100 text-black cursor-pointer"
                            onClick={() => handleSelectJob(job.id)}
                        >
                            {job.title} - {job.location}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobSearch;
