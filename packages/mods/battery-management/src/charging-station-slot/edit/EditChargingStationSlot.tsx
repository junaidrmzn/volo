import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import type { RenderEditHandler } from "@voloiq/resource-overview";
import { EditChargingStationSlotForm } from "./EditChargingStationSlotForm";
import { EditChargingStationSlotFormSkeleton } from "./EditChargingStationSlotFormSkeleton";
import { useEditChargingStationSlot } from "./useEditChargingStationSlot";

export const EditChargingStationSlot: RenderEditHandler<ChargingStationSlot> = (props) => {
    const { resource, formRef } = props;

    const { isLoading, handleSubmit } = useEditChargingStationSlot(props);

    return isLoading ? (
        <EditChargingStationSlotFormSkeleton />
    ) : (
        <EditChargingStationSlotForm formRef={formRef} onSubmit={handleSubmit} chargingStationSlot={resource} />
    );
};
