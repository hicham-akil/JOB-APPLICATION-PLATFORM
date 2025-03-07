import React from "react";
import JobSearch from "./Search";

const HomePage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <JobSearch />
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in">
                Welcome to JobFinder
            </h1>

            <section className="text-center mb-8 animate-fade-in">
                <p className="text-lg mb-4 text-gray-700">
                    Your one-stop solution for finding the best jobs in the industry. Search, apply, and take the next step in your career.
                </p>
                <p className="text-md text-gray-600">
                    Whether you are looking for full-time, part-time, or remote work, we have something for everyone. Explore job listings from top companies around the world.
                </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg shadow-lg mb-8 animate-bounce-in">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Step 1</h3>
                        <p className="mt-2 text-gray-600">Search for jobs by title, location, or company.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Step 2</h3>
                        <p className="mt-2 text-gray-600">Apply to your desired jobs with just a few clicks.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Step 3</h3>
                        <p className="mt-2 text-gray-600">Get hired! Start your new career today.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;