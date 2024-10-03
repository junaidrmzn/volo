import type {
    AircraftType,
    AircraftTypeBase,
    AircraftTypeCreate,
    AircraftTypeUpdate,
} from "@voloiq-typescript-api/aircraft-management-types";
import { useState } from "react";
import { useCreateService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { useUserConfirmation } from "../aircraft-type/hooks/useUserConfirmation";
import { AIRCRAFT_MANAGEMENT } from "./serviceEndpoints";

const route = `${AIRCRAFT_MANAGEMENT}/aircraft-types`;

export const useGetAircraftType = () =>
    useGetService<AircraftType>({ route, resourceId: "", options: { manual: true } });

export const useGetAllAircraftTypesManual = () => {
    return useGetAllService<AircraftType>({
        route,
        options: {
            manual: true,
        },
    });
};

export const useGetAllAircraftTypes = (
    pageNumber: number = 1,
    pageSize: number = 100,
    orderByParameter?: string,
    filterString?: string
) =>
    useGetAllService<AircraftType>({
        params: {
            page: pageNumber,
            size: pageSize,
            ...(orderByParameter && { orderBy: orderByParameter }),
            ...(filterString && { filter: filterString }),
            vt912: "true",
        },
        route,
    });

export const useGetAircraftTypesByIds = (aircraftTypeIds: string[]) =>
    useGetAllService<AircraftType>({
        params: {
            ids: aircraftTypeIds.join(","),
            vt912: "true",
        },
        route,
        options: {
            autoCancel: false,
            manual: true,
        },
    });

export const useCreateAircraftType = () => useCreateService<AircraftTypeCreate, AircraftType>({ route });

export type UseUpdateAircraftTypeWithConfirmationProps = {
    onOpenConfirmationModal?: Function;
    aircraftTypeId: string;
    version?: number;
};

export const useUpdateAircraftTypeWithConfirmation = (props: UseUpdateAircraftTypeWithConfirmationProps) => {
    const { aircraftTypeId, version, onOpenConfirmationModal = () => {} } = props;
    const [aircraftTypeUpdateData, setAircraftTypeUpdateData] = useState<AircraftTypeBase>();

    const { state, data, sendRequestById, error } = useUpdateService<AircraftTypeUpdate, AircraftType>({
        route,
    });

    const { informationToConfirm, isUserConfirmationNeeded } = useUserConfirmation({
        error,
        openConfirmationModal: onOpenConfirmationModal,
    });

    const updateConfirmed = () => {
        const data: AircraftTypeUpdate = {
            ...aircraftTypeUpdateData,
            validFrom: aircraftTypeUpdateData?.validFrom ?? "",
            validTo: aircraftTypeUpdateData?.validTo ?? "",
            minimumTemperature: 0,
            maximumTemperature: 1,
            windSpeed: 0,
            relativeHumidity: 0,
            rain: 0,
            visibility: 0,
            cloudCeilingHeight: 0,
            airDensity: 0,
        };
        sendRequestById(aircraftTypeId, {
            data,
            params: { forceValidityPeriod: true, version },
        });
    };

    return {
        state,
        data,
        sendRequestById,
        error,
        informationToConfirm,
        isConfirmationNeeded: isUserConfirmationNeeded(error),
        updateConfirmed,
        setAircraftTypeUpdateData,
    };
};

export const useUploadPerformanceFile = () => useCreateService<File, AircraftType>({ route });
