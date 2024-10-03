import type { Vertiport, VertiportCreate, VertiportUpdate } from "./apiModels";

export const anyVertiport = (overwrites?: Partial<Vertiport>): Required<Vertiport> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    shortName: "iloveorange",
    region: {
        id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
        name: "iloveorange",
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
        createTime: "2020-11-06T16:34:41.000Z",
        updateTime: "2020-11-06T16:34:41.000Z",
        publicFrom: "2020-11-06T16:34:41.000Z",
        publicTo: "2020-11-06T16:34:41.000Z",
        validFrom: "2020-11-06T16:34:41.000Z",
        validTo: "2020-11-06T16:34:41.000Z",
        createdBy: "Petrik",
        updatedBy: "Petrik",
    },
    timeZone: "iloveorange",
    elevation: 13,
    location: {
        longitude: 20,
        latitude: 10,
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
    iataCode: "343",
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
    version: 1,
    passengerCheckinType: "BIOMETRIC",
    lokaliseErrorMessage: "This key name is already taken",
    lokaliseLastUpdatedTime: "2023-05-14T00:00:04.000Z",
    goAroundEnergies: [
        {
            direction: 23,
            goAroundEnergy: 24,
        },
    ],
    approachDirections: [23],
    connectingFlightOption: "ALL",
    countryCode: "AB",
    synchronizedWithLeon: true,
    lastSynchronizedAt: "2023-05-14T00:00:04.000Z",
    createdBy: "Petrik",
    updatedBy: "Petrik",
    sitaId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    ...overwrites,
});

export const anyVertiportCreate = (overwrites?: Partial<VertiportCreate>): Required<VertiportCreate> => ({
    shortName: "iloveorange",
    regionId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
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
    goAroundEnergies: [
        {
            direction: 23,
            goAroundEnergy: 24,
        },
    ],
    approachDirections: [23],
    connectingFlightOption: "ALL",
    countryCode: "AB",
    ...overwrites,
});

export const anyVertiportUpdate = (overwrites?: Partial<VertiportUpdate>): Required<VertiportUpdate> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    shortName: "iloveorange",
    regionId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
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
    countryCode: "AB",
    goAroundEnergies: [
        {
            direction: 23,
            goAroundEnergy: 24,
        },
    ],
    approachDirections: [23],
    ...overwrites,
});
