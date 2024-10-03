import type { ExternalAircraftType } from "@voloiq/flight-planning-api/v1";

export const mockedAircraftType: ExternalAircraftType = {
    externalId: "type-1",
    name: "type-name",
    productLine: "VOLOCITY",
    validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    createTime: "",
    updateTime: "",
};

export const createMockedAircraftType = (overrides?: Partial<ExternalAircraftType>): ExternalAircraftType => ({
    ...mockedAircraftType,
    ...overrides,
});
