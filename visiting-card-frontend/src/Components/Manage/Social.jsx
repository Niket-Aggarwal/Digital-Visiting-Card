import { useEffect, useState } from "react";
import { FiGlobe, FiGithub, FiInstagram, FiLinkedin, FiFacebook, FiSend, FiPlus, FiTrash2 } from "react-icons/fi";
import { createSocial } from "../../Utility/APIFunctions";

const Social = ({ next, back, card }) => {

    const [telegram, setTelegram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [others, setOthers] = useState([{ platform: "", link: "" }]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!card) return;
        setTelegram(card.telegram || "");
        setFacebook(card.facebook || "");
        setInstagram(card.instagram || "");
        setLinkedin(card.linkedin || "");
        setGithub(card.github || "");
        if (card.others?.length) {
            setOthers(card.others);
        }
    }, [card]);

    const handleOtherChange = (index, field, value) => {
        const temp = [...others];
        temp[index][field] = value;
        setOthers(temp);
    };

    const addOther = () => {
        setOthers([...others, { platform: "", link: "" }]);
    };

    const removeOther = (index) => {
        const temp = [...others];
        temp.splice(index, 1);
        if (temp.length === 0) {
            temp.push({ platform: "", link: "" });
        }
        setOthers(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = {
                telegram: telegram.trim(),
                facebook: facebook.trim(),
                instagram: instagram.trim(),
                linkedin: linkedin.trim(),
                github: github.trim(),
                others: others.filter(item => item.platform.trim() && item.link.trim())
            }
            const result = await createSocial(data);
            if (!result.success) {
                setError(result.message || "Unable to save social accounts");
                return;
            }
            await next();
        } catch {
            setError("Unable to save social accounts.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Social Accounts
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Add the social profiles you want to share.
                </p>
            </div>
            <div className="mt-7 rounded-2xl border border-blue-500/20 bg-slate-950/40 p-6">
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Telegram
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiSend />
                            </span>
                            <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder={`Telegram Profile`}
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-950/50 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Facebook
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiFacebook />
                            </span>
                            <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder={`Facebook Profile`}
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-950/50 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Instagram
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiInstagram />
                            </span>
                            <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder={`Instagram Profile`}
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-950/50 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Linkedin
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiLinkedin />
                            </span>
                            <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder={`Linkedin Profile`}
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-950/50 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Github
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiGithub />
                            </span>
                            <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder={`Github Profile`}
                                className="w-full rounded-xl border border-blue-500/20 bg-slate-950/50 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-white">
                            Other Platforms
                        </h3>
                        <button type="button" onClick={addOther} className="flex cursor-pointer items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-400">
                            <FiPlus />
                            Add
                        </button>
                    </div>
                    <div className="space-y-4">
                        {others.map((item, index) => (
                            <div key={index} className="rounded-xl border border-blue-500/10 bg-slate-900/40 p-4">
                                <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-300">
                                            Platform
                                        </label>
                                        <input type="text" placeholder="Discord, X, Portfolio..." value={item.platform}
                                            onChange={(e) => handleOtherChange(index, "platform", e.target.value)}
                                            className="w-full rounded-xl border border-blue-500/20 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-300">
                                            Profile Link
                                        </label>
                                        <input type="text" placeholder="https://..." value={item.link}
                                            onChange={(e) => handleOtherChange(index, "link", e.target.value)}
                                            className="w-full rounded-xl border border-blue-500/20 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button type="button" onClick={() => removeOther(index)}
                                        className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                    >
                                        <FiTrash2 />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        ))}
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
                    className="cursor-pointer rounded-xl border border-blue-500/20 bg-slate-950/50 px-8 py-3 font-medium text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                >
                    Back
                </button>
                <button type="submit" disabled={loading}
                    className="cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white"
                >
                    {loading ? "Saving..." : "Next"}
                </button>
            </div>
        </form>
    );

};

export default Social;