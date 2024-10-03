import type { AirspaceIntersections } from "@voloiq-typescript-api/flight-planning-types/dist";
import { randomUUID } from "node:crypto";

export const anyAirspaceIntersection = (overwrites?: Partial<AirspaceIntersections>): AirspaceIntersections => {
    return {
        externalId: randomUUID(),
        name: "Any Airspace Intersection",
        type: "R",
        classification: "R",
        leftBorder: 0,
        rightBorder: 6000,
        lowerLimit: 0,
        upperLimit: 1048,
        ...overwrites,
    };
};
