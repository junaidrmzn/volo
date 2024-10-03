import {
    ConnectingFlightOption,
    PassengerCheckinType,
    Vertiport,
} from "@voloiq-typescript-api/vertiport-management-types";

type VertiportApi = Vertiport & { services: string[] };

export const anyVertiport = (overwrites?: Partial<VertiportApi>): Required<VertiportApi> => ({
    name: "Airfield",
    validFrom: "2022-01-01T00:00:00.000Z",
    createTime: "2022-01-01T00:00:00.000Z",
    updateTime: "2022-12-13T12:42:58.098Z",
    id: "4a83ce5a-66d5-48d7-990e-bcc4deea59ed",
    shortName: "Airfield BRU",
    region: {
        name: "Bruchsal",
        validFrom: "2022-11-28T00:00:00.000Z",
        coordinates: {
            points: [
                {
                    longitude: 8.508_653_070_812_295,
                    latitude: 49.479_229_846_401_89,
                    height: 362,
                },
                {
                    longitude: 7.205_237_988_459_411_5,
                    latitude: 48.147_466_481_121_66,
                    height: 63,
                },
                {
                    longitude: 10.015_644_139_658_429,
                    latitude: 48.232_069_326_959_64,
                    height: 238,
                },
            ],
        },
        center: {
            longitude: 8.576_511_732_976_718,
            latitude: 48.619_588_551_494_31,
            height: 0,
        },
        names: [
            {
                key: "en",
                value: "Bruchsal",
            },
            {
                key: "de",
                value: "Bruchsal",
            },
        ],
        images: [],
        createTime: "2022-01-02T00:00:00.000Z",
        updateTime: "2022-11-29T13:53:13.509Z",
        id: "982a3908-3fd9-4cff-8db9-a35d07d93050",
        validTo: "2030-01-01T10:00:00.000Z",
    },
    timeZone: "Europe/Berlin",
    elevation: 20,
    location: {
        longitude: 4,
        latitude: 4,
        height: 20,
    },
    popularity: 0.1,
    dataModelVersion: 1,
    validTo: "2030-01-01T10:00:00.000Z",
    publicFrom: "2022-08-16T07:07:49.703Z",
    publicTo: "2999-12-31T23:59:59.000Z",
    iataCode: "BRU",
    icaoCode: "EDTC",
    code: "BRU",
    services: ["PAX", "MXN", "BAT", "TEST"],
    operation: {
        MinGroundTimePre: {
            batterySwap: 300,
            passengerHandling: 300,
            pilotBriefing: 330,
            vtolHandling: 300,
        },
        MinGroundTimePost: {
            batterySwap: 300,
            passengerHandling: 300,
            pilotBriefing: 300,
            vtolHandling: 300,
        },
        fatoBlockingTimePre: 1,
        fatoBlockingTimePost: 1,
        additionalFiles: [
            {
                key: "Vertiport Handbook",
                url: "path/to/file",
            },
        ],
        serviceHours: [],
        fatos: 0,
        stands: 0,
    },
    address: {
        country: "Germany",
        state: "Bruchsal",
        city: "Bruchsal",
        zipCode: "76646",
        addressLine1: "Zeiloch",
        addressLine2: "20",
    },
    names: [
        {
            key: "en",
            value: "Airfield Bruchsal",
        },
        {
            key: "de",
            value: "Bruchsal Flugplatz",
        },
    ],
    images: [],
    passengerCheckinType: PassengerCheckinType.BIOMETRIC,
    connectingFlightOption: ConnectingFlightOption.ALL,
    version: 123,
    lokaliseLastUpdatedTime: new Date().toISOString(),
    lokaliseErrorMessage: "Error",
    countryCode: "any",
    goAroundEnergies: [{ direction: 1, goAroundEnergy: 1 }],
    ...overwrites,
});
