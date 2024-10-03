import type { RawMeasurementsRequest } from "@voloiq-typescript-api/battery-management-reports-types/dist";
import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types/dist";
import { ChargingLogUploadStatus } from "@voloiq-typescript-api/battery-management-types/dist";
import { useState } from "react";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useBatteryManagementRawDataMeasurementService } from "../api-hooks/useBatteryManagementRawDataMeasurementService";
import { useDateTimeFormatter, useErrorToast } from "../hooks";
import { useSuccessToast } from "../hooks/useSuccessToast";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

type ChargingLogEnvironmentProps = {
    facilityID?: string | number | undefined;
    slotId?: string | number | undefined;
    eventId?: string | undefined;
    timestampEnd: string | undefined;
};

const downloadZipFile = (data: Blob, chargingLogEnvironment: ChargingLogEnvironmentProps) => {
    const { facilityID, slotId, eventId, timestampEnd } = chargingLogEnvironment;
    const blob = new Blob([data], { type: "application/x-zip-compressed" });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute("download", `${facilityID}_${slotId}_${eventId}_${timestampEnd}.zip`);
    element.click();
};

const isUploadSuccessfulOrIncomplete = (chargingLog: ChargingLog) => {
    return chargingLog && chargingLog.uploadStatus !== ChargingLogUploadStatus.FAILED;
};

export const useGenerateRawMeasurementDataButton = () => {
    const { t } = useResourcesTranslation();
    const { createRawMeasurementChargingReport } = useBatteryManagementRawDataMeasurementService();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast(false);
    const { formatToShortDateTime } = useDateTimeFormatter();
    const [rawMeasurementDataCollectionInProgress, setRawMeasurementDataCollectionInProgress] = useState(false);

    const handleGenerateRawDataMeasurementButtonClick = (chargingLog: ChargingLog) => {
        setRawMeasurementDataCollectionInProgress(true);
        const data: RawMeasurementsRequest = {
            facilityId: chargingLog.chargingStation.facilityId ? +chargingLog.chargingStation.facilityId : 0,
            slotId: chargingLog.chargingStationSlot.slotNumber ? chargingLog.chargingStationSlot.slotNumber : 0,
            eventId: +chargingLog.chargingCycleId,
            eventType: chargingLog.eventType,
            timestampEnd: chargingLog.eventTimestampEnd ? chargingLog.eventTimestampEnd : "",
            timestampStart: chargingLog.eventTimestampStart ? chargingLog.eventTimestampStart : "",
            uploadStatus: chargingLog.uploadStatus,
        };

        createRawMeasurementChargingReport(data)
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
                    };
                    downloadZipFile(response, chargingLogEnvironment);
                    setRawMeasurementDataCollectionInProgress(false);
                    onSuccess(t("success.raw measurement report generate"));
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
        handleGenerateRawDataMeasurementButtonClick,
        rawMeasurementDataCollectionInProgress,
    };
};
