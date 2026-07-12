import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser, } from "react-icons/fi";
import Google from "../Components/Authentication/Google";
import { signupuser } from "../Utility/APIFunctions";


const Signup = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const oldData = location.state?.signupData;
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: oldData?.name || "",
        email: oldData?.email || "",
        password: "",
    });
    const [fieldError, setFieldError] = useState({
        name: null,
        email: null,
        password: null,
    });
    const [error, setError] = useState(
        location.state?.error || null
    );
    const [signupLoading, setSignupLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev, [name]: value,
        }));
        setFieldError((prev) => ({
            ...prev, [name]: null,
        }));
        setError(null);
    };

    const call = async (e) => {
        e.preventDefault();
        const errors = {
            name: null,
            email: null,
            password: null,
        };
        if (!data.name.trim()) {
            errors.name = "Name is required";
        }
        if (!data.email.trim()) {
            errors.email = "Email address is required";
        }
        if (!data.password.trim()) {
            errors.password = "Password is required";
        }
        if (errors.name || errors.email || errors.password) {
            setFieldError(errors);
            return;
        }
        try {
            setSignupLoading(true);
            setError(null);
            setFieldError({
                name: null,
                email: null,
                password: null,
            });

            const result = await signupuser(data);
            if (!result.success) {
                if (result.under && result.type) {
                    const type = result.type.toLowerCase();
                    if (type === "name" || type === "email" || type === "password") {
                        setFieldError((prev) => ({
                            ...prev, [type]: result.message,
                        }));
                        return;
                    }
                }
                setError(
                    result.message || "Signup failed"
                );
                return;
            }
            if (result.redirect) {
                navigate("/verifyotp", {
                    replace: true,
                    state: {
                        email: result.email,
                        signupData: data,
                        fromSignup: true
                    },
                });
            }
        } catch (err) {
            setError("Signup issue. Try again!");
        } finally {
            setSignupLoading(false);
        }
    };


    return (
        <div className="w-full">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">
                    Create Account
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Create your NexLink digital identity
                </p>
            </div>
            <Google />
            <form onSubmit={call} className="space-y-5" noValidate>
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                        Username
                    </label>
                    <div className="relative">
                        <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${fieldError.name ? "text-red-400" : "text-gray-500"
                            }`}
                        />
                        <input id="name" type="text" name="name" placeholder="Enter your name" value={data.name} onChange={handleChange}
                            className={`w-full rounded-xl border bg-slate-900/60 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 ${fieldError.name
                                ? "border-red-500/60 focus:border-red-400"
                                : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                }`}
                        />
                    </div>
                    {fieldError.name && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.name}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                        Email Address
                    </label>
                    <div className="relative">
                        <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${fieldError.email ? "text-red-400" : "text-gray-500"
                            }`}
                        />
                        <input id="email" type="email" name="email" placeholder="you@example.com" value={data.email} onChange={handleChange}
                            className={`w-full rounded-xl border bg-slate-900/60 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 ${fieldError.email
                                ? "border-red-500/60 focus:border-red-400"
                                : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                }`}
                        />
                    </div>
                    {fieldError.email && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.email}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                        Password
                    </label>
                    <div className="relative">
                        <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${fieldError.password ? "text-red-400" : "text-gray-500"
                            }`}
                        />
                        <input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="Create your password"
                            value={data.password} onChange={handleChange}
                            className={`w-full rounded-xl border bg-slate-900/60 py-3 pl-12 pr-12 text-white outline-none transition duration-300 placeholder:text-gray-600 ${fieldError.password
                                ? "border-red-500/60 focus:border-red-400"
                                : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                }`}
                        />
                        <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-400"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {fieldError.password && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.password}
                        </p>
                    )}
                </div>
                {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}
                <button type="submit" disabled={signupLoading}
                    className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                    {signupLoading ?
                        (<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />) :
                        ("Create Account")
                    }
                </button>
            </form>
        </div>
    );
};

export default Signup;