import { useEffect, useMemo } from "react";
import { useGetConnection } from "@voloiq/commercial-scheduling-api/v1";
import { useConnectionForm } from "../hooks/useConnectionForm";

export const useConnectionEditForm = (connectionId: string) => {
    const { data: connection, state: connectionGetState } = useGetConnection(connectionId);
    const {
        FormControl,
        connectionSchema,
        aircraftTypes,
        onChangeSelectedRegion,
        onChangeSelectedAircraftType,
        onChangeSelectedArrivalVertiport,
        onChangeSelectedDepartureVertiport,
    } = useConnectionForm({ connection, isDepartureVertiportRequired: false, isArrivalVertiportRequired: false });

    useEffect(() => {
        if (connection?.regionId) {
            onChangeSelectedRegion(connection.regionId);
        }
        if (connection?.aircraftTypeId) {
            onChangeSelectedAircraftType(connection.aircraftTypeId);
        }
        if (connection?.arrivalVertiportUuid) {
            onChangeSelectedArrivalVertiport(connection.arrivalVertiportUuid);
        }
        if (connection?.departureVertiportUuid) {
            onChangeSelectedDepartureVertiport(connection.departureVertiportUuid);
        }
    }, [
        connection,
        onChangeSelectedRegion,
        onChangeSelectedAircraftType,
        onChangeSelectedArrivalVertiport,
        onChangeSelectedDepartureVertiport,
    ]);

    const connectionInitialValues = useMemo(() => {
        return {
            ...connection,
            region: { label: connection?.regionName, value: connection?.regionId },
            departureVertiport: {
                label: connection?.departureVertiportCode,
                value: connection?.departureVertiportUuid,
            },
            arrivalVertiport: { label: connection?.arrivalVertiportCode, value: connection?.arrivalVertiportUuid },
            aircraftType: { label: connection?.aircraftTypeName, value: connection?.aircraftTypeId },
            category: { label: connection?.category, value: connection?.category },
            validFrom: connection?.validFrom ? new Date(connection.validFrom) : undefined,
            validTo: connection?.validTo ? new Date(connection.validTo) : undefined,
        };
    }, [connection]);

    return {
        connection,
        FormControl,
        connectionSchema,
        connectionInitialValues,
        connectionName: connection?.name ?? "n/a",
        connectionGetState,
        onChangeSelectedAircraftType,
        aircraftTypes,
    };
};
