import { CsflSite } from "./models";

export const anyCsflSite = (overwrites?: Partial<CsflSite>): CsflSite => ({
    name: "Site 1",
    lng: 3,
    lat: 5,
    type: "Building",
    isDeleted: false,
    ...overwrites,
});
