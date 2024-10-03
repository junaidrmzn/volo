import { Spinner, VStack } from "@volocopter/design-library-react";
import { CrewScheduler } from "@voloiq/crew-scheduler";
import { Mission, useGetAllCrewFlightTimeLimitation } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { useErrorToastWithDescription } from "../../hooks/useErrorToast";
import { getPilotName } from "../../mission-list-item/getPilotName";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type OnDutyCrewProps = {
    mission: Mission;
};

export const OnDutyCrew = (props: OnDutyCrewProps) => {
    const { mission } = props;
    const { estimatedDepartureDateTime, assignments } = mission;
    const { data: pilotData, state } = useGetAllCrewFlightTimeLimitation(
        assignments?.pilotId || "-1",
        estimatedDepartureDateTime ?? new Date().toISOString()
    );

    const assignedPilot = {
        pilotFirstName: assignments?.pilotFirstName,
        pilotMiddleName: assignments?.pilotMiddleName,
        pilotSurName: assignments?.pilotSurName,
    };

    const { onError } = useErrorToastWithDescription();

    const navigation = useNavigate();
    const redirectToCrewMember = () => {
        navigation(`/crew-management/crewmember/overview/${assignments?.pilotId}`);
    };
    const { t } = useMissionTranslations();

    return (
        <>
            {state === "success" && pilotData ? (
                <CrewScheduler
                    headerLabel={t("onDutyToday")}
                    crewName={getPilotName(assignedPilot)}
                    flightTimeLimitation={pilotData}
                    onRedirectToResource={redirectToCrewMember}
                />
            ) : state === "pending" || state === "idle" ? (
                <VStack my={6} justifyContent="center" alignItems="center" width="100%">
                    <Spinner />
                </VStack>
            ) : (
                <>{onError(t("An error occurred"))}</>
            )}
        </>
    );
};
