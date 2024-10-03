import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ChangeLogV2Value } from "@voloiq/flight-test-definition-api/v2";
import { OverviewGroup } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { SectionHeader } from "@voloiq/text-layouts";
import { useDefinition } from "../definition-context/useDefinition";
import { ChangeHistoryList } from "./ChangeHistoryList/ChangeHistoryList";
import { RevisionInfoBanner } from "./RevisionInfoBanner";
import { EditRevisionInformationModal } from "./edit-revision-information-modal/EditRevisionInformationModal";
import { ReleaseRevisionModal } from "./release-revision-modal/ReleaseRevisionModal";
import { useChangeHistoryTranslation } from "./translations/useChangeHistoryTranslation";

export type ChangeHistoryAfterRevisionProps = {
    changeLogs: ChangeLogV2Value[];
    latestRevision?: string;
    currentRevision: string;
    index: number;
};
export const ChangeHistoryAfterRevision = (props: ChangeHistoryAfterRevisionProps) => {
    const { definition, refetchDefinition } = useDefinition();
    const navigate = useNavigate();
    const { id: definitionId, isReadyForRevision } = definition;
    const { changeLogs, latestRevision, currentRevision, index } = props;
    const isLatestVersion = currentRevision === latestRevision;

    const {
        isOpen: isReleaseRevisionModalOpen,
        onClose: isReleaseRevisionModalClose,
        onOpen: onReleaseRevisionModalOpen,
    } = useDisclosure();

    const {
        isOpen: isEditRevisionModalOpen,
        onClose: isEditRevisionModalClose,
        onOpen: onEditRevisionModalOpen,
    } = useDisclosure();

    const { isFeatureFlagEnabled } = useFeatureFlags();

    const { t } = useChangeHistoryTranslation();
    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader
                label={t("changeHistoryRevision.Revision {revisionName} {isReleased}", {
                    revisionName: currentRevision,
                    isReleased: isLatestVersion ? "(Unreleased)" : "",
                })}
            >
                {isFeatureFlagEnabled("vte-1501") && index === 0 && (
                    <Button
                        variant="ghost"
                        rightIcon={<Icon icon="penWithBox" size={3.5} />}
                        onClick={() => onEditRevisionModalOpen()}
                    >
                        {t("Edit Revision Info")}
                    </Button>
                )}
                {isLatestVersion ? (
                    <Button
                        rightIcon={<Icon icon="arrowRight" />}
                        isDisabled={!isReadyForRevision}
                        onClick={() => onReleaseRevisionModalOpen()}
                    >
                        {t("changeHistoryAfterRevision.Release as new revision")}
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        rightIcon={<Icon icon="arrowRight" />}
                        onClick={() =>
                            navigate(`readonly/${currentRevision}?entityType=flightTestDefinition`, {
                                state: { goBackInHistory: true },
                            })
                        }
                    >
                        {t("changeHistoryRevision.See document in this revision")}
                    </Button>
                )}
            </SectionHeader>
            {!isReadyForRevision && isLatestVersion && <RevisionInfoBanner />}
            <OverviewGroup>
                <ChangeHistoryList changeLogs={changeLogs} />
            </OverviewGroup>
            <ReleaseRevisionModal
                onClose={isReleaseRevisionModalClose}
                isOpen={isReleaseRevisionModalOpen}
                modalTitle={t("releaseRevisionModal.title")}
                modalType={t("releaseRevisionModal.type")}
                definitionId={definitionId}
                refetchDefinition={refetchDefinition}
                latestRevision={latestRevision}
            />
            {isFeatureFlagEnabled("vte-1501") && (
                <EditRevisionInformationModal
                    isOpen={isEditRevisionModalOpen}
                    onClose={isEditRevisionModalClose}
                    modalTitle="Edit"
                    modalType="Revision Information"
                    definitionId={definitionId}
                />
            )}
        </VStack>
    );
};
