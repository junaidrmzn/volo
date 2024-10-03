import { useGetAllVertiports } from "../../api-hooks/useAircraftService";
import { useGetAllAircraftTypes } from "../../api-hooks/useAircraftTypeService";

const getMinDate = (date1: Date, date2: Date) => {
    return date1 < date2 ? date1 : date2;
};

export const useGetAirCraftValidToDate = () => {
    const { data: homebases } = useGetAllVertiports();
    const { data: aircraftTypes } = useGetAllAircraftTypes();

    const getValidToDate = (aircraftType: string, homebaseVertiport?: string) => {
        const selectedAircraftType = aircraftTypes.find((element) => element.id === aircraftType);
        const selectedHomeBase = homebases.find((element) => element.id === homebaseVertiport);

        return selectedAircraftType?.validTo && selectedHomeBase?.validTo
            ? getMinDate(new Date(selectedAircraftType.validTo), new Date(selectedHomeBase.validTo)).toISOString()
            : selectedAircraftType?.validTo
            ? new Date(selectedAircraftType.validTo).toISOString()
            : selectedHomeBase?.validTo
            ? new Date(selectedHomeBase.validTo).toISOString()
            : "";
    };
    return { getValidToDate };
};
