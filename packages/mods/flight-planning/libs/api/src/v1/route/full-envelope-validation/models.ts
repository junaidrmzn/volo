import { Alert } from "../models";

export type FullEnvelopeValidation = {
    windScenarios: {
        windSpeed: number;
        windDirection: number;
        isRouteValid: boolean;
    }[];
    alerts: Alert[];
    validationStatus?: "invalid" | "valid" | "not_yet_validated";
};
