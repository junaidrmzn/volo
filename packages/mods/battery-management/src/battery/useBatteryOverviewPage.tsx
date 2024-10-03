import { useState } from "react";
import { useGetBatteries } from "../api-hooks/useBatteryService";

export const useBatteryOverviewPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, state, pagination, sendRequest } = useGetBatteries(page);

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
