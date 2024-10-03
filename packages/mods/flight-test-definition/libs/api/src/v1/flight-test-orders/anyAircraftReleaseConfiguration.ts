import type { AircraftReleaseConfiguration } from "./apiModels";

type AircraftConfigurationType =
    | "Basic Aircraft Config."
    | "Software Configuration"
    | "Temporary Equipment"
    | "Safety Equipment"
    | "Flight Test Instrumentation";

type AnyAircraftReleaseConfiguration = Partial<
    Omit<AircraftReleaseConfiguration, "type"> & { type: AircraftConfigurationType }
>;

export const anyAircraftReleaseConfiguration = (
    overwrites: AnyAircraftReleaseConfiguration = {}
): AircraftReleaseConfiguration => ({
    type: "Basic Aircraft Config.",
    required: "Test Required",
    status: "Test Status",
    accept: false,
    commentOnDeviation: "Test Comment On Deviation",
    ...overwrites,
});
