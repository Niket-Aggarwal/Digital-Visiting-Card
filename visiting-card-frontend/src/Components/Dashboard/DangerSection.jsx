import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import { deleteAccount } from "../../Utility/APIFunctions";
import ConfirmModal from "./ConfirmModal";

const DangerSection = () => {

    const { logout } = useAuth();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            setDeleteError(null);
            const result = await deleteAccount();
            if (!result.success) {
                setDeleteError(result.message || "Unable to delete account");
                return;
            }
            await logout();
        } catch (err) {
            setDeleteError("Unable to delete account");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <section className="min-w-0 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-red-500/10 p-3 text-xl text-red-400">
                        <FiTrash2 />
                    </div>
                    <div>
                        <p className="text-sm text-red-400">
                            Danger Zone
                        </p>
                        <h2 className="text-lg font-semibold text-white sm:text-xl">
                            Delete Account
                        </h2>
                    </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-gray-400">
                    Permanently delete your NexLink account and all associated
                    identity information.
                </p>
                <button type="button" onClick={() => { setDeleteError(null); setDeleteOpen(true); }}
                    className="mt-5 cursor-pointer w-full rounded-xl border border-red-500/30 bg-red-500/10 py-3 font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                    Delete Account
                </button>
            </section>
            <ConfirmModal
                open={deleteOpen}
                title="Delete Account?"
                message="Your NexLink account and all associated digital identity information will be permanently deleted."
                buttonText="Delete Account"
                loading={deleteLoading}
                error={deleteError}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default DangerSection;