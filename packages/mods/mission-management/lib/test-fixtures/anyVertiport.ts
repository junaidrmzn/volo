import type { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";

export const anyVertiport = (overwrites?: Partial<Vertiport>): Required<Vertiport> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    shortName: "iloveorange",
    region: {
        id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
        name: "iloveorange",
        images: [
            {
                key: "dsd",
                value: "dsadf",
            },
        ],
        coordinates: {
            points: [
                {
                    longitude: 13,
                    latitude: 13,
                    height: 13,
                },
            ],
        },
        center: {
            longitude: 13,
            latitude: 13,
            height: 13,
        },
        names: [
            {
                key: "iloveorange",
                value: "iloveorange",
            },
        ],
        createTime: "2020-11-06T16:34:41.000Z",
        updateTime: "2020-11-06T16:34:41.000Z",
        publicFrom: "2020-11-06T16:34:41.000Z",
        publicTo: "2020-11-06T16:34:41.000Z",
        validFrom: "2020-11-06T16:34:41.000Z",
        validTo: "2020-11-06T16:34:41.000Z",
    },
    timeZone: "iloveorange",
    elevation: 13,
    location: {
        longitude: -90,
        latitude: 89,
        height: 13,
    },
    popularity: 13,
    dataModelVersion: 13,
    name: "iloveorange",
    publicFrom: "2020-11-06T16:34:41.000Z",
    publicTo: "2020-11-06T16:34:41.000Z",
    validFrom: "2020-11-06T16:34:41.000Z",
    validTo: "2020-11-06T16:34:41.000Z",
    createTime: "2020-11-06T16:34:41.000Z",
    updateTime: "2020-11-06T16:34:41.000Z",
    iataCode: "",
    icaoCode: "",
    code: "XVE",
    services: [
        {
            serviceKey: "test",
        },
    ],
    names: [
        {
            key: "dsd",
            value: "dsd",
        },
    ],
    images: [{ key: "dsd", value: "dsadf" }],
    operation: {},
    address: { country: "dsd", state: "dsd", city: "dsd" },
    passengerCheckinType: "BIOMETRIC",
    connectingFlightOption: "ALL",
    lokaliseLastUpdatedTime: "2023-05-14T00:00:04.000Z",
    lokaliseErrorMessage: "This key name is already taken",
    countryCode: "AB",
    goAroundEnergies: [
        {
            direction: 23,
            goAroundEnergy: 24,
        },
    ],
    version: 1,
    ...overwrites,
});
