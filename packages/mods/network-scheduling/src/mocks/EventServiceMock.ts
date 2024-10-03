import { factory, primaryKey } from "@mswjs/data";
import type { SortDirection } from "@mswjs/data/lib/query/queryTypes";
import { isEventCreate, isEventUpdate } from "@voloiq-typescript-api/network-scheduling-types";
import type { EventUpdate } from "@voloiq-typescript-api/network-scheduling-types";
import * as faker from "faker";
import { rest } from "msw";
import { extractFilterValues } from "@voloiq/aircraft-management";
import { getTypedKeys } from "@voloiq/utils";
import { eventBaseURL } from "./EventResource";
import { AIRCRAFT_MANAGEMENT_SERVICE_URL } from "./serviceUrls";

const eventDictionary = {
    id: primaryKey(() => faker.datatype.uuid().toString()),
    name: () => faker.datatype.string(),
    description: () => faker.datatype.string(),
    isBlockedForMission: () => faker.datatype.boolean(),
    aircraftId: () => faker.datatype.uuid().toString(),
    startDate: () => new Date(Date.UTC(2022, 4, 1)).toString(),
    endDate: () => new Date(Date.UTC(2022, 4, 1)).toString(),
};

const eventProperties = getTypedKeys(eventDictionary);

type EventProperty = typeof eventProperties[number];

const isEventProperty = (property: unknown): property is EventProperty =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    eventProperties.includes(property as EventProperty);

const { event: database } = factory({
    event: eventDictionary,
});

const isSortDirection = (direction: unknown): direction is SortDirection =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    ["asc", "desc"].includes((direction as SortDirection).toLowerCase());

export const eventServiceDatabaseOperations = {
    add: database.create,
    getById: (id: string) =>
        database.findFirst({
            where: { id: { equals: id } },
        }),
    get: database.getAll,
    update: (updateDto: EventUpdate, id: string) =>
        database.update({
            where: { id: { equals: id } },
            data: updateDto,
        }),
    clear: () => database.deleteMany({ where: { id: { notEquals: "0" } } }),
};

const postEventHandler = rest.post(`${eventBaseURL}/events`, (request, response, context) => {
    const { body: eventCreate } = request;
    if (!isEventCreate(eventCreate)) {
        return response(context.status(400));
    }
    database.create(eventCreate);

    return response(context.json({ data: eventCreate }));
});

const getAllEventsHandler = rest.get(`${eventBaseURL}/events`, (_request, response, context) => {
    const page: number = Number(_request.url.searchParams.get("page") || 1);
    const size: number = Number(_request.url.searchParams.get("size") || 10);
    const orderBy = _request.url.searchParams.get("orderBy") ?? "";
    const filter = _request.url.searchParams.get("filter") ?? "";
    const [property, order] = orderBy.split(":");

    if (isEventProperty(property) && isSortDirection(order)) {
        return response(
            context.json({
                data: database.findMany({
                    take: size,
                    skip: (page - 1) * size,
                    // @ts-ignore This is a valid type with the typeguards above, however, TypeScript doesn't really get that
                    orderBy: { [property]: order },
                }),
            })
        );
    }
    if (filter.length > 0) {
        const filterValues = extractFilterValues(filter);

        return response(
            context.json({
                data: database.findMany({
                    take: size,
                    skip: (page - 1) * size,
                    // ToDo this function has to do the same job as the backend
                    // https://jira.volocopter.org/browse/VT-554
                    where: {
                        name: { in: filterValues?.map((filter) => filter.replace("'", "").replace("'", "").trim()) },
                    },
                }),
            })
        );
    }

    if (orderBy === "") {
        return response(
            context.json({
                data: database.findMany({
                    take: size,
                    skip: (page - 1) * size,
                    // @ts-ignore This is a valid type with the typeguards above, however, TypeScript doesn't really get that
                }),
            })
        );
    }

    return response(context.status(400));
});

const getEventHandler = rest.get(`${eventBaseURL}/events/:id`, (request, response, context) => {
    const { id } = request.params;
    if (!id || typeof id !== "string") {
        return response(context.status(400));
    }
    const event = eventServiceDatabaseOperations.getById(id);

    return response(context.json({ data: event }));
});

const putEventHandler = rest.put(`${eventBaseURL}/events/:id`, (request, response, context) => {
    const { id } = request.params;
    const { body: eventUpdate } = request;
    if (!id || typeof id !== "string") {
        return response(context.status(400));
    }
    if (!isEventUpdate(eventUpdate)) {
        return response(context.status(400));
    }
    eventServiceDatabaseOperations.update(eventUpdate, id);

    return response(context.json({ data: eventUpdate }));
});

const getAircraftHandler = rest.get(`${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft`, (request, response, context) => {
    return response(context.json({ data: [] }));
});

export const getEventHandlers = () => [
    postEventHandler,
    getAllEventsHandler,
    getEventHandler,
    putEventHandler,
    getAircraftHandler,
];
