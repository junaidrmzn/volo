import { isFlightTestDefinition } from "../../v1/definitions/isFlightTestDefinitionGuard";
import type { FlightTestDefinitionChangesOverview } from "./apiModels";

export const isFlightTestDefinitionChangesOverview = (
    object?: unknown
): object is FlightTestDefinitionChangesOverview => {
    if (!object) {
        return false;
    }

    const { procedures, manualRequirements, windchillRequirements, ftiLinks, specialComments, ...rest } =
        object as FlightTestDefinitionChangesOverview;

    return (
        isFlightTestDefinition(rest) &&
        (!procedures || (!!procedures && Array.isArray(procedures))) &&
        (!manualRequirements || (!!manualRequirements && Array.isArray(manualRequirements))) &&
        (!windchillRequirements || (!!windchillRequirements && Array.isArray(windchillRequirements))) &&
        (!ftiLinks || (!!ftiLinks && Array.isArray(ftiLinks))) &&
        (!specialComments || (!!specialComments && Array.isArray(specialComments)))
    );
};
