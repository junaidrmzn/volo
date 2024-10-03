import { pactify } from "../../../pactify";

export const anyNotams = (overrides?: object) => ({
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "GeometryCollection",
                geometries: [{ type: "Point" }],
            },
            properties: {
                affectedFIR: "LFFF",
                countryCode: "FRA",
                createdAt: "2023-10-12T05:06:29.275446Z",
                effectiveStart: "2023-05-18T00:00:00Z",
                externalId: "",
                lat: 48.1,
                lon: 2.7,
                maximumFL: 1,
                metadata: {
                    geometrySources: ["point_and_radius"],
                    lastUpdateTimestamp: "2023-09-14T09:50:53Z",
                },
                minimumFL: 1,
                number: 4009,
                publisherNOF: "LFFA",
                purpose: "BO",
                qcode: "QMKTT",
                radius: 5,
                routeOptionId: 1,
                scope: "A",
                series: "E",
                text: "MUST CONTACT PARIS",
                traffic: "IV",
                type: "N",
                year: 2023,
            },
        },
    ],
    ...overrides,
});

export const anyPactNotams = pactify(anyNotams);
