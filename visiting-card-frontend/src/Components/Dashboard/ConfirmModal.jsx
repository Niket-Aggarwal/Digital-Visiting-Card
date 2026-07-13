import { FiAlertTriangle, FiX } from "react-icons/fi";

const ConfirmModal = ({ open, title, message, buttonText, loading, error, onClose, onConfirm }) => {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-slate-950 p-6 shadow-[0_0_50px_rgba(239,68,68,0.15)] sm:p-8">
                <button type="button" disabled={loading} onClick={onClose}
                    className="absolute right-4 top-4 cursor-pointer disabled:cursor-not-allowed rounded-lg p-2 text-xl text-gray-500 transition hover:bg-slate-900 hover:text-white"
                >
                    <FiX />
                </button>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-3xl text-red-400">
                    <FiAlertTriangle />
                </div>
                <div className="mt-5 text-center">
                    <h2 className="text-2xl font-bold text-white">
                        {title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-400">
                        {message}
                    </p>
                    <p className="mt-2 text-sm font-medium text-red-400">
                        This action cannot be undone.
                    </p>
                </div>
                {error && (
                    <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button type="button" disabled={loading} onClick={onClose}
                        className="w-full rounded-xl cursor-pointer border border-blue-500/20 bg-slate-900 py-3 font-medium text-gray-300 transition hover:text-white disabled:opacity-60"
                    >
                        Cancel
                    </button>
                    <button type="button" disabled={loading} onClick={onConfirm}
                        className="flex w-full cursor-pointer disabled:cursor-not-allowed items-center justify-center rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
                    >
                        {
                            loading ?
                                (<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />) :
                                (buttonText)
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;