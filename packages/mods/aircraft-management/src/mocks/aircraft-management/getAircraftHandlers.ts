import { isAircraftCreate, isAircraftUpdate } from "@voloiq-typescript-api/aircraft-management-types";
import { rest } from "msw";
import { extractFilterValues } from "../../hooks";
import { AIRCRAFT_MANAGEMENT_SERVICE_URL } from "../serviceUrls";
import { aircraftDatabase, aircraftDatabaseOperations, isAircraftProperty } from "./AircraftManagementDatabase";
import { isSortDirection } from "./isSortDirection";

const getAllAircraftsHandler = rest.get(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft`,
    (_request, response, context) => {
        const page: number = Number(_request.url.searchParams.get("page") || 1);
        const size: number = Number(_request.url.searchParams.get("size") || 10);
        const filter = _request.url.searchParams.get("filter") ?? "";
        const orderBy = _request.url.searchParams.get("orderBy") ?? "";
        const [property, order] = orderBy.split(":");

        if (isAircraftProperty(property) && isSortDirection(order)) {
            return response(
                context.json({
                    data: aircraftDatabase.findMany({
                        // lib(@mswjs/data) works with take and skip
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
                    data: aircraftDatabase.findMany({
                        take: size,
                        skip: (page - 1) * size,
                        // ToDo this function has to do the same job as the backend
                        // https://jira.volocopter.org/browse/VT-554
                        where: { technicalStatus: { in: filterValues?.map((filter) => filter.trim()) } },
                    }),
                })
            );
        }

        return response(
            context.json({
                data: aircraftDatabase.findMany({
                    // lib(@mswjs/data) work ing with take and skip
                    take: size,
                    skip: (page - 1) * size,
                }),
            })
        );
    }
);

const postAircraftHandler = rest.post(`${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft`, (request, response, context) => {
    const { body: aircraftCreate } = request;
    if (!isAircraftCreate(aircraftCreate)) {
        return response(context.status(400));
    }
    aircraftDatabaseOperations.add(aircraftCreate);

    return response(context.json({ data: aircraftCreate }));
});

const putAircraftHandler = rest.put(`${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft/:id`, (request, response, context) => {
    const { id } = request.params;
    const { body: aircraftUpdate } = request;
    if (!id || typeof id !== "string") {
        return response(context.status(400));
    }
    if (!isAircraftUpdate(aircraftUpdate)) {
        return response(context.status(400));
    }
    aircraftDatabaseOperations.update(aircraftUpdate, id);

    return response(context.json({ data: aircraftUpdate }));
});

const getAircraftHandler = rest.get(`${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft/:id`, (request, response, context) => {
    const { id } = request.params;
    if (!id || typeof id !== "string") {
        return response(context.status(400));
    }
    const aircraft = aircraftDatabaseOperations.getById(id);

    return response(context.json({ data: aircraft }));
});

export const getAircraftHandlers = () => [
    getAllAircraftsHandler,
    getAircraftHandler,
    postAircraftHandler,
    putAircraftHandler,
];
