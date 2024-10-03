import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import type { RenderEditHandler } from "@voloiq/resource-overview";
import { EditChargingStationForm } from "./EditChargingStationForm";
import { EditChargingStationFormSkeleton } from "./EditChargingStationFormSkeleton";
import { useEditChargingStation } from "./useEditChargingStation";

export const EditChargingStation: RenderEditHandler<ChargingStation> = (props) => {
    const { resource, formRef } = props;

    const { isLoading, handleSubmit, vertiports } = useEditChargingStation(props);

    return isLoading ? (
        <EditChargingStationFormSkeleton />
    ) : (
        <EditChargingStationForm
            formRef={formRef}
            onSubmit={handleSubmit}
            chargingStation={resource}
            vertiports={vertiports}
        />
    );
};
