import { Button, Header, HeaderLayout } from "@volocopter/design-library-react";
import { FileListItem } from "../../libs/logbook/FileListItem/FileListItem";
import { useLogDetailsTranslation } from "../details/translations/useLogDetailsTranslation";
import { CancelUploadModal } from "./CancelUploadModal";
import { ContentSkeleton } from "./ContentSkeleton";
import { FileUpload } from "./FileUpload";
import { UploadProgress } from "./UploadProgress";
import { UploadSuccess } from "./UploadSuccess";
import { useUploadFilePage } from "./useUploadFilePage";

export const UploadFilePage = () => {
    const {
        fileEntries,
        setFileEntries,
        cancelUploadModalIsOpen,
        displayCancellationModal,
        handleModalCancelButtonPress,
        handleSaveButtonClick,
        handleBackButtonClick,
        handleConfirm,
        uploadFilesState,
        uploadState,
        erroneousFiles,
        getLogState,
        existingFiles,
    } = useUploadFilePage();

    const { t } = useLogDetailsTranslation();

    return (
        <>
            <HeaderLayout variant="secondary">
                <HeaderLayout.Header>
                    <Header.Controls isLoading={getLogState === "pending"}>
                        <Button
                            variant="primary"
                            onClick={handleSaveButtonClick}
                            isDisabled={fileEntries.length === 0 || uploadFilesState !== "idle"}
                        >
                            {t("uploadFiles.header.uploadButtonText")}
                        </Button>
                    </Header.Controls>
                    <Header.Title
                        parentTitle={t("uploadFiles.header.parentTitle")}
                        title={t("uploadFiles.header.titleText")}
                        hasReturnMarker
                        onClick={handleBackButtonClick}
                        returnMarkerAriaLabel={t("uploadFiles.header.backButtonAriaLabel")}
                        isLoading={getLogState === "pending"}
                    />
                </HeaderLayout.Header>
                <HeaderLayout.Content>
                    {getLogState === "pending" ? (
                        <ContentSkeleton />
                    ) : (
                        <>
                            {uploadFilesState === "pending" && (
                                <UploadProgress onCancel={displayCancellationModal} uploadState={uploadState} />
                            )}
                            {uploadFilesState === "idle" && (
                                <FileUpload
                                    existingFiles={existingFiles}
                                    fileEntries={fileEntries}
                                    onFileEntriesChange={setFileEntries}
                                >
                                    <FileUpload.FileListItem>
                                        {(props) => <FileListItem key={JSON.stringify(props)} {...props} />}
                                    </FileUpload.FileListItem>
                                </FileUpload>
                            )}
                            {uploadFilesState === "success" && <UploadSuccess erroneousFiles={erroneousFiles} />}
                        </>
                    )}
                </HeaderLayout.Content>
            </HeaderLayout>
            <CancelUploadModal
                descriptionText={t("uploadFiles.cancelUploadModal.description")}
                isOpen={cancelUploadModalIsOpen}
                onCancel={handleModalCancelButtonPress}
                onConfirm={handleConfirm}
            />
        </>
    );
};
