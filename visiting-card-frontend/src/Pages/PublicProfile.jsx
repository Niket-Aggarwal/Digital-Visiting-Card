import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicProfile } from "../Utility/APIFunctions";
import Minimal from "../Components/Layout/Minimal";
import Modern from "../Components/Layout/Modern";
import Bold from "../Components/Layout/Bold.jsx";

const PublicProfile = () => {

    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");
                const result = await publicProfile({ slug });
                if (!result.success) {
                    setError(result.message || "Profile not found");
                    return;
                }
                setCard(result.Card);
            } catch {
                setError("Unable to load profile.");
            } finally {
                setLoading(false);
            }
        };
        if (slug) {
            fetchProfile();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950">
                <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400"></div>
                </div>
                <h2 className="mt-6 text-xl font-semibold text-white">
                    Loading Profile
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Fetching your NexLink Digital Identity...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative flex min-h-screen w-full overflow-hidden items-center justify-center bg-slate-950 px-6">
                <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
                <div className="relative z-10 w-full max-w-lg rounded-3xl border border-red-500/20 bg-slate-900/70 p-8 sm:p-10 text-center backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.12)]">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                        <span className="text-5xl">⚠️</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Unable to Load Profile
                    </h2>
                    <p className="mt-4 text-gray-400 leading-relaxed wrap-break-word">
                        {error}
                    </p>
                    <button onClick={() => window.location.reload()} className="mt-8 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(37,99,235,0.45)]">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    switch ((card?.layout || "minimal").toLowerCase()) {
        case "modern":
            return <Modern card={card} />;
        case "bold":
            return <Bold card={card} />;
        case "minimal":
        default:
            return <Minimal card={card} />;
    }
};

export default PublicProfile;