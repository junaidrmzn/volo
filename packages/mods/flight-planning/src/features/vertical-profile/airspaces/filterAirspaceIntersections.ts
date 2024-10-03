import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";
import { FEET_TO_METERS } from "../../../utils";
import type { AirspaceOption } from "./types";

const getTypesToFilter = (options: AirspaceOption[]) =>
    options.filter((option) => option.type === "type").map((option) => String(option.value));

const getClassificationsToFilter = (options: AirspaceOption[]) =>
    options.filter((option) => option.type === "classification").map((option) => String(option.value));

export const filterAirspaceIntersectionsBySelectedOptionsAndRange = (
    airspaceIntersections: AirspaceIntersections[],
    selectedAirspaceOptions: AirspaceOption[],
    airspacesAltitudeRange: [number, number]
) => {
    if (!airspaceIntersections) return [];

    const rangeLowerLimitInMeters = airspacesAltitudeRange[0] * FEET_TO_METERS;
    const rangeUpperLimitInMeters = airspacesAltitudeRange[1] * FEET_TO_METERS;

    const filteredAirspaces = airspaceIntersections.filter((intersection) => {
        return (
            (rangeLowerLimitInMeters <= intersection.lowerLimit &&
                intersection.lowerLimit <= rangeUpperLimitInMeters) ||
            (rangeLowerLimitInMeters <= intersection.upperLimit &&
                intersection.upperLimit <= rangeUpperLimitInMeters) ||
            (intersection.lowerLimit <= rangeLowerLimitInMeters &&
                rangeLowerLimitInMeters <= intersection.upperLimit) ||
            (intersection.lowerLimit <= rangeUpperLimitInMeters && rangeUpperLimitInMeters <= intersection.upperLimit)
        );
    });
    if (!selectedAirspaceOptions || selectedAirspaceOptions.length === 0) return filteredAirspaces;
    const typesToFilter = getTypesToFilter(selectedAirspaceOptions);
    const classificationsToFilter = getClassificationsToFilter(selectedAirspaceOptions);
    return filteredAirspaces.filter((feat) => {
        return (
            (feat.type && typesToFilter.includes(feat.type)) ||
            (feat.classification && classificationsToFilter.includes(feat.classification))
        );
    });
};
