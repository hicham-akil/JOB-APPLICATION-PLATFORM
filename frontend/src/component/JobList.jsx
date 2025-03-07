import React from "react";
import Applylogic from "./Applylogic";
import { motion } from "framer-motion";
import axios from "axios";

const JobList = ({ jobs, userApplications }) => {
    const isApplied = (jobId) => {
        return userApplications.some(application => application.job_id === jobId);
    };
    const deleteapply= async($jobId)=>{
    
      const resp=axios.post(`http://127.0.0.1:8000/api/applications/{$jobId}/delete`);
        if(resp.status===200){
            consol.log('goodd')
        }else{
            consol.log('bad')
        }
      
    }

    return (
        <div className="w-full max-w-6xl bg-     p-6 rounded-lg shadow-lg space-y-8">
            <h2 className="text-3xl font-bold text-center mb-6">Available Jobs</h2>
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            className=" rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <div className="flex justify-between text-gray-500 mb-4">
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Type:</strong> {job.type}</p>
                            </div>
                            <p className="text-lg font-bold mb-2"><strong>Salary:</strong> ${job.salary}</p>

                            {isApplied(job.id) ? (
                                <p className="text-green-500 font-semibold mb-4">✅ You have already applied for this job</p>
                            ) : (
                                <Applylogic jobId={job.id} />
                            )}
                            <button onClick={()=>deleteapply(job.id)}></button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No job offers available.</p>
            )}
        </div>
    );
};

export default JobList;
