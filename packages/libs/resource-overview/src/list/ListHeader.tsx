import { Button, HStack, Icon, Text } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceListTranslations } from "./translations/useResourceOverviewTranslation";

export const ListHeader = () => {
    const { t } = useResourceListTranslations();
    const [state, send] = useGlobalState();
    const {
        context: { totalItems, page, pageSize, appliedFilterSet },
    } = state;

    const openBulkEdit = () => send("OPEN_BULK");

    const pageCount = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1;

    return (
        <HStack justifyContent="space-between">
            <Text mb={0.5}>
                {t("listHeader.page")} <b>{t("listHeader.of", { page, pageCount })}</b>
                {` · ${t("listHeader.entriesFound", { count: totalItems || 0 })}`}
            </Text>
            {appliedFilterSet?.filters.length > 0 && state.matches("bulk_edit") && (
                <Button variant="ghost" rightIcon={<Icon icon="arrowRight" />} onClick={openBulkEdit}>
                    {t("listHeader.bulkEdit")}
                </Button>
            )}
        </HStack>
    );
};
