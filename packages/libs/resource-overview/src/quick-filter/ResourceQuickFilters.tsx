import { HStack, Tag } from "@volocopter/design-library-react";
import type { QuickFilterProperty } from "./state-machine/Types";
import { useResourceQuickFilterTranslations } from "./translations/useResourceQuickFilterTranslation";
import { useQuickFilters } from "./useQuickFilters";

export const ResourceQuickFilters = () => {
    const { t } = useResourceQuickFilterTranslations();
    const { quickFilterProperties, applyQuickFilter, resetQuickFilter } = useQuickFilters();

    return (
        <HStack boxSize="full" justify="flex-start" mb={4}>
            {quickFilterProperties.map((quickFilter: QuickFilterProperty) => {
                return (
                    <Tag
                        key={quickFilter.displayName}
                        onClick={() =>
                            applyQuickFilter({ propertyName: quickFilter.propertyName, value: quickFilter.value })
                        }
                    >
                        {quickFilter.displayName}
                    </Tag>
                );
            })}
            <Tag onClick={() => resetQuickFilter()}>{t("All")}</Tag>
        </HStack>
    );
};
