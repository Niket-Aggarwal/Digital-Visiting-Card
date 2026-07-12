import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMail, FiShield } from "react-icons/fi";
import { forgetPassword, verifyResetOtp } from "../Utility/APIFunctions";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location.state?.fromLogin) {
            navigate("/login", { replace: true });
        }
    }, [location.state, navigate]);

    const sendOtp = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Email address is required");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const result = await forgetPassword({ email });
            if (!result.success) {
                setError(result.message || "Unable to send OTP");
                return;
            }
            setStep("otp");
        } catch (err) {
            setError("Unable to process request");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp.trim()) {
            setError("OTP is required");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const result = await verifyResetOtp({ email, otp });
            if (!result.success) {
                setOtp("");
                setStep("email");
                setError(result.message || "OTP verification failed");
                return;
            }

            navigate("/password-reset", {
                replace: true,
                state: { verified: true, email, fromForgotPassword: true }
            });
        } catch (err) {
            setOtp("");
            setStep("email");
            setError("OTP verification issue");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                    {step === "email"
                        ? <FiMail className="text-2xl text-cyan-400" /> : <FiShield className="text-2xl text-cyan-400" />
                    }
                </div>
                <h1 className="text-3xl font-bold text-white">
                    {step === "email" ? "Forgot Password" : "Verify OTP"}
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    {step === "email" ? "Enter your registered email address" : "Enter the verification code sent to your email"}
                </p>
                {step === "otp" && (
                    <p className="mt-1 text-sm font-medium text-cyan-400">
                        {email &&
                            `${email[0]}******@${email.split("@")[1]}`
                        }
                    </p>
                )}
            </div>
            {step === "email" ? (
                <form onSubmit={sendOtp} className="space-y-5" noValidate>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500" />
                            <input id="email" type="email" value={email} placeholder="you@example.com"
                                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-900/60 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                            />
                        </div>
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
                            ("Send OTP")
                        }
                    </button>
                </form>
            ) : (
                <form onSubmit={verifyOtp} className="space-y-5" noValidate>
                    <input type="text" inputMode="numeric" value={otp} placeholder="Enter OTP"
                        onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(null); }}
                        className="w-full rounded-xl border border-blue-500/20 bg-slate-900/60 px-4 py-3 text-center text-xl font-semibold tracking-[0.5em] text-white outline-none transition duration-300 placeholder:text-sm placeholder:tracking-normal placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                    />
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
                            ("Verify OTP")
                        }
                    </button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;