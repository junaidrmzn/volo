import type { SensorType } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import type { MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anySensorType = (overwrites?: Partial<SensorType>): SensorType => ({
    id: "d7d89c68-6590-4aed-8e10-efd2630dcd17",
    label: "Sensor type",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllSensorTypesHandler = (
    expectedResponse?: MockResponseArray<SensorType>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<SensorType>(anySensorType, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/sensor-types`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
