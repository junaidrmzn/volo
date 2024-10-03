import type { ExternalAircraftType, Vertiport } from "@voloiq-typescript-api/flight-planning-types/dist";
import { useCallback } from "react";
import { useFlightPlanningTranslation } from "../../../../translations";
import { useGetAllAircraftTypes, useGetAllVertiports } from "../../api-hooks";

// NOTE: Filtering is outscoped of vfp-704 => Follow-up ticket is VFP-825
export const useGetFilters = () => {
    const { t } = useFlightPlanningTranslation();
    const { getAllExternalAircraftTypes } = useGetAllAircraftTypes();
    const { getAllVertiports } = useGetAllVertiports();
    const buildFilters = useCallback(
        (aircraftTypes: ExternalAircraftType[], vertiports: Vertiport[]) => [
            {
                type: "text",
                propertyName: "name",
                displayName: t("routeOption.properties.name"),
            },
            {
                type: "select",
                propertyName: "aircraftTypeId",
                displayName: t("routeOption.properties.aircraftType"),
                options: aircraftTypes.map((aircraftType) => ({
                    value: aircraftType.externalId,
                    label: aircraftType.name,
                })),
            },
            {
                type: "boolean",
                propertyName: "validForOperation",
                displayName: t("routeOption.properties.validForOperation"),
                trueLabel: t("routeOption.metaInfo.valid"),
                falseLabel: t("routeOption.metaInfo.invalid"),
                neutralLabel: t("common.any"),
            },
            {
                type: "select",
                propertyName: "departureVertiport",
                displayName: t("routeOption.properties.departureVertiport"),
                options: vertiports.map((vertiport) => ({
                    value: `${vertiport.id}`,
                    label: vertiport.name,
                })),
            },
            {
                type: "select",
                propertyName: "arrivalVertiport",
                displayName: t("routeOption.properties.arrivalVertiport"),
                options: vertiports.map((vertiport) => ({
                    value: `${vertiport.id}`,
                    label: vertiport.name,
                })),
            },
        ],
        [t]
    );
    const getAllFiltersAsync = async () => {
        const [aircraftTypes, vertiports] = await Promise.all([getAllExternalAircraftTypes(), getAllVertiports()]);

        if (!aircraftTypes) {
            throw new Error("Failed to fetch filter options");
        }
        return buildFilters(aircraftTypes, vertiports);
    };
    const getAllFilters = () => {
        return buildFilters([], []);
    };
    return { getAllFilters, getAllFiltersAsync };
};
