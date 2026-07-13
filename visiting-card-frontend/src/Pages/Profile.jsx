import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiGrid, FiPlus, FiEdit3, FiEye, FiX } from "react-icons/fi";
import Navbar from "../Components/Other/Navbar";

const Profile = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen text-white">
            <Navbar setMenuOpen={setMenuOpen} profile={true} />
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                />
            )}
            <aside
                className={`fixed right-0 top-0 z-50 h-screen w-72 border-l border-blue-500/20 bg-slate-950 p-6 transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-300">
                        Control Panel
                    </h2>
                    <button type="button" onClick={() => setMenuOpen(false)}
                        className="rounded-lg border border-blue-500/20 bg-slate-900 p-2 text-xl text-gray-400 transition hover:text-cyan-400"
                    >
                        <FiX />
                    </button>
                </div>
                <div className="flex flex-col gap-5">
                    <NavLink to="/profile/dashboard" onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)]"
                            }`
                        }
                    >
                        <FiGrid className="text-xl" />
                        Identity Center
                    </NavLink>
                    <NavLink to="/profile/create" onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)]"
                            }`
                        }
                    >
                        <FiPlus className="text-xl" />
                        Digital Creation
                    </NavLink>
                    <NavLink to="/profile/update" onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)]"
                            }`
                        }
                    >
                        <FiEdit3 className="text-xl" />
                        Refine Identity
                    </NavLink>
                    <NavLink to="/profile/show" onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)]"
                            }`
                        }
                    >
                        <FiEye className="text-xl" />
                        Live Preview
                    </NavLink>
                </div>
            </aside>
            <div className="flex min-h-[calc(100vh-5rem)]">
                <aside className="hidden w-72 shrink-0 border-r border-blue-500/20 bg-slate-950/40 p-6 lg:block">
                    <div className="flex flex-col gap-5">
                        <NavLink to="/profile/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                    ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                    : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)] hover:text-white"
                                }`
                            }
                        >
                            <FiGrid className="text-xl" />
                            Identity Center
                        </NavLink>
                        <NavLink to="/profile/create"
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                    ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                    : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)] hover:text-white"
                                }`
                            }
                        >
                            <FiPlus className="text-xl" />
                            Digital Creation
                        </NavLink>
                        <NavLink to="/profile/update"
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                    ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                    : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)] hover:text-white"
                                }`
                            }
                        >
                            <FiEdit3 className="text-xl" />
                            Refine Identity
                        </NavLink>
                        <NavLink to="/profile/show"
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl border px-5 py-4 font-medium transition-all duration-200 ${isActive
                                    ? "translate-y-1 border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                    : "-translate-y-1 border-blue-500/20 bg-slate-900/80 text-gray-400 shadow-[0_6px_0_rgba(15,23,42,1)] hover:text-white"
                                }`
                            }
                        >
                            <FiEye className="text-xl" />
                            Live Preview
                        </NavLink>
                    </div>
                </aside>
                <main className="min-w-0 flex-1 overflow-x-hidden">
                    <div className="mx-auto min-h-full max-w-7xl p-5 sm:p-8 lg:p-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;