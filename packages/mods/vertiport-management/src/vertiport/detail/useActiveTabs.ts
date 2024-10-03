import { useNavigate, useSearchParams } from "@voloiq/routing";

const tabNames = new Set(["general", "location", "operations", "localisation", "resources", "equipment", "pads"]);

const isTabName = (name: string) => {
    return tabNames.has(name);
};

export const useActiveTab = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTabName = searchParams.get("tab");

    const tabIndices: Record<string, number> = {
        general: 0,
        location: 1,
        operations: 2,
        localisation: 3,
        resources: 4,
        equipment: 5,
        pads: 6,
    };

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
