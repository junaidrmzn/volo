import { isAircraftTypeCreate, isAircraftTypeUpdate } from "@voloiq-typescript-api/aircraft-management-types";
import { rest } from "msw";
import { extractFilterValues } from "../../hooks";
import { AIRCRAFT_MANAGEMENT_SERVICE_URL } from "../serviceUrls";
import {
    aircraftTypeDatabase,
    aircraftTypeDatabaseOperations,
    isAircraftTypeProperty,
} from "./AircraftManagementDatabase";
import { isSortDirection } from "./isSortDirection";

const getAllAircraftTypesHandler = rest.get(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft-types`,
    (_request, response, context) => {
        const page: number = Number(_request.url.searchParams.get("page") || 1);
        const size: number = Number(_request.url.searchParams.get("size") || 10);
        const orderBy = _request.url.searchParams.get("orderBy") ?? "";
        const [property, order] = orderBy.split(":");
        const filter = _request.url.searchParams.get("filter") ?? "";

        if (isAircraftTypeProperty(property) && isSortDirection(order)) {
            return response(
                context.json({
                    data: aircraftTypeDatabase.findMany({
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
                    data: aircraftTypeDatabase.findMany({
                        // ToDo this function has to do the same job as the backend
                        // https://jira.volocopter.org/browse/VT-554
                        where: {
                            name: {
                                in: filterValues?.map((filter) => filter.replace("'", "").replace("'", "").trim()),
                            },
                        },
                    }),
                })
            );
        }
        return response(
            context.json({
                data: aircraftTypeDatabase.findMany({
                    // lib(@mswjs/data) works with take and skip
                    take: size,
                    skip: (page - 1) * size,
                }),
            })
        );
    }
);

const getAircraftTypeByIdHandler = rest.get(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft-types/:id`,
    (request, response, context) => {
        const { id } = request.params;
        if (!id || typeof id !== "string") {
            return response(context.status(400));
        }
        const aircraftType = aircraftTypeDatabaseOperations.getById(id);
        return response(context.json({ data: aircraftType }));
    }
);

const postAircraftTypeHandler = rest.post(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft-types`,
    (request, response, context) => {
        const { body: aircraftTypeCreate } = request;
        if (!isAircraftTypeCreate(aircraftTypeCreate)) {
            return response(context.status(400));
        }
        aircraftTypeDatabase.create(aircraftTypeCreate);
        return response(context.json({ data: aircraftTypeCreate }));
    }
);

const putAircraftTypeConfirmHandler = rest.put(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft-types/:id`,
    (request, response, context) => {
        const { id } = request.params;
        const { url } = request;
        if (!id || typeof id !== "string") {
            return response(context.status(400));
        }
        const { body: aircraftTypeUpdate } = request;
        if (!isAircraftTypeUpdate(aircraftTypeUpdate)) {
            return response(context.status(400));
        }

        // check if response leads to confirmation modal
        if (!url.toString().includes("forceValidityPeriod")) {
            return response(
                context.status(400),
                context.json({
                    data: {},
                    error: {
                        id: "XX-Legion",
                        code: 400,
                        status: "FAILED_PRECONDITION",
                        message: "I'm Alparius",
                        details: [],
                    },
                })
            );
        }
        aircraftTypeDatabase.update({
            where: { id: { equals: id } },
            data: aircraftTypeUpdate,
        });
        return response(context.json({ data: aircraftTypeUpdate }));
    }
);
const putAircraftTypeHandler = rest.put(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/aircraft-types/:id`,
    (request, response, context) => {
        const { id } = request.params;
        if (!id || typeof id !== "string") {
            return response(context.status(400));
        }
        const { body: aircraftTypeUpdate } = request;
        if (!isAircraftTypeUpdate(aircraftTypeUpdate)) {
            return response(context.status(400));
        }
        aircraftTypeDatabase.update({
            where: { id: { equals: id } },
            data: aircraftTypeUpdate,
        });

        return response(
            context.status(200),
            context.json({ data: aircraftTypeDatabase.findFirst({ where: { id: { equals: id } } }) })
        );
    }
);

export const getAircraftTypeHandlers = (withPutConfirm?: boolean) => [
    getAllAircraftTypesHandler,
    postAircraftTypeHandler,
    getAircraftTypeByIdHandler,
    withPutConfirm ? putAircraftTypeConfirmHandler : putAircraftTypeHandler,
];
