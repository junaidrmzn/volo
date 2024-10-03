import type { PathParams } from "msw";
import { rest } from "msw";
import { FileTypeEnum } from "@voloiq/logbook-api/v6";
import type { FileInsert, FileUrl, LogbookFile } from "@voloiq/logbook-api/v6";
import type { MockResponse } from "./MockResponse";
import { checkParamsMatches, getResponseValues } from "./MockResponse";

export const anyLogbookFile = (overwrites?: Partial<LogbookFile>): LogbookFile => ({
    id: "13270b87-855b-4147-97c0-45ddb19989c4",
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog",
    fileName: "mesh.binlog",
    fileType: FileTypeEnum.MESH,
    logId: "5cc53aee-06ee-4fb3-8b07-62b34b87b99f",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    status: "PROCESSED",
    ...overwrites,
});

export const anyLogbookFileInsert = (overwrites?: Partial<FileInsert>): FileInsert => ({
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog",
    fileType: FileTypeEnum.MESH,
    fileName: "mesh.binlog",
    ...overwrites,
});

export const anyLogbookFileUploadUrl = (overwrites?: Partial<FileUrl>): FileUrl => ({
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog?se=2022-01-20T14%3A17%3A48Z&sp=w&sv=2021-02-10&sr=b&sig=TmaUVU6kIa/iV9SENQkvfFZVnCQDczMN3xiOJsmZsmk%3D",
    expiry: "2022-04-29T13:28:41.619Z",
    ...overwrites,
});

export const makeGetFileUploadUrlHandler = (expectedResponse?: MockResponse<FileUrl>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<FileUrl>(anyLogbookFileUploadUrl, 200, expectedResponse);
    return rest.get(`${BACKEND_BASE_URL}/logs/:logId/upload-link`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostFileHandler = (expectedResponse?: MockResponse<LogbookFile>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<LogbookFile>(anyLogbookFile, 201, expectedResponse);
    return rest.post(`${BACKEND_BASE_URL}/logs/:logId/files`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePatchFileHandler = (expectedResponse?: MockResponse<LogbookFile>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<LogbookFile>(anyLogbookFile, 200, expectedResponse);

    return rest.patch(`${BACKEND_BASE_URL}/logs/:logId/files/:fileId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePutFileRetryHandler = (expectedResponse?: MockResponse<LogbookFile>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<LogbookFile>(anyLogbookFile, 200, expectedResponse);

    return rest.put(`${BACKEND_BASE_URL}/logs/:logId/files/:fileId/retry`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeGetFileDownloadUrlHandler = (
    expectedResponse?: MockResponse<FileUrl>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValues<FileUrl>(anyLogbookFileUploadUrl, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/logs/:logId/files/:fileId/download-link`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
