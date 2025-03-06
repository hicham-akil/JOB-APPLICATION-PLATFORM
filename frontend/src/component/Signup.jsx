import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    role: 'student',
    schoolOrCompanyName: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.firstName || !formData.lastName)) {
      setError("First name and last name are required");
      return;
    }
    if (step === 2 && (!formData.age || !formData.schoolOrCompanyName)) {
      setError("Age and school/company name are required");
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.firstName || !formData.lastName || !formData.age || !formData.schoolOrCompanyName || !formData.email || !formData.password || !formData.password_confirmation) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      alert('User registered successfully');
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.errors || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{typeof error === 'object' ? JSON.stringify(error) : error}</p>}
      
      <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <select
                name="role"
                onChange={handleChange}
                value={formData.role}
                className="w-full p-3 border rounded-md"
              >
                <option value="student">Student</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="schoolOrCompanyName"
                placeholder={formData.role === 'student' ? "School Name" : "Company Name"}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
          </>
        )}

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span className="ml-2">Signing Up...</span>
            </div>
          ) : (
            step === 3 ? 'Sign Up' : 'Next'
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
