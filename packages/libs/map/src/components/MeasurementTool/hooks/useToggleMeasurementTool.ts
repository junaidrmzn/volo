import { useState } from "react";

export const useToggleMeasurementTool = () => {
    const [isMeasurementToolActive, setIsMeasurementToolActive] = useState(false);
    const toggleMeasurementTool = () => setIsMeasurementToolActive((oldState) => !oldState);
    return { isMeasurementToolActive, toggleMeasurementTool };
};
