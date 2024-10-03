import { VStack } from "@volocopter/design-library-react";
import React from "react";
import { StandbyCrewScheduler } from "./StandbyCrewScheduler";
import { useStandbyCrews } from "./useStandbyCrews";

export type StandbyCrewsProps = {
    scheduleDate: string;
    aircraftTypeId: string;
    crewId: string;
};

export const StandbyCrews = (props: StandbyCrewsProps) => {
    const { scheduleDate, aircraftTypeId, crewId } = props;

    const { standbyCrewList } = useStandbyCrews({ scheduleDate, aircraftTypeId, crewId });
    return (
        <VStack gap={3} width="100%" alignContent="stretch">
            {standbyCrewList.length > 0 &&
                standbyCrewList.map((standbyCrew) => (
                    <StandbyCrewScheduler scheduleDate={scheduleDate} crewMember={standbyCrew} key={standbyCrew.id} />
                ))}
        </VStack>
    );
};
