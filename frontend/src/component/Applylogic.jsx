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
        setFormData((prevData) => ({
            ...prevData,
            name: storedName,
            prenom: storedPrenom,
            email: storedEmail,
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
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
                Apply Now
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-center">Step {step}/4</h2>

                        {message && <p className="text-red-500 text-center mb-3">{message}</p>}

                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                                    <input type="text" name="name" value={formData.name} disabled className="input-field" />
                                    <input type="text" name="prenom" value={formData.prenom} disabled className="input-field" />
                                    <input type="email" name="email" value={formData.email} disabled className="input-field" />
                                    <input type="text" name="cin" placeholder="CIN" value={formData.cin} onChange={handleChange} className="input-field" />
                                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input-field" />
                                    <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className="input-field" />
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Job Details</h3>
                                    <input type="text" name="expectedSalary" placeholder="Expected Salary" value={formData.expectedSalary} onChange={handleChange} className="input-field" />
                                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" />
                                    <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="input-field"></textarea>
                                    <textarea name="education" placeholder="Education" value={formData.education} onChange={handleChange} className="input-field"></textarea>
                                    <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="input-field" />
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Attachments & Links</h3>
                                    <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="input-field" />
                                    <textarea name="coverLetter" placeholder="Cover Letter" value={formData.coverLetter} onChange={handleChange} className="input-field"></textarea>
                                    <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="input-field" />
                                    <input type="text" name="github" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} className="input-field" />
                                    <input type="text" name="portfolio" placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} className="input-field" />
                                </div>
                            )}

                            {step === 4 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Review & Submit</h3>
                                    <p><strong>Name:</strong> {formData.name} {formData.prenom}</p>
                                    <p><strong>Email:</strong> {formData.email}</p>
                                    <p><strong>Phone:</strong> {formData.phone}</p>
                                    <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
                                    <p><strong>GitHub:</strong> {formData.github}</p>
                                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg mt-4 w-full">
                                        Submit Application
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-between mt-4">
                                {step > 1 && (
                                    <button type="button" onClick={() => setStep(step - 1)} className="btn-gray">
                                        Previous
                                    </button>
                                )}
                                {step < 4 && (
                                    <button type="button" onClick={() => setStep(step + 1)} className="btn-blue">
                                        Next
                                    </button>
                                )}
                                {step === 1 && (
                                    <button onClick={() => setShowModal(false)} className="text-red-500">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplyForm;
