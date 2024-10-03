import { AirspaceIntersections } from "../models";

export const anyAirspaceIntersection = (overrides?: Partial<AirspaceIntersections>): AirspaceIntersections => ({
    externalId: "0d7dc345-718d-3b44-b06d-e90e912daf0c",
    name: "VEILLE REGION PARISIENNE",
    type: "R",
    classification: "A",
    leftBorder: 1847.27,
    rightBorder: 1588.82,
    lowerLimit: 142,
    upperLimit: 904,
    ...overrides,
});
