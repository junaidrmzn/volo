import type { Aircraft } from "@voloiq-typescript-api/aircraft-management-types";
import type { ExternalAircraft } from "@voloiq/flight-planning-api/v1";

export const mockedAircraft: ExternalAircraft & Aircraft = {
    // TODO: remove old type
    id: "aircraft-1",
    externalId: "aircraft-1",
    dryOperatingMass: 200,
    colorAndMarkingCharacteristics: [],
    registration: "aircraft-1",
    communicationCapabilities: [],
    nominalEndurance: 2,
    nominalRange: 2,
    survivalEquipmentClassifications: [],
    surveillanceTransponderTypes: [],
    aircraftTypeId: "type-1",
    msn: "msn",
    technicalStatus: "SERVICEABLE",
    homebaseVertiportId: "aabbccdd-1122-3344-5566-778899001001",
    validFrom: "validFrom",
    crewConfiguration: "CREWED",
    service: "PASSENGER",
    services: ["PASSENGER"],
    createTime: "",
    updateTime: "",
};

export const createMockedAircraft = (
    overrides?: Partial<ExternalAircraft & Aircraft>
): ExternalAircraft & Aircraft => ({
    ...mockedAircraft,
    ...overrides,
});
