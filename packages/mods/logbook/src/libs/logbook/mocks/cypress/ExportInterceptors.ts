import { UUID } from "uuidjs";
import type { Export, ExportArguments, ExportFileUrl, ExportInsert, ExportUpdate } from "@voloiq/logbook-api/v6";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { parameterRegex, uuidRegex } from "./RegexTemplates";

export const anyExportInsert = (overwrites?: Partial<ExportInsert>): ExportInsert => ({
    parameters: ["2111000002", "2111000003"],
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    sampleRate: 10,
    description: "this is a test",
    exportFileType: "CSV",
    ...overwrites,
});

export const anyExportArguments = (overwrites?: Partial<ExportArguments>): ExportArguments => ({
    parameters: ["2111000002", "2111000003"],
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    sampleRate: 10,
    exportFileType: "CSV",
    ...overwrites,
});

export const anyExport = (overwrites?: Partial<Export>): Export => ({
    id: UUID.generate(),
    url: "https://test.volo/",
    exportArguments: anyExportArguments(),
    status: "QUEUED",
    logId: "52792730-fad7-4bc3-a1a2-4ad109b4dcb9",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    createdBy: "Hans",
    updatedBy: "Bernd",
    fileType: "CSV",
    ...overwrites,
});

export const anyExportUpdate = (overwrites?: Partial<ExportUpdate>): ExportUpdate => ({
    url: "https://update.volo/",
    status: "PROCESSING",
    ...overwrites,
});

export const anyExportUploadURL = (overwrites?: Partial<ExportFileUrl>): ExportFileUrl => ({
    url: "https://devvoloiqlakest.blob.core.windows.net/files/mesh/mesh.binlog?se=2022-01-20T14%3A17%3A48Z&sp=w&sv=2021-02-10&sr=b&sig=TmaUVU6kIa/iV9SENQkvfFZVnCQDczMN3xiOJsmZsmk%3D",
    expiry: "2022-04-29T13:28:41.619Z",
    ...overwrites,
});

export const makeGetAllExportInterceptor = (
    expectedResponse?: MockResponseArray<Export>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Export>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Export>(anyExport, 200, expectedResponse);
    const getAllExportRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}/exports${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllExportRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllExport");
};

export const makePostExportInterceptor = (
    expectedResponse?: MockResponse<Export>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Export>
) => {
    const { returnStatus, returnValue } = getResponseValues<Export>(anyExport, 201, expectedResponse);
    const postExportRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}/exports${parameterRegex}$`, "m");
    return cy
        .intercept("POST", postExportRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postExport");
};

export const makePatchExportInterceptor = (
    expectedResponse?: MockResponse<Export>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Export>
) => {
    const { returnStatus, returnValue } = getResponseValues<Export>(anyExport, 200, expectedResponse);
    const patchExportRegex = new RegExp(
        `^${BACKEND_BASE_URL}/logs/${uuidRegex}/exports/${uuidRegex}${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("PATCH", patchExportRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("patchExport");
};

export const makePostExportDownloadUrlInterceptor = (
    expectedResponse?: MockResponse<ExportFileUrl>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<ExportFileUrl>
) => {
    const { returnStatus, returnValue } = getResponseValues<ExportFileUrl>(anyExportUploadURL, 200, expectedResponse);

    const getExportDownloadUrl = new RegExp(
        `^${BACKEND_BASE_URL}/logs/${uuidRegex}/exports/${uuidRegex}/download-link$`,
        "m"
    );

    return cy
        .intercept("POST", getExportDownloadUrl, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getExportDownloadUrl");
};
