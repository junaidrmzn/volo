export const anyAirspace = (overrides?: object): object => ({
    type: "Feature",
    geometry: {
        type: "Polygon",
        coordinates: [
            [2.33, 48.5161],
            [2.3292, 48.5161],
            [2.3284, 48.5161],
        ],
    },
    properties: {
        name: "ZRT FERTE",
        type: "R",
        lowerLimit: {
            uom: "METER",
            value: 0,
            reference: "AGL",
        },
        upperLimit: {
            uom: "METER",
            value: 457,
            reference: "AMSL",
        },
        designator: "RZRTFERTE",
        classification: null,
        fir: "LFFF",
        externalId: "00993f9b-dd44-3fe3-8c64-836e09bb118e",
        createdAt: "2023-09-07T03:04:15.953666Z",
    },
    ...overrides,
});
