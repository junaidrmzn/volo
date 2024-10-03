/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { factory, manyOf, nullable, oneOf, primaryKey } from "@mswjs/data";
import {
    isAircraft,
    isAircraftInsert,
    isCrewMember,
    isCrewMemberInsert,
    isFileInsert,
    isLocation,
    isLocationInsert,
    isLog,
    isLogInsert,
    isLogbookFile,
} from "@voloiq-typescript-api/logbook-types";
import type { RestHandler } from "msw";
import { rest } from "msw";
import { FileStatusEnum, FileTypeEnum } from "@voloiq/logbook-api/v6";
import type { FileStatus, FileType } from "@voloiq/logbook-api/v6";
import { anyAircraft } from "./AircraftMock";
import { anyCrewMember } from "./CrewMemberMock";
import { anyLocation } from "./LocationMock";
import { anyLog } from "./LogMock";
import { anyLogbookFile } from "./LogbookFileMock";

let lastLocationKey = 1;
let lastAircraftKey = 1;
let lastFileKey = 1;
let lastCrewMemberKey = 1;
let lastLogKey = 1;
let lastSoftwareConfigKey = 1;

const databases = factory({
    log: {
        id: primaryKey(() => `${lastLogKey++}` as string),
        files: manyOf("file"),
        date: () => new Date().toISOString(),
        location: oneOf("location"),
        fcSoftware: () => "string",
        aircraft: oneOf("aircraft"),
        crew: manyOf("crewMember"),
        remarks: nullable(String),
        createTime: () => "string",
        updateTime: () => "string",
    },
    location: {
        id: primaryKey(() => `${lastLocationKey++}` as string),
        icaoCode: () => "string",
        latitude: () => 0,
        longitude: () => 0,
        createTime: () => "string",
        updateTime: () => "string",
    },
    crewMember: {
        id: primaryKey(() => `${lastCrewMemberKey++}` as string),
        email: () => "string",
        firstName: () => "string",
        lastName: () => "string",
        createTime: () => "string",
        updateTime: () => "string",
    },
    aircraft: {
        id: primaryKey(() => `${lastAircraftKey++}` as string),
        productLine: () => "string",
        aircraftType: nullable(String),
        msn: () => "string",
        createTime: () => "string",
        updateTime: () => "string",
    },
    file: {
        id: primaryKey(() => `${lastFileKey++}` as string),
        url: () => "string",
        fileType: (): FileType => FileTypeEnum.MESH,
        fileName: () => "string",
        logId: () => "string",
        status: (): FileStatus => FileStatusEnum.PROCESSED,
        statusDescription: nullable(String),
        processingTime: nullable(Number),
        createTime: () => "string",
        updateTime: () => "string",
    },
    softwareConfig: {
        id: primaryKey(() => `${lastSoftwareConfigKey++}` as string),
        createTime: () => "string",
        updateTime: () => "string",
        configType: () => FileTypeEnum.FC,
        gitHash: () => "string",
    },
});

const {
    log: logDatabase,
    location: locationDatabase,
    crewMember: crewMemberDatabase,
    aircraft: aircraftDatabase,
    file: fileDatabase,
    softwareConfig: softwareConfigDatabase,
} = databases;

const logHandlers = [
    rest.get(`${BACKEND_BASE_URL}/logs/:resourceId`, (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: logDatabase.findFirst({ where: { id: { equals: resourceId } } }),
            })
        );
    }),
    rest.get(`${BACKEND_BASE_URL}/logs`, (_request, response, context_) => {
        const limit: number = Number(_request.url.searchParams.get("limit") || 1);
        const offset: number = Number(_request.url.searchParams.get("offset") || 10);

        return response(
            context_.status(200),
            context_.json({
                data: logDatabase.findMany({ take: limit - offset, skip: offset }),
                pagination: { total: logDatabase.count(), limit, offset },
            })
        );
    }),
    rest.post(`${BACKEND_BASE_URL}/logs`, (request, response, context_) => {
        const { body: resource } = request;
        if (!isLogInsert(resource)) {
            return response(context_.status(400));
        }

        const newResource = logDatabase.create(anyLog({ date: resource.date, remarks: resource.remarks }) as never);
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
            })
        );
    }),
    rest.put(`${BACKEND_BASE_URL}/logs/:resourceId`, (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isLog(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = logDatabase.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates as never,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
            })
        );
    }),
    rest.delete(`${BACKEND_BASE_URL}/logs/:resourceId`, (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        logDatabase.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(204));
    }),
];

const locationHandlers = [
    rest.get(`${BACKEND_BASE_URL}/locations/:resourceId`, (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: locationDatabase.findFirst({ where: { id: { equals: resourceId } } }),
            })
        );
    }),
    rest.get(`${BACKEND_BASE_URL}/locations`, (_request, response, context_) => {
        const locations = locationDatabase.findMany({ take: 20 });
        return response(
            context_.status(200),
            context_.json({
                data: locations,
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        );
    }),
    rest.post(`${BACKEND_BASE_URL}/locations`, (request, response, context_) => {
        const { body: resource } = request;
        if (!isLocationInsert(resource)) {
            return response(context_.status(400));
        }

        const newResource = locationDatabase.create(anyLocation({ ...resource }));
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
            })
        );
    }),
    rest.put(`${BACKEND_BASE_URL}/locations/:resourceId`, (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isLocation(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = locationDatabase.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
            })
        );
    }),
    rest.delete(`${BACKEND_BASE_URL}/locations/:resourceId`, (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        locationDatabase.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(204));
    }),
];

const crewMemberHandlers = [
    rest.get(`${BACKEND_BASE_URL}/crew-members/:resourceId`, (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: crewMemberDatabase.findFirst({ where: { id: { equals: resourceId } } }),
            })
        );
    }),
    rest.get(`${BACKEND_BASE_URL}/crew-members`, (_request, response, context_) =>
        response(
            context_.status(200),
            context_.json({
                data: crewMemberDatabase.findMany({ take: 20 }),
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        )
    ),
    rest.post(`${BACKEND_BASE_URL}/crew-members`, (request, response, context_) => {
        const { body: resource } = request;
        if (!isCrewMemberInsert(resource)) {
            return response(context_.status(400));
        }

        const newResource = crewMemberDatabase.create(anyCrewMember({ ...resource }));
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
            })
        );
    }),
    rest.put(`${BACKEND_BASE_URL}/crew-members/:resourceId`, (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isCrewMember(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = crewMemberDatabase.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
            })
        );
    }),
    rest.delete(`${BACKEND_BASE_URL}/crew-members/:resourceId`, (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        crewMemberDatabase.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(204));
    }),
];

const aircraftHandlers = [
    rest.get(`${BACKEND_BASE_URL}/aircraft/:resourceId`, (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: aircraftDatabase.findFirst({ where: { id: { equals: resourceId } } }),
            })
        );
    }),
    rest.get(`${BACKEND_BASE_URL}/aircraft`, (_request, response, context_) =>
        response(
            context_.status(200),
            context_.json({
                data: aircraftDatabase.findMany({ take: 20 }),
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        )
    ),
    rest.post(`${BACKEND_BASE_URL}/aircraft`, (request, response, context_) => {
        const { body: resource } = request;
        if (!isAircraftInsert(resource)) {
            return response(context_.status(400));
        }

        const newResource = aircraftDatabase.create(anyAircraft({ ...resource }));
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
            })
        );
    }),
    rest.put(`${BACKEND_BASE_URL}/aircraft/:resourceId`, (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isAircraft(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = aircraftDatabase.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
            })
        );
    }),
    rest.delete(`${BACKEND_BASE_URL}/aircraft/:resourceId`, (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        aircraftDatabase.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(204));
    }),
];

const fileHandlers = [
    rest.get(`${BACKEND_BASE_URL}/files/:resourceId`, (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: fileDatabase.findFirst({ where: { id: { equals: resourceId } } }),
            })
        );
    }),
    rest.get(`${BACKEND_BASE_URL}/files`, (_request, response, context_) =>
        response(
            context_.status(200),
            context_.json({
                data: fileDatabase.findMany({ take: 20 }),
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        )
    ),
    rest.post(`${BACKEND_BASE_URL}/files`, (request, response, context_) => {
        const { body: resource } = request;
        if (!isFileInsert(resource)) {
            return response(context_.status(400));
        }

        const file = anyLogbookFile();
        const newResource = fileDatabase.create(file);
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
            })
        );
    }),
    rest.put(`${BACKEND_BASE_URL}/files/:resourceId`, (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isLogbookFile(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = fileDatabase.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
            })
        );
    }),
    rest.delete(`${BACKEND_BASE_URL}/files/:resourceId`, (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        fileDatabase.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(204));
    }),
];

const softwareConfigHandlers = [
    rest.get(`${BACKEND_BASE_URL}/software-configs`, (request, response, context) => {
        const limit: number = Number(request.url.searchParams.get("limit") || 1);
        const offset: number = Number(request.url.searchParams.get("offset") || 10);
        const order = request.url.searchParams.get("order") || "ASC";
        return response(
            context.status(200),
            context.json({
                data: softwareConfigDatabase.findMany({ take: limit - offset, skip: offset }),
                pagination: { total: softwareConfigDatabase.count(), limit, offset, order_by: "", order },
                is_error: false,
            })
        );
    }),
];

export const setupServiceMockHandlers = () => {
    const handlers: RestHandler[] = [
        ...logHandlers,
        ...locationHandlers,
        ...crewMemberHandlers,
        ...aircraftHandlers,
        ...fileHandlers,
        ...softwareConfigHandlers,
    ];
    return { handlers, database: databases };
};
