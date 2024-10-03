import type { Location } from "./apiModels";

export const anyLocation = (overwrites?: Partial<Location>): Location => ({
    id: "wf435gweq4vrewr5",
    icaoCode: "FRA",
    latitude: 0,
    longitude: 0,
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});
