    import { useState, useEffect } from "react";
    import axios from "axios";

    export default function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/api/profile", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((response) => {
            setUser(response.data.user);
            setName(response.data.user.name);
            if (response.data.profile) {
              setBio(response.data.profile.bio || "");
              if (response.data.profile.profile_picture) {
                const profilePicUrl = `http://127.0.0.1:8000/storage/${response.data.profile.profile_picture}`;
                localStorage.setItem("profilePicture", profilePicUrl); 
                setPreview(profilePicUrl);
              }
            }
          })
          .catch((error) => console.error(error));
      }, []);
      

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        if (profilePicture) {
            formData.append("profile_picture", profilePicture);
        }
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/profile/update",
                formData,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
                }
            );
            setMessage(response.data.message);
    
            if (response.data.profile.profile_picture) {
                const profilePicUrl = `http://127.0.0.1:8000/storage/${response.data.profile.profile_picture}`;
                localStorage.setItem("profilePicture", profilePicUrl);
                setPreview(profilePicUrl); // Update the preview as well
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to update profile.");
        }
    };
    
    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
            />
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {preview && (
                <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 mt-4 rounded-full border-4 border-gray-200"
                />
            )}
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            Update Profile
            </button>
        </form>
        </div>
    );
    }
