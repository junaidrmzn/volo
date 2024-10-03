import type { Airspace, AirspaceFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import { METERS_TO_FEET } from "../../../utils";
import type { AltitudeRange, Option } from "../types";

const getTypesToFilter = (options: Option[]) =>
    options.filter((option) => option.type === "type").map((option) => String(option.value));

const getClassificationsToFilter = (options: Option[]) =>
    options.filter((option) => option.type === "classification").map((option) => String(option.value));

const filterAirspaceFeaturesByRange = (features: AirspaceFeatureAllOf[], altitudeRange: AltitudeRange) =>
    features.filter((feat) => {
        const lowerLimit = Math.round((feat?.properties?.lowerLimit?.value ?? 0) * METERS_TO_FEET);
        const upperLimit = Math.round((feat?.properties?.upperLimit?.value ?? 0) * METERS_TO_FEET);

        return (
            (altitudeRange[0] <= lowerLimit && lowerLimit <= altitudeRange[1]) ||
            (altitudeRange[0] <= upperLimit && upperLimit <= altitudeRange[1]) ||
            (lowerLimit <= altitudeRange[0] && altitudeRange[0] <= upperLimit) ||
            (lowerLimit <= altitudeRange[1] && altitudeRange[1] <= upperLimit)
        );
    });

export const filterAirspacesByRangeAndType = (
    altitudeRange: AltitudeRange,
    selectedAirspaceOptions: Option[],
    airspaces: Airspace | undefined
) => {
    if (!airspaces) return [];

    const featuresInRange = filterAirspaceFeaturesByRange(airspaces?.features, altitudeRange);
    if (!selectedAirspaceOptions || selectedAirspaceOptions.length === 0) return featuresInRange;

    const typesToFilter = getTypesToFilter(selectedAirspaceOptions);
    const classificationsToFilter = getClassificationsToFilter(selectedAirspaceOptions);

    return featuresInRange.filter((feat) => {
        return (
            (feat.properties.type && typesToFilter.includes(feat.properties.type)) ||
            (feat.properties.classification && classificationsToFilter.includes(feat.properties.classification))
        );
    });
};
