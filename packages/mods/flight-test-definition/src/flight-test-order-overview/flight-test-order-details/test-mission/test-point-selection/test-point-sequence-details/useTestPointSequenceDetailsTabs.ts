import { useState } from "react";

const TABS_INDEXES = Object.freeze({
    TEST_POINT: 0,
    ADDITIONAL_NOTES: 1,
});

export const useTestPointSequenceDetailsTabs = () => {
    const [currentTabIndex, setTabIndex] = useState(0);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    return { currentTabIndex, handleTabsChange, TABS_INDEXES };
};
