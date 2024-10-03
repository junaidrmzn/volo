/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { factory, manyOf, oneOf, primaryKey } from "@mswjs/data";
import { isRegion, isRegionCreate } from "@voloiq-typescript-api/vertiport-management-types";
import type { RestHandler } from "msw";
import { rest } from "msw";
import { anyRegion } from "./RegionMock";

let lastRegionKey = 1;
let lastPolygonKey = 1;
let lastPointKey = 1;
let lastStringPairKey = 1;

const databases = factory({
    region: {
        id: primaryKey(() => `${lastRegionKey++}` as string),
        name: () => "ddd",
        validFrom: () => new Date().toISOString(),
        validTo: () => new Date().toISOString(),
        publicFrom: () => new Date().toISOString(),
        publicTo: () => new Date().toISOString(),
        coordinates: oneOf("polygon"),
        center: oneOf("point"),
        names: manyOf("stringPair"),
        images: manyOf("stringPair"),
    },
    polygon: {
        id: primaryKey(() => `${lastPolygonKey++}` as string),
        points: manyOf("point"),
    },
    point: {
        id: primaryKey(() => `${lastPointKey++}` as string),
        latitude: () => 0,
        longitude: () => 0,
        height: () => 0,
    },
    stringPair: {
        id: primaryKey(() => `${lastStringPairKey++}` as string),
        key: () => "asd",
        value: () => "ds",
    },
    vertiport: {
        id: primaryKey(() => `${lastRegionKey++}` as string),
        name: () => "Austerlitz",
        validFrom: () => new Date().toISOString(),
        createTime: () => new Date().toISOString(),
        updateTime: () => new Date().toISOString(),
        code: () => "PAU",
        shortName: () => "Austerlitz",
        region: oneOf("region"),
        timeZone: () => "Europe/Paris",
        elevation: () => 0,
        location: oneOf("point"),
        popularity: () => 1,
        dataModelVersion: () => 2,
    },
});

const {
    region: regionDatabase,
    vertiport: vertiportDatabase,
    /*
    polygon: polygonDatabase,
    point: pointDatabase,
    stringPair: stringPairDatabase, */
} = databases;

const regionHandlers = [
    rest.get(`${BACKEND_BASE_URL}/vertiport-management/v1/regions`, (_request, response, context_) => {
        const page: number = Number(_request.url.searchParams.get("page") || 1);
        const size: number = Number(_request.url.searchParams.get("size") || 10);
        return response(
            context_.status(200),
            context_.json({
                data: regionDatabase.findMany({ take: size, skip: size * (page - 1) }),
                pagination: { totalElements: regionDatabase.count(), page, size },
            })
        );
    }),
    rest.get(`${BACKEND_BASE_URL}/vertiport-management/v1/regions/:resourceId`, (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: regionDatabase.findFirst({ where: { id: { equals: resourceId } } }),
            })
        );
    }),
    rest.post(`${BACKEND_BASE_URL}/vertiport-management/v1/regions`, (request, response, context_) => {
        const { body: resource } = request;
        if (!isRegionCreate(resource)) {
            return response(context_.status(400));
        }

        const newResource = regionDatabase.create(anyRegion() as never);
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
            })
        );
    }),
    rest.delete(`${BACKEND_BASE_URL}/vertiport-management/v1/regions/:resourceId`, (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        regionDatabase.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(200));
    }),
    rest.put(`${BACKEND_BASE_URL}/vertiport-management/v1/regions/:resourceId`, (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isRegion(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = regionDatabase.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates as never,
        });
        return response(
            context_.status(200),
            context_.json({
                data: updatedResource,
            })
        );
    }),
];

const vertiportHandlers = [
    rest.get(`${BACKEND_BASE_URL}/vertiport-management/v1/vertiports`, (_request, response, context_) => {
        const page: number = Number(_request.url.searchParams.get("page") || 1);
        const size: number = Number(_request.url.searchParams.get("size") || 10);
        const regionId = _request.url.searchParams.get("regionId");
        const where = regionId ? { region: { id: { equals: regionId } } } : undefined;

        return response(
            context_.status(200),
            context_.json({
                data: vertiportDatabase.findMany({
                    take: size,
                    skip: size * (page - 1),
                    where,
                }),
                pagination: { totalElements: vertiportDatabase.count(), page, size },
            })
        );
    }),
];

export const setupServiceMockHandlers = () => {
    const handlers: RestHandler[] = [...regionHandlers, ...vertiportHandlers];
    return { handlers, database: databases };
};
