import { Button, CardList, Icon, Text } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { Log } from "@voloiq/logbook-api/v6";
import { Link as RouterLink } from "@voloiq/routing";
import { SectionHeader } from "@voloiq/text-layouts";
import { useLogDetailsTranslation } from "../translations/useLogDetailsTranslation";
import { FileListItem } from "./FileListItem";
import { VideoPlayerModal } from "./VideoPlayerModal/VideoPlayerModal";
import { useVideoPlayerModal } from "./VideoPlayerModal/useVideoPlayerModal";
import { useFileList } from "./useFileList";

export type FileListProps = {
    log: Log;
};

export const FileList = (props: FileListProps) => {
    const {
        log: { files, id: logId },
    } = props;

    const { t } = useLogDetailsTranslation();
    const { handleDownloadEvent } = useFileList();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const { isModalOpen, onModalClose, fileUrl, handleClickPlay, fileName } = useVideoPlayerModal();

    const visibleFiles = files.filter((file) => file.fileType !== "IADS_RAW");

    return (
        <>
            <VideoPlayerModal isOpen={isModalOpen} onClose={onModalClose} fileUrl={fileUrl} fileName={fileName} />
            <SectionHeader label={t("files.header")}>
                <RequirePermissions resources={["Log"]} actions={["create"]}>
                    <Button
                        // @ts-ignore
                        as={RouterLink}
                        variant="ghost"
                        leftIcon={<Icon icon="plus" />}
                        marginBottom={-1.5}
                        to={
                            isFeatureFlagEnabled("vte-1596")
                                ? `/flight-test-suite/logs/${logId}/upload-file`
                                : `/logbook/overview/${logId}/upload-file`
                        }
                    >
                        {t("files.uploadButton")}
                    </Button>
                </RequirePermissions>
            </SectionHeader>
            {visibleFiles.length > 0 ? (
                <CardList data-testid="file-list">
                    {visibleFiles.map((file) => (
                        <FileListItem
                            key={file.id}
                            file={file}
                            handleDownloadEvent={handleDownloadEvent}
                            handleClickPlay={() => handleClickPlay(logId, file.id, file.fileName)}
                        />
                    ))}
                </CardList>
            ) : (
                <Text>{t("files.fileList.emptyList")}</Text>
            )}
        </>
    );
};
