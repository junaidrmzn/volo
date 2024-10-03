import { UUID } from "uuidjs";
import type { FileInsert, FileUrl, LogbookFile, Metadata } from "@voloiq/logbook-api/v6";
import { FileTypeEnum } from "@voloiq/logbook-api/v6";
import type { CypressParameter, InterceptorOptions, MockResponse } from "./MockResponse";
import { checkParamsMatches, getResponseValues } from "./MockResponse";
import { parameterRegex, uuidRegex } from "./RegexTemplates";

export const anyLogbookFile = (overwrites?: Partial<LogbookFile>): LogbookFile => ({
    id: UUID.generate(),
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog",
    fileName: "mesh.binlog",
    fileType: FileTypeEnum.MESH,
    logId: "5cc53aee-06ee-4fb3-8b07-62b34b87b99f",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    status: "PROCESSED",
    ...overwrites,
});

export const anyFileInsert = (overwrites?: Partial<FileInsert>): FileInsert => ({
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog",
    fileType: FileTypeEnum.MESH,
    fileName: "mesh.binlog",
    ...overwrites,
});

export const anyFileUploadURL = (overwrites?: Partial<FileUrl>): FileUrl => ({
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog?se=2022-01-20T14%3A17%3A48Z&sp=w&sv=2021-02-10&sr=b&sig=TmaUVU6kIa/iV9SENQkvfFZVnCQDczMN3xiOJsmZsmk%3D",
    expiry: "2022-04-29T13:28:41.619Z",
    ...overwrites,
});

export const anyMetadata = (overwrites?: Partial<Metadata>): Metadata => ({
    fileType: "MESH",
    productLine: "VoloDrone",
    timestamp: new Date().toISOString(),
    ...overwrites,
});

export const makeGetFileUploadUrlInterceptor = (
    expectedResponse?: MockResponse<FileUrl>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<FileUrl>
) => {
    const { returnStatus, returnValue } = getResponseValues<FileUrl>(anyFileUploadURL, 200, expectedResponse);
    const getFileUploadUrlRegex = new RegExp(
        `^${BACKEND_BASE_URL}/logs/${uuidRegex}/upload-link${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("GET", getFileUploadUrlRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getFileUploadUrl");
};

export const makePostFileInterceptor = (
    expectedResponse?: MockResponse<LogbookFile>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<LogbookFile>
) => {
    const { returnStatus, returnValue } = getResponseValues<LogbookFile>(anyLogbookFile, 201, expectedResponse);

    const postFileRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}/files$`, "m");
    return cy
        .intercept("POST", postFileRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postFile");
};

export const makePatchFileInterceptor = (
    expectedResponse?: MockResponse<LogbookFile>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<LogbookFile>
) => {
    const { returnStatus, returnValue } = getResponseValues<LogbookFile>(anyLogbookFile, 200, expectedResponse);
    const patchFileRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}/files/${uuidRegex}$`, "m");
    return cy
        .intercept("PATCH", patchFileRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("patchFile");
};

export const makePutFileRetryInterceptor = (
    expectedResponse?: MockResponse<LogbookFile>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<LogbookFile>
) => {
    const { returnStatus, returnValue } = getResponseValues<LogbookFile>(anyLogbookFile, 200, expectedResponse);
    const putFileRetryRegex = new RegExp(
        `^${BACKEND_BASE_URL}/logs/${uuidRegex}/files/${uuidRegex}/retry${parameterRegex}$`,
        "m"
    );

    return cy
        .intercept("PUT", putFileRetryRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("putFileRetry");
};

export const makeGetFileDownloadUrlInterceptor = (
    expectedResponse?: MockResponse<FileUrl>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<FileUrl>
) => {
    const { returnStatus, returnValue } = getResponseValues<FileUrl>(anyFileUploadURL, 200, expectedResponse);

    const getFileDownloadUrl = new RegExp(
        `^${BACKEND_BASE_URL}/logs/${uuidRegex}/files/${uuidRegex}/download-link$`,
        "m"
    );

    return cy
        .intercept("POST", getFileDownloadUrl, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getFileDownload");
};

export const makeExtractMetadataInterceptor = (
    expectedResponse?: MockResponse<Metadata>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Metadata>
) => {
    const { returnStatus, returnValue } = getResponseValues<Metadata>(anyMetadata, 200, expectedResponse);

    const extractMetadataRegex = new RegExp(`^${BACKEND_BASE_URL}/extract-metadata${parameterRegex}$`, "m");
    return cy
        .intercept("POST", extractMetadataRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("extractMetadata");
};

export const makeAzureUploadInterceptor = (expectedParams?: CypressParameter, options?: InterceptorOptions<null>) => {
    const azureUploadRegex = new RegExp(`^https:\\/\\/devvoloiqlakest.blob.core.windows.net\\/[^\\n\\r]+`, "m");
    return cy
        .intercept("PUT", azureUploadRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                statusCode: 201,
                ...options,
            });
        })
        .as("azureUpload");
};
