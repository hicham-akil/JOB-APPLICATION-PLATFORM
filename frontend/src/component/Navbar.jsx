import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import ApplicationNotification from "./ApplicationNotification"; // Import the component

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);

        if (response.data.profile && response.data.profile.profile_picture) {
          const profilePicUrl = `http://127.0.0.1:8000/storage/${response.data.profile.profile_picture}`;
          setProfilePicture(profilePicUrl);
          localStorage.setItem("profilePicture", profilePicUrl);
        } else {
          setProfilePicture("/default-profile.png");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold">
              MyApp
            </Link>
            <span>Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            MyApp
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
            <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
          </div>

          {role === "company" && (
            <Link to="/jobform" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Go to Job Form
            </Link>
          )}

          {/* Display ApplicationNotification only for students */}
          {role === "student" && <ApplicationNotification />}

          {user && (
            <div className="flex items-center space-x-4">
              <img
                src={profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="text-sm font-semibold">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
