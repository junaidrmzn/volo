import { ExternalAircraft } from "./models";

export const anyExternalAircraft = (overwrites?: Partial<ExternalAircraft>): ExternalAircraft => ({
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
    createTime: "",
    updateTime: "",
    ...overwrites,
});
