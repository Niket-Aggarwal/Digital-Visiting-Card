import React from 'react'
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-black via-slate-950 to-blue-950">
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
            <div className="relative z-10 w-[90%] max-w-lg rounded-3xl border border-blue-500/20 bg-white/5 p-10 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(37,99,235,0.25)]">
                <h1 className="text-8xl font-extrabold text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]">
                    404
                </h1>
                <h2 className="mt-4 text-3xl font-bold text-white">
                    Page Not Found
                </h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                    Oops! The page you're looking for doesn't exist or may have been moved.
                </p>
                <Link to="/"
                    className="mt-8 inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(37,99,235,0.5)]"
                >
                    <FaHome />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;