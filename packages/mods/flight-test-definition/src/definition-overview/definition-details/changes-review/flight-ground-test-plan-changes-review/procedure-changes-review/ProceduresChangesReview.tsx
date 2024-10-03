import { HStack, Header, HeaderLayout, VStack } from "@volocopter/design-library-react";
import { ProceduresChangesOverview } from "@voloiq/flight-test-definition-api/v1";
import { ReadonlyResourceSectionContainer, StatusTag } from "@voloiq/flight-test-definition-components";
import { useParams } from "@voloiq/routing";
import { AdditionalCommentsSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/additional-comments-section/AdditionalCommentsSectionContent";
import { ApplicableRequirementsSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/applicable-requirements-section/ApplicableRequirementsSectionContent";
import { GeneralSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/general-section/GeneralSectionContent";
import { ImportantNotesSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/important-notes-section/ImportantNotesSectionContent";
import { ProcedureRevisionDropdown } from "../../../flight-ground-test-plan/procedures/procedures-details/revision-dropdown/ProcedureRevisionDropdown";
import { StepsSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/steps-section/StepsSectionContent";
import { TestPointSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/test-point-section/TestPointSectionContent";
import { TolerancesSectionContent } from "../../../flight-ground-test-plan/procedures/procedures-details/tolerances/TolerancesSectionContent";
import { useProcedureChangesReviewTranslation } from "./translations/useProcedureChangesReviewTranslation";

type ProcedureChangesReviewProps = {
    procedureOverview?: ProceduresChangesOverview;
    navigateBack?: () => void;
    definitionId: string;
    procedureId?: string;
};

export const ProcedureChangesReview = (props: ProcedureChangesReviewProps) => {
    const { procedureOverview, navigateBack = () => {}, definitionId, procedureId } = props;
    const { t } = useProcedureChangesReviewTranslation();
    const { revisionId } = useParams();

    if (!procedureOverview || !procedureId || !revisionId) {
        return null;
    }
    const { testPoints, importantNotes, additionalComments, applicableRequirements, ...procedure } = procedureOverview;

    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    parentTitle={t("Test Procedure")}
                    title={procedure.title ?? ""}
                    hasReturnMarker
                    onClick={navigateBack}
                    returnMarkerAriaLabel="Back"
                />
                <Header.Segment>
                    <ProcedureRevisionDropdown
                        definitionId={definitionId}
                        procedureId={procedureId}
                        activeRevision={revisionId}
                    />
                </Header.Segment>
                <Header.Controls>
                    <HStack spacing={3}>
                        <StatusTag status={procedure.status} />
                    </HStack>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                <VStack spacing={7}>
                    <ReadonlyResourceSectionContainer sectionTitle={t("General")}>
                        <GeneralSectionContent
                            objectives={procedure.objectives}
                            prerequisites={procedure.prerequisites}
                            passFailCriteria={procedure.passFailCriteria}
                            safetyApprovalLevel={procedure.safetyApprovalLevel}
                        />
                    </ReadonlyResourceSectionContainer>
                    {procedure.status !== "DRAFT" && (
                        <ReadonlyResourceSectionContainer sectionTitle={t("Important Notes")}>
                            <ImportantNotesSectionContent importantNotes={importantNotes} />
                        </ReadonlyResourceSectionContainer>
                    )}
                    <ReadonlyResourceSectionContainer sectionTitle={t("Steps")}>
                        <StepsSectionContent procedure={procedure} />
                    </ReadonlyResourceSectionContainer>
                    <ReadonlyResourceSectionContainer sectionTitle={t("Test Points")}>
                        <TestPointSectionContent testPoints={testPoints} />
                    </ReadonlyResourceSectionContainer>
                    <ReadonlyResourceSectionContainer sectionTitle={t("Tolerances")}>
                        <TolerancesSectionContent testPointTolerance="Test Tolerance" />
                    </ReadonlyResourceSectionContainer>
                    <ReadonlyResourceSectionContainer sectionTitle={t("Additional Comments")}>
                        <AdditionalCommentsSectionContent additionalComments={additionalComments} />
                    </ReadonlyResourceSectionContainer>

                    <ReadonlyResourceSectionContainer sectionTitle={t("Applicable Requirements")}>
                        <ApplicableRequirementsSectionContent applicableRequirements={applicableRequirements} />
                    </ReadonlyResourceSectionContainer>
                </VStack>
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
