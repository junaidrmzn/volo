import { useState } from "react";

export const useAircraft = (aircraft: string) => {
    const [selected, setSelectedAircraft] = useState<string | null>(aircraft);

    return { selected, setSelectedAircraft };
};
