import { useState } from "react";

export const useShowAirspaces = () => {
    const [showAirspaces, setShowAirspaces] = useState(false);
    return {
        showAirspaces,
        setShowAirspaces,
    };
};
