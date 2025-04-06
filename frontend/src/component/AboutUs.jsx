import React from 'react';
import { FaQuestionCircle, FaEnvelope } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 pt-20 bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-extrabold text-center mb-10 flex items-center justify-center gap-3 text-blue-700">
        <FaQuestionCircle className="text-5xl" /> About Us
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Founded in <span className="font-semibold">[Year]</span>, we set out with a vision to bridge the gap between students looking for internships and full-time roles and companies searching for skilled professionals. We believe in creating a seamless, user-friendly experience for both sides of the job market.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
        <ul className="space-y-4">
          <li className="text-lg text-gray-700 flex">
            <span className="font-semibold text-blue-600 mr-2">•</span> <strong>Innovation:</strong> Continuously improving the job search experience.
          </li>
          <li className="text-lg text-gray-700 flex">
            <span className="font-semibold text-blue-600 mr-2">•</span> <strong>Integrity:</strong> Providing accurate, up-to-date listings.
          </li>
          <li className="text-lg text-gray-700 flex">
            <span className="font-semibold text-blue-600 mr-2">•</span> <strong>Support:</strong> Helping both job seekers and employers with ongoing support.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The <span className="font-semibold">[Your Website Name]</span> team consists of passionate individuals dedicated to improving the job search process. Our team includes web developers, UX designers, and customer support experts.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our platform enables seamless job applications, efficient job postings, and meaningful employer-employee connections. We ensure a secure and user-friendly experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="flex items-center gap-3 text-lg text-gray-700">
          <FaEnvelope className="text-blue-600 text-2xl" /> <strong>Email Support:</strong> 
          <a href="mailto:support@yourwebsite.com" className="text-blue-600 hover:underline">support@yourwebsite.com</a>
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still Need Help?</h2>
        <p className="text-lg text-gray-700">Reach out to us anytime, and we'll be happy to assist!</p>
      </section>
    </div>
  );
};

export default AboutUs;
