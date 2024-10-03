import type { CrewMemberBlockingTime, CrewMemberPartial } from "@voloiq-typescript-api/crew-api-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "@voloiq/routing";
import { TimeRange } from "@voloiq/time-scheduler";
import { useGetCrewMembersByName, useGetCrewMembersCalendars } from "../api-hooks/useCrewManagementService";

export type CrewMemberWithCalendar = {
    crewMember: CrewMemberPartial;
    calendar: CrewMemberBlockingTime[];
};

export const useCrewMemberSelection = () => {
    const [error, setError] = useState(false);
    const [init, setInit] = useState(true);
    const [URLSearchParams, SetURLSearchParams] = useSearchParams();
    const [name, setName] = useState<string>("");
    const [searchName, setSearchname] = useState<string>("");
    const [crewMemberMails, setCrewMemberMails] = useState(URLSearchParams.get("crewMembers")?.split(",") ?? []);
    const [timeRange, setTimeRange] = useState<TimeRange>();

    const onRangeUpdate = (range: TimeRange) => setTimeRange(range);

    const { data: foundCrewMember, state } = useGetCrewMembersByName(searchName);
    const { CrewMembersCalendars, refetchCrewMembersCalendars } = useGetCrewMembersCalendars({
        crewMemberMails,
        startDateTime: timeRange ? timeRange.startDate.toISOString() : "",
        endDateTime: timeRange ? timeRange.endDate.toISOString() : "",
    });

    useEffect(() => {
        if (state === "success" && foundCrewMember) {
            if (!crewMemberMails.includes(foundCrewMember.email!!)) {
                const updatedMailSelection = [...crewMemberMails];
                updatedMailSelection.push(foundCrewMember.email!!);
                setCrewMemberMails(updatedMailSelection);
                const params = updatedMailSelection.map((id) => id).join(",");
                SetURLSearchParams({ crewMembers: params });
            }
            setSearchname("");
            setInit(true);
        }
        if (state === "error") {
            setError(true);
        }
    }, [state]);

    useEffect(() => {
        const params = crewMemberMails.map((id) => id).join(",");
        SetURLSearchParams({ crewMembers: params });
    }, [SetURLSearchParams, crewMemberMails]);

    return {
        name,
        setName,
        CrewMembersCalendars,
        setSearchname,
        crewMemberMails,
        setCrewMemberMails,
        error,
        setError,
        init,
        setInit,
        refetchCrewMembersCalendars,
        onRangeUpdate,
    };
};
