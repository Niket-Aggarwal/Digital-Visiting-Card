import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { resetPassword } from "../Utility/APIFunctions";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const verified = location.state?.verified;
    const fromForgotPassword = location.state?.fromForgotPassword;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [data, setData] = useState({ password: "", confirm: "" });
    const [fieldError, setFieldError] = useState({ password: null, confirm: null });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email || !verified || !fromForgotPassword) {
            navigate("/login", { replace: true });
        }
    }, [email, verified, fromForgotPassword, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev, [name]: value
        }));
        setFieldError((prev) => ({
            ...prev, [name]: null
        }));
        setError(null);
    };


    const call = async (e) => {
        e.preventDefault();
        const errors = {
            password: null,
            confirm: null
        };
        if (!data.password.trim()) {
            errors.password = "Password is required";
        }
        if (!data.confirm.trim()) {
            errors.confirm = "Confirm password is required";
        }
        if (errors.password || errors.confirm) {
            setFieldError(errors);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const result = await resetPassword({
                ...data, email
            });
            if (!result.success) {
                if (result.under && result.type) {
                    const type = result.type.toLowerCase();
                    if (type === "password" || type === "confirm") {
                        setFieldError((prev) => ({
                            ...prev, [type]: result.message
                        }));
                        return;
                    }
                }
                setError(result.message || "Password reset failed");
                return;
            }
            navigate("/login", {
                replace: true,
                state: { message: "Password updated successfully" }
            });
        } catch (err) {
            setError("Password reset issue. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (error) =>
        `w-full rounded-xl border bg-slate-900/60 py-3 pl-12 pr-12 text-white outline-none transition duration-300 placeholder:text-gray-600 ${error
            ? "border-red-500/60 focus:border-red-400"
            : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
        }`;


    return (
        <div className="w-full">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">
                    Reset Password
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Create a new secure password
                </p>
            </div>
            <form onSubmit={call} className="space-y-5" noValidate>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        New Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type={showPassword ? "text" : "password"} name="password" value={data.password} placeholder="Enter new password"
                            onChange={handleChange} className={inputClass(fieldError.password)}
                        />
                        <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400"
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
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type={showConfirm ? "text" : "password"} name="confirm" value={data.confirm} placeholder="Confirm new password"
                            onChange={handleChange} className={inputClass(fieldError.confirm)}
                        />
                        <button type="button" onClick={() => setShowConfirm((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400"
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {fieldError.confirm && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.confirm}
                        </p>
                    )}
                </div>
                {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}
                <button type="submit" disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ?
                        (<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />) :
                        ("Update Password")
                    }
                </button>
            </form>
        </div>
    );
};


export default ResetPassword;