export type CsflSite = {
    id?: number;
    lat: number;
    lng: number;
    alt?: number;
    name: string;
    type: string;
    isDeleted: boolean;
};

export type SelectedCsflSite = {
    routeId: number;
    csflSiteId: number;
};

export type SaveSelectedCsflSites = {
    ids: number[];
};
