import { FiLogOut } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import ProfileIcon from "../../assets/Profile.png";

const ProfileSection = () => {

    const { user, logout } = useAuth();

    return (
        <section className="flex min-w-0 flex-col justify-between rounded-2xl border border-blue-500/20 bg-slate-900/50 p-5 sm:p-6">
            <div>
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-cyan-400/40 bg-slate-950 sm:h-24 sm:w-24">
                        <img src={user?.picture ?? ProfileIcon} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 w-full text-center sm:text-left">
                        <h2 className="mt-2 truncate text-xl font-bold text-white sm:text-2xl">
                            {user?.name || "NexLink User"}
                        </h2>
                        <p className="mt-1 truncate text-sm text-gray-400">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="mt-5 rounded-xl border border-blue-500/10 bg-slate-950/40 px-4 py-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-400">
                        Welcome, <strong>{user?.name}</strong>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        Your NexLink profile is your digital identity in one place.
                        Manage and share your social accounts, links, and online presence
                        with friends through a simple and connected identity.
                    </p>
                </div>
            </div>
            <button type="button" onClick={logout}
                className="mt-5 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-slate-950/50 py-3 font-medium text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
            >
                <FiLogOut />
                Logout
            </button>
        </section>
    );
};

export default ProfileSection;