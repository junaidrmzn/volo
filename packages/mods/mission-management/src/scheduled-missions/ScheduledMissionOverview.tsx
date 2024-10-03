import { Box, HStack, Header, HeaderLayout, Text } from "@volocopter/design-library-react";
import { ScheduledMissions } from "./ScheduledMissions";
import { QuickFiltersProvider } from "./quick-filters/quick-filters-context/QuickFiltersProvider";
import { useScheduledMissionTranslation } from "./translations/useScheduledMissionTranslation";

export const ScheduledMissionOverview = () => {
    const { t } = useScheduledMissionTranslation();

    return (
        <Box boxSize="full">
            <HeaderLayout>
                <HeaderLayout.Header>
                    <Header.Title parentTitle={t("missions")} title={t("scheduledMissions")} />
                </HeaderLayout.Header>
                <HeaderLayout.Content>
                    <HStack boxSize="full" justify="space-between" mb={2.5}>
                        <Box flex={2}>
                            <Text size="xxs">{t("information")}</Text>
                        </Box>
                    </HStack>
                    <QuickFiltersProvider>
                        <ScheduledMissions />
                    </QuickFiltersProvider>
                </HeaderLayout.Content>
            </HeaderLayout>
        </Box>
    );
};
