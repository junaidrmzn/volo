import { CardList } from "@volocopter/design-library-react";
import type { ChangeLog } from "@voloiq/flight-test-definition-api/v1";
import { ChangeHistoryListItem } from "./ChangeHistoryListItem";
import { useChangeHistoryListTranslation } from "./translations/useChangeHistoryListTranslation";

export type ChangeHistoryListProps = { changeLogs: ChangeLog[] };
export const ChangeHistoryList = (props: ChangeHistoryListProps) => {
    const { changeLogs } = props;

    const { t } = useChangeHistoryListTranslation();

    return (
        <CardList aria-label={t("Change list after current revision")}>
            {changeLogs.map((changeLog) => (
                <ChangeHistoryListItem key={changeLog.id} changeLog={changeLog} />
            ))}
        </CardList>
    );
};
