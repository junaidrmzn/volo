import type { AirspaceAllOf } from "@voloiq-typescript-api/flight-planning-types";

export const mockedAirspaceList: AirspaceAllOf = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                geometries: [{ type: "Point" }],
            },
            properties: {
                type: "CTR",
                lowerLimit: {
                    uom: "METER",
                    value: 0,
                    reference: "AGL",
                },
                upperLimit: {
                    uom: "METER",
                    value: 100,
                    reference: "AGL",
                },
                classification: "A",
            },
        },
        {
            type: "Feature",
            geometry: {
                geometries: [{ type: "Point" }],
            },
            properties: {
                type: "CTR",
                lowerLimit: {
                    uom: "METER",
                    value: 0,
                    reference: "AGL",
                },
                upperLimit: {
                    uom: "METER",
                    value: 100,
                    reference: "AGL",
                },
                classification: "B",
            },
        },
        {
            type: "Feature",
            geometry: {
                geometries: [{ type: "Point" }],
            },
            properties: {
                type: "TEST",
                lowerLimit: {
                    uom: "METER",
                    value: 0,
                    reference: "AGL",
                },
                upperLimit: {
                    uom: "METER",
                    value: 100,
                    reference: "AGL",
                },
                classification: "C",
            },
        },
        {
            type: "Feature",
            geometry: {
                geometries: [{ type: "Point" }],
            },
            properties: {
                type: "P",
                lowerLimit: {
                    uom: "METER",
                    value: 150,
                    reference: "AGL",
                },
                upperLimit: {
                    uom: "METER",
                    value: 200,
                    reference: "AGL",
                },
                classification: "B",
            },
        },
    ],
};
