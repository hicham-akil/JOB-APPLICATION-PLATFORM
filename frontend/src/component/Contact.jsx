import { useState } from "react";

export default function ContactUs() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: name || "",  
    email: email || "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You need to be logged in!");
      return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });
          
      

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
