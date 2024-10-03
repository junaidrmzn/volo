import { isEsuTypeCreate, isEsuTypeUpdate } from "@voloiq-typescript-api/battery-management-types";
import { rest } from "msw";
import { BATTERY_MANAGEMENT_SERVICE_URL } from "../serviceUrls";
import { esuTypeDatabase, esuTypeDatabaseOperations } from "./BatteryManagementDatabase";

const getAllEsuTypesHandler = rest.get(`${BATTERY_MANAGEMENT_SERVICE_URL}/esu-types`, (_request, response, context) => {
    const page: number = Number(_request.url.searchParams.get("page") || 1);
    const size: number = Number(_request.url.searchParams.get("size") || 10);

    return response(
        context.json({
            data: esuTypeDatabase.findMany({
                // lib(@mswjs/data) work ing with take and skip
                take: size,
                skip: (page - 1) * size,
            }),
        })
    );
});

const postEsuTypeHandler = rest.post(`${BATTERY_MANAGEMENT_SERVICE_URL}/esu-types`, (request, response, context) => {
    const { body: esuTypeCreate } = request;
    if (!isEsuTypeCreate(esuTypeCreate)) {
        return response(context.status(400));
    }
    esuTypeDatabaseOperations.add(esuTypeCreate);
    return response(context.json({ data: esuTypeCreate }));
});

const putEsuTypeHandler = rest.put(`${BATTERY_MANAGEMENT_SERVICE_URL}/esu-types/:id`, (request, response, context) => {
    const { id } = request.params;
    const { body: esuTypeUpdate } = request;
    if (!id || typeof id !== "number") {
        return response(context.status(400));
    }
    if (!isEsuTypeUpdate(esuTypeUpdate)) {
        return response(context.status(400));
    }
    esuTypeDatabaseOperations.update(esuTypeUpdate, id);
    return response(context.json({ data: esuTypeUpdate }));
});

const getEsuTypeHandler = rest.get(`${BATTERY_MANAGEMENT_SERVICE_URL}/esu-types/:id`, (request, response, context) => {
    const { id } = request.params;
    if (!id || typeof id !== "number") {
        return response(context.status(400));
    }
    const esuType = esuTypeDatabaseOperations.getById(id);
    return response(context.json({ data: esuType }));
});

export const getEsuTypeHandlers = () => [
    getAllEsuTypesHandler,
    postEsuTypeHandler,
    putEsuTypeHandler,
    getEsuTypeHandler,
];
