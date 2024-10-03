import { useContext } from "react";
import { MapContext } from "./MapContext";

export const useMapContext = () => {
    const context = useContext(MapContext);

    if (context === undefined) throw new Error("useMapContext must be used within MapContextProvider");

    return context;
};
