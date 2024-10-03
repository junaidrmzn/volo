import { isEsuCreate, isEsuUpdate } from "@voloiq-typescript-api/battery-management-types";
import { rest } from "msw";
import { BATTERY_MANAGEMENT_SERVICE_URL } from "../serviceUrls";
import { esuDatabase, esuDatabaseOperations } from "./BatteryManagementDatabase";

const getAllEsusHandler = rest.get(`${BATTERY_MANAGEMENT_SERVICE_URL}/esus`, (_request, response, context) => {
    const page: number = Number(_request.url.searchParams.get("page") || 1);
    const size: number = Number(_request.url.searchParams.get("size") || 10);

    return response(
        context.json({
            data: esuDatabase.findMany({
                // lib(@mswjs/data) work ing with take and skip
                take: size,
                skip: (page - 1) * size,
            }),
        })
    );
});

const postEsuHandler = rest.post(`${BATTERY_MANAGEMENT_SERVICE_URL}/esus`, (request, response, context) => {
    const { body: esuCreate } = request;
    if (!isEsuCreate(esuCreate)) {
        return response(context.status(400));
    }
    esuDatabaseOperations.add(esuCreate);
    return response(context.json({ data: esuCreate }));
});

const putEsuHandler = rest.put(`${BATTERY_MANAGEMENT_SERVICE_URL}/esus/:id`, (request, response, context) => {
    const { id } = request.params;
    const { body: esuUpdate } = request;
    if (!id || typeof id !== "number") {
        return response(context.status(400));
    }
    if (!isEsuUpdate(esuUpdate)) {
        return response(context.status(400));
    }
    esuDatabaseOperations.update(esuUpdate, id);
    return response(context.json({ data: esuUpdate }));
});

const getEsuHandler = rest.get(`${BATTERY_MANAGEMENT_SERVICE_URL}/esus/:id`, (request, response, context) => {
    const { id } = request.params;
    if (!id || typeof id !== "number") {
        return response(context.status(400));
    }
    const esu = esuDatabaseOperations.getById(id);
    return response(context.json({ data: esu }));
});

export const getEsuHandlers = () => [getAllEsusHandler, postEsuHandler, putEsuHandler, getEsuHandler];
