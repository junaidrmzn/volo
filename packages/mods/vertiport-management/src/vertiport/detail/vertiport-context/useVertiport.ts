import { useContext } from "react";
import { VertiportContext } from "./VertiportContext";

export const useVertiport = () => {
    const context = useContext(VertiportContext);

    if (context === undefined) {
        throw new Error("useVertiport must be used within VertiportProvider");
    }

    return context;
};
