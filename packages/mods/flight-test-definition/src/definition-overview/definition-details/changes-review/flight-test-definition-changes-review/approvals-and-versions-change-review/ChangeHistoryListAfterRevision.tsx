import { CardList } from "@volocopter/design-library-react";
import { ChangeLogV2Value } from "@voloiq/flight-test-definition-api/v2";
import { ChangeHistoryListItemAfterRevision } from "./ChangeHistoryListItemAfterRevision";
import { useChangeHistoryChangeReviewTranslation } from "./translations/useChangeHistoryChangeReviewTranslation";

export type ChangeHistoryListAfterRevisionProps = { changeLogs: ChangeLogV2Value[] };

export const ChangeHistoryListAfterRevision = (props: ChangeHistoryListAfterRevisionProps) => {
    const { changeLogs } = props;

    const { t } = useChangeHistoryChangeReviewTranslation();

    return (
        <CardList aria-label={t("Change list after current revision")}>
            {changeLogs.map((changeLog) => (
                <ChangeHistoryListItemAfterRevision key={changeLog.id} changeLog={changeLog} />
            ))}
        </CardList>
    );
};
