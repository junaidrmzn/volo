import { useEffect, useState } from "react";

const sanitizeId = (id: string) => {
    return decodeURIComponent(id).replace(/^#/, "").replace(/\s/g, "\\ ");
};

export type AnchorNavBarTab = {
    linkId: string;
    label: string;
};

export const useActiveTab = (tabs: AnchorNavBarTab[]) => {
    const [activeTab, setActiveTab] = useState<string | undefined>();
    const tabsHash = Object.fromEntries(tabs.map((tab, index) => [tab.linkId, index]));

    const handleTabChange = (linkId: string) => {
        const targetElement = document.querySelector(`#${linkId}`);

        if (targetElement) {
            setActiveTab(linkId);
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        const currentURLHash = window.location.hash;

        if (currentURLHash) {
            const sanitizedHash = sanitizeId(currentURLHash);
            handleTabChange(sanitizedHash);
        }
    }, []);

    return { handleTabChange, activeTabIndex: activeTab ? tabsHash[activeTab] : 0 };
};
