import { Divider, Popover, Portal, Tag } from "@volocopter/design-library-react";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";
import { CustomDateFilterForm } from "./CustomDateFilterForm";
import { useQuickFilters } from "./quick-filters-context/useQuickFilters";

export const CustomDateFilterPopover = () => {
    const { t } = useScheduledMissionTranslation();
    const { setSelectedTagState } = useQuickFilters();

    return (
        <Popover closeOnBlur={false} placement="auto">
            <Popover.Trigger>
                <Tag
                    colorScheme="gray"
                    onClick={() => {
                        setSelectedTagState("custom");
                    }}
                >
                    <Tag.Label>{t("quickFilters.customDate.tagLabel")}</Tag.Label>
                </Tag>
            </Popover.Trigger>
            <Popover.Overlay />
            <Portal>
                <Popover.Content>
                    <Popover.Header
                        title={t("quickFilters.customDate.title")}
                        closeButtonAriaLabel={t("quickFilters.customDate.closeButton")}
                    />
                    <Divider mb={4} />
                    <CustomDateFilterForm />
                </Popover.Content>
            </Portal>
        </Popover>
    );
};
