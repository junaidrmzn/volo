import { useState } from "react";

export const useShowFlightPath = () => {
    const [showFlightPath, setShowFlightPath] = useState(false);
    const toggleShowFlightPath = () => setShowFlightPath((isFlightPathDrawn) => !isFlightPathDrawn);
    return { showFlightPath, toggleShowFlightPath, setShowFlightPath };
};
