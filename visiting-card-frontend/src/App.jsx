import React from 'react'
import { Routes, Route } from "react-router-dom";
import ScrollToTop from './Utility/Functions';

import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Login from "./Pages/Login"
import ForgetPassword from "./Pages/ForgetVerify"
import ResetPassword from "./Pages/ResetPassword"
import Signup from "./Pages/Signup"
import Signupverify from './Pages/SignupVerify';
import Dashboard from './Pages/Dashboard';
import PrivacyPolicy from "./Components/Other/Privacy";
import TermsAndConditions from "./Components/Other/Term";
import NotFound from "./Pages/NotFound";
import PublicRoute from './Context/PublicRoute';
import ProtectedRoute from './Context/ProtectedRoute';

function App() {

    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-black via-slate-950 to-blue-950 -z-50">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                    <Route path="/" element={<PublicRoute><Auth /></PublicRoute>}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/forget-verify" element={<ForgetPassword />} />
                        <Route path="/password-reset" element={<ResetPassword />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/verifyotp" element={<Signupverify />} />
                    </Route>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/term" element={<TermsAndConditions />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;