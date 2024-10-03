import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";
import { useEffect, useState } from "react";
import { useSelectedRoute } from "../../selected-route";

export const useShowCsflSites = () => {
    const [showCsflSites, setShowCsflSites] = useState(false);
    const [selectedSite, setSelectedSite] = useState<CsflSite>();
    const { selectedRoute } = useSelectedRoute();

    useEffect(() => {
        if (!selectedRoute) setShowCsflSites(false);
    }, [selectedRoute]);

    return {
        showCsflSites,
        setShowCsflSites,
        selectedSite,
        setSelectedSite,
    };
};
