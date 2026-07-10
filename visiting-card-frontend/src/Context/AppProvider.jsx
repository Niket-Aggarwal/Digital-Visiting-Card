import { AuthProvider } from "./AuthContext";
import { CardProvider } from "./CardContext";

const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <CardProvider>
                {children}
            </CardProvider>
        </AuthProvider>
    );
};

export default AppProvider;