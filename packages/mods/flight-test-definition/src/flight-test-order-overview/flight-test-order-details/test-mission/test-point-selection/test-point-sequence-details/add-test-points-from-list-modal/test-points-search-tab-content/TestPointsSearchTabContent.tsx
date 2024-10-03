import { Box, HStack, Heading, Text, VStack } from "@volocopter/design-library-react";
import { ProcedureRead, TestPoint } from "@voloiq/flight-test-definition-api/v1";
import { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { ResourceListWrapper, SearchInputField } from "@voloiq/flight-test-definition-components";
import { SynchronizedScrollProvider } from "@voloiq/flight-test-definition-utils";
import { SelectedFlightTestDefinition } from "../useSelectedFlightTestDefinition";
import { FlightTestDefinitionSearchResultItem } from "./FlightTestDefinitionSearchResultItem";
import { ProcedureSearchResultListItem } from "./ProcedureSearchResultListItem";
import { useTestPointsSearchTabContentTranslation } from "./translations/useTestPointsSearchTabContentTranslation";

type TestPointsSearchTabContentProps = {
    definitions?: FlightTestDefinitionResponseBody[];
    selectedDefinition: SelectedFlightTestDefinition | null;
    procedures?: ProcedureRead[];
    onSelectDefinition: (id: string, ftdId: string) => void;
    selectedTestPointIds: string[];
    onSelectTestPoint: (testPoint: TestPoint, isChecked: boolean) => void;
    onSearchDefinitions: (searchText: string) => void;
};

export const TestPointsSearchTabContent = (props: TestPointsSearchTabContentProps) => {
    const {
        definitions,
        procedures,
        selectedDefinition,
        onSearchDefinitions,
        onSelectDefinition,
        selectedTestPointIds,
        onSelectTestPoint,
    } = props;
    const { t } = useTestPointsSearchTabContentTranslation();

    return (
        <HStack h="full" w="full" align="stretch" maxW="full">
            <VStack flex={2} spacing={6} minW="300px">
                <VStack w="full" spacing={2} alignItems="flex-start">
                    <Heading as="h6" fontWeight="bold" fontSize="sm">
                        {t("FTD")}
                    </Heading>
                    <SearchInputField onChange={onSearchDefinitions} />
                </VStack>
                <VStack w="full" h="full" spacing={2}>
                    {definitions?.map((flightTestDefinition) => {
                        const { id, title, ftdId } = flightTestDefinition;

                        return (
                            <FlightTestDefinitionSearchResultItem
                                key={id}
                                title={title}
                                ftdId={ftdId}
                                isSelected={id === selectedDefinition?.id}
                                onDetailsButtonClick={() => onSelectDefinition(id, ftdId)}
                            />
                        );
                    })}
                </VStack>
            </VStack>
            <Box borderWidth={1} borderColor="semanticUnknownMuted" my={3} minH={650} />
            <VStack flex={5} justifyContent="flex-start" alignItems="flex-start" maxW="70%">
                <HStack w="full" spacing={1}>
                    <Heading as="h6" fontWeight="bold" fontSize="sm">{`${t("Test Points")} -`}</Heading>
                    <Text fontSize="sm">{selectedDefinition ? selectedDefinition.ftdId : t("(No FTD Selected)")}</Text>
                </HStack>
                <VStack flex={1} h="full" w="full" justifyContent="flex-start" alignItems="stretch">
                    <SynchronizedScrollProvider>
                        {selectedDefinition && (
                            <ResourceListWrapper
                                list={procedures}
                                emptyMessage={t("No procedures found")}
                                renderItem={(procedure) => (
                                    <ProcedureSearchResultListItem
                                        key={procedure.id}
                                        procedure={procedure}
                                        onSelectTestPoint={onSelectTestPoint}
                                        selectedTestPointIds={selectedTestPointIds}
                                        flightTestDefinitionId={selectedDefinition.id}
                                    />
                                )}
                            />
                        )}
                    </SynchronizedScrollProvider>
                </VStack>
            </VStack>
        </HStack>
    );
};
