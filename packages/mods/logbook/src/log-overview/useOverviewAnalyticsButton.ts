/* eslint-disable unicorn/consistent-function-scoping */
import type { Log } from "@voloiq/logbook-api/v6";
import { FileStatusEnum } from "@voloiq/logbook-api/v6";

export const useOverviewAnalyticsButton = () => {
    const handleAnalyticsClick = (logId: string, productLine: string) => {
        const analyticsAppUrl = productLine === "VoloCity" ? VOLOCITY_ANALYTICS_APP_URL : ANALYTICS_APP_URL;
        const url = `${analyticsAppUrl}/?log_id=${logId}`;
        window.open(url, "_blank", "noopener noreferrer");
    };

    const isAtLeastOneFileProcessed = (log: Log) => {
        return (
            log &&
            log.files.some(
                (file) =>
                    file.status === FileStatusEnum.PROCESSED ||
                    (file.fileType === "IADS_RAW" && file.status === "UPLOADED")
            )
        );
    };

    return {
        isAtLeastOneFileProcessed,
        handleAnalyticsClick,
    };
};
