import { useState } from "react";

export const useLayoutSection = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return {
        isCollapsed,
        setIsCollapsed,
    };
};
