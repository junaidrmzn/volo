import { Flex, Popover, Text } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import type { Log, LogbookFile } from "@voloiq/logbook-api/v6";
import { FileStatusEnum } from "@voloiq/logbook-api/v6";
import { LogEntryStatusTag } from "../../libs/logbook/LogEntryStatusTag";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";

export type LogEntryStatus = "ERROR" | "PENDING" | "UPLOAD_REQUESTED" | "OK" | "TM_DATA" | "ONBOARD_RECORDED_DATA";

export const getLogEntryStatus = (logEntry: Log): [LogEntryStatus, LogbookFile[]] => {
    const erroneousFiles = logEntry.files.filter((file) => file.status === FileStatusEnum.ERROR);

    if (erroneousFiles.length > 0) return ["ERROR", erroneousFiles];

    const uploadRequestedFiles = logEntry.files.filter((file) => file.status === FileStatusEnum.UPLOAD_REQUESTED);
    if (uploadRequestedFiles.length > 0) return ["UPLOAD_REQUESTED", uploadRequestedFiles];

    const pendingFiles = logEntry.files.filter(
        (file) => file.status === FileStatusEnum.PROCESSING || file.status === FileStatusEnum.QUEUED
    );

    if (pendingFiles.length > 0) return ["PENDING", pendingFiles];

    if (logEntry.dataState === "TM_DATA" || logEntry.dataState === "ONBOARD_RECORDED_DATA")
        return [logEntry.dataState, []];

    return ["OK", []];
};

type StatusIndicatorProps = {
    log: Log;
};

export const StatusIndicator: FCC<StatusIndicatorProps> = (props) => {
    const { log } = props;
    const { t } = useLogbookTranslation();
    const [status, files] = getLogEntryStatus(log);

    if (status === "OK") {
        return null;
    }

    const label = match(status)
        .with("ERROR", () => t("overview.logEntryList.statusIndicator.errorBadge"))
        .with("PENDING", () => t("overview.logEntryList.statusIndicator.pendingBadge"))
        .with("UPLOAD_REQUESTED", () => t("overview.logEntryList.statusIndicator.uploadRequestedBadge"))
        .with("TM_DATA", () => t("overview.logEntryList.statusIndicator.telemetryData"))
        .with("ONBOARD_RECORDED_DATA", () => t("overview.logEntryList.statusIndicator.onBoardData"))
        .exhaustive();

    return (
        <Popover>
            <Popover.Trigger>
                <Flex onClick={(event) => event.stopPropagation()} justifyContent="flex-end" w="100%">
                    <LogEntryStatusTag status={status} label={label} />
                </Flex>
            </Popover.Trigger>
            <Popover.Content>
                <Popover.Header
                    title={match(status)
                        .with("ERROR", () => t("overview.logEntryList.statusIndicator.errorHeader"))
                        .with("PENDING", () => t("overview.logEntryList.statusIndicator.pendingHeader"))
                        .with("UPLOAD_REQUESTED", () =>
                            t("overview.logEntryList.statusIndicator.uploadRequestedHeader")
                        )
                        .with("TM_DATA", () => t("overview.logEntryList.statusIndicator.telemetryHeader"))
                        .with("ONBOARD_RECORDED_DATA", () =>
                            t("overview.logEntryList.statusIndicator.onBoardDataHeader")
                        )
                        .exhaustive()}
                    closeButtonAriaLabel={t("overview.logEntryList.closeButton")}
                />
                <Popover.Body>
                    <Text size="small">
                        {match(status)
                            .with("ERROR", () =>
                                files.length === 1
                                    ? t("overview.logEntryList.statusIndicator.errorDescriptionSingular")
                                    : t("overview.logEntryList.statusIndicator.errorDescriptionPlural", {
                                          fileCount: files.length,
                                      })
                            )
                            .with("PENDING", () =>
                                files.length === 1
                                    ? t("overview.logEntryList.statusIndicator.pendingDescriptionSingular")
                                    : t("overview.logEntryList.statusIndicator.pendingDescriptionPlural", {
                                          fileCount: files.length,
                                      })
                            )
                            .with("UPLOAD_REQUESTED", () =>
                                files.length === 1
                                    ? t("overview.logEntryList.statusIndicator.uploadRequestedDescriptionSingular")
                                    : t("overview.logEntryList.statusIndicator.uploadRequestedDescriptionPlural", {
                                          fileCount: files.length,
                                      })
                            )
                            .with("TM_DATA", () => t("overview.logEntryList.statusIndicator.telemetryDataDescription"))
                            .with("ONBOARD_RECORDED_DATA", () =>
                                t("overview.logEntryList.statusIndicator.onBoardDataDescription")
                            )
                            .exhaustive()}
                    </Text>
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
