import React from 'react'
import { FaLink, FaUserShield, FaBolt } from "react-icons/fa";

const WhyNexLink = () => {
    return (
        <>
            <div className="mx-auto max-w-3xl text-center" >
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                    Why Choose NexLink?
                </span>
                <h2 id="why-nexlink" className="mt-6 text-4xl font-extrabold text-white md:text-5xl">
                    One Profile.
                    <br />
                    <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Unlimited Opportunities.
                    </span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                    Stop sharing multiple links everywhere.
                    Build one professional digital identity that connects your
                    portfolio, social media, projects and contact information in
                    one beautiful profile.
                </p>
            </div >
            <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white/4 p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400 hover:shadow-[0_15px_40px_rgba(37,99,235,0.25)] lg:p-8">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20"></div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                        <FaLink size={24} />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-white lg:text-2xl">
                        One Link
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400 lg:text-base">
                        Replace dozens of URLs with one beautiful NexLink profile.
                    </p>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white/4 p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_15px_40px_rgba(6,182,212,0.25)] lg:p-8">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-500/20"></div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                        <FaBolt size={24} />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-white lg:text-2xl">
                        Professional
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400 lg:text-base">
                        Build your modern digital identity with a professional profile.
                    </p>
                </div>
                <div className="group relative col-span-2 overflow-hidden rounded-3xl border border-blue-500/20 bg-white/4 p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400 hover:shadow-[0_15px_40px_rgba(99,102,241,0.25)] lg:col-span-1 lg:p-8">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl transition duration-500 group-hover:bg-indigo-500/20"></div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                        <FaUserShield size={24} />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-white lg:text-2xl">
                        Secure
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400 lg:text-base">
                        Keep your digital identity secure with reliable authentication.
                    </p>
                </div>
            </div>
        </>
    );
};

export default WhyNexLink;