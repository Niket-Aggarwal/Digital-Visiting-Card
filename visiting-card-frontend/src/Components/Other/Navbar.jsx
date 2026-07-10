import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Samepagetop } from "../../Utility/Functions";
import Logo from "../../assets/Logo.png";

const Navbar = () => {

  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-slate-950/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main Navigation">
        <Link to="/" onClick={Samepagetop} className="flex items-center" aria-label="Go to NexLink Home">
          <img src={Logo} alt="NexLink Logo - Next Generation Digital Identity" className="h-14 w-14 object-contain" />
          <span className="text-2xl font-bold tracking-wide text-white">
            Nex<span className="text-blue-500">Link</span>
          </span>
        </Link>
        <div className="hidden items-center gap-4 sm:flex">
          {isHomePage && (
            <>
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
            </>
          )}
          {isLoginPage && (
            <Link to="/signup"
              className="rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2 font-medium text-white transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
            >
              Sign Up
            </Link>

          )}
          {isSignupPage && (
            <Link to="/login"
              className="rounded-lg border border-blue-500 px-5 py-2 font-medium text-blue-400 transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Login
            </Link>
          )}
        </div>
        <div className="sm:hidden">
          {isHomePage && (
            <Link to="/login"
              className="rounded-lg border border-blue-500 px-5 py-2 font-medium text-blue-400 transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Login
            </Link>

          )}
          {isLoginPage && (
            <Link to="/signup"
              className="rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2 font-medium text-white transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
            >
              Sign Up
            </Link>

          )}
          {isSignupPage && (
            <Link to="/login"
              className="rounded-lg border border-blue-500 px-5 py-2 font-medium text-blue-400 transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;