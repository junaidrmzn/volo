import { Button, Container, Header, HeaderLayout } from "@volocopter/design-library-react";
import { UploadProgress } from "./UploadProgress";
import { ImportForm } from "./form/ImportForm";
import { useFtiImportTranslation } from "./translations/useFtiImportTranslation";
import { useImportPage } from "./useImportPage";

export const ImportPage = () => {
    const { t } = useFtiImportTranslation();
    const {
        aircraft,
        error,
        fileName,
        fileUploadPercentage,
        isFormSubmitted,
        aircraftState,
        goBackToOverview,
        handleSubmit,
        refetchAircraft,
        retryImport,
    } = useImportPage();
    const formId = "importForm";

    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    parentTitle={t("header.parentTitle")}
                    title={t("header.title")}
                    hasReturnMarker
                    onClick={goBackToOverview}
                    returnMarkerAriaLabel={t("header.backButtonTooltip")}
                    isLoading={aircraftState === "pending"}
                />
                <Header.Controls isLoading={aircraftState === "pending"}>
                    <Button variant="primary" type="submit" form={formId} isDisabled={isFormSubmitted}>
                        {t("header.importButton")}
                    </Button>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                {isFormSubmitted ? (
                    <UploadProgress
                        error={error}
                        fileName={fileName}
                        uploadPercentage={fileUploadPercentage}
                        onTryAgainClick={retryImport}
                    />
                ) : (
                    <Container>
                        <ImportForm
                            aircraft={aircraft}
                            formId={formId}
                            serviceState={aircraftState}
                            onSubmit={handleSubmit}
                            onTryAgainClick={refetchAircraft}
                        />
                    </Container>
                )}
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
