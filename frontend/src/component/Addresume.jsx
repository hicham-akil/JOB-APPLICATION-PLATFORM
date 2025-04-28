import React, { useState } from 'react';
import axios from 'axios';

const AddResume = () => {
  const [resume, setResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert('Please select a resume file before uploading.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}` ,
        },
      });
      console.log('Resume uploaded successfully:', response.data);
      setShowModal(false); // Close modal after success
      setResume(null); // Reset file
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        Add Resume
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Resume'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResume;
