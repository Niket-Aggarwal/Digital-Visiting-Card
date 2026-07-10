import { createContext, useState, useEffect } from "react";
import { Dashboard } from "../Utility/APIFunctions";
import useAuth from "../Hooks/useAuth";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {

    const [card, setCard] = useState(null);
    const [messcard, setMesscard] = useState(null);
    const [loading, setloading] = useState(false);

    const initializecard = async () => {
        try {
            setloading(true);
            const result = await Dashboard();
            if (result.success) {
                setCard(result.Card);
                setMesscard(null);
            } else {
                setCard(null);
                setMesscard(result.message);
            }
        } catch (err) {
            console.error("CardProvider Error :", err);
            setCard(null);
            setMesscard("Issue in Loading Dashboard");
        } finally {
            setloading(false);
        }
    };
    const clearCard = () => {
        setCard(null);
        setMesscard(null);
    };
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            initializecard();
        } else {
            clearCard();
        }
    }, [user]);
    return (
        <CardContext.Provider
            value={{
                card, setCard,
                loading, setloading,
                messcard, setMesscard,
                initializecard,
                clearCard,
            }}
        >
            {children}
        </CardContext.Provider>
    );
};