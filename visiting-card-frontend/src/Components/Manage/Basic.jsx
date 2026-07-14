import { useEffect, useState } from "react";
import { FiUser, FiMail, FiLink, FiEdit3, FiFileText } from "react-icons/fi";
import { createBasicDetails } from "../../Utility/APIFunctions";

const Basic = ({ next, card }) => {

    const [data, setData] = useState({
        name: "",
        email: "",
        headline: "",
        bio: "",
        slug: ""
    });
    const [fieldError, setFieldError] = useState({
        name: null,
        email: null,
        headline: null,
        bio: null,
        slug: null
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!card) return;
        setData({
            name: card.name || "",
            email: card.email || "",
            headline: card.headline || "",
            bio: card.bio || "",
            slug: card.slug?.split("-")[0] || ""
        });
    }, [card]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {
            name: null,
            email: null,
            headline: null,
            bio: null,
            slug: null
        };
        if (!data.name.trim()) {
            errors.name = "Name is required";
        }
        if (!data.email.trim()) {
            errors.email = "Email address is required";
        }
        if (!data.headline.trim()) {
            errors.headline = "Headline is required";
        }
        if (!data.bio.trim()) {
            errors.bio = "Bio is required";
        }
        if (!data.slug.trim()) {
            errors.slug = "Identity slug is required";
        }
        if (errors.name || errors.email || errors.headline || errors.bio || errors.slug) {
            setFieldError(errors);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const result = await createBasicDetails(data);
            if (!result.success) {
                if (result.under && result.type) {
                    const type = result.type.toLowerCase();
                    if (type === "name" || type === "email" || type === "headline" || type === "bio" || type === "slug") {
                        setFieldError((prev) => ({
                            ...prev, [type]: result.message
                        }));
                        return;
                    }
                }
                setError(result.message || "Unable to save basic details");
                return;
            }
            await next();
        } catch {
            setError("Unable to save basic details. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (field) => `
        w-full rounded-xl border bg-slate-950/50 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600
        ${fieldError[field] ? "border-red-500/60 focus:border-red-400" : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.10)]"}
    `;

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full">
            <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Basic Details
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Add the essential information that will represent your NexLink digital identity.
                </p>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                        Display Name
                    </label>
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input id="name" type="text" name="name" value={data.name} onChange={handleChange} placeholder="Your name" className={inputStyle("name")} />
                    </div>
                    {fieldError.name && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.name}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                        Contact Email
                    </label>
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input id="email" type="email" name="email" value={data.email} onChange={handleChange} placeholder="you@example.com"
                            className={inputStyle("email")}
                        />
                    </div>
                    {fieldError.email && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.email}
                        </p>
                    )}
                </div>
                <div className="lg:col-span-2">
                    <label htmlFor="headline" className="mb-2 block text-sm font-medium text-gray-300">
                        Headline
                    </label>
                    <div className="relative">
                        <FiEdit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input id="headline" type="text" name="headline" value={data.headline} onChange={handleChange}
                            placeholder="Occupation | Full Stack Developer | Building digital experiences" className={inputStyle("headline")}
                        />
                    </div>
                    {fieldError.headline && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.headline}
                        </p>
                    )}
                </div>
                <div className="lg:col-span-2">
                    <label htmlFor="slug" className="mb-2 block text-sm font-medium text-gray-300">
                        Identity URL
                    </label>
                    <div className="relative">
                        <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input id="slug" type="text" name="slug" value={data.slug} onChange={handleChange} placeholder="your-name" className={inputStyle("slug")} />
                    </div>
                    <p className="mt-2 wrap-break-word text-xs text-gray-500">
                        mynexlink.vercel.app/{data.slug || "your-name"}
                    </p>
                    {fieldError.slug && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.slug}
                        </p>
                    )}
                </div>
                <div className="lg:col-span-2">
                    <label htmlFor="bio" className="mb-2 block text-sm font-medium text-gray-300">
                        About you
                    </label>
                    <div className="relative">
                        <FiFileText className="absolute left-4 top-4 text-gray-500" />
                        <textarea id="bio" name="bio" value={data.bio} onChange={handleChange} placeholder="Tell people a little about yourself or any message..."
                            rows="5"
                            className={`w-full resize-none rounded-xl border bg-slate-950/50 py-3 pl-12 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 ${fieldError.bio ? "border-red-500/60 focus:border-red-400" : "border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.10)]"
                                }`}
                        />
                    </div>
                    {fieldError.bio && (
                        <p className="mt-2 text-sm text-red-400">
                            {fieldError.bio}
                        </p>
                    )}
                </div>
            </div>
            {error && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}
            <div className="mt-8 flex justify-end">
                <button type="submit" disabled={loading}
                    className="flex min-w-32 cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                    {
                        loading ?
                            (<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />) :
                            ("Next")
                    }
                </button>
            </div>
        </form>
    );
};

export default Basic;