import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<>
        <JobSearch/>
        <AppInfo></AppInfo>
        <Page1></Page1>
        </>} />
        <Route path="/jobform" element={<JobForm />} />
        <Route path="/jobs/:id" element={<JobDetails/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/job/:jobId/details" element={<JobOfferDetails />} />
        <Route path="/jobs/:jobId/applications" element={<Applicationdetail></Applicationdetail>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
