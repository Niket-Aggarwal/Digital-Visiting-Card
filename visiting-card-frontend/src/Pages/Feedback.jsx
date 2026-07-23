import { useState } from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { createFeedback } from "../Utility/APIFunctions";

const Feedback = () => {

    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const ratingText = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        if (!rating) {
            setError("Please select a rating");
            return;
        }
        if (!description.trim()) {
            setError("Please enter your feedback");
            return;
        }
        try {
            setLoading(true);
            const result = await createFeedback({ star: rating, feedback: description.trim() });
            if (!result.success) {
                setError(result.message || "Unable to submit feedback");
                return;
            }
            setMessage(result.message || "Feedback submitted successfully");
            setRating(0);
            setDescription("");
        } catch (err) {
            setError("Unable to submit feedback. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Feedback
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
                    Share your experience and help us improve NexLink.
                </p>
            </div>
            <form onSubmit={handleSubmit} noValidate className="mt-8 rounded-2xl border border-blue-500/20 bg-slate-900/50 p-5 sm:p-7 lg:p-8">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 p-3 text-xl text-cyan-400">
                        <FiMessageSquare />
                    </div>
                    <div>
                        <h2 className="font-semibold text-white sm:text-lg">
                            Your Feedback
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Tell us what you think about NexLink.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <p className="text-sm font-medium text-gray-300">
                        Rate your experience
                    </p>
                    <div className="mt-4 flex items-center gap-2 sm:gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => { setRating(star); setError(""); setMessage("") }}
                                className={`cursor-pointer text-3xl transition duration-200 hover:scale-110 sm:text-4xl ${star <= rating ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.35)]" : "text-yellow-400/60"}`}
                            >
                                {star <= rating ? (<FaStar />) : (<FiStar />)}
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className="mt-3 text-sm font-medium text-yellow-400">
                            {ratingText[rating]}
                        </p>
                    )}
                </div>
                <div className="mt-8">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-300">
                        Description
                    </label>
                    <textarea id="description" rows="6" value={description} onChange={(e) => { setDescription(e.target.value); setError(""); setMessage("") }}
                        placeholder="Share your thoughts, suggestions or experience..."
                        className="w-full resize-none rounded-xl border border-blue-500/20 bg-slate-950/50 p-4 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.10)]"
                    />
                </div>
                {error && (
                    <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-400">
                        {message}
                    </div>
                )}
                <div className="mt-7 flex justify-end">
                    <button type="submit" disabled={loading}
                        className="w-full cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
                    >
                        {loading ? "Submitting..." : "Submit Feedback"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Feedback;