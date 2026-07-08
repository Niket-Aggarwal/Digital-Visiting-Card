import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-blue-500/20 bg-linear-to-b from-slate-950 to-black text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-4">
                    <section>
                        <div className="flex items-center gap-3">
                            <img src={Logo} alt="NexLink Logo" className="h-12 w-12 object-contain" />
                            <span className="text-2xl font-bold text-white">
                                Nex<span className="text-blue-500">Link</span>
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Build your professional digital identity with one modern,
                            shareable profile. Connect your portfolio, social links and
                            contact information effortlessly.
                        </p>
                    </section>

                    {/* Platform */}
                    <section className="hidden md:block">
                        <h2 className="mb-5 text-lg font-semibold text-white">
                            Platform
                        </h2>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="transition hover:text-blue-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="transition hover:text-blue-400">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="transition hover:text-blue-400">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </section>

                    {/* Resources */}
                    <section>
                        <h2 className="mb-5 text-lg font-semibold text-white">
                            Resources
                        </h2>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/privacy" className="hover:text-blue-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/term" className="hover:text-blue-400">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </section>

                    {/* Connect */}
                    <section>
                        <h2 className="mb-5 text-lg font-semibold text-white">
                            Connect
                        </h2>
                        <div className="flex gap-4 text-2xl">
                            <a href="https://www.instagram.com/buddy.cyber/" target="_blank" className="transition hover:text-pink-500 hover:scale-110" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com/in/niket-aggarwal-11785038a/" target="_blank" className="transition hover:text-blue-500 hover:scale-110" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/Niket-Aggarwal" target="_blank" className="transition hover:text-white hover:scale-110" aria-label="GitHub">
                                <FaGithub />
                            </a>
                        </div>
                    </section>
                </div>

                {/* Divider */}
                <div className="my-10 border-t border-blue-500/20"></div>

                {/* Bottom */}
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
                    <p>
                        © {year} NexLink. All rights reserved.
                    </p>
                    <p>
                        Made with <span className="text-red-500">❤</span> for professionals.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;