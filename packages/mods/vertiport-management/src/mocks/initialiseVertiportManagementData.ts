import { addDays, addHours } from "date-fns";
import faker from "faker";
import { anyPoint } from "./PointMock";
import { setupServiceMockHandlers } from "./ServiceMock";
import { anyStringPair } from "./StringPairMock";

const {
    database: {
        region: regionDatabase,
        vertiport: vertiportDatabase,
        polygon: polygonDatabase,
        point: pointDatabase,
        stringPair: stringPairDatabase,
    },
} = setupServiceMockHandlers();

const date = new Date();

export const initializeVertiportManagementData = () => {
    for (let index = 0; index < 5; index++) {
        const region = regionDatabase.create({
            id: `log-${index}`,
            name: faker.address.city(),
            validFrom: addHours(date, index).toISOString(),
            validTo: addDays(date, index + 1).toISOString(),
            publicFrom: addHours(date, index).toISOString(),
            publicTo: addDays(date, index + 1).toISOString(),
            coordinates: polygonDatabase.create({
                points: [pointDatabase.create(anyPoint())],
            }),
            center: pointDatabase.create(anyPoint({ longitude: 13 })),
            names: [stringPairDatabase.create(anyStringPair())],
            images: [stringPairDatabase.create(anyStringPair())],
        });

        vertiportDatabase.create({
            id: `vertiport-${index}`,
            name: faker.address.city(),
            code: faker.random.alpha({ count: 3, upcase: true }),
            region,
        });

        if (index === 4) {
            vertiportDatabase.create({
                id: "vertiport-5",
                name: faker.address.city(),
                code: faker.random.alpha({ count: 3, upcase: true }),
                region,
            });
        }
    }
};
