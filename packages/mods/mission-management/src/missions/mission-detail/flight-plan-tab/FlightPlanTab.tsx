import { Button, HStack, Text, VStack, useDisclosure } from "@volocopter/design-library-react";
import { addSeconds } from "date-fns";
import { match } from "ts-pattern";
import { Mission, MissionConflict, RouteAssignment } from "@voloiq/network-schedule-management-api/v1";
import { IconCard } from "@voloiq/network-scheduling-components";
import { UpdateScheduleModal } from "../../mission-list-item/mission-actions-popover/update-schedule-mission/UpdateScheduleModal";
import { RoutesSection } from "./routes-section/RoutesSection";
import { useFlightPlanTabTranslation } from "./translations/useFlightPlanTabTranslation";

export type FlightPlanTabProps = {
    mission: Mission;
    onReloadList: () => void;
};

const getRouteDuration = (route: RouteAssignment) => {
    return (
        (route.waypoints[route.waypoints.length - 1]?.validationResult?.time ?? 0) -
        (route.waypoints[0]?.validationResult?.time ?? 0)
    );
};

export const FlightPlanTab = (props: FlightPlanTabProps) => {
    const { mission, onReloadList } = props;
    const routeOption = mission.assignments?.routeOption;
    const { t } = useFlightPlanTabTranslation();
    const {
        isOpen: isUpdateScheduleModalOpen,
        onClose: onCloseUpdateScheduleModal,
        onOpen: onOpenUpdateScheduleModal,
    } = useDisclosure();

    return match(routeOption)
        .when(
            (routeOption) => routeOption === undefined || routeOption === null,
            () => (
                <IconCard
                    label={t("No routes found")}
                    helpText={t("Sorry, we couldn't find any routes for this mission")}
                />
            )
        )
        .when(
            (routeOption) => routeOption?.routes === undefined || routeOption?.routes?.length === 0,
            () => (
                <IconCard
                    label={t("No routes found")}
                    helpText={t("Route validation is currently running. Please wait to see results")}
                />
            )
        )
        .otherwise(() => (
            <VStack spacing={3} width="full" alignItems="stretch">
                {mission.missionConflicts?.includes(MissionConflict.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN) && (
                    <>
                        <HStack justifyContent="space-between">
                            <Text color="red.500" fontSize="xs">
                                {t("Mission Duration mismatch conflict message")}
                            </Text>
                            <Button type="button" size="sm" variant="primary" onClick={onOpenUpdateScheduleModal}>
                                {t("Adjust mission")}
                            </Button>
                        </HStack>
                        <UpdateScheduleModal
                            mission={mission}
                            onReloadList={onReloadList}
                            isOpen={isUpdateScheduleModalOpen}
                            onClose={onCloseUpdateScheduleModal}
                            initialValues={{
                                estimatedArrivalDateTime: mission.estimatedDepartureDateTime
                                    ? addSeconds(
                                          new Date(mission.estimatedDepartureDateTime),
                                          getRouteDuration(mission.assignments?.routeOption?.routes[0]!)
                                      )
                                    : undefined,
                            }}
                        />
                    </>
                )}
                <RoutesSection
                    routes={routeOption?.routes!}
                    routesFilter={(route) => route.status === "valid"}
                    getHeading={(numberOfRoutes) =>
                        t("Valid Routes ({numberOfRoutes})", {
                            numberOfRoutes,
                        })
                    }
                    notFoundLabel={t("No valid routes found")}
                    notFoundText={t("There are no valid routes for this mission")}
                />
                <RoutesSection
                    routes={routeOption?.routes!}
                    routesFilter={(route) => route.status === "invalid"}
                    getHeading={(numberOfRoutes) =>
                        t("Invalid Routes ({numberOfRoutes})", {
                            numberOfRoutes,
                        })
                    }
                    notFoundLabel={t("No invalid routes found")}
                    notFoundText={t("There are no invalid routes for this mission")}
                />
            </VStack>
        ));
};
