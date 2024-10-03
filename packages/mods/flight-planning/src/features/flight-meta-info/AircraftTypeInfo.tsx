import { Box, Flex, HStack, Select, Text } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../translations";
import { UpdateAircraftTypeModal } from "./UpdateAircraftTypeModal";
import type { AircraftTypeSelectOption } from "./types";
import { useAircraftTypeInfo } from "./useAircraftTypeInfo";

type AircraftTypeInfoProps = { routeOption: RouteOption };

export const AircraftTypeInfo = (props: AircraftTypeInfoProps) => {
    const { routeOption } = props;
    const { t: translate } = useFlightPlanningTranslation();
    const {
        isOpen,
        isLoading,
        selectedOption,
        changeSelectedOption,
        handleAircraftTypeSubmit,
        handleCloseModal,
        createAircraftTypeOptions,
        availableAircraftType,
        currentPerformanceModel,
    } = useAircraftTypeInfo({ routeOption });

    return (
        <HStack px={4} pb={3} justify="space-between">
            <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Text fontWeight="bold" fontSize="sm">
                    {translate("routeOption.properties.aircraftType")}:
                </Text>
                <Box width="100%">
                    <Select<AircraftTypeSelectOption>
                        size="sm"
                        placeholder={translate("routeOption.properties.aircraftType")}
                        onMenuOpen={() => createAircraftTypeOptions()}
                        options={availableAircraftType}
                        value={
                            selectedOption ?? {
                                label: `${routeOption.aircraftType} (${
                                    currentPerformanceModel ?? translate("common.notAvailable")
                                })`,
                                value: {
                                    aircraftTypeId: routeOption.aircraftTypeId ?? "",
                                    aircraftTypeName: routeOption.aircraftType,
                                },
                            }
                        }
                        onChange={(option) => changeSelectedOption(option)}
                    />
                </Box>
            </Flex>
            <UpdateAircraftTypeModal
                isOpen={isOpen}
                isLoading={isLoading}
                onClose={handleCloseModal}
                handleSubmit={handleAircraftTypeSubmit}
            />
        </HStack>
    );
};
