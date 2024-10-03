import { useState } from "react";
import { useGetChargingProfiles } from "../api-hooks/useChargingProfileService";

export const useChargingProfileOverviewPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, state, pagination, sendRequest } = useGetChargingProfiles(page);

    return {
        data: data || [],
        error,
        state,
        pagination,
        setPage,
        sendRequest,
        page,
    };
};
