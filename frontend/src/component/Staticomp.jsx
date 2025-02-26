import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import image1 from "../images/image1.jpg"; 

const AppInfo = () => {
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedAppInfo");

    if (!hasVisitedBefore) {
      localStorage.setItem("hasVisitedAppInfo", "true");
    } else {
      setHasVisited(true);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6"
      style={{
        // backgroundImage: `url(${image1})`, 
      }}
    >
      <div className=" bg-opacity-50 w-full h-full flex justify-center items-center p-6">
        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col lg:flex-row">
          <motion.div
            className="lg:w-1/2 p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: hasVisited ? 1 : 1, x: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">
              Join the Future of Recruitment
            </h2>
            <p className="text-gray-700 mb-4">
              Our platform simplifies the recruitment process, connecting the
              right candidates with companies. With an easy-to-navigate interface,
              real-time job notifications, and a streamlined application process,
              we aim to make job hunting and hiring as seamless as possible.
            </p>
            <p className="text-gray-700">
              Whether you are looking for your first job or expanding your team,
              we are here to help. Discover job opportunities that match your
              skills and start applying today!
            </p>
          </motion.div>

          <motion.div
            className="lg:w-1/2 p-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: hasVisited ? 1 : 1, x: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <img
              src={image1} 
              alt="Recruitment"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
