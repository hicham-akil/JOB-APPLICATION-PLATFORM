import React from 'react';
import { FaQuestionCircle, FaEnvelope } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2 text-blue-600">
        <FaQuestionCircle /> About Us
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg text-gray-600">
          Founded in [Year], we set out with a vision to build a platform that bridges the gap between students looking for internships and full-time roles and companies searching for skilled professionals. We believe in creating a seamless, user-friendly experience for both sides of the job market.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="space-y-3">
          <li className="text-lg text-gray-600"><strong>Innovation:</strong> We strive to continuously improve the job search experience.</li>
          <li className="text-lg text-gray-600"><strong>Integrity:</strong> We are committed to providing accurate, up-to-date listings.</li>
          <li className="text-lg text-gray-600"><strong>Support:</strong> We are here for both job seekers and employers, providing ongoing support.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-lg text-gray-600">
          The [Your Website Name] team is made up of passionate individuals who are committed to improving the job search process. Our team includes experts in web development, user experience, customer support, and more.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
        <p className="text-lg text-gray-600">
          With our platform, you can easily apply for jobs, post openings, and connect with potential employers or employees. We ensure a seamless, secure, and user-friendly experience for both students and companies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="flex items-center gap-2 text-lg text-gray-600">
          <FaEnvelope className="text-blue-600" /> <strong>Email Support:</strong> For further assistance, please email us at{' '}
          <a href="mailto:support@yourwebsite.com" className="text-blue-600 underline">support@yourwebsite.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p className="text-lg text-gray-600">Reach out to us anytime, and we'll be happy to assist!</p>
      </section>
    </div>
  );
};

export default AboutUs;
