import type { PathParams } from "msw";
import { rest } from "msw";
import type { Region, RegionCreate } from "@voloiq/vertiport-management-api/v1";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { anyPoint } from "./PointMock";
import { anyPolygon } from "./PolygonMock";

export const anyRegion = (overwrites?: Partial<Region>): Region => ({
    id: "asdd",
    name: "ddd",
    validFrom: new Date().toISOString(),
    validTo: new Date().toISOString(),
    publicFrom: new Date().toISOString(),
    publicTo: new Date().toISOString(),
    coordinates: anyPolygon(),
    center: anyPoint(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    createdBy: "Petrik",
    updatedBy: "Petrik",
    ...overwrites,
});

export const anyRegionCreate = (overwrites?: Partial<RegionCreate>): RegionCreate => ({
    name: "ddd",
    validFrom: new Date().toISOString(),
    validTo: new Date().toISOString(),
    publicFrom: new Date().toISOString(),
    publicTo: new Date().toISOString(),
    coordinates: anyPolygon(),
    center: anyPoint(),
    ...overwrites,
});

export const makeGetAllRegionHandler = (expectedResponse?: MockResponseArray<Region>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Region>(anyRegion, 200, expectedResponse);
    return rest.get(`${BACKEND_BASE_URL}/vertiport-management/v1/regions`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostRegionHandler = (expectedResponse?: MockResponse<Region>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Region>(anyRegion, 201, expectedResponse);
    return rest.post(`${BACKEND_BASE_URL}/vertiport-management/v1/regions`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeGetRegionHandler = (expectedResponse?: MockResponse<Region>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Region>(anyRegion, 200, expectedResponse);
    return rest.get(`${BACKEND_BASE_URL}/vertiport-management/v1/regions/:RegionId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeDeleteRegionHandler = (expectedParams?: PathParams) => {
    return rest.delete(
        `${BACKEND_BASE_URL}/vertiport-management/v1/regions/:RegionId`,
        (request, response, context) => {
            if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
                return response.networkError("Params not matching");
            }
            return response(context.status(200));
        }
    );
};

export const makePutRegionHandler = (expectedResponse?: MockResponse<Region>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Region>(anyRegion, 200, expectedResponse);
    return rest.put(`${BACKEND_BASE_URL}/vertiport-management/v1/regions/:RegionId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
