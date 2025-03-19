import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p>Founded in [Year], we set out with a vision to build a platform that bridges the gap between students looking for internships and full-time roles and companies searching for skilled professionals. We believe in creating a seamless, user-friendly experience for both sides of the job market.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul>
          <li><strong>Innovation:</strong> We strive to continuously improve the job search experience.</li>
          <li><strong>Integrity:</strong> We are committed to providing accurate, up-to-date listings.</li>
          <li><strong>Support:</strong> We are here for both job seekers and employers, providing ongoing support.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p>The [Your Website Name] team is made up of passionate individuals who are committed to improving the job search process. Our team includes experts in web development, user experience, customer support, and more.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
        <p>With our platform, you can easily apply for jobs, post openings, and connect with potential employers or employees. We ensure a seamless, secure, and user-friendly experience for both students and companies.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>For more information or to get in touch with our team, feel free to contact us.</p>
      </section>
    </div>
  );
};

export default AboutUs;
