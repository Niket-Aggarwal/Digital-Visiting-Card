import React from 'react'
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const CTA = () => {
    return (
        <>
            <div className="text-center">
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                    Simple Process
                </span>
                <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                    Build Your Identity
                    <br />
                    in Three Steps
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                    Getting started with NexLink is quick, intuitive and designed
                    to help you create a professional digital presence within minutes.
                </p>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
                <div className="w-full max-w-xs rounded-3xl border border-blue-500/20 bg-white/4 p-5 text-center backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-blue-400 lg:max-w-sm lg:p-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-2xl font-bold text-blue-400 lg:h-16 lg:w-16 lg:text-3xl">
                        ①
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">
                        Create Account
                    </h3>
                    <p className="mt-3 text-gray-400">
                        Register securely and create your NexLink profile.
                    </p>
                </div>
                <div className="text-blue-400">
                    <FaArrowDown className="text-3xl lg:hidden" />
                    <FaArrowRight className="hidden text-4xl lg:block" />
                </div>
                <div className="w-full max-w-xs rounded-3xl border border-blue-500/20 bg-white/4 p-5 text-center backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 lg:max-w-sm lg:p-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-2xl font-bold text-cyan-400 lg:h-16 lg:w-16 lg:text-3xl">
                        ②
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">
                        Customize
                    </h3>
                    <p className="mt-3 text-gray-400">
                        Add your portfolio, bio, resume and social platforms.
                    </p>
                </div>
                <div className="text-blue-400">
                    <FaArrowDown className="text-3xl lg:hidden" />
                    <FaArrowRight className="hidden text-4xl lg:block" />
                </div>
                <div className="w-full max-w-xs rounded-3xl border border-blue-500/20 bg-white/4 p-5 text-center backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-indigo-400 lg:max-w-sm lg:p-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-2xl font-bold text-indigo-400 lg:h-16 lg:w-16 lg:text-3xl">
                        ③
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">
                        Share Anywhere
                    </h3>
                    <p className="mt-3 text-gray-400">
                        Share one beautiful profile with the world.
                    </p>
                </div>
            </div>
        </>
    )
}

export default CTA
