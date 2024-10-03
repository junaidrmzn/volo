import { useCreateService, useDeleteService } from "@voloiq/service";
import type { PadEvent, PadEventCreate } from "@voloiq/vertiport-management-api/v1";
import { usePad } from "../vertiport/detail/pads/pad-card-list/pad-actions-popover/pad-context/usePad";
import { useVertiport } from "../vertiport/detail/vertiport-context/useVertiport";
import { VERTIPORT_MANAGEMENT } from "./serviceEndpoints";

export const useGetRoute = () => {
    const {
        vertiport: { id: vertiportId },
    } = useVertiport();
    const {
        pad: { id: padId },
    } = usePad();

    return `${VERTIPORT_MANAGEMENT}/vertiports/${vertiportId}/pads/${padId}/events`;
};

export const useCreatePadEvent = () => useCreateService<PadEventCreate, PadEvent>({ route: useGetRoute() });

export const useDeletePadEvent = () => useDeleteService({ route: useGetRoute() });
