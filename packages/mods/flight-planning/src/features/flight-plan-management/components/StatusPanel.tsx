import { Box, Flex, Text, Tooltip } from "@volocopter/design-library-react";
import type { FlightPlanConflictStatus, FlightPlanStage } from "@voloiq-typescript-api/flight-planning-types";
import { match } from "ts-pattern";

type StatusPanelProps = {
    planStage?: FlightPlanStage;
    conflictStatus?: FlightPlanConflictStatus;
};

const GreenStatus = () => <Box bg="green.300" w="15px" h="15px" borderRadius="full" aria-label="green" />;
const RedStatus = () => <Box bg="red.700" w="15px" h="15px" borderRadius="full" aria-label="red" />;
const YellowStatus = () => <Box bg="yellow.400" w="15px" h="15px" borderRadius="full" aria-label="yellow" />;
const GreyStatus = () => <Box bg="gray.300" w="15px" h="15px" borderRadius="full" aria-label="grey" />;

export const StatusPanel = (props: StatusPanelProps) => {
    const { planStage, conflictStatus } = props;
    const label = conflictStatus === "conflicting" ? "conflicting" : planStage;
    return (
        <Flex justifyContent="center" height="6a" pt="2">
            <Tooltip label={label} hasArrow placement="bottom">
                <span aria-label={label}>
                    {conflictStatus === "conflicting" ? (
                        <YellowStatus />
                    ) : (
                        match(planStage)
                            .with("aborted", () => <RedStatus />)
                            .with("canceled", () => <RedStatus />)
                            .with("rejected", () => <RedStatus />)
                            .with("accepted", () => <GreenStatus />)
                            .with("completed", () => <GreenStatus />)
                            .with("activated", () => <GreenStatus />)
                            .with("aborted" || "activated", () => <Text>JOA!</Text>)
                            .otherwise(() => <GreyStatus />)
                    )}
                </span>
            </Tooltip>
        </Flex>
    );
};
