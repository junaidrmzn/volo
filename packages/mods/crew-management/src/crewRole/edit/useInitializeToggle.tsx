import { useState } from "react";

export const useInitializeToggle = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    return { isInitialized, setIsInitialized };
};
