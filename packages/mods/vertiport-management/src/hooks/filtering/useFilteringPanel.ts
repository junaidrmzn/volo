import { useState } from "react";

export const useFilteringPanel = () => {
    const [isFilteringPanelShown, setIsFilteringPanelShown] = useState<boolean>(false);

    return { isFilteringPanelShown, setIsFilteringPanelShown };
};
