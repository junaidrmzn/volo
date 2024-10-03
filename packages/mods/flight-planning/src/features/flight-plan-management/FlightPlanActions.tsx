import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    HStack,
    Text,
} from "@volocopter/design-library-react";
import type {
    FlightPlanConflictStatus,
    FlightPlanInfo,
    FlightPlanLogInfo,
    FlightPlanStage,
} from "@voloiq-typescript-api/flight-planning-types";
import { RequirePermissions } from "@voloiq/auth";
import { useAcceptFlightPlanModification, useActivateFlightPlan, useGetFlightPlanLog } from "../../api-hooks";
import { LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations";

type FlightPlanActionsProps = {
    flightPlan: FlightPlanInfo;
    planStage?: FlightPlanStage;
    conflictStatus?: FlightPlanConflictStatus;
};

const lastLogMessageAlert = (logs: FlightPlanLogInfo[]) => {
    const [lastMessage] = logs;
    return (
        <Alert status="warning" mt={4} borderRadius="sm">
            <AlertIcon />
            <AlertTitle>{lastMessage?.action}</AlertTitle>
            <AlertDescription>{lastMessage?.message}</AlertDescription>
        </Alert>
    );
};

export const FlightPlanActions = (props: FlightPlanActionsProps) => {
    const { flightPlan, planStage, conflictStatus } = props;
    const { t } = useFlightPlanningTranslation();
    const flightPlanLogQuery = useGetFlightPlanLog(flightPlan.id!);
    const { acceptFlightPlanModification, isLoading: isModifyLoading } = useAcceptFlightPlanModification();
    const { activateFlightPlan, isLoading: isActivateLoading } = useActivateFlightPlan();

    if (flightPlanLogQuery.isLoading) {
        return <LoadingSpinner size="sm" />;
    }

    if (flightPlanLogQuery.isError || !flightPlanLogQuery.data) {
        return null;
    }

    return (
        <Box mt="4" w="100%">
            <Box py="4">
                <Text fontWeight="700" fontSize="20">
                    {t("flightPlanManagement.actions")}
                </Text>
            </Box>
            <RequirePermissions resources={["FlightPlan"]} actions={["update"]}>
                <Button
                    my="2"
                    width="100%"
                    onClick={() => activateFlightPlan(flightPlan)}
                    isDisabled={planStage !== "accepted" || conflictStatus === "conflicting"}
                >
                    {t("flightPlanManagement.activate")}
                </Button>
                {planStage &&
                    conflictStatus === "conflicting" &&
                    planStage === "deconfliction" &&
                    lastLogMessageAlert(flightPlanLogQuery.data)}
                <Button
                    my="2"
                    width="100%"
                    onClick={() => acceptFlightPlanModification(flightPlan)}
                    isDisabled={conflictStatus !== "conflicting"}
                >
                    {t("flightPlanManagement.confirmModification")}
                </Button>
            </RequirePermissions>
            {!isActivateLoading ||
                (isModifyLoading && (
                    <HStack py="4">
                        <Box width="10">
                            <LoadingSpinner size="xs" />
                        </Box>
                        <Text>
                            {isActivateLoading
                                ? t("flightPlanManagement.sendingActivationRequest")
                                : t("flightPlanManagement.sendingConfirmModificationRequest")}
                        </Text>
                    </HStack>
                ))}
        </Box>
    );
};
