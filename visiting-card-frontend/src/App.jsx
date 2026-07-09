import React from 'react'
import { Routes, Route } from "react-router-dom";
import ScrollToTop from './Utility/Functions';

import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import PrivacyPolicy from "./Components/Other/Privacy";
import TermsAndConditions from "./Components/Other/Term";
import NotFound from "./Pages/NotFound";

function App() {
    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-black via-slate-950 to-blue-950 -z-50">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/term" element={<TermsAndConditions />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;