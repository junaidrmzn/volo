import { useNavigate, useSearchParams } from "@voloiq/routing";

const tabNames = new Set(["general", "roles", "other"]);

const isTabName = (name: string) => {
    return tabNames.has(name);
};

export const useActiveTab = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTabName = searchParams.get("tab");

    const tabIndices: Record<string, number> = {
        general: 0,
        roles: 1,
        other: 2,
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
