import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import Main from "../images/Main.jpg";  
import { FaArrowRight } from "react-icons/fa"; 

const HomePage = () => {
  const text = "Your Dream Job is Waiting for You";
  const words = text.split(" "); 

  const [visibleWords, setVisibleWords] = useState([]);

  useEffect(() => {
    words.forEach((word, index) => {
      setTimeout(() => {
        setVisibleWords((prev) => [...prev, word]); 
      }, index * 500);
    });
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url()})` }}
    >
      <h1 className="text-4xl text-blue-500 font-bold text-center mb-6">
        {visibleWords.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <Link
        to="/Firstpage"
        className="flex items-center  text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
        aria-label="Go to application page"
      >
        <span className="text-2xl text-blue-400">Let's Go to Apply</span>
        <FaArrowRight className="ml-2 text-blue-400 animate-bounce" />
      </Link>
    </div>
  );
};

export default HomePage;
