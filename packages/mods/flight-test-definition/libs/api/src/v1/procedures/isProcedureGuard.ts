import type { ProcedureRead } from "./apiModels";

export const isProcedureGuard = (object: unknown): object is ProcedureRead => {
    if (!object) {
        return false;
    }

    const {
        id,
        status,
        title,
        definitionId,
        procedureId,
        testPointParameters,
        testPointCount,
        objectives,
        passFailCriteria,
        prerequisites,
        safetyApprovalLevel,
        stepProcedure,
        stepRecovery,
        stepSetup,
        testPointTolerance,
    } = object as ProcedureRead;
    return (
        !!id &&
        typeof id === "string" &&
        !!procedureId &&
        typeof procedureId === "string" &&
        !!definitionId &&
        typeof definitionId === "string" &&
        !!title &&
        typeof title === "string" &&
        !!status &&
        typeof status === "string" &&
        !!testPointParameters &&
        Array.isArray(testPointParameters) &&
        testPointCount !== undefined &&
        typeof testPointCount === "number" &&
        (!objectives || (!!objectives && typeof objectives === "string")) &&
        (!testPointTolerance || (!!testPointTolerance && typeof testPointTolerance === "string")) &&
        (!stepSetup || (!!stepSetup && typeof stepSetup === "string")) &&
        (!stepProcedure || (!!stepProcedure && typeof stepProcedure === "string")) &&
        (!stepRecovery || (!!stepRecovery && typeof stepRecovery === "string")) &&
        (!prerequisites || (!!prerequisites && typeof prerequisites === "string")) &&
        (!passFailCriteria || (!!passFailCriteria && typeof passFailCriteria === "string")) &&
        (!safetyApprovalLevel || (!!safetyApprovalLevel && typeof safetyApprovalLevel === "string"))
    );
};
