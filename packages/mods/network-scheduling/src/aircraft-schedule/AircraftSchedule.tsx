import { Box, Center, EmptyState, Header, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { AircraftScheduleSkeleton } from "./AircraftScheduleSkeleton";
import { AircraftTimeScheduler } from "./AircraftTimeScheduler";
import { AircraftTimeSchedulerOld } from "./AircraftTimeSchedulerOld";
import { useAircraftScheduleTranslation } from "./translations/useAircraftScheduleTranslation";
import { useAircraft } from "./useAircraft";

const AircraftScheduleWithoutProviders = () => {
    const { aircrafts, isLoading, error } = useAircraft();

    const { t } = useAircraftScheduleTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <VStack py={6} pr={0} align="start">
            <Box px={6}>
                <Header>
                    <Header.Title title={t("Schedule")} />
                </Header>
            </Box>
            {match({ aircrafts, isLoading, error })
                .with({ isLoading: true }, () => <AircraftScheduleSkeleton />)
                .when(
                    () => error && !isLoading,
                    () => (
                        <Center boxSize="full">
                            <EmptyState title={t("Some data failed to load")} description="" />
                        </Center>
                    )
                )
                .when(
                    () => !aircrafts || (aircrafts.length === 0 && !isLoading),
                    () => (
                        <Center boxSize="full">
                            <EmptyState title={t("No aircraft found")} description="" />
                        </Center>
                    )
                )
                .otherwise(() =>
                    isFeatureFlagEnabled("vao-1889-timegrid-2.0") ? (
                        <AircraftTimeScheduler aircrafts={aircrafts} />
                    ) : (
                        <AircraftTimeSchedulerOld aircrafts={aircrafts} />
                    )
                )}
        </VStack>
    );
};

export const AircraftSchedule = () => <AircraftScheduleWithoutProviders />;
