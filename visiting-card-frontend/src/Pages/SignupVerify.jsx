import { useState, useEffect } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useCard from "../Hooks/useCard";
import { registeruser, } from "../Utility/APIFunctions";


const Signupverify = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const signupData = location.state?.signupData;
    const fromSignup = location.state?.fromSignup;
    const { initialize } = useAuth();
    const { initializecard } = useCard();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [otpLoading, setOtpLoading] = useState(false);

    useEffect(() => {
        if (!email || !signupData || !fromSignup) {
            navigate("/signup", {
                replace: true
            });
        }
    }, [email, fromSignup, navigate]);

    const call = async (e) => {
        e.preventDefault();
        if (!otp.trim()) {
            setError("OTP is required");
            return;
        }

        try {
            setOtpLoading(true);
            setError(null);
            const result = await registeruser({ email, otp, });
            if (!result.success) {
                navigate("/signup", {
                    replace: true,
                    state: {
                        signupData,
                        error:
                            result.message ||
                            "OTP verification failed",
                    },
                });
                return;
            }
            await initialize();
            await initializecard();
            navigate("/profile/dashboard");
        } catch (err) {
            setError("OTP verification issue. Try again!");
        } finally {
            setOtpLoading(false);
        }
    };


    if (!email || !signupData) {
        navigate("/signup", { replace: true, });
        return null;
    }

    return (
        <div className="w-full">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                    <FiShield className="text-2xl text-cyan-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">
                    Verify Your Email
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Enter the OTP sent to
                </p>
                <p className="mt-1 text-sm font-medium text-cyan-400">
                    {`${email[0]}******@${email.split("@")[1]}`}
                </p>
            </div>
            <form onSubmit={call} className="space-y-5" noValidate>
                <div>
                    <label htmlFor="otp" className="mb-2 block text-sm font-medium text-gray-300">
                        Verification Code
                    </label>
                    <input id="otp" type="text" inputMode="numeric" name="otp" placeholder="Enter OTP" value={otp}
                        onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(null); }}
                        className={`w-full rounded-xl border bg-slate-900/60 px-4 py-3 text-center text-xl font-semibold tracking-[0.5em] text-white outline-none transition duration-300 placeholder:text-sm placeholder:tracking-normal placeholder:text-gray-600 ${error
                            ? "border-red-500/60 focus:border-red-400"
                            : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                            }`}
                    />
                </div>
                {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}
                <button type="submit" disabled={otpLoading}
                    className="flex cursor-pointer w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                    {otpLoading ?
                        (<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />) :
                        ("Verify OTP")
                    }
                </button>
            </form>
        </div>
    );
};

export default Signupverify;