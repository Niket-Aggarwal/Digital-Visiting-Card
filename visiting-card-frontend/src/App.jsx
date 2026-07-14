import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./Utility/Functions";

import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Login from "./Pages/Login";
import ForgetPassword from "./Pages/ForgetVerify";
import ResetPassword from "./Pages/ResetPassword";
import Signup from "./Pages/Signup";
import Signupverify from "./Pages/SignupVerify";

import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Manage from "./Pages/Manage";
import Layout from "./Pages/Layout";
import Feedback from "./Pages/Feedback"

import PrivacyPolicy from "./Components/Other/Privacy";
import TermsAndConditions from "./Components/Other/Term";
import NotFound from "./Pages/NotFound";

import PublicRoute from "./Context/PublicRoute";
import ProtectedRoute from "./Context/ProtectedRoute";

function App() {

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-950 to-blue-950 -z-50">
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/" element={<PublicRoute><Auth /></PublicRoute>}>
                    <Route path="login" element={<Login />} />
                    <Route path="forget-verify" element={<ForgetPassword />} />
                    <Route path="password-reset" element={<ResetPassword />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="verifyotp" element={<Signupverify />} />
                </Route>
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="manage" element={<Manage />} />
                    <Route path="layout" element={<Layout />} />
                    <Route path="feedback" element={<Feedback />} />
                </Route>
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/term" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;