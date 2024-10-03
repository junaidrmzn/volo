import { useState } from "react";
import { Mission, useAssignRouteOption, useGetAllRouteOptions } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";

type UseMissionAircraftAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const useMissionRouteOptionAssignment = (props: UseMissionAircraftAssignmentProps) => {
    const { mission, onReloadList } = props;
    const { onError } = useErrorToastWithMessage();
    const { data: routeOptions } = useGetAllRouteOptions(mission.id);
    const [selectedRouteOption, setSelectedRouteOption] = useState(
        mission.assignments?.routeOptionId ? mission.assignments?.routeOptionId : ""
    );

    const { sendRequest } = useAssignRouteOption({
        missionId: mission.id,
        routeOptionId: selectedRouteOption.toString(),
        config: { params: { version: mission.version } },
    });

    const onSubmit = () => {
        sendRequest()
            .then((response) => {
                onReloadList();
                return response;
            })
            .catch((error) => {
                onError(error);
            });
    };

    return {
        onSubmit,
        routeOptions,
        setSelectedRouteOption,
        selectedRouteOption,
    };
};
