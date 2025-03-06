import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApplyForm from './Applylogic';

const JobDetail = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false); 

  useEffect(() => {
    // Fetch job data
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      
      <h2>Job Details</h2>
      {jobDetail && (
        <div>
          <p><strong>Requirements:</strong> {jobDetail.requirements}</p>
          <p><strong>Responsibilities:</strong> {jobDetail.responsibilities}</p>
          <p><strong>Company Website:</strong> <a href={jobDetail.company_website} target="_blank" rel="noopener noreferrer">{jobDetail.company_website}</a></p>
          <p><strong>Company Values:</strong> {jobDetail.company_values}</p>
        </div>
      )}

      <button
        onClick={() => setShowApplyForm(true)} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Now
      </button>

      {showApplyForm && <ApplyForm jobId={id}></ApplyForm>}
    </div>
  );
};

export default JobDetail;
