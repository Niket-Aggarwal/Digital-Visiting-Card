import { useEffect, useRef, useState } from "react";
import { FiCamera, FiPhone, FiUploadCloud, FiUser } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import ProfileIcon from "../../assets/Profile.png";
import { createUploads } from "../../Utility/APIFunctions";

const Uploads = ({ next, back, card }) => {

    const { user } = useAuth();
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState(null);
    const [useAuthImage, setUseAuthImage] = useState(false);
    const [preview, setPreview] = useState(ProfileIcon);
    const [phoneError, setPhoneError] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        setPhone(card?.phno || "");
        setPreview(card?.image || ProfileIcon);
    }, [card]);

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setUseAuthImage(false);
        setPreview(URL.createObjectURL(file));
        setError("");
    };

    const handleAuthImage = (e) => {
        const checked = e.target.checked;
        setUseAuthImage(checked);
        setError("");
        if (checked) {
            setImage(null);
            if (fileRef.current) {
                fileRef.current.value = "";
            }
            setPreview(user?.picture || ProfileIcon);
        } else {
            setPreview(ProfileIcon);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPhoneError("");
        setError("");
        try {
            const formData = new FormData();
            if (phone.trim()) {
                formData.append("phone", phone.trim());
            }
            if (image) {
                formData.append("image", image);
            }
            if (useAuthImage) {
                formData.append("check", true);
            }
            const result = await createUploads(formData);
            if (!result.success) {
                const type = String(result.type || "").toLowerCase();
                if (result.under && (type === "phone")) {
                    setPhoneError(result.message || "Invalid phone number");
                    return;
                }
                setError(result.message || "Unable to save upload details");
                return;
            }
            await next();
        } catch (err) {
            setError("Unable to save upload details. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full">
            <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Image & Contact
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Add your contact number and choose a profile image for your NexLink identity.
                </p>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <section className="rounded-2xl border border-blue-500/20 bg-slate-950/40 p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-cyan-500/10 p-3 text-xl text-cyan-400">
                            <FiCamera />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">
                                Profile Image
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Choose your identity profile image.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-cyan-400/40 bg-slate-900">
                            <img src={preview} alt="Identity profile" onError={(e) => { e.currentTarget.src = ProfileIcon; }}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
                    <button type="button" onClick={() => fileRef.current?.click()}
                        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-slate-900/70 py-3 font-medium text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                    >
                        <FiUploadCloud />
                        Upload Image
                    </button>
                    <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-blue-500/20 bg-slate-900/50 p-4">
                        <input type="checkbox" checked={useAuthImage} onChange={handleAuthImage} className="mt-1 h-4 w-4 cursor-pointer accent-cyan-500" />
                        <div>
                            <p className="font-medium text-white">
                                Use Account Profile Image
                            </p>
                            <p className="mt-1 text-sm leading-5 text-gray-500">
                                Use the profile image connected to your NexLink account.
                            </p>
                        </div>
                    </label>
                    <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                        Custom uploads are used directly. Select the account image option to use your NexLink profile picture instead.
                    </p>
                </section>
                <section className="rounded-2xl border border-blue-500/20 bg-slate-950/40 p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-cyan-500/10 p-3 text-xl text-cyan-400">
                            <FiUser />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">
                                Contact Details
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Add optional contact information.
                            </p>
                        </div>
                    </div>
                    <div className="mt-7">
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
                            Phone Number
                        </label>
                        <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input id="phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setPhoneError(""); setError(""); }}
                                placeholder="Optional phone number"
                                className={`w-full rounded-xl border bg-slate-950/50 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 ${phoneError ? "border-red-500/60" : "border-blue-500/20 focus:border-cyan-400"
                                    }`}
                            />
                        </div>
                        {phoneError && (
                            <p className="mt-2 text-sm text-red-400">
                                {phoneError}
                            </p>

                        )}
                    </div>
                    <div className="mt-6 rounded-xl border border-blue-500/10 bg-slate-900/40 p-4">
                        <p className="text-sm leading-6 text-gray-400">
                            This step is optional. You can continue without adding a phone number or profile image and update these details later.
                        </p>
                    </div>
                </section>
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
                <button type="submit" disabled={loading}
                    className="min-w-32 cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Saving..." : "Next"}
                </button>
            </div>
        </form>
    );

};

export default Uploads;