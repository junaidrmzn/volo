import type { RouteCsflSitesLink } from "@voloiq-typescript-api/flight-planning-types";
import { CsflSite, useGetCsflSitesQuery, useGetSelectedCsflSitesQuery } from "@voloiq/flight-planning-api/v1";
import type { Route } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, useMapContext } from "@voloiq/map";
import { csflMarkerLayer } from "./CsflMarkerLayer";
import { csflProperties } from "./types";
import { useCsflSitesLayer } from "./useCsflSitesLayer";

export type CsflSitesLayerProps = {
    selectedRoute: Route;
    onSiteClick: (site: CsflSite) => void;
    showCsflSites: boolean;
};

export const CsflSitesLayer = (props: CsflSitesLayerProps) => {
    const { selectedRoute, onSiteClick, showCsflSites } = props;
    const { data: allCsflSitesQueryData } = useGetCsflSitesQuery({
        routeId: selectedRoute.id,
        isEnabled: !!selectedRoute.id,
    });
    const { data: selectedCsflSitesQueryData } = useGetSelectedCsflSitesQuery({ routeId: selectedRoute.id });
    const { map } = useMapContext();
    useCsflSitesLayer(allCsflSitesQueryData, selectedCsflSitesQueryData, selectedRoute, showCsflSites);
    if (map && showCsflSites && allCsflSitesQueryData) {
        for (const csflSite of allCsflSitesQueryData as csflProperties[]) {
            csflSite.selected = !!selectedCsflSitesQueryData?.find(
                (selectedSite: RouteCsflSitesLink) => csflSite.id === selectedSite.csflSiteId
            );
        }

        csflMarkerLayer({
            map: map as VoloiqMap,
            csflData: allCsflSitesQueryData,
            onClick: onSiteClick,
        });
    }
    return <></>;
};
