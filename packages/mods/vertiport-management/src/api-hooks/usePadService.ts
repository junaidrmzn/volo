import { P, match } from "ts-pattern";
import { useCreateService, useDeleteService, useGetAllService, useUpdateService } from "@voloiq/service";
import type { Pad, PadCreate } from "@voloiq/vertiport-management-api/v1";
import { useVertiport } from "../vertiport/detail/vertiport-context/useVertiport";
import { VERTIPORT_MANAGEMENT } from "./serviceEndpoints";

export const useGetRoute = () => {
    const {
        vertiport: { id: vertiportId },
    } = useVertiport();

    return `${VERTIPORT_MANAGEMENT}/vertiports/${vertiportId}/pads`;
};

export const useCreatePad = () => useCreateService<PadCreate, Pad>({ route: useGetRoute() });

type UseGetAllPadsOptions = {
    startDateTime: string;
    endDateTime: string;
};

export const useGetAllPads = (options: UseGetAllPadsOptions) => {
    const { startDateTime, endDateTime } = options;

    const {
        data: pads,
        sendRequest,
        pagination,
    } = useGetAllService<Pad>({
        route: useGetRoute(),
        params: { startDateTime, endDateTime, orderBy: "validTo:desc" },
    });

    const padsCount = match(pagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => undefined);

    return { pads, refetchPads: sendRequest, padsCount };
};

export const useDeletePad = () => useDeleteService({ route: useGetRoute() });

export const useUpdatePad = () => useUpdateService({ route: useGetRoute() });
