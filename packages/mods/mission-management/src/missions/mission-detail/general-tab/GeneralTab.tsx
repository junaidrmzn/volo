import { Flex, HStack, VStack } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { Assignments } from "./Assignments";
import { Bookings } from "./Bookings";
import { GeneralInformation } from "./GeneralInformation";

type GeneralTabProps = {
    mission: Mission;
    onReloadList: () => void;
    routeOption?: RouteOption;
    delayReasons?: string;
};
export const GeneralTab = (props: GeneralTabProps) => {
    const { mission } = props;

    const navigation = useNavigate();

    const redirectToResource = (url: string) => {
        navigation(url);
    };

    return (
        <VStack width="100%" gap={1}>
            <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                <HStack width="70%">
                    <GeneralInformation {...props} onRedirectToResource={redirectToResource} />
                </HStack>
                <HStack width="30%">
                    <Bookings mission={mission} />
                </HStack>
            </Flex>
            <Flex width="100%" gap={3} alignItems="flex-start">
                <HStack width="100%">
                    <Assignments {...props} onRedirectToResource={redirectToResource} />
                </HStack>
            </Flex>
        </VStack>
    );
};
