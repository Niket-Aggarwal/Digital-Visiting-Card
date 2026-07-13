import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useCard from "../Hooks/useCard";
import Google from "../Components/Authentication/Google";
import { loginuser } from "../Utility/APIFunctions";

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "", });
    const [fieldError, setFieldError] = useState({ email: null, password: null, });
    const [error, setError] = useState(null);
    const { initialize } = useAuth();
    const [loginLoading, setLoginLoading] = useState(false);
    const { initializecard } = useCard();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => (
            { ...prev, [name]: value, }
        ));
        setFieldError((prev) => (
            { ...prev, [name]: null, }
        ));
        setError(null);
        if (location.state?.message) {
            navigate(location.pathname, {
                replace: true,
                state: null
            });
        }
    };

    const call = async (e) => {
        e.preventDefault();
        const errors = { email: null, password: null, };
        if (!data.email.trim()) {
            errors.email = "Email address is required";
        }
        if (!data.password.trim()) {
            errors.password = "Password is required";
        }
        if (errors.email || errors.password) {
            setFieldError(errors);
            return;
        }
        try {
            setLoginLoading(true);
            setError(null);
            setFieldError({ email: null, password: null, });
            const result = await loginuser(data);
            if (!result.success) {
                if (result.under && result.type) {
                    const type = result.type.toLowerCase();
                    if (type === "email" || type === "password") {
                        setFieldError((prev) => ({
                            ...prev, [type]: result.message,
                        }));
                        return;
                    }
                }
                setError(result.message || "Login failed");
                return;
            }
            await initialize();
            await initializecard();
            navigate("/profile/dashboard");
        } catch (err) {
            console.error("Login Error:", err);
            setError("Login issue. Try again!");
        } finally {
            setLoginLoading(false);
        }
    };


    return (
        <div className="w-full">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">
                    Welcome Back
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Login to continue to your digital identity
                </p>
            </div>
            <Google />
            <form onSubmit={call} className="space-y-5" noValidate>
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
                                ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_20px_rgba(239,68,68,0.12)]"
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
                        <input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password"
                            value={data.password} onChange={handleChange}
                            className={`w-full rounded-xl border bg-slate-900/60 py-3 pl-12 pr-12 text-white outline-none transition duration-300 placeholder:text-gray-600 ${fieldError.password
                                ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_20px_rgba(239,68,68,0.12)]"
                                : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                }`}
                        />
                        <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-cyan-400"
                            aria-label={showPassword ? "Hide password" : "Show password"}
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
                <div className="flex justify-end">
                    <Link to="/forget-verify" state={{ fromLogin: true }} className="text-sm text-blue-400 transition hover:text-cyan-400"
                    >
                        Forgot password?
                    </Link>
                </div>
                {successMessage && !error && (
                    <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm text-green-400">
                        {successMessage}
                    </div>
                )}
                {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}
                <button type="submit" disabled={loginLoading} className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100">
                    {loginLoading ?
                        (<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />) :
                        ("Login")
                    }
                </button>
            </form>
        </div>
    );
};

export default Login;