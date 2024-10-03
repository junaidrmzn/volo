import { useState } from "react";

export const useShowVfr = () => {
    const [showVfr, setShowVfr] = useState(false);
    const [selectedVfrLayers, setSelectedVfrLayers] = useState<string[]>([]);
    const MAX_SELECTIONS = 3;

    const handleVfrLayerSelection = (option: string) => {
        if (selectedVfrLayers?.includes(option)) {
            // Filters the selected VFR layer option if it already exists in the array.
            setSelectedVfrLayers(selectedVfrLayers.filter((vfrLayer: string) => vfrLayer !== option));
        } else if (selectedVfrLayers.length < MAX_SELECTIONS) {
            setSelectedVfrLayers([...selectedVfrLayers, option]);
        }
    };

    return { showVfr, setShowVfr, selectedVfrLayers, handleVfrLayerSelection };
};
