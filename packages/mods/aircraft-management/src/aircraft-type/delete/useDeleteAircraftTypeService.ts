import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { useState } from "react";
import { useUpdateAircraftTypeWithConfirmation } from "../../api-hooks/useAircraftTypeService";

export type UseUpdateAircraftTypeProps = {
    id: string;
    aircraftTypeData: AircraftType | undefined;
    handleStatusNotification: boolean;
};

const useDeleteAircraftTypeService = (props: UseUpdateAircraftTypeProps) => {
    const { id, aircraftTypeData } = props;

    const [isCalledTwice, setIsCalledTwice] = useState<boolean>(false);

    const { sendRequestById } = useUpdateAircraftTypeWithConfirmation({
        aircraftTypeId: id,
        version: aircraftTypeData?.version,
    });

    const setUpdatedValues = () =>
        sendRequestById(id, {
            data: {
                validFrom: aircraftTypeData?.validFrom ?? "",
                validTo: new Date().toISOString(),
                minimumTemperature: aircraftTypeData?.minimumTemperature ?? 0,
                maximumTemperature: aircraftTypeData?.maximumTemperature ?? 0,
                windSpeed: aircraftTypeData?.windSpeed ?? 0,
                relativeHumidity: aircraftTypeData?.relativeHumidity ?? 0,
                rain: aircraftTypeData?.rain ?? 0,
                visibility: aircraftTypeData?.visibility ?? 0,
                cloudCeilingHeight: aircraftTypeData?.cloudCeilingHeight ?? 0,
                airDensity: aircraftTypeData?.airDensity ?? 0,
            },
            params: { forceValidityPeriod: isCalledTwice, version: aircraftTypeData?.version },
        });

    return { setUpdatedValues, isCalledTwice, setIsCalledTwice };
};

export { useDeleteAircraftTypeService };
