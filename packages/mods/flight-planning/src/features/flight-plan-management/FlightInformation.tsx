import { Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { FlightPlanConflictStatus, FlightPlanStage } from "@voloiq-typescript-api/flight-planning-types";
import { useFlightPlanningTranslation } from "../../translations";
import { StatusPanel } from "./components/StatusPanel";

type FlightInformationProps = {
    departureVertiport: string;
    arrivalVertiport: string;
    scheduledDepartureTime: string;
    scheduledArrivalTime: string;
    targetActivationTime?: string;
    aircraftType: string;
    planStage?: FlightPlanStage;
    conflictStatus?: FlightPlanConflictStatus;
    version?: number;
};

export const FlightInformation = (props: FlightInformationProps) => {
    const {
        version,
        departureVertiport,
        arrivalVertiport,
        scheduledArrivalTime,
        scheduledDepartureTime,
        targetActivationTime,
        aircraftType,
        planStage,
        conflictStatus,
    } = props;
    const { t: translate, i18n } = useFlightPlanningTranslation();
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: "short", timeStyle: "short" });

    return (
        <Flex flexDirection="column">
            <VStack width="100%" flexGrow={1} overflowY="auto" px={4} pt={8} spacing={3}>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("routeOption.properties.departureVertiport")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end">
                        {departureVertiport}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("routeOption.properties.arrivalVertiport")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end">
                        {arrivalVertiport}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("flightPlanManagement.scheduledDepartureTime")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end" whiteSpace="nowrap">
                        {scheduledDepartureTime && dateFormatter.format(new Date(scheduledDepartureTime))}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("flightPlanManagement.scheduledArrivalTime")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end" whiteSpace="nowrap">
                        {scheduledArrivalTime && dateFormatter.format(new Date(scheduledArrivalTime))}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("flightPlanManagement.targetActivationTime")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end" whiteSpace="nowrap">
                        {targetActivationTime ? dateFormatter.format(new Date(targetActivationTime)) : "-"}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("flightPlanManagement.version")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end" whiteSpace="nowrap">
                        {`Version ${version || 1}`}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("routeOption.properties.aircraftType")}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="end">
                        {aircraftType}
                    </Text>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="sm">{translate("flightPlanManagement.status")}</Text>
                    <Flex flexDirection="row">
                        <StatusPanel conflictStatus={conflictStatus} planStage={planStage} />
                        <Text fontSize="sm" fontWeight="bold" textAlign="end" ml="2" lineHeight="30px">
                            {conflictStatus === "conflicting" ? conflictStatus : planStage}
                        </Text>
                    </Flex>
                </HStack>
            </VStack>
        </Flex>
    );
};
