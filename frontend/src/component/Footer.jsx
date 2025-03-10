import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8 mt-8">
      <div className="container mx-auto text-center px-6">
        <p className="text-lg font-semibold">&copy; 2025 Your Company. All rights reserved.</p>

        <div className="mt-4 flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
          <a href="/about" className="hover:text-white transition">About Us</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition">Terms of Service</a>
          <a href="/faq" className="hover:text-white transition">FAQ</a>
        </div>

        <div className="mt-6">
          <p className="text-gray-400">Follow us on:</p>
          <div className="mt-3 flex justify-center gap-4">
            <a href="https://facebook.com" className="text-gray-300 hover:text-white transition text-xl">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="text-gray-300 hover:text-white transition text-xl">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition text-xl">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" className="text-gray-300 hover:text-white transition text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="mt-6 text-gray-400 text-sm">
          <p>Made with ❤️ by Your Company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
