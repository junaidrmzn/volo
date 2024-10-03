import { FullEnvelopeValidation } from "../models";

export const anyFullEnvelopeValidation = (overrides?: Partial<FullEnvelopeValidation>): FullEnvelopeValidation => ({
    windScenarios: [
        {
            windSpeed: 21,
            windDirection: 210,
            isRouteValid: false,
        },
    ],
    alerts: [],
    validationStatus: "valid",
    ...overrides,
});
