import { createContext, useEffect, useState } from "react";
import { Session } from "../Utility/APIFunctions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [messuser, setMessuser] = useState(null);
    const [Loading, setLoading] = useState(true);

    const initialize = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setMessuser("No Active Session");
                return;
            }
            const result = await Session();
            if (result.success) {
                setUser(result.user);
                setMessuser(null);
            } else {
                setUser(null);
                setMessuser(result.message);
            }
        } catch (err) {
            console.error("AuthProvider Error :", err);
            setUser(null);
            setMessuser("Issue in Authentication");
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setMessuser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                messuser, setMessuser,
                Loading, setLoading,
                initialize, logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};