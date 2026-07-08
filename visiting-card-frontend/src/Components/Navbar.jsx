import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <header className="w-full border-b border-blue-500/20 bg-linear-to-b from-black to-slate-950">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main Navigation">
        <Link to="/" className="flex items-center" aria-label="Go to NexLink Home">
          <img src={Logo} alt="NexLink Logo - Next Generation Digital Identity" className="h-14 w-14 object-contain"/>
          <span className="text-2xl font-bold tracking-wide text-white">
            Nex<span className="text-blue-500">Link</span>
          </span>
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 sm:flex">
          <Link to="/login"
            className="rounded-lg border border-blue-500 px-5 py-2 font-medium text-blue-400 transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            Login
          </Link>
          <Link to="/signup"
            className="rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2 font-medium text-white transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="sm:hidden">
          <Link to="/login"
            className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-medium text-blue-400 transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;