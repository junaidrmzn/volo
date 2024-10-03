import { Flex, HStack, VStack } from "@volocopter/design-library-react";
import React from "react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { Bookings } from "./Bookings";

type PassangerTabProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const PassangerTab = (props: PassangerTabProps) => {
    return (
        <VStack width="100%" gap={1}>
            <Flex width="100%" mt={1} gap={3} alignItems="flex-start">
                <HStack width="100%">
                    <Bookings {...props} />
                </HStack>
            </Flex>
        </VStack>
    );
};
