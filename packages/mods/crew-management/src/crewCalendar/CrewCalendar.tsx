import { Box, Header, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";
import { CrewTimeScheduler } from "./CrewTimeScheduler";
import { CrewTimeSchedulerOld } from "./CrewTimeSchedulerOld";

export const CrewCalendar = () => {
    const { t } = useCrewApiTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    return (
        <VStack py={6} pr={0} align="start">
            <Box px={6}>
                <Header>
                    <Header.Title title={t("calendar.header")} />
                </Header>
            </Box>
            {isFeatureFlagEnabled("vao-1889-timegrid-2.0") ? <CrewTimeScheduler /> : <CrewTimeSchedulerOld />}
        </VStack>
    );
};
