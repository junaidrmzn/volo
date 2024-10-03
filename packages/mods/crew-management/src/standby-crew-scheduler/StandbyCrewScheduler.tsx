import { Spinner, VStack } from "@volocopter/design-library-react";
import { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { useGetCrewFlightTimeLimitation } from "@voloiq/crew-management-api/v1";
import { CrewScheduler } from "@voloiq/crew-scheduler";
import { useNavigate } from "@voloiq/routing";
import { useErrorToastWithDescription } from "../hooks/useErrorToast";
import { getPilotName } from "./getPilotName";
import { useStandbyCrewSchedulerTranslation } from "./translations/useStandbyCrewSchedulerTranslation";

export type StandbyCrewSchedulerProps = {
    scheduleDate: string;
    crewMember: CrewMemberWithNames;
};

export const StandbyCrewScheduler = (props: StandbyCrewSchedulerProps) => {
    const { scheduleDate, crewMember } = props;
    const { data: pilotData, state } = useGetCrewFlightTimeLimitation({ scheduleDate, crewId: crewMember.id });
    const { t } = useStandbyCrewSchedulerTranslation();
    const assignedPilot = {
        pilotFirstName: crewMember.firstName,
        pilotMiddleName: crewMember.middleName,
        pilotSurName: crewMember.surName,
    };
    const { onError } = useErrorToastWithDescription();
    const navigation = useNavigate();
    const redirectToCrewMember = () => {
        navigation(`/crew-management/crewmember/overview/${crewMember.id}`);
    };
    return (
        <>
            {state === "success" && pilotData ? (
                <CrewScheduler
                    headerLabel={t("standBy")}
                    crewName={getPilotName(assignedPilot)}
                    flightTimeLimitation={pilotData}
                    onRedirectToResource={redirectToCrewMember}
                />
            ) : state === "pending" || state === "idle" ? (
                <VStack my={6} justifyContent="center" alignItems="center" width="100%">
                    <Spinner />
                </VStack>
            ) : (
                <>{onError(t("error.An error occurred"))}</>
            )}
        </>
    );
};
