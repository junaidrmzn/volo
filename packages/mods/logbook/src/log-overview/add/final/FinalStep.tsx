import { Button, Center, HStack, Spinner, Text, VStack } from "@volocopter/design-library-react";
import type { Log } from "@voloiq/logbook-api/v6";
import type { Error, ServiceState } from "@voloiq/service";
import { ErrorPanel } from "../../ErrorPanel";
import { UploadProgress } from "../../file-upload/UploadProgress";
import type { UploadState } from "../../file-upload/useUploadFiles";
import { useLogAddTranslation } from "../translations/useLogAddTranslation";
import { useFinalStep } from "./useFinalStep";

type FinalStepProps = {
    createLogError?: Error;
    createLogState: ServiceState;
    logData?: Log;
    displayCancellationModal: () => void;
    uploadFilesState: ServiceState;
    uploadState: UploadState;
    erroneousFiles: File[];
    openDetails: (resourceId: string) => void;
    handleFinalStep: () => void;
    onAfterSubmit: () => void;
};

export const FinalStep = (props: FinalStepProps) => {
    const {
        createLogError,
        createLogState,
        displayCancellationModal,
        erroneousFiles,
        logData,
        uploadFilesState,
        uploadState,
        openDetails,
        handleFinalStep,
        onAfterSubmit,
    } = props;

    useFinalStep(handleFinalStep);

    const { t } = useLogAddTranslation();

    return (
        <>
            {createLogState === "pending" && (
                <Center mt="4">
                    <HStack>
                        <Spinner size="lg" />
                        <Text mb="3" fontSize="xl">
                            {t("createLogPage.createLogProgressText")}
                        </Text>
                    </HStack>
                </Center>
            )}
            {/* eslint-disable-next-line deprecation/deprecation */}
            {createLogState === "error" && <ErrorPanel errors={[createLogError]} />}
            {uploadFilesState === "pending" && (
                <UploadProgress onCancel={displayCancellationModal} uploadState={uploadState} />
            )}
            {createLogState === "success" && uploadFilesState === "success" && (
                <Center mt="4">
                    <VStack>
                        <Text mb="3" fontSize="xl">
                            {erroneousFiles.length > 0
                                ? t("createLogPage.finishedPartiallyText")
                                : t("createLogPage.finishedText")}
                        </Text>
                        {erroneousFiles.length > 0 && (
                            <>
                                <Text variant="error">
                                    {t("createLogPage.erroneousFilesText")}
                                    {erroneousFiles.map((file) => (
                                        <p key={file.name}>- {file.name}</p>
                                    ))}
                                </Text>
                                <Text variant="error" pb={4}>
                                    {t("createLogPage.erroneousFilesRetryText")}
                                </Text>
                            </>
                        )}
                        <Button variant="primary" onClick={() => openDetails(logData?.id!)}>
                            {t("createLogPage.viewCreatedLogButton")}
                        </Button>

                        <Button onClick={onAfterSubmit}>{t("createLogPage.backToOverviewButton")}</Button>
                    </VStack>
                </Center>
            )}
        </>
    );
};
