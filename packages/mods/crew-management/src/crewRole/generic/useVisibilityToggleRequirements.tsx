import { useState } from "react";

export const useVisibilityToggleRequirements = () => {
    const [isVisible, setIsVisible] = useState(false);

    return { isVisible, setIsVisible };
};
