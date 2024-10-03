import type { SensorType } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anySensorType = (overwrites?: Partial<SensorType>): SensorType => ({
    id: UUID.generate(),
    label: "Temperature",
    updateTime: new Date().toISOString(),
    createTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllSensorTypesInterceptor = (
    expectedResponse?: MockResponseArray<SensorType>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<SensorType>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<SensorType>(anySensorType, 200, expectedResponse);
    const getAllSensorTypesRegex = new RegExp(`^${BACKEND_BASE_URL}/sensor-types${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllSensorTypesRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllSensorTypes");
};
