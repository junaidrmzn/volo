import type { CsflSite, RouteCsflSitesLink } from "@voloiq-typescript-api/flight-planning-types";

export const anyCsflSite = (overwrites?: Partial<CsflSite>): CsflSite => ({
    id: 39,
    name: "Site 1",
    lng: 3,
    lat: 5,
    alt: 7,
    type: "Building",
    isDeleted: false,
    ...overwrites,
});

export const mockedCsflSites: CsflSite[] = [
    anyCsflSite({ id: 1, name: "Site 1", isDeleted: true }),
    anyCsflSite({ id: 2, name: "Site 2" }),
    anyCsflSite({ id: 3, name: "Site 3" }),
];

export const anySelectedCsflSite = (overwrites?: Partial<RouteCsflSitesLink>): RouteCsflSitesLink => ({
    routeId: 23,
    csflSiteId: 39,
    ...overwrites,
});

export const mockedSelectedCsflSites: RouteCsflSitesLink[] = [
    anySelectedCsflSite({ routeId: 23, csflSiteId: 1 }),
    anySelectedCsflSite({ routeId: 23, csflSiteId: 2 }),
    anySelectedCsflSite({ routeId: 23, csflSiteId: 3 }),
];
