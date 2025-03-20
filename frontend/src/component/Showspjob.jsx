import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApplyForm from "./Applylogic";
import { motion } from "framer-motion";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}`);
        setJob(response.data);
        setJobDetail(response.data.job_detail);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobData();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading job details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20"> 
    <motion.div
    className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {job.description}
      </p>
      <p className="text-gray-700">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-700">
        <strong>Type:</strong> {job.type}
      </p>
      <p className="text-gray-700">
        <strong>Salary:</strong> ${job.salary}
      </p>

      {jobDetail && (
        <motion.div
        className="mt-6 p-6 bg-gray-100 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Details</h2>
          <p className="text-gray-700">
            <strong>Requirements:</strong> {jobDetail.requirements}
          </p>
          <p className="text-gray-700">
            <strong>Responsibilities:</strong> {jobDetail.responsibilities}
          </p>
          <p className="text-gray-700">
            <strong>Company Website:</strong>{" "}
            <a
              href={jobDetail.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              >
              {jobDetail.company_website}
            </a>
          </p>
          <p className="text-gray-700">
            <strong>Company Values:</strong> {jobDetail.company_values}
          </p>
        </motion.div>
      )}

      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ApplyForm jobId={id} />
      </motion.div>
    </motion.div>
        </div>
  );
};

export default JobDetail;
