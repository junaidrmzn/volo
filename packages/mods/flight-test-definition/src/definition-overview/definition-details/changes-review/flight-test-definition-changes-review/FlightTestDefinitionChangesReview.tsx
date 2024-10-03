import { Box, ButtonGroup, HStack, Header, HeaderLayout } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FlightTestDefinitionChangesOverview } from "@voloiq/flight-test-definition-api/v2";
import { DefinitionStatusTag } from "@voloiq/flight-test-definition-components";
import { PdfExportButton } from "../../pdf-export/PdfExportButton";
import { RevisionsDropdown } from "../../revisions/RevisionsDropdown";
import { FlightTestDefinitionChangeReviewTabs } from "./FlightTestDefinitionChangeReviewTabs";

type FlightTestDefinitionChangesReviewProps = {
    flightTestDefinitionOverview: FlightTestDefinitionChangesOverview;
    navigateBack?: () => void;
    isRevisionView?: boolean;
};

export const FlightTestDefinitionChangesReview = (props: FlightTestDefinitionChangesReviewProps) => {
    const { flightTestDefinitionOverview, isRevisionView, navigateBack = () => {} } = props;
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const {
        procedures,
        manualRequirements,
        windchillRequirements,
        ftiLinks,
        specialComments,
        releasedRevisions,
        revision,
        testHazardAssessments,
        signatureRecords,
        engineeringTestProcedures,
        ...definition
    } = flightTestDefinitionOverview;

    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    parentTitle="Definition"
                    title={definition?.title ?? ""}
                    hasReturnMarker={!!navigateBack}
                    onClick={navigateBack}
                    returnMarkerAriaLabel="Back"
                />
                {isRevisionView && (
                    <Header.Segment>
                        <RevisionsDropdown activeRevision={revision} definition={flightTestDefinitionOverview} />
                    </Header.Segment>
                )}
                <Header.Controls>
                    <HStack spacing="3">
                        <DefinitionStatusTag status={definition?.status} />
                        <ButtonGroup isAttached>
                            <PdfExportButton
                                definitionId={definition.id}
                                ftdId={definition.ftdId}
                                title={definition.title}
                                revision={revision}
                            />
                        </ButtonGroup>
                    </HStack>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content w="full" h="full">
                {isFeatureFlagEnabled("vte-1534") ? (
                    <HStack
                        width="full"
                        mt={6}
                        gap={3}
                        p={3}
                        alignItems="flex-start"
                        backgroundColor="bgNavigationLayer1"
                    >
                        <Box flex={3}>
                            <FlightTestDefinitionChangeReviewTabs
                                flightTestDefinitionOverview={flightTestDefinitionOverview}
                                orientation="vertical"
                                variant="menu"
                            />
                        </Box>
                    </HStack>
                ) : (
                    <Box flex={3}>
                        <FlightTestDefinitionChangeReviewTabs
                            flightTestDefinitionOverview={flightTestDefinitionOverview}
                        />
                    </Box>
                )}
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
