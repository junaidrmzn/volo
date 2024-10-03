import { Flex, HStack } from "@volocopter/design-library-react";
import { Aircraft } from "@voloiq-typescript-api/aircraft-management-types";
import { MissionConflict } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../../../translations/useMissionTranslations";
import { useGetEnvelopesData } from "./useGetEnvelopesData";
import { useLateralEnvelopeChart } from "./useLateralEnvelopeChart";
import { useLongitudinalEnvelopeChart } from "./useLongitudinalEnvelopeChart";

export type MassandBalanceCalculationsProps = {
    aircraftData?: Aircraft;
    mission: Mission;
};

export const MassandBalanceCalculations = (props: MassandBalanceCalculationsProps) => {
    const { aircraftData, mission } = props;
    const { t } = useMissionTranslations();
    const { positions, weights } = useGetEnvelopesData(aircraftData);
    const LongitudinalGraphBox = useLongitudinalEnvelopeChart({ positions, weights, aircraftData });
    const LateralGraphBox = useLateralEnvelopeChart({ positions, weights, aircraftData });

    const isOutOfLimits = mission.missionConflicts?.includes(MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS);

    return (
        <Flex width="100%">
            <HStack width="100%">
                <InfoCard
                    headerLabel={t("aircraftTab.massAndBalanceCalculation.header")}
                    tagLabel={
                        isOutOfLimits
                            ? t("aircraftTab.massAndBalanceCalculation.outOfLimits")
                            : t("aircraftTab.massAndBalanceCalculation.inLimits")
                    }
                    tagPosition="left"
                    tagType={isOutOfLimits ? "error" : "normal"}
                    bodyContent={
                        <Flex width="100%">
                            <HStack width="50%">{LongitudinalGraphBox}</HStack>
                            <HStack width="50%">{LateralGraphBox}</HStack>
                        </Flex>
                    }
                />
            </HStack>
        </Flex>
    );
};
