import { Vertiport } from "./models";

export const anyVertiport = (overwrites: Partial<Vertiport> = {}): Vertiport => ({
    id: 123,
    name: "Foo",
    lat: 0,
    lng: 0,
    alt: 123,
    externalId: "Foo",
    ...overwrites,
});
