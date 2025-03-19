import React from 'react';

const HelpCenter = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to the Help Center</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div>
          <div className="mb-4">
            <p className="font-semibold">1. How do I sign up?</p>
            <p>To sign up, click the 'Sign Up' button on the top-right corner of the homepage. You can choose between signing up as a student or as a company. Fill out the required details, and you're good to go!</p>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold">2. How can I apply for a job?</p>
            <p>To apply for a job, browse through the available listings on the job portal. When you find a job you're interested in, click 'Apply' and follow the instructions.</p>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold">3. How do companies post a job?</p>
            <p>If you’re a company, you can post a job by signing in to your company account and navigating to the 'Post a Job' section. Fill out the job details and submit your listing.</p>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold">4. What if I forget my password?</p>
            <p>Click the 'Forgot Password' link on the sign-in page, enter your email address, and we'll send you instructions on how to reset your password.</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Support Options</h2>
        <p><strong>Email Support:</strong> For further assistance, please email us at <a href="mailto:support@yourwebsite.com" className="text-blue-600">support@yourwebsite.com</a>.</p>
        <p><strong>Live Chat:</strong> You can also reach out to us via live chat (available 9 AM - 6 PM).</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p>Reach out to us anytime, and we'll be happy to assist!</p>
      </section>
    </div>
  );
};

export default HelpCenter;
