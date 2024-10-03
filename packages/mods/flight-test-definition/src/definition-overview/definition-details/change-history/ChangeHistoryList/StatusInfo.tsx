import { HStack, Icon } from "@volocopter/design-library-react";
import type { FlightTestDefinitionRequestStatus } from "@voloiq/flight-test-definition-api/v2";
import { FlightTestDefinitionRequestStatusList } from "@voloiq/flight-test-definition-api/v2";
import { StatusTag } from "@voloiq/flight-test-definition-components";

export type StatusInfoProps = {
    currentStatus: FlightTestDefinitionRequestStatus;
    statusChanged: boolean;
};

const getPreviousStatus = (status: FlightTestDefinitionRequestStatus) => {
    const currentIndex = FlightTestDefinitionRequestStatusList.indexOf(status);
    if (currentIndex > 0) {
        return FlightTestDefinitionRequestStatusList[currentIndex - 1] || status;
    }
    return status;
};

export const StatusInfo = (props: StatusInfoProps) => {
    const { currentStatus, statusChanged } = props;
    return (
        <HStack>
            {statusChanged && (
                <>
                    <StatusTag status={getPreviousStatus(currentStatus)} />
                    <Icon icon="arrowRight" />
                </>
            )}
            <StatusTag status={currentStatus} />
        </HStack>
    );
};
