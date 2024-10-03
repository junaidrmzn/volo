import { useState } from "react";

export const useExpandedItems = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    return { expandedItems, setExpandedItems };
};
