import { useDisclosure, useToast } from "@volocopter/design-library-react";
import type { RouteOption, RouteOptionUpdate } from "@voloiq-typescript-api/flight-planning-types";
import { useCallback, useState } from "react";
import { ExternalAircraftType, useEditRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { useLocation, useNavigate } from "@voloiq/routing";
import { useGetAllAircraftTypes } from "../../api-hooks";
import { useFlightPlanningTranslation } from "../../translations";
import type { AircraftTypeSelectOption } from "./types";

type AircraftTypeInfoOptions = { routeOption: RouteOption };

const addOptionsToList = (aircraftTypes: ExternalAircraftType[]) => {
    return aircraftTypes.map<AircraftTypeSelectOption>((aircraftType) => ({
        label: `${aircraftType.name} (${aircraftType.performanceModel})`,
        value: { aircraftTypeId: aircraftType.externalId, aircraftTypeName: aircraftType.name },
    }));
};

export const useAircraftTypeInfo = (options: AircraftTypeInfoOptions) => {
    const { routeOption } = options;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    const toast = useToast();
    const { t } = useFlightPlanningTranslation();
    const [availableAircraftType, setAvailableAircraftType] = useState<AircraftTypeSelectOption[] | undefined>();
    const [selectedOption, setSelectedOption] = useState<AircraftTypeSelectOption>();
    const { editRouteOptionAsync, isLoading } = useEditRouteOptionQuery({
        routeOptionId: routeOption.id,
        onError: (error) => {
            toast({
                title: t("errorPage.title"),
                description: error.message,
                status: "error",
            });
        },
    });
    const { data: allAircraftTypeQueryData } = useGetAllAircraftTypes();

    const changeSelectedOption = (option: AircraftTypeSelectOption | null) => {
        if (option) {
            setSelectedOption(option);
            onOpen();
        }
    };

    const currentPerformanceModel = allAircraftTypeQueryData?.find(
        (type) => type.externalId === routeOption?.aircraftTypeId
    )?.performanceModel;

    const handleCloseModal = () => {
        setSelectedOption(undefined);
        onClose();
    };

    const createAircraftTypeOptions = useCallback(() => {
        if (allAircraftTypeQueryData) {
            const aircraftTypeOptionsList = addOptionsToList(allAircraftTypeQueryData);
            setAvailableAircraftType(aircraftTypeOptionsList);
        }
    }, [allAircraftTypeQueryData]);

    const closeRightSidebar = () => navigate(`../route-options/${routeOption.id}/map${location.search}`);

    const handleAircraftTypeSubmit = async () => {
        if (!selectedOption?.value) return;

        const updatedRouteOption: RouteOptionUpdate = {
            ...routeOption,
            aircraftType: selectedOption.value.aircraftTypeName,
            aircraftTypeId: selectedOption.value.aircraftTypeId,
            departureExternalVertiport: routeOption.departureExternalVertiport.id,
            arrivalExternalVertiport: routeOption.arrivalExternalVertiport.id,
        };
        await editRouteOptionAsync({ data: updatedRouteOption });
        onClose();
        closeRightSidebar();
    };

    return {
        isOpen,
        isLoading,
        selectedOption,
        changeSelectedOption,
        handleAircraftTypeSubmit,
        handleCloseModal,
        createAircraftTypeOptions,
        availableAircraftType,
        currentPerformanceModel,
    };
};
