import { useState } from "react";

export const useAircraftSection = () => {
    const [selectedAircraftId, setSelectedAircraftId] = useState<string>("");
    return { selectedAircraftId, setSelectedAircraftId };
};
