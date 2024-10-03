import { EmptyState, Flex, VStack } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { StandbyCrewScheduler } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { OnDutyCrew } from "./OnDutyCrew";

type CrewTabProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const CrewTab = (props: CrewTabProps) => {
    const { mission } = props;
    const { t } = useMissionTranslations();
    return (
        <VStack width="100%" gap={1}>
            <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                {mission.assignments?.pilotId && mission.assignments?.aircraftTypeId ? (
                    <VStack width="100%" alignItems="stretch" gap={3}>
                        <OnDutyCrew {...props} />
                        <StandbyCrewScheduler
                            aircraftTypeId={mission.assignments.aircraftTypeId}
                            crewId={mission.assignments.pilotId}
                            scheduleDate={mission.estimatedDepartureDateTime ?? new Date().toISOString()}
                        />
                    </VStack>
                ) : (
                    <VStack justifyContent="center" alignItems="center" width="100%">
                        <EmptyState
                            title={t("pilotAssignment.emptyError")}
                            description={t("pilotAssignment.emptyDescription")}
                        />
                    </VStack>
                )}
            </Flex>
        </VStack>
    );
};
