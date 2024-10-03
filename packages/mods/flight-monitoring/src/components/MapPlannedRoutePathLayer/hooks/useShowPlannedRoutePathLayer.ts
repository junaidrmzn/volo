import { useState } from "react";

export const useShowPlannedRoutePath = () => {
    const [showRoutePath, setShowRoutePath] = useState(false);
    const toggleShowRoutePath = () => setShowRoutePath((isFlightPathDrawn) => !isFlightPathDrawn);
    return { showRoutePath, toggleShowRoutePath, setShowRoutePath };
};
