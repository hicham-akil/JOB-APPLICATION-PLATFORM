  import { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  function SignIn() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
        
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Token saved:', token);
        
        const email = response.data.user.email;
        localStorage.setItem('email', email);
        const role = response.data.user.role;
        localStorage.setItem('role', role);
        console.log(role);
        
        const name = response.data.user.name;
        const prenom = response.data.user.prenom;
        console.log(name  )
        console.log(prenom  )
        localStorage.setItem('name', name);
        localStorage.setItem('prenom', prenom);
        const userId = response.data.user.id; // Assuming `id` is returned with the user object
        localStorage.setItem('user_id', userId);
        console.log('User ID saved:', userId);

        // Redirect to the dashboard or home page
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials');
      }
    };

    return (
      <div className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  export default SignIn;
