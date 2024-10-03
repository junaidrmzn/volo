import { EmptyState, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ScheduledMissionsSkeleton } from "./ScheduledMissionsSkeleton";
import { ScheduledMissionsFilters } from "./filters/ScheduledMissionsFilters";
import { ScheduledMissionsTimeScheduler } from "./scheduled-missions-time-scheduler/ScheduledMissionsTimeScheduler";
import { ScheduledMissionsTimeSchedulerOld } from "./scheduled-missions-time-scheduler/ScheduledMissionsTimeSchedulerOld";
import { useScheduledMissionTranslation } from "./translations/useScheduledMissionTranslation";
import { useScheduledMissions } from "./useScheduledMissions";

export const ScheduledMissions = () => {
    const { aircraftAssignments, state, handleFilterChange } = useScheduledMissions();
    const { t } = useScheduledMissionTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    if (state === "pending") return <ScheduledMissionsSkeleton />;

    return (
        <>
            <ScheduledMissionsFilters handleFilterChange={handleFilterChange} />
            <VStack boxSize="full" alignItems="stretch">
                {aircraftAssignments.length > 0 ? (
                    isFeatureFlagEnabled("vao-1889-timegrid-2.0") ? (
                        <ScheduledMissionsTimeScheduler aircraftAssignments={aircraftAssignments} />
                    ) : (
                        <ScheduledMissionsTimeSchedulerOld aircraftAssignments={aircraftAssignments} />
                    )
                ) : (
                    <EmptyState title={t("emptyState.title")} description={t("emptyState.description")} />
                )}
            </VStack>
        </>
    );
};
