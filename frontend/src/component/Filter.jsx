import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = () => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState('');

  const fetchJobsByLocation = async (loc) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/jobs/location/${loc}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    if (location) fetchJobsByLocation(location);
  }, [location]);

  return (
    <div>
      <select
        className="p-2 border rounded"
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Select Location</option>
        <option value="Casa">Casa</option>
        <option value="Rabat">Rabat</option>
        <option value="Tanger">Tanger</option>
        {/* Add more cities here */}
      </select>

      <div className="mt-4">
        {jobs.map(job => (
          <div key={job.id} className="p-4 border mb-2 rounded">
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.company} - {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
