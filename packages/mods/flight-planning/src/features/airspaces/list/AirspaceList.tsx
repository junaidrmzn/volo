import type { GroupBase } from "@volocopter/design-library-react";
import {
    Box,
    Button,
    FormControl as ChakraFormControl,
    FormLabel,
    HStack,
    Heading,
    Icon,
    IconButton,
    Select,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import type { AirspaceFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import { useGetAirspaces } from "@voloiq/flight-planning-api/v1";
import { FormProvider } from "@voloiq/form";
import { useOutletContext } from "@voloiq/routing";
import { useSelectedRoute } from "../../selected-route";
import type { AirspaceListContext, Option } from "../types";
import { AirspaceListItem } from "./AirspaceListItem";
import { filterAirspacesByRangeAndType } from "./filterAirspaces";
import { useAirspacesList } from "./useAirspacesList";

type AirspacesListProps = {
    closeRightSidebar: () => void;
};

export const AirspaceList = (props: AirspacesListProps) => {
    const { closeRightSidebar } = props;
    const { routeOptionId } = useSelectedRoute();
    const { data: airspacesList } = useGetAirspaces(routeOptionId);

    const { setSelectedAirspaceOptions, selectedAirspaceOptions, altitudeRange, changeAltitudeRange } =
        useOutletContext<AirspaceListContext>();

    const { airspaceOptionsList, FormControl, editAltitudeRangeSchema } = useAirspacesList({
        airspacesList,
        altitudeRange,
    });

    return (
        <VStack align="start" height="100%" width="100%">
            <Box p={3} flexDirection="column" width="100%">
                <HStack justifyContent="space-between" width="100%">
                    <IconButton
                        variant="ghost"
                        aria-label="close"
                        onClick={closeRightSidebar}
                        data-testid="alerts-list-close-button"
                    >
                        <Icon icon="close" color="darkBlue.300" />
                    </IconButton>
                    <Heading size="md" fontWeight="bold" data-testid="alerts-sidebar-header">
                        Airspaces
                    </Heading>
                    <Box height="36px" width="40px" />
                </HStack>
            </Box>
            <Box p={3} w="100%">
                <ChakraFormControl>
                    <FormLabel>Filter types and classifications</FormLabel>
                    <Select<Option, true, GroupBase<Option>>
                        options={airspaceOptionsList}
                        onChange={setSelectedAirspaceOptions}
                        isMulti
                        placeholder="Select Airspace..."
                        size="md"
                        value={selectedAirspaceOptions}
                    />
                </ChakraFormControl>
                <Text mt={4}>Filter altitude range:</Text>
                <FormProvider
                    formId="editAltitudeRangeSchema"
                    schema={editAltitudeRangeSchema}
                    formType="create"
                    initialValues={{
                        altitudeFrom: altitudeRange[0],
                        altitudeTo: altitudeRange[1],
                    }}
                    onCreate={(altitudeRange) => {
                        changeAltitudeRange([altitudeRange.altitudeFrom, altitudeRange.altitudeTo]);
                    }}
                >
                    <FormControl fieldName="altitudeFrom" />
                    <FormControl fieldName="altitudeTo" />
                </FormProvider>
                <Button mt={3} mb={3} width="100%" form="editAltitudeRangeSchema" variant="primary" type="submit">
                    Apply altitude filter
                </Button>
            </Box>
            <Box width="100%" flexGrow={1} overflowY="auto" align="center" role="list" aria-label="Airspaces">
                {filterAirspacesByRangeAndType(altitudeRange, selectedAirspaceOptions, airspacesList?.data)?.map(
                    (feat: AirspaceFeatureAllOf) => (
                        <AirspaceListItem
                            airspace={feat}
                            key={`airspace-list-item-${feat.properties?.externalId}-${feat.properties?.createdAt}`}
                        />
                    )
                )}
            </Box>
        </VStack>
    );
};
