import { useEffect, useMemo, useState } from "react";
import { useAuthentication } from "@voloiq/auth";
import { useGetAllExportsByUserId } from "@voloiq/logbook-api/v6";
import { useHandleDownload } from "../../../../libs/logbook/useHandleDownload";
import { useLogDetailsTranslation } from "../../translations/useLogDetailsTranslation";

export const useExportList = (logId: string) => {
    const { userId } = useAuthentication();
    const {
        state: getExportState,
        exports,
        getAllExports,
    } = useGetAllExportsByUserId({
        logId,
        userId,
        serviceOptionsOverride: {
            options: {
                manual: true,
            },
        },
    });
    const { handleDownloadEvent } = useHandleDownload("exports");
    const [showAllExports, setShowAllExports] = useState<boolean>(false);

    const { t } = useLogDetailsTranslation();

    const selectOptions = useMemo(
        () => [
            { value: "all", label: t("exports.exportFilterSelect.allOption") },
            { value: "me", label: t("exports.exportFilterSelect.meOption") },
        ],
        [t]
    );

    useEffect(() => {
        getAllExports({
            params: {
                filter: `fileType IN ["CSV", "HDF5", "PARQUET"]${
                    !showAllExports && userId ? ` AND createdBy EQ  "${userId}"` : ""
                }`,
            },
        });
    }, [getAllExports, showAllExports, userId]);

    return {
        selectOptions,
        getExportState,
        exportData: exports,
        handleDownloadEvent,
        showAllExports,
        setShowAllExports,
    };
};
