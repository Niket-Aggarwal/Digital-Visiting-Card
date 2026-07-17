import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFinish } from "../../Utility/APIFunctions";
import useCard from "../../Hooks/useCard";

const Finish = ({ back, card }) => {

    const { initializecard } = useCard();
    const navigate = useNavigate();
    const [layout, setLayout] = useState("");
    const [theme, setTheme] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!card) return;

        setLayout(card.layout || "minimal");
        setTheme(card.theme || "dark");
        setIsPublic(typeof card.isPublic === "boolean" ? card.isPublic : true);
    }, [card]);

    const handleFinish = async () => {
        setLoading(true);
        setError("");
        try {
            const data = { layout, theme, isPublic }
            const result = await createFinish(data);
            if (!result.success) {
                setError(result.message || "Unable to finish identity.");
                return;
            }
            await initializecard()
            navigate(`/profile/dashboard`);
        } catch {
            setError("Unable to finish identity.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Finish Identity
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Configure the final appearance of your NexLink profile.
                </p>
            </div>
            <div className="mt-7 space-y-6 rounded-2xl border border-blue-500/20 bg-slate-950/40 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="rounded-xl border border-blue-500/20 bg-slate-900/40 p-4">
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Layout
                        </label>
                        <select value={layout} onChange={(e) => setLayout(e.target.value)}
                            className="w-full appearance-none rounded-xl border border-blue-500/20 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        >
                            <option value="minimal">Minimal</option>
                            <option value="modern">Modern</option>
                            <option value="bold">Bold</option>
                        </select>
                        <p className="mt-2 text-xs text-gray-500">
                            Choose the overall appearance of your profile.
                        </p>
                    </div>
                    <div className="rounded-xl border border-blue-500/20 bg-slate-900/40 p-4">
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Theme
                        </label>
                        <select value={theme} onChange={(e) => setTheme(e.target.value)}
                            className="w-full appearance-none rounded-xl border border-blue-500/20 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        >
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                        <p className="mt-2 text-xs text-gray-500">
                            Select the color theme for your public profile.
                        </p>
                    </div>
                </div>
                <div className="rounded-xl border border-blue-500/20 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-white">
                                {isPublic ? "Public Profile" : "Private Profile"}
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                {isPublic ? "Anyone with your NexLink URL can view your profile." : "Only you can access your profile until you make it public."}
                            </p>
                        </div>
                        <button type="button" onClick={() => setIsPublic((prev) => !prev)} aria-label="Toggle profile visibility"
                            className={`relative h-7 w-14 shrink-0 cursor-pointer rounded-full transition duration-300 ${isPublic ? "bg-cyan-500" : "bg-slate-700"}`}
                        >
                            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${isPublic ? "left-8" : "left-1"}`}
                            />
                        </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isPublic ? "bg-cyan-500/10 text-cyan-400" : "bg-red-500/10 text-red-400"}`}>
                            {isPublic ? "Public" : "Private"}
                        </span>
                    </div>
                </div>
            </div>
            {error && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={back} disabled={loading}
                    className="cursor-pointer rounded-xl border border-blue-500/20 bg-slate-950/50 px-8 py-3 font-medium text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Back
                </button>
                <button type="button" onClick={handleFinish} disabled={loading} className="cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? "Finishing..." : "Finish Identity"}
                </button>
            </div>
        </div>
    );
};

export default Finish;