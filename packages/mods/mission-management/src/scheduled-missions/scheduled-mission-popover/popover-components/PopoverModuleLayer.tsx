import { AlertStatusIcon, HStack, Text, VStack } from "@volocopter/design-library-react";
import { CheckList, Service } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { useScheduledMissionTranslation } from "../../translations/useScheduledMissionTranslation";

export type PopoverModuleLayerProps = {
    mission: ShortInfoMission;
};

export const PopoverModuleLayer = (props: PopoverModuleLayerProps) => {
    const { mission } = props;
    const { t } = useScheduledMissionTranslation();

    const getCheckListItemName = (checkListItem: CheckList) => {
        return match(checkListItem.name)
            .with("AIRCRAFT", () => t("modulesList.aircraft"))
            .with("PASSENGER", () => t("modulesList.passanger"))
            .with("BATTERY", () => t("modulesList.battery"))
            .with("CREW", () => t("modulesList.crew"))
            .with("FLIGHT_PLAN", () => t("modulesList.flightPlan"))
            .with("NOTAMS", () => t("modulesList.notams"))
            .with("GENERAL", () => t("modulesList.general"))
            .with("GROUND_OPERATION", () => t("modulesList.groundOps"))
            .with("WEATHER", () => t("modulesList.weather"))
            .with("UNKNOWN", () => t("modulesList.unknown"))
            .exhaustive();
    };
    const activeModulesList = ["AIRCRAFT", "CREW", "GROUND_OPERATION"];
    if (mission?.service === Service.PASSENGER) {
        activeModulesList.splice(0, 0, "PASSENGER");
    }
    return (
        <VStack width="100%" gap={0.5} spacing={0}>
            {mission.checkLists.length > 0 &&
                mission.checkLists
                    .filter((checkListItem) => activeModulesList.includes(checkListItem.name))
                    .map((checkListItem) => (
                        <HStack key={checkListItem.name} width="100%" justifyContent="space-between">
                            <Text fontWeight="bold" size="xs" lineHeight={6}>
                                {getCheckListItemName(checkListItem)}
                            </Text>
                            <AlertStatusIcon
                                variant={
                                    checkListItem.severity === "INFO"
                                        ? "info"
                                        : checkListItem.severity === "WARNING"
                                        ? "warning"
                                        : checkListItem.severity === "ERROR"
                                        ? "error"
                                        : "neutralSuccess"
                                }
                                size={4}
                            />
                        </HStack>
                    ))}
        </VStack>
    );
};
