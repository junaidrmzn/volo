import { VStack } from "@volocopter/design-library-react";
import { ChangeLogV2Value } from "@voloiq/flight-test-definition-api/v2";
import { OverviewGroup } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { ChangeHistoryListAfterRevision } from "./ChangeHistoryListAfterRevision";
import { useChangeHistoryChangeReviewTranslation } from "./translations/useChangeHistoryChangeReviewTranslation";

export type ChangeHistoryChangeReviewAfterRevisionProps = {
    changeLogs: ChangeLogV2Value[];
    latestRevision?: string;
    currentRevision: string;
};

export const ChangeHistoryChangeReviewAfterRevision = (props: ChangeHistoryChangeReviewAfterRevisionProps) => {
    const { changeLogs, currentRevision, latestRevision } = props;
    const isLatestVersion = currentRevision === latestRevision;

    const { t } = useChangeHistoryChangeReviewTranslation();

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader
                label={t("changeHistoryRevision.Revision {revisionName} {isReleased}", {
                    revisionName: currentRevision,
                    isReleased: isLatestVersion ? "(Unreleased)" : "",
                })}
            />
            <OverviewGroup>
                <ChangeHistoryListAfterRevision changeLogs={changeLogs} />
            </OverviewGroup>
        </VStack>
    );
};
