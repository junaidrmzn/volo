import { useState } from "react";

export const useAltitudeReferenceTabField = (initialState: string) => {
    const [selectedReference, setSelectedReference] = useState(initialState);

    return { selectedReference, setSelectedReference };
};
