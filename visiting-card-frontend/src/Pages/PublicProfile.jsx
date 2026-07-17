import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicProfile } from "../Utility/APIFunctions";

const PublicProfile = () => {

    const { slug } = useParams();

    const [data, setData] = useState(null);
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

                setData(result.Card);

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

                <p className="mt-2 text-sm text-gray-400">
                    Fetching your NexLink digital identity...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-8 py-6 text-center">
                    <h2 className="text-xl font-semibold text-red-400">
                        Unable to Load Profile
                    </h2>

                    <p className="mt-3 text-gray-300">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-10">

            <div className="mx-auto max-w-6xl rounded-2xl border border-cyan-500/20 bg-slate-900/50 p-6 shadow-lg">

                <h1 className="mb-6 text-2xl font-bold text-cyan-400">
                    Public Profile Response
                </h1>

                <div className="overflow-x-auto rounded-xl border border-slate-700 bg-black/40 p-5">

                    <pre className="whitespace-pre-wrap wrap-break-word font-mono text-sm leading-7 text-green-300">
                        {JSON.stringify(data, null, 2)}
                    </pre>

                </div>

            </div>

        </div>
    );
};

export default PublicProfile;