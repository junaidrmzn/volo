import { verticalProfileAfterWaypointUpdate } from "./verticalProfileAfterWaypointUpdate";
import { verticalProfileInitState } from "./verticalProfileInitState";
import { verticalProfileWithoutCorridor } from "./verticalProfileWithoutCorridor";

export const graphImagesObject: { [key: string]: string } = {
    init: verticalProfileInitState,
    update: verticalProfileAfterWaypointUpdate,
    noCorridor: verticalProfileWithoutCorridor,
};
