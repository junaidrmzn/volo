import { Stack } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import type { LogDetailsPageProps } from "../LogDetailsPage";
import { FileList } from "../file-list";
import { ExportList } from "./export-list";
import { ExportModal } from "./export-list/export-modal";
import { GeneralViewVolocity } from "./general-view/GeneralViewVolocity";
import { useLogDetails } from "./useLogDetails";

export type LogDetailsVolocityProps = LogDetailsPageProps;

export const LogDetailsVolocity = (props: LogDetailsVolocityProps) => {
    const { log, reloadDetails } = props;
    const { exportRequestLog, setExportRequestLog } = useLogDetails();

    return (
        <>
            <ExportModal
                isOpen={!!exportRequestLog}
                onClose={() => setExportRequestLog(undefined)}
                selectedLog={exportRequestLog}
                onExportCreated={reloadDetails}
            />

            <Stack spacing={3}>
                <GeneralViewVolocity log={log} />
                <RequirePermissions resources={["LogExport"]} actions={["read"]}>
                    <ExportList
                        setExportRequestLog={() => setExportRequestLog(log)}
                        logId={log.id}
                        exportsDisabled={log.files?.some((file) => file.status === "UPLOAD_REQUESTED")}
                        dataState={log.dataState}
                    />
                </RequirePermissions>
                <FileList log={log} />
            </Stack>
        </>
    );
};
