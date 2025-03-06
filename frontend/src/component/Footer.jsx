import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
                <div className="mt-4">
                    <a href="/about" className="text-white mx-4 hover:text-gray-400">About Us</a>
                    <a href="/contact" className="text-white mx-4 hover:text-gray-400">Contact</a>
                    <a href="/privacy" className="text-white mx-4 hover:text-gray-400">Privacy Policy</a>
                    <a href="/terms" className="text-white mx-4 hover:text-gray-400">Terms of Service</a>
                    <a href="/faq" className="text-white mx-4 hover:text-gray-400">FAQ</a>
                </div>
                <div className="mt-6">
                    <p className="text-gray-400">Follow us on:</p>
                    <div className="mt-2">
                        <a href="https://facebook.com" className="text-white mx-2 hover:text-gray-400">Facebook</a>
                        <a href="https://twitter.com" className="text-white mx-2 hover:text-gray-400">Twitter</a>
                        <a href="https://linkedin.com" className="text-white mx-2 hover:text-gray-400">LinkedIn</a>
                        <a href="https://instagram.com" className="text-white mx-2 hover:text-gray-400">Instagram</a>
                    </div>
                </div>
                <div className="mt-4 text-gray-400">
                    <p>Made with ❤️ by Your Company</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
