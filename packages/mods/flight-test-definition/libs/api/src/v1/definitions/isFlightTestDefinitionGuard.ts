import type { FlightTestDefinition } from "./apiModels";

export const isFlightTestDefinition = (object: unknown): object is FlightTestDefinition => {
    const {
        ata,
        id,
        testType,
        testNumber,
        testArticle,
        msn,
        ftdId,
        masterModel,
        requesterName,
        requestStatus,
        status,
        revision,
        summary,
        title,
        scope,
        createTime,
    } = object as FlightTestDefinition;
    return (
        !!id &&
        typeof id === "string" &&
        !!ftdId &&
        typeof ftdId === "string" &&
        !!status &&
        typeof status === "string" &&
        !!requestStatus &&
        typeof requestStatus === "string" &&
        !!createTime &&
        typeof createTime === "string" &&
        !!title &&
        typeof title === "string" &&
        !!summary &&
        typeof summary === "string" &&
        !!scope &&
        typeof scope === "string" &&
        !!masterModel &&
        typeof masterModel === "string" &&
        !!msn &&
        typeof msn === "string" &&
        !!ata &&
        typeof ata === "number" &&
        !!testNumber &&
        typeof testNumber === "number" &&
        !!revision &&
        typeof revision === "string" &&
        !!requesterName &&
        typeof requesterName === "string" &&
        (!testArticle || (!!testArticle && typeof testArticle === "string")) &&
        (!testType || (!!testType && typeof testType === "string"))
    );
};
