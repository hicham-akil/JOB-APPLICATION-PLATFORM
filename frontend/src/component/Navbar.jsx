import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import ApplicationNotification from "./ApplicationNotification";
import JobSearch from "./Search";
import OIP from "../images/oip.jpeg"; // Fallback profile picture

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
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
      <nav className="bg-blue-200 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/Firstpage" className="text-2xl font-bold">
              FIND
            </Link>
            <span>Loading...</span>
          </div>
        </div>
      </nav>
    );
  }
  const handleLogout = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('name');
  localStorage.removeItem('prenom');
  localStorage.removeItem('user_id');
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  

  return (
    <nav className="bg-white text-gray-900 shadow-md fixed w-full z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/Firstpage"
            className="text-3xl text-blue-500 font-bold hover:text-blue-600 transition-colors"
          >
            FIND
          </Link>

          <div className="hidden md:flex items-center space-x-6">
          <Link to="/about-us" className="text-gray-900 hover:text-blue-600">About Us</Link>
            <Link to="/help-center" className="text-gray-900 hover:text-blue-600">Help Center</Link>
            <Link to="/Contact" className="text-gray-900 hover:text-blue-600">Contact</Link>
          

          </div>

          {role === "company" && (
            <Link
              to="/jobform"
              className="hover:text-gray-500 text-gray-900 font-semibold transition-colors"
            >
              Go to Job Form
            </Link>
          )}

          {role === "student" && <ApplicationNotification />}

          {user && (
            <div className="flex items-center space-x-4 relative">
              <img
                src={profilePicture || OIP}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => window.location.href = "/profile"}
              />
              <span
                className="text-sm font-semibold cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name}
              </span>
              {showDropdown && (
  <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-48">
    {!user && (
      <>
        <Link to="/signup" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
          Sign Up
        </Link>
        <Link to="/signin" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
          Sign In
        </Link>
      </>
    )}
    {user && (
      <>
      <button onClick={handleLogout} className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors w-full text-left">
        Logout
      </button>
        <Link to="/signin" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors">
          Sign In
        </Link>
      </>
    )}
  </div>
)}

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
