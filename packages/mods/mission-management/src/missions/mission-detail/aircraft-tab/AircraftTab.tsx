import { Flex, HStack, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { AircraftWorkOrders } from "@voloiq/network-scheduling-components";
import { AircraftInformation } from "./AircraftInformation";
import { MassandBalanceCalculations } from "./mass-and-balance";
import { MassandBalanceCalculationsOld } from "./mass-and-balance/old";
import { useGetAircraftData } from "./useGetAircraftData";

type AircraftTabProps = {
    mission: Mission;
    onReloadList: () => void;
};
export const AircraftTab = (props: AircraftTabProps) => {
    const { mission } = props;
    const aircraftId = mission.assignments?.aircraftId;

    const { aircraft } = useGetAircraftData({ aircraftId });
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <VStack width="100%" gap={1}>
            <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                <HStack width="100%">
                    <AircraftInformation {...props} aircraftData={aircraft} />
                </HStack>
            </Flex>

            <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                <HStack width="100%">
                    {isFeatureFlagEnabled("vao-2392") ? (
                        <MassandBalanceCalculations mission={mission} aircraft={aircraft} />
                    ) : (
                        <MassandBalanceCalculationsOld mission={mission} aircraftData={aircraft} />
                    )}
                </HStack>
            </Flex>

            {aircraftId && (
                <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                    <HStack width="100%">
                        <AircraftWorkOrders aircraftId={aircraftId} />
                    </HStack>
                </Flex>
            )}
        </VStack>
    );
};
