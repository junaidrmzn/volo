import { useState } from "react";

type Option = {
    value: number;
    label: string;
};

export const useAirspaces = () => {
    const [altitudeRange, setAltitudeRange] = useState<[number, number]>([0, 10_000]);
    const [selectedAirspaceOptions, setSelectedAirspaceOptions] = useState<Option[]>([]);

    const changeAltitudeRange = (newAltitudeRange: [number, number]) => {
        setAltitudeRange(newAltitudeRange);
    };

    return {
        altitudeRange,
        selectedAirspaceOptions,
        changeAltitudeRange,
        setSelectedAirspaceOptions,
    };
};
