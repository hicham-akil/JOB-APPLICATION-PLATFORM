import React, { useState } from "react";
import { FaQuestionCircle, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";

const HelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I sign up?",
      answer:
        "To sign up, click the 'Sign Up' button on the top-right corner of the homepage. You can choose between signing up as a student or as a company. Fill out the required details, and you're good to go!",
    },
    {
      question: "How can I apply for a job?",
      answer:
        "To apply for a job, browse through the available listings on the job portal. When you find a job you're interested in, click 'Apply' and follow the instructions.",
    },
    {
      question: "How do companies post a job?",
      answer:
        "If you’re a company, you can post a job by signing in to your company account and navigating to the 'Post a Job' section. Fill out the job details and submit your listing.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "Click the 'Forgot Password' link on the sign-in page, enter your email address, and we'll send you instructions on how to reset your password.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20"> 
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaQuestionCircle className="text-blue-500" /> Welcome to the Help Center
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 bg-white cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{faq.question}</p>
                {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openFAQ === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Support Options</h2>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-600" />{" "}
          <strong>Email Support:</strong> For further assistance, please email us at{" "}
          <a href="mailto:support@yourwebsite.com" className="text-blue-600 underline">
            support@yourwebsite.com
          </a>
          .
        </p>
        <p>
          <strong>Live Chat:</strong> You can also reach out to us via live chat (available 9 AM - 6 PM).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p>Reach out to us anytime, and we'll be happy to assist!</p>
      </section>
    </div>
  );
};

export default HelpCenter;
