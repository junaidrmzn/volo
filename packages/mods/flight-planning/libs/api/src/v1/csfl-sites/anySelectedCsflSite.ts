import { SelectedCsflSite } from "./models";

export const anySelectedCsflSite = (overwrites?: Partial<SelectedCsflSite>): SelectedCsflSite => ({
    routeId: 1,
    csflSiteId: 1,
    ...overwrites,
});
