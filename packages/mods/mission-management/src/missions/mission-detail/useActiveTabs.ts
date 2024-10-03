import { useNavigate, useSearchParams } from "@voloiq/routing";

const tabNames = new Set([
    "overview",
    "passenger",
    "aircraft",
    "crew",
    "groundOperations",
    "flightPlan",
    "notams",
    "weather",
    "assignments",
]);

const isTabName = (name: string) => {
    return tabNames.has(name);
};

export type TabConfig = {
    name: string;
    condition: boolean;
};

export const useActiveTab = (tabs: TabConfig[]) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTabName = searchParams.get("tab");

    const filteredTabs = tabs.filter((tab) => tab.condition);

    const tabIndices: Record<string, number> = Object.fromEntries(filteredTabs.map((tab, index) => [tab.name, index]));

    const defaultIndex = activeTabName && isTabName(activeTabName) ? tabIndices[activeTabName] || 0 : 0;

    const setActiveTab = (tabName: string) => {
        navigate(`?tab=${tabName}`);
    };

    const handleTabChange = (index: number) => {
        const tabName = Object.keys(tabIndices)[index];
        if (tabName && isTabName(tabName)) {
            setActiveTab(tabName);
        }
    };

    return {
        defaultIndex,
        handleTabChange,
    };
};
