import { useState } from "react";

export const useMonitoring = () => {
    const [isAircraftCentered, setAircraftCentered] = useState(false);
    const toggleAircraftCentered = () => setAircraftCentered((isCentered) => !isCentered);
    const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(null);
    return {
        isAircraftCentered,
        toggleAircraftCentered,
        setAircraftCentered,
        selectedAircraftId,
        setSelectedAircraftId,
    };
};
