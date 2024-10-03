import { Flex, HStack, VStack } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { GeneralInformation } from "./GeneralInformation";
import { GroundHandlingMission } from "./GroundHandlingMission";

type GroundOpsTabProps = {
    mission: Mission;
    onReloadList: () => void;
};
export const GroundOpsTab = (props: GroundOpsTabProps) => {
    const { mission } = props;
    return (
        <VStack width="100%" gap={1}>
            <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                <HStack width="100%">
                    <GeneralInformation {...props} />
                </HStack>
            </Flex>
            {mission.assignments?.aircraftId && (
                <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                    <HStack width="100%">
                        <GroundHandlingMission mission={mission} />
                    </HStack>
                </Flex>
            )}
        </VStack>
    );
};
