import { CrewMember } from "@voloiq-typescript-api/crew-api-types";
import { useEffect, useState } from "react";
import { useGetAllStandbyCrews, useGetCrewMember } from "@voloiq/crew-management-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { useErrorToast } from "../hooks";

export type UseStandbyCrewsProps = {
    scheduleDate: string;
    aircraftTypeId: string;
    crewId: string;
};

export const useStandbyCrews = (props: UseStandbyCrewsProps) => {
    const { crewId, aircraftTypeId, scheduleDate } = props;
    const { formatDate } = useFormatDateTime();
    const [standbyCrewList, setStandbyCrewList] = useState<CrewMember[]>([]);
    const [init, setInit] = useState<boolean>(false);
    const { data: crewMember } = useGetCrewMember({ crewMemberId: crewId });
    const { sendRequest } = useGetAllStandbyCrews({
        scheduleDate: formatDate(scheduleDate),
        aircraftTypeId,
        regionId: crewMember?.homeBase,
    });
    const { onError } = useErrorToast();
    useEffect(() => {
        const fetchStandbyCrewMembers = async () => {
            await sendRequest({})
                .then((response) => {
                    if (response) {
                        const standbyCrewList = response.filter((crew: { id: string }) => crew.id !== crewId);
                        setStandbyCrewList(standbyCrewList);
                    }
                })
                .catch((error) => {
                    onError(error);
                });
        };
        if (crewMember && !crewMember.homeBase && !init) {
            setStandbyCrewList([]);
            setInit(true);
        } else if (crewMember && !init) {
            fetchStandbyCrewMembers();
            setInit(true);
        }
    }, [crewMember, scheduleDate, aircraftTypeId, crewId, formatDate, sendRequest, init, onError]);

    return { standbyCrewList };
};
