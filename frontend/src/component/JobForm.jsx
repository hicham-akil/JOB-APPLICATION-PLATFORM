import React, { useState } from "react";
import axios from "axios";

const JobForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        type: "",
        salary: "",
        requirements: "",
        responsibilities: "",
        company_website: "",
        company_values: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const userId = localStorage.getItem("user_id");
            const jobData = { ...formData, user_id: userId };

            await axios.post("http://127.0.0.1:8000/api/jobs", jobData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            setMessage("Job posted successfully!");

            setFormData({
                title: "",
                description: "",
                location: "",
                type: "",
                salary: "",
                requirements: "",
                responsibilities: "",
                company_website: "",
                company_values: "",
            });
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to post job.");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-blue-500">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border-2 border-gray-100">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Post a Job</h2>

                <form onSubmit={handleSubmitJob} className="space-y-6">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="space-y-2">
                            <label
                                htmlFor={key}
                                className="text-sm font-medium text-gray-700"
                            >
                                {key.replace("_", " ").toUpperCase()}
                            </label>
                            <input
                                type={key === "salary" ? "number" : "text"}
                                id={key}
                                placeholder={`Enter ${key.replace("_", " ")}`}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Post Job
                    </button>
                </form>

                {message && (
                    <p
                        className={`text-center mt-4 text-lg ${
                            message.includes("successfully") ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default JobForm;
