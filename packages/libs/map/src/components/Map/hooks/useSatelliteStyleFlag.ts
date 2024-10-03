import { useState } from "react";

/**
 * Helper hook to pass the State of satellite down into the switcher button.
 * satellite is a flag upon which the map decides which style to display (satellite style or default)
 * @returns state and setter of satellite
 */
export const useSatelliteStyleFlag = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isSatellite, setSatellite] = useState(true);
    return [isSatellite, setSatellite];
};
