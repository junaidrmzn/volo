import { ButtonGroup, HStack, Header, HeaderLayout, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetProcedureQuery } from "@voloiq/flight-test-definition-api/v1";
import { useGetDefinitionQuery } from "@voloiq/flight-test-definition-api/v2";
import { BackToTopButton, StatusTag } from "@voloiq/flight-test-definition-components";
import { useLocation, useNavigate, useParams } from "@voloiq/routing";
import { AdditionalCommentsSection } from "./additional-comments-section/AdditionalCommentsSection";
import { ApplicableRequirementsSection } from "./applicable-requirements-section/ApplicableRequirementsSection";
import { DeleteProcedureButton } from "./delete-procedure/DeleteProcedureButton";
import { GeneralSection } from "./general-section/GeneralSection";
import { ImportantNotesSection } from "./important-notes-section/ImportantNotesSection";
import { ProcedureEditSessionIdProvider } from "./procedure-edit-session-id-context/ProcedureEditSessionIdProvider";
import { ProcedureRevisionDropdown } from "./revision-dropdown/ProcedureRevisionDropdown";
import { StepsSection } from "./steps-section/StepsSection";
import { TestPointSection as TestPointSectionV2 } from "./test-point-section-v2/TestPointSection";
import { TestPointSection } from "./test-point-section/TestPointSection";
import { TolerancesSection } from "./tolerances/TolerancesSection";
import { useProcedureDetailsTranslation } from "./translations/useProcedureDetailsTranslation";
import { UpdateStatusButton } from "./update-status/UpdateStatusButton";

export const ProceduresDetails = () => {
    const { definitionId, procedureId } = useParams();
    const { search } = useLocation();
    const navigate = useNavigate();
    const procedureIndex = new URLSearchParams(search).get("procedureIndex");
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const { definition } = useGetDefinitionQuery({
        definitionId: definitionId ?? "",
    });

    const { t } = useProcedureDetailsTranslation();
    const { procedure } = useGetProcedureQuery({
        definitionId: definitionId ?? "",
        procedureId: procedureId ?? "",
    });

    if (
        definitionId === undefined ||
        procedureId === undefined ||
        procedureIndex === undefined ||
        procedure === undefined
    ) {
        return null;
    }

    return (
        <ProcedureEditSessionIdProvider>
            <HeaderLayout variant="secondary">
                <HeaderLayout.Header>
                    <Header.Title
                        parentTitle={t("Test Procedure {index}", { index: procedureIndex })}
                        title={procedure?.title ?? ""}
                        hasReturnMarker
                        returnMarkerAriaLabel={t("Back to overview")}
                        onClick={() => navigate("./../..")}
                    />
                    <Header.Segment>
                        <ProcedureRevisionDropdown
                            definitionId={definitionId}
                            procedureId={procedureId}
                            activeRevision={definition?.revision}
                        />
                    </Header.Segment>
                    <Header.Controls>
                        <HStack spacing={3}>
                            <StatusTag status={procedure.status} />
                            <ButtonGroup isAttached>
                                <DeleteProcedureButton definitionId={definitionId} procedureId={procedureId} />
                                <UpdateStatusButton procedure={procedure} />
                            </ButtonGroup>
                        </HStack>
                    </Header.Controls>
                </HeaderLayout.Header>
                <HeaderLayout.Content>
                    <VStack spacing={7}>
                        <GeneralSection procedureId={procedureId} definitionId={definitionId} />
                        {procedure.status !== "DRAFT" && (
                            <ImportantNotesSection procedureId={procedureId} definitionId={definitionId} />
                        )}
                        <StepsSection procedureId={procedureId} definitionId={definitionId} />
                        {isFeatureFlagEnabled("vte-1578") ? (
                            <TestPointSectionV2 procedureId={procedureId} definitionId={definitionId} />
                        ) : (
                            <TestPointSection procedureId={procedureId} definitionId={definitionId} />
                        )}
                        <TolerancesSection procedureId={procedureId} definitionId={definitionId} />
                        <AdditionalCommentsSection procedureId={procedureId} definitionId={definitionId} />
                        <ApplicableRequirementsSection procedureId={procedureId} definitionId={definitionId} />
                        <BackToTopButton />
                    </VStack>
                </HeaderLayout.Content>
            </HeaderLayout>
        </ProcedureEditSessionIdProvider>
    );
};
