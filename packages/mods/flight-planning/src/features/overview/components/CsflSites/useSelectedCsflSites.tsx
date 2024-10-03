import { useEffect, useState } from "react";
import {
    useGetFullEnvelopeValidationQuery,
    useGetSelectedCsflSitesQuery,
    useSaveCsflSitesQuery,
} from "@voloiq/flight-planning-api/v1";
import type { Route, SelectedCsflSite } from "@voloiq/flight-planning-api/v1";
import { useGetRouteFullEnergy } from "../../../../api-hooks";

type SelectedCsflSitesOptions = {
    selectedRoute: Route;
    onClose: () => void;
};

export function useSelectedCsflSites(options: SelectedCsflSitesOptions) {
    const { selectedRoute, onClose } = options;
    const { saveSelectedCsflSites } = useSaveCsflSitesQuery({
        routeOptionId: selectedRoute.routeOptionId,
        routeId: selectedRoute.id,
    });
    const { data: selectedCsflSitesQueryData } = useGetSelectedCsflSitesQuery({
        routeId: selectedRoute.id,
        isEnabled: !!selectedRoute.id,
    });
    const [checkedItems, setCheckedItems] = useState<SelectedCsflSite[]>([]);
    const { clearFullEnergyCache } = useGetRouteFullEnergy(selectedRoute.id);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId: selectedRoute.id });

    useEffect(() => {
        if (selectedCsflSitesQueryData) {
            setCheckedItems(selectedCsflSitesQueryData);
        }
    }, [selectedCsflSitesQueryData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;

        setCheckedItems((previous) => {
            return checked
                ? [...previous, { routeId: selectedRoute.id, csflSiteId: +value }]
                : previous.filter((item) => item.csflSiteId !== +value);
        });
    };

    const handleSubmit = () => {
        const selectedCsflSites = {
            ids: checkedItems.map((item) => item.csflSiteId),
        };
        saveSelectedCsflSites(selectedCsflSites);
        clearFullEnergyCache();
        clearFullEnvelopeValidationCache();
        onClose();
    };

    return { checkedItems, handleChange, handleSubmit };
}
