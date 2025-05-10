import React from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import SignIn from "./component/Signin"; 
import SignUp from "./component/Signup"; 
import Navbar from "./component/Navbar";
import Page1 from "./component/page1";
import Profile from "./component/Profile";
import Applicationdetail from "./component/Applicationdetail";
import JobForm from "./component/JobForm";
import ApplicationsPage from "./component/ApplicationsPage";
import JobOfferDetails from "./component/JobOfferDetails";
import AppInfo from "./component/Staticomp";
import JobSearch from "./component/Search";
import JobDetails from "./component/Showspjob";
import HomePage from "./component/Home";
import Footer from "./component/Footer";
import bgpc from "./images/bagpc.jpeg";  
import ContactUs from "./component/Contact";
import HelpCenter from "./component/HelpCenter";
import AboutUs from "./component/AboutUs";
import AddResume from "./component/Addresume";
import Filter from "./component/Filter";

function App() {
  const token = localStorage.getItem("token");

  const resumeExists = localStorage.getItem("resume") === "true";
console.log(resumeExists)
  return (
    <>
      <div className="Progressbar"></div>

      <Navbar />
      <Routes>

        <Route path="/" element={token ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {token ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobform" element={<JobForm />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/job/:jobId/details" element={<JobOfferDetails />} />
            <Route path="/jobs/:jobId/applications" element={<Applicationdetail />} />
            <Route path="/jobs/:id" element={<>
              <JobSearch />
              <JobDetails />
            </>} />
            <Route
              path="/Firstpage"
              element={
                <div className="relative w-full min-h-screen bg-cover bg-center text-white">
                  <JobSearch />
                  <Filter/>
                  <AppInfo />
                  <Page1 />
                  {!resumeExists && <AddResume />}
                  <Footer />
                </div>
              }
            />
            <Route path="/add-resume" element={resumeExists ? <Navigate to="/profile" /> : <AddResume />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
