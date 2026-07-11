import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import Google from "../Components/Authentication/Google";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome to NexLink
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign up to create your digital identity
                    </p>
                </div>
                <Google />
                <form className="space-y-5">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500" />
                            <input id="name" type="text" placeholder="your Username"
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-900/60 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500" />
                            <input id="email" type="email" placeholder="you@example.com"
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-900/60 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500" />
                            <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password"
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-900/60 py-3 pl-12 pr-12 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-400"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit"
                        className="w-full rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-[0.98]"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </>
    )
}

export default Signup
