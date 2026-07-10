import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaGlobe, FaTelegram } from "react-icons/fa";

const ProfileCard = (param) => {

    const name = param.name
    const bio = param.bio
    const about = param.about
    const img = param.img

    const isImage = typeof img === "string";

    return (
        <div className="relative mx-auto w-full max-w-sm group">
            <div className="pointer-events-none absolute -inset-3 rounded-4xl bg-linear-to-r from-blue-600/20 via-cyan-500/10 to-blue-700/20 blur-3xl opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"></div>
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white/4 p-7 backdrop-blur-3xl shadow-[0_20px_60px_rgba(37,99,235,0.15)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_20px_70px_rgba(37,99,235,0.30)]">
                <div className="pointer-events-none absolute -left-32 top-0 h-full w-24 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]"></div>
                <div className="flex flex-col items-center">
                    {isImage ? 
                        (<div className="rounded-full bg-linear-to-r from-blue-500 to-cyan-400 p-1 shadow-[0_0_35px_rgba(59,130,246,.45)]">
                            <img src={img} alt="Avatar" className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"/>
                        </div>) : 
                        (<div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 shadow-[0_0_60px_rgba(34,211,238,0.25)] backdrop-blur-xl">
                            {img && (
                                React.createElement(img, {
                                    className:"text-7xl text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.7)] transition duration-300 hover:scale-110",
                                    })
                                )}
                        </div>)
                    }
                    <div className="mt-5 flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                            {name}
                        </h2>
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-blue-400 sm:text-base">
                        {bio}
                    </p>
                    <p className="mt-5 text-center text-sm leading-7 text-gray-400 sm:text-base">
                        {about}
                    </p>
                </div>
                <div className="my-7 h-px w-full bg-linear-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#" className="rounded-full border border-white/10 bg-white/5 p-3 text-pink-500 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-pink-500 hover:text-white hover:shadow-lg">
                        <FaInstagram className="text-lg" />
                    </a>
                    <a href="#" className="rounded-full border border-white/10 bg-white/5 p-3 text-blue-500 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white hover:shadow-lg">
                        <FaLinkedin className="text-lg" />
                    </a>
                    <a href="#" className="rounded-full border border-white/10 bg-white/5 p-3 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-gray-700 hover:shadow-lg">
                        <FaGithub className="text-lg" />
                    </a>

                    <a href="#" className="rounded-full border border-white/10 bg-white/5 p-3 text-cyan-400 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-cyan-500 hover:text-white hover:shadow-lg">
                        <FaGlobe className="text-lg" />
                    </a>

                    <a href="#" className="rounded-full border border-white/10 bg-white/5 p-3 text-sky-400 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-sky-500 hover:text-white hover:shadow-lg">
                        <FaTelegram className="text-lg" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;