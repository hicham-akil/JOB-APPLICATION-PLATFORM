import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const JobForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        type: "",
        salary: "",
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
            });
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to post job.");
        }
    };

    return (
        <motion.div
            className="w-full h-screen flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Post a Job</h2>

                <form onSubmit={handleSubmitJob} className="space-y-4">
                    <motion.input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    />
                    <motion.input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    />
                    <motion.input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    />
                    <motion.input
                        type="text"
                        placeholder="Type (e.g., Full-time, Part-time)"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    />
                    <motion.input
                        type="number"
                        placeholder="Salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    />
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Post Job
                    </motion.button>
                </form>

                {message && (
                    <motion.p
                        className={`text-center mt-4 ${
                            message.includes("successfully") ? "text-green-500" : "text-red-500"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {message}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};

export default JobForm;
