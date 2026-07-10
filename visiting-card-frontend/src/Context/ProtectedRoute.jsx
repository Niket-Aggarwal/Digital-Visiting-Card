import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, Loading } = useAuth();
    if (Loading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950">
                <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400"></div>
                </div>
                <h2 className="mt-6 text-xl font-semibold text-white">
                    Restoring Session
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                    Please wait...
                </p>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;