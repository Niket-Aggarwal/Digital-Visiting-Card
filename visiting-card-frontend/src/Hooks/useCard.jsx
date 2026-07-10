import { useContext } from "react";
import { CardContext } from "../Context/CardContext";

export default function useCard() {
    return useContext(CardContext);
}