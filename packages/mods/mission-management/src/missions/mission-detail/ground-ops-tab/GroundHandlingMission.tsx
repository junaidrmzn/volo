import { Card, HStack, SimpleGrid } from "@volocopter/design-library-react";
import { Mission, useGetGroundEvents } from "@voloiq/network-schedule-management-api/v1";
import { GroundTimeDetailsCard, ScheduledMissionCard, Section } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type GroundHandlingMissionProps = {
    mission: Mission;
};

export const GroundHandlingMission = (props: GroundHandlingMissionProps) => {
    const { mission } = props;
    const {
        id: missionId,
        flightNumber,
        assignments,
        missionConflicts,
        departureVertiportCode,
        estimatedArrivalDateTime,
        arrivalVertiportCode,
        estimatedDepartureDateTime,
    } = mission;
    const { data: groundEvents } = useGetGroundEvents({ missionId });
    const { t } = useMissionTranslations();
    const inboundGroundEvent = groundEvents.find(
        (event) => event.outboundMissionId !== null && event.outboundMissionId === missionId
    );
    const outboundGroundEvent = groundEvents.find(
        (event) => event.inboundMissionId !== null && event.inboundMissionId === missionId
    );

    const shortMission = {
        flightNumber,
        isInConflict: missionConflicts && missionConflicts.length > 0,
        departureVertiportCode,
        estimatedArrivalDateTime,
        arrivalVertiportCode,
        estimatedDepartureDateTime,
        aircraftTypeName: assignments?.aircraftTypeName,
    };
    return (
        <Section
            headerLabel={`${t("groundHandlingMission")} • ${flightNumber}`}
            headerFontWeight="semibold"
            bodyContent={
                <Card width="100%" p={3}>
                    <SimpleGrid columns={{ sm: 1, md: 1, lg: 3 }}>
                        {inboundGroundEvent ? (
                            <GroundTimeDetailsCard type="inbound" groundEvent={inboundGroundEvent} />
                        ) : (
                            <HStack width="30%" />
                        )}
                        <HStack px={1.5}>
                            <ScheduledMissionCard mission={shortMission} />
                        </HStack>
                        {outboundGroundEvent && (
                            <GroundTimeDetailsCard type="outbound" groundEvent={outboundGroundEvent} />
                        )}
                    </SimpleGrid>
                </Card>
            }
        />
    );
};
