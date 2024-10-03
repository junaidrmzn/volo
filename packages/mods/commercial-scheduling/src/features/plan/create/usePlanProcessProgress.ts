import { useToast } from "@volocopter/design-library-react";
import { useState } from "react";
import { match } from "ts-pattern";
import {
    ARV_VERT_CODE_INCONSISTENT,
    ARV_VERT_NOT_FOUND,
    ARV_VERT_NO_PASSENGER_SERVICE,
    ARV_VERT_REGION,
    ARV_VERT_VALID_FROM,
    ARV_VERT_VALID_TO,
    COMM_PLAN_UNQ_NAME,
    CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME,
    CONNECTION_INVALID,
    CONNECTION_NOT_FOUND,
    DEP_VERT_CODE_INCONSISTENT,
    DEP_VERT_NOT_FOUND,
    DEP_VERT_NO_PASSENGER_SERVICE,
    DEP_VERT_REGION,
    DEP_VERT_VALID_FROM,
    DEP_VERT_VALID_TO,
    DUPLICATE_VERTIPORTS,
    FLIGHT_NUMBER_FORMAT,
    FLIGHT_NUM_UNIQUE,
    GEN_CONST_VIOLATION,
    INVALID_ARRIVAL_DATE_TIME_FORMAT,
    INVALID_ARV_VERT_CODE,
    INVALID_COMM_PLAN_STATUS,
    INVALID_DEP_DATE_TIME_FORMAT,
    INVALID_DEP_VERT_CODE,
    INVALID_FILE,
    LINE_SIZE,
    MULTIPLE_REGIONS,
    VERTIPORT_INVALID,
    VERTIPORT_NOT_FOUND,
    VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME,
    useGetPlanProcessProgressQuery,
} from "@voloiq/commercial-scheduling-api/v1";
import { usePlanTranslation } from "../translations/usePlanTranslation";

type UsePlanProcessProgressOptions = {
    reloadList: () => void;
    onClose: () => void;
};

export const usePlanProcessProgress = (options: UsePlanProcessProgressOptions) => {
    const { reloadList, onClose } = options;

    const [processId, setProcessId] = useState("");
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const { t } = usePlanTranslation();
    const toast = useToast();

    const resetPlanProcessProgress = () => {
        setProcessId("");
        setErrorMessages([]);
    };

    const { status } = useGetPlanProcessProgressQuery({
        processId,
        onSuccess: (data) => {
            const { errors, status } = data;

            if (status === "COMPLETED") {
                resetPlanProcessProgress();
                reloadList();
                onClose();
                toast({
                    status: "success",
                    title: t("title"),
                    description: t("create.process.completed"),
                });
            }

            if (status === "FAILED") {
                for (const [index, detailedError] of errors.entries()) {
                    const { key, value } = detailedError;

                    const errorMessage = match(key)
                        .with(LINE_SIZE, () => t("errorMessages.lineSize", { value }))
                        .with(FLIGHT_NUMBER_FORMAT, () => t("errorMessages.invalidFlightNumberFormat", { value }))
                        .with(INVALID_DEP_DATE_TIME_FORMAT, () =>
                            t("errorMessages.departureoffsetDateTimeFormat", { value })
                        )
                        .with(INVALID_ARRIVAL_DATE_TIME_FORMAT, () =>
                            t("errorMessages.arrivaloffsetDateTimeFormat", { value })
                        )
                        .with(INVALID_FILE, () => t("errorMessages.invalidFileFormat", { value }))
                        .with(COMM_PLAN_UNQ_NAME, () => t("errorMessages.duplicateCommercialPlanName", { value }))
                        .with(INVALID_DEP_VERT_CODE, () => t("errorMessages.departureVertiportCodeFormat", { value }))
                        .with(INVALID_ARV_VERT_CODE, () => t("errorMessages.arrivalVertiportCodeFormat", { value }))
                        .with(FLIGHT_NUM_UNIQUE, () => {
                            if (!value) {
                                return t("errorMessages.flightNumberDuplicate");
                            }
                            const [flightNumber, date, plan] = value.split(", ");
                            return t("errorMessages.flightNumberDuplicate", { date, value: flightNumber, plan });
                        })
                        .with(GEN_CONST_VIOLATION, () => t("errorMessages.genConstViolation", { value }))
                        .with(CONNECTION_NOT_FOUND, () => t("errorMessages.connectionNotFound", { value }))
                        .with(CONNECTION_INVALID, () => t("errorMessages.connectionInvalid", { value }))
                        .with(CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME, () => {
                            const [name, x, y] = value.split(", ");
                            return t("errorMessages.connectionInconsistentDepArvTime", { name, x, y });
                        })
                        .with(VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME, () =>
                            t("errorMessages.vertiportNotFound", { value })
                        )
                        .with(VERTIPORT_INVALID, () => t("errorMessages.arrivaloffsetDateTimeFormat", { value }))
                        .with(VERTIPORT_NOT_FOUND, () => t("errorMessages.vertiportNotFound", { value }))
                        .with(DUPLICATE_VERTIPORTS, () => t("errorMessages.duplicateVertiport", { value }))
                        .with(MULTIPLE_REGIONS, () => t("errorMessages.multipleRegionVertiports", { value }))
                        .with(INVALID_COMM_PLAN_STATUS, () => t("errorMessages.invalidCommercialPlanStatus", { value }))
                        .with(DEP_VERT_NOT_FOUND, () => "")
                        .with(ARV_VERT_NOT_FOUND, () => "")
                        .with(DEP_VERT_CODE_INCONSISTENT, () => "")
                        .with(ARV_VERT_CODE_INCONSISTENT, () => "")
                        .with(DEP_VERT_REGION, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.unspecifiedVertiportRegion", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(ARV_VERT_REGION, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.unspecifiedVertiportRegion", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(DEP_VERT_VALID_FROM, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidFrom", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(DEP_VERT_VALID_TO, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidTo", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(ARV_VERT_VALID_FROM, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidFrom", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(ARV_VERT_VALID_TO, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidTo", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(DEP_VERT_NO_PASSENGER_SERVICE, () =>
                            t("errorMessages.departureVertiportNoPassengerService", {
                                id: value,
                            })
                        )
                        .with(ARV_VERT_NO_PASSENGER_SERVICE, () =>
                            t("errorMessages.arrivalVertiportNoPassengerService", {
                                id: value,
                            })
                        )
                        .otherwise(() => t("errorMessages.unknownError"));
                    setErrorMessages((previousErrorMessages) => [...previousErrorMessages, errorMessage]);
                    if (index === 2) break;
                }
            }
        },
    });

    const isUploadNewPlanInProgress = !!processId && (status === "IN_PROGRESS" || status === "NEW");

    return { isUploadNewPlanInProgress, errorMessages, setProcessId, resetPlanProcessProgress };
};
