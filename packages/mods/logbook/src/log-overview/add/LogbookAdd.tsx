import { Steps } from "@volocopter/steps-react";
import { useEffect } from "react";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { Card } from "@voloiq/text-layouts";
import { CancelUploadModal } from "../file-upload/CancelUploadModal";
import { EnterMetadataStep } from "./enter-metadata/EnterMetadataStep";
import { FileUploadStep } from "./file-upload";
import { FinalStep } from "./final/FinalStep";
import { SelectProductLineStep } from "./select-aircraft/SelectProductLineStep";
import { useLogAddTranslation } from "./translations/useLogAddTranslation";
import { useCreateLogPage } from "./useCreateLogPage";

type LogbookAddProps = RenderAddHandlerProps;
export const LogbookAdd = (props: LogbookAddProps) => {
    const { setIsSaveButtonDisabled, onSubmit, openDetails, onCancel, onAfterSubmit } = props;

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    useEffect(() => {
        // hack to disable the save button as we still have the old stepper that handles save and does not support to disable it
        setIsSaveButtonDisabled(true);
    }, [setIsSaveButtonDisabled]);

    const { t } = useLogAddTranslation();
    const {
        setLogInsertData,
        selectedProductLine,
        setSelectedProductLine,
        fileEntries,
        setFileEntries,
        cancelUploadModalIsOpen,
        createLogError,
        createLogState,
        logData,
        displayCancellationModal,
        handleModalCancelButtonPress,
        handleConfirm,
        uploadFilesState,
        uploadState,
        erroneousFiles,
        prefillMetadata,
        handleFinalStep,
        canEditDate,
    } = useCreateLogPage(onSubmit, onCancel);

    return (
        <Card>
            <Steps
                nextLabel={t("createLogPage.nextButton")}
                backLabel={t("createLogPage.backButton")}
                initialStep={0}
                variant="labeled"
            >
                <Steps.Step label={t("createLogPage.selectProductLineStep")}>
                    <SelectProductLineStep
                        selectedProductLine={selectedProductLine}
                        onChange={(productLine) => setSelectedProductLine(productLine)}
                    />
                </Steps.Step>
                <Steps.Step label={t("createLogPage.fileUploadStep")}>
                    <FileUploadStep fileEntries={fileEntries} onFileEntriesChange={setFileEntries} />
                </Steps.Step>
                <Steps.Step label={t("createLogPage.enterMetadataStep")}>
                    <EnterMetadataStep
                        setLogInsertData={setLogInsertData}
                        prefillMetadata={prefillMetadata}
                        selectedProductLine={selectedProductLine}
                        canEditDate={canEditDate}
                    />
                </Steps.Step>
                <Steps.Step label={t("createLogPage.finishStep")}>
                    <FinalStep
                        createLogError={createLogError}
                        createLogState={createLogState}
                        logData={logData}
                        displayCancellationModal={displayCancellationModal}
                        uploadFilesState={uploadFilesState}
                        uploadState={uploadState}
                        erroneousFiles={erroneousFiles}
                        openDetails={openDetails}
                        handleFinalStep={handleFinalStep}
                        onAfterSubmit={onAfterSubmit}
                    />
                    <CancelUploadModal
                        descriptionText={t("cancelUploadModal.description")}
                        isOpen={cancelUploadModalIsOpen}
                        onCancel={handleModalCancelButtonPress}
                        onConfirm={handleConfirm}
                    />
                </Steps.Step>
            </Steps>
        </Card>
    );
};
