import { useToast } from "@volocopter/design-library-react";
import type { ValueWithStatus } from "@volocopter/tag-select-react";
import { useRef, useState } from "react";
import type { Export, ExportInsert, Log } from "@voloiq/logbook-api/v6";
import { useAxiosService } from "@voloiq/service";
import { parameterIdTokenizer } from "./ExportMapping";
import { useExportModalTranslation } from "./translations/useExportModalTranslation";

const separateString = (valueString: string) => parameterIdTokenizer(valueString).filter((element) => element !== "");

export const useExportModal = (
    selectedLog: Log,
    valueWithStatus: ValueWithStatus[],
    onClose: () => void,
    onExportCreated: () => void
) => {
    const { axiosPost } = useAxiosService();
    const toast = useToast();
    const { t } = useExportModalTranslation();
    const [showDataPointLimitError, setShowDataPointLimitError] = useState<boolean>(false);
    const [dataPointCount, setDataPointCount] = useState<number>(0);

    const initFocusRef = useRef(null);

    const calculateDataPoints = (formValues: Omit<ExportInsert, "parameters">, valueWithStatus: ValueWithStatus[]) => {
        if (valueWithStatus.length > 0) {
            const { sampleRate, startTime, endTime } = formValues;
            if (sampleRate === null) {
                // TODO: This is a workaround for the case when sampleRate is null.
                // This should be fixed by making it dependent on #parameters.
                return 1;
            }
            const timeRange = Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000);
            return timeRange * sampleRate * valueWithStatus.length;
        }
        return 0;
    };

    const handleSubmit = (exportData: Omit<ExportInsert, "parameters">) => {
        if (valueWithStatus.length > 0) {
            const calculatedDataPoints = calculateDataPoints(exportData, valueWithStatus);
            if (calculatedDataPoints > 150_000_000) {
                setDataPointCount(calculatedDataPoints);
                setShowDataPointLimitError(true);
            } else {
                axiosPost<Export, ExportInsert>({
                    path: `/logs/${selectedLog.id}/exports`,
                    data: {
                        ...exportData,
                        parameters: valueWithStatus.map((validateFtiCode) => validateFtiCode.value),
                    },
                })
                    .then(() => {
                        toast({
                            status: "success",
                            title: t("toast.successTitle"),
                            description: t("toast.successDescription"),
                        });
                        onClose();
                        setShowDataPointLimitError(false);
                        onExportCreated();
                    })
                    .catch(() =>
                        toast({
                            status: "error",
                            title: t("toast.errorTitle"),
                            description: t("toast.errorDescription"),
                        })
                    );
            }
        } else {
            toast({
                status: "info",
                title: t("toast.emptyWarningTitle"),
                description: t("toast.emptyWarningDescription"),
            });
        }
    };

    return {
        handleSubmit,
        initFocusRef,
        separateString,
        dataPointCount,
        showDataPointLimitError,
        setShowDataPointLimitError,
    };
};
