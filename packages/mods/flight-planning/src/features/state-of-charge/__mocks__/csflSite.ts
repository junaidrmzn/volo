import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";

export const mockedCsflSite: CsflSite = {
    lat: 11,
    lng: 11,
    name: "Test CSFL Site",
    type: "Aerodrome",
    isDeleted: false,
};

export const createMockedCsflSite = (overrides?: Partial<CsflSite>): CsflSite => ({
    ...mockedCsflSite,
    ...overrides,
});
