import type { ReportRequest } from "@voloiq-typescript-api/battery-management-reports-types";
import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import { ChargingLogUploadStatus } from "@voloiq-typescript-api/battery-management-types";
import { useState } from "react";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useCreateChargingReport } from "../api-hooks/useBatteryManagementReportsService";
import { useDateTimeFormatter } from "../hooks";
import { useErrorToast } from "../hooks/useErrorToast";
import { useSuccessToast } from "../hooks/useSuccessToast";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

type ChargingLogEnvironmentProps = {
    facilityID?: string | number | undefined;
    slotId?: string | number | undefined;
    eventId?: string | undefined;
    timestampEnd: string | undefined;
    selectedEsuFromPreview: string;
};

const downloadPDFFile = (data: Blob, chargingLogEnvironment: ChargingLogEnvironmentProps) => {
    const { facilityID, slotId, eventId, timestampEnd, selectedEsuFromPreview } = chargingLogEnvironment;
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute(
        "download",
        `${facilityID}_${slotId}_${eventId}_${timestampEnd}_ESU_${selectedEsuFromPreview}.pdf`
    );
    element.click();
};

const isUploadSuccessfulOrIncomplete = (chargingLog: ChargingLog) => {
    return chargingLog && chargingLog.uploadStatus !== ChargingLogUploadStatus.FAILED;
};

export const useGenerateChargingReportButton = () => {
    const { t } = useResourcesTranslation();
    const { createChargingReport } = useCreateChargingReport();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast(false);
    const { formatToShortDateTime } = useDateTimeFormatter();
    const [reportGenerationInProgress, setreportGenerationInProgress] = useState(false);

    const handleGenerateReportClick = (chargingLog: ChargingLog, selectedEsuFromPreview: string) => {
        setreportGenerationInProgress(true);
        const data: ReportRequest = {
            facilityId: chargingLog.chargingStation.facilityId ? +chargingLog.chargingStation.facilityId : 0,
            slotId: chargingLog.chargingStationSlot.slotNumber ? chargingLog.chargingStationSlot.slotNumber : 0,
            eventId: +chargingLog.chargingCycleId,
            eventType: chargingLog.eventType,
            timestampEnd: chargingLog.eventTimestampEnd ? chargingLog.eventTimestampEnd : "",
            timestampStart: chargingLog.eventTimestampStart ? chargingLog.eventTimestampStart : "",
            uploadStatus: chargingLog.uploadStatus,
            esu: selectedEsuFromPreview || "",
        };

        createChargingReport(data)
            .then((response) => {
                if (response) {
                    const facilityID = chargingLog.chargingStation.facilityId
                        ? +chargingLog.chargingStation.facilityId
                        : 0;
                    const slotId = chargingLog.chargingStationSlot.slotNumber
                        ? chargingLog.chargingStationSlot.slotNumber
                        : 0;
                    const eventId = chargingLog.chargingCycleId.toString();
                    const timestampEnd = chargingLog.eventTimestampEnd
                        ? formatToShortDateTime(chargingLog.eventTimestampEnd)
                        : "";

                    const chargingLogEnvironment = {
                        facilityID,
                        slotId,
                        eventId,
                        timestampEnd,
                        selectedEsuFromPreview,
                    };
                    downloadPDFFile(response, chargingLogEnvironment);
                    setreportGenerationInProgress(false);
                    onSuccess(t("success.report generate"));
                }
            })
            .catch((error: AxiosError<ResponseEnvelope<Object>>) => {
                if (error.response && error.response.data.error) {
                    onError(error.response.data.error);
                }
            });
    };

    return {
        isUploadSuccessfulOrIncomplete,
        handleGenerateReportClick,
        reportGenerationInProgress,
    };
};
