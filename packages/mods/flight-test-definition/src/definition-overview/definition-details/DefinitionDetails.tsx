import { Box, ButtonGroup, HStack, Header, HeaderLayout } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { DefinitionStatusTag } from "@voloiq/flight-test-definition-components";
import { DefinitionDetailsTabs } from "./DefinitionDetailsTabs";
import { DefinitionProvider } from "./definition-context/DefinitionProvider";
import { DefinitionEditSessionIdProvider } from "./definition-edit-session-id-context/DefinitionEditSessionIdProvider";
import { DeleteDefinitionButton } from "./delete-definition/DeleteDefinitionButton";
import { PdfExportButton } from "./pdf-export/PdfExportButton";
import { RevisionsDropdown } from "./revisions/RevisionsDropdown";
import { useDefinitionDetail } from "./useDefinitionDetails";

export const DefinitionDetails = () => {
    const { navigateBack, definition, refetchDefinition, tabCounters } = useDefinitionDetail();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return definition ? (
        <DefinitionProvider definition={definition} refetchDefinition={refetchDefinition}>
            <DefinitionEditSessionIdProvider>
                <HeaderLayout variant="secondary">
                    <HeaderLayout.Header>
                        <Header.Title
                            parentTitle="Definition"
                            title={definition.title ?? ""}
                            hasReturnMarker
                            onClick={navigateBack}
                            returnMarkerAriaLabel="Back"
                        />
                        <Header.Segment>
                            <RevisionsDropdown definition={definition} activeRevision={definition.revision} />
                        </Header.Segment>
                        <Header.Controls>
                            <HStack spacing="3">
                                <DefinitionStatusTag status={definition.status} />
                                <ButtonGroup isAttached>
                                    <DeleteDefinitionButton definitionId={definition.id} />
                                    <PdfExportButton
                                        definitionId={definition.id}
                                        ftdId={definition.ftdId}
                                        title={definition.title}
                                        revision={definition.revision}
                                    />
                                </ButtonGroup>
                            </HStack>
                        </Header.Controls>
                    </HeaderLayout.Header>
                    <HeaderLayout.Content minH="fill-available">
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
                                    <DefinitionDetailsTabs
                                        definition={definition}
                                        tabCounters={tabCounters}
                                        orientation="vertical"
                                        variant="menu"
                                    />
                                </Box>
                            </HStack>
                        ) : (
                            <Box flex={3}>
                                <DefinitionDetailsTabs definition={definition} tabCounters={tabCounters} />
                            </Box>
                        )}
                    </HeaderLayout.Content>
                </HeaderLayout>
            </DefinitionEditSessionIdProvider>
        </DefinitionProvider>
    ) : null;
};
