import { HStack, Tag } from "@volocopter/design-library-react";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";
import { CustomDateFilterPopover } from "./CustomDateFilterPopover";
import { useQuickFilters } from "./quick-filters-context/useQuickFilters";

export const ScheduledMissionsQuickFilters = () => {
    const { t } = useScheduledMissionTranslation();

    const { setSelectedTagState } = useQuickFilters();

    return (
        <HStack>
            <Tag
                colorScheme="gray"
                onClick={() => {
                    setSelectedTagState("today");
                }}
            >
                <Tag.Label>{t("quickFilters.today")}</Tag.Label>
            </Tag>
            <Tag
                colorScheme="gray"
                onClick={() => {
                    setSelectedTagState("tomorrow");
                }}
            >
                <Tag.Label>{t("quickFilters.tomorrow")}</Tag.Label>
            </Tag>

            <CustomDateFilterPopover />
        </HStack>
    );
};
