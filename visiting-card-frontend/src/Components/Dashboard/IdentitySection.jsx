import { useState } from "react";
import { FiCreditCard, FiTrash2, FiGlobe, FiLock, FiLink } from "react-icons/fi";
import useCard from "../../Hooks/useCard";
import { changeVisibility, deleteCard } from "../../Utility/APIFunctions";
import ConfirmModal from "./ConfirmModal";

const IdentitySection = () => {

    const { card, initializecard } = useCard();
    const [visibilityLoading, setVisibilityLoading] = useState(false);
    const [visibilityError, setVisibilityError] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handleVisibility = async () => {
        try {
            setVisibilityLoading(true);
            setVisibilityError(null);
            const result = await changeVisibility();
            if (!result.success) {
                setVisibilityError(result.message || "Unable to update public access");
                return;
            }
            await initializecard();
        } catch {
            setVisibilityError("Unable to update public access. Try again.");
        } finally {
            setVisibilityLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            setDeleteError(null);
            const result = await deleteCard();
            if (!result.success) {
                setDeleteError(result.message || "Unable to delete identity");
                return;
            }
            setDeleteOpen(false);
            await initializecard();
        } catch {
            setDeleteError("Unable to delete identity. Try again.");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <section className="flex min-w-0 flex-col rounded-2xl border border-blue-500/20 bg-slate-900/50 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-xl text-cyan-400">
                        <FiCreditCard />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm text-gray-500">
                            Identity Status
                        </p>
                        <h2 className="text-lg font-semibold text-white sm:text-xl">
                            Digital Presence
                        </h2>
                    </div>
                </div>
                {!card ?
                    (<div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                        <p className="font-medium text-yellow-400">
                            Identity Not Created
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            Create your NexLink digital identity to manage
                            your profile, social presence and public access.
                        </p>
                    </div>) :
                    (<div className="mt-5 flex flex-1 flex-col">
                        <div className="rounded-xl border border-blue-500/20 bg-slate-950/50 p-4">
                            <div className="flex items-center gap-2 text-gray-500">
                                <FiLink />
                                <p className="text-xs uppercase tracking-wider">
                                    Identity Url
                                </p>
                            </div>
                            <a href={`https://mynexlink.vercel.app/p/${card.slug}`} target="_blank" rel="noopener noreferrer"
                                className="mt-3 block wrap-break-word font-medium text-cyan-400 transition hover:text-cyan-300 hover:underline">
                                https://mynexlink.vercel.app/p/{card.slug}
                            </a>
                            <p className="mt-2 text-sm text-gray-500">
                                This is your unique NexLink identity address.
                            </p>
                        </div>
                        <div className="mt-4 rounded-xl border border-blue-500/20 bg-slate-950/50 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-start gap-3">
                                    <div className={`mt-1 rounded-lg p-2 ${card.isPublic ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-800 text-gray-500"}`}>
                                        {card.isPublic ? (<FiGlobe />) : (<FiLock />)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-white">
                                            Public Access
                                        </p>
                                        <p className="mt-1 text-sm leading-5 text-gray-500">
                                            {card.isPublic ?
                                                "Anyone with your NexLink identity link can view your profile." :
                                                "Your NexLink identity is private and cannot be accessed publicly."
                                            }
                                        </p>
                                    </div>
                                </div>
                                <button type="button" disabled={visibilityLoading} onClick={handleVisibility}
                                    aria-label="Change public visibility"
                                    className={`cursor-pointer disabled:cursor-not-allowed relative h-7 w-14 shrink-0 rounded-full transition duration-300 ${card.isPublic
                                        ? "bg-cyan-500" : "bg-slate-700"
                                        } disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${card.isPublic ? "left-8" : "left-1"}`} />
                                </button>
                            </div>
                            {visibilityLoading && (
                                <p className="mt-3 text-sm text-cyan-400">
                                    Updating public access...
                                </p>
                            )}
                            {visibilityError && (
                                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                                    <p className="text-sm text-red-400">
                                        {visibilityError}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 border-t border-blue-500/10 pt-4">
                            <button type="button" onClick={() => { setDeleteError(null); setDeleteOpen(true); }}
                                className="cursor-pointer disabled:cursor-not-allowed flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 py-3 font-medium text-red-400 transition duration-300 hover:border-red-500/40 hover:bg-red-500/10"
                            >
                                <FiTrash2 />
                                Delete Identity
                            </button>
                        </div>
                    </div>
                    )}
            </section>
            <ConfirmModal open={deleteOpen}
                title="Delete Identity?"
                message="Your NexLink digital identity and card information will be permanently deleted."
                buttonText="Delete Identity"
                loading={deleteLoading}
                error={deleteError}
                onClose={() => {
                    if (!deleteLoading) {
                        setDeleteOpen(false);
                    }
                }}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default IdentitySection;