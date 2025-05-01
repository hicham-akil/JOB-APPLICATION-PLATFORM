import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplyForm = ({ jobId }) => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    email: "",
    cin: "",
    phone: "",
    nationality: "",
    expectedSalary: "",
    startDate: "",
    experience: "",
    education: "",
    skills: "",
    resume: null,
    coverLetter: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedPrenom = localStorage.getItem("prenom") || "";
    const storedEmail = localStorage.getItem("email") || "";
    const storedresume = localStorage.getItem("resumeName") || "";
    console.log(storedresume)
    setFormData((prev) => ({
      ...prev,
      name: storedName,
      prenom: storedPrenom,
      email: storedEmail,
      resume:storedresume
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setMessage("User ID is missing.");
      return;
    }

    const applicationData = new FormData();
    Object.keys(formData).forEach((key) => {
      applicationData.append(key, formData[key]);
    });
    applicationData.append("user_id", userId);
    applicationData.append("job_id", jobId);

    try {
      await axios.post("http://127.0.0.1:8000/api/applications", applicationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Application submitted successfully!");
      setTimeout(() => {
        setShowModal(false);
        setStep(1);
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit application.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
      >
        Apply Now
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Step {step}/4</h2>

            {message && <p className="text-center text-red-500 mb-3">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Personal Information</h3>
                  <div className="space-y-3">
                    <input type="text" name="name" value={formData.name} disabled className="input-field" />
                    <input type="text" name="prenom" value={formData.prenom} disabled className="input-field" />
                    <input type="email" name="email" value={formData.email} disabled className="input-field" />
                    <input type="text" name="cin" placeholder="CIN" value={formData.cin} onChange={handleChange} className="input-field" />
                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input-field" />
                    <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className="input-field" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Job Details</h3>
                  <div className="space-y-3">
                    <input type="text" name="expectedSalary" placeholder="Expected Salary" value={formData.expectedSalary} onChange={handleChange} className="input-field" />
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" />
                    <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="input-field"></textarea>
                    <textarea name="education" placeholder="Education" value={formData.education} onChange={handleChange} className="input-field"></textarea>
                    <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="input-field" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Attachments & Links</h3>
                  <div className="space-y-3">
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="input-field" value={formData.resume} />
                    <textarea name="coverLetter" placeholder="Cover Letter" value={formData.coverLetter} onChange={handleChange} className="input-field"></textarea>
                    <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="input-field" />
                    <input type="text" name="github" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} className="input-field" />
                    <input type="text" name="portfolio" placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} className="input-field" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Review & Submit</h3>
                  <div className="text-gray-700 dark:text-gray-200 space-y-2">
                    <p><strong>Name:</strong> {formData.name} {formData.prenom}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
                    <p><strong>GitHub:</strong> {formData.github}</p>
                  </div>
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mt-6 w-full transition duration-300">
                    Submit Application
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition duration-300"
                  >
                    Previous
                  </button>
                )}
                {step < 4 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>

            {/* Close Modal Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForm;
