import React from 'react'
import { Link } from "react-router-dom";


const Getstart = () => {

    return (
        <>
            <div className="relative overflow-hidden rounded-4xl border border-blue-500/20 bg-white/4 p-10 text-center backdrop-blur-3xl shadow-[0_20px_60px_rgba(37,99,235,0.15)]">
                <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"></div>
                <span className="relative rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                    Your Journey Starts Here
                </span>
                <h2 className="relative mt-8 text-4xl font-extrabold text-white md:text-5xl">
                    Ready to Build
                    <br />
                    <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Your Digital Identity?
                    </span>
                </h2>
                <p className="relative mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
                    Join professionals who want a clean, modern way to showcase their
                    work, connect their platforms, and share everything through one
                    beautiful profile.
                </p>
                <div className="relative mt-10">
                    <Link to="/signup" className="inline-flex items-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_35px_rgba(37,99,235,0.45)]">
                        Get Started →
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Getstart
