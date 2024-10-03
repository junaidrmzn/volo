import type { Meta } from "@storybook/react";
import {
    Box,
    Card,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Tag,
    Td,
    Text,
    Tr,
    VStack,
    useColorModeValue,
} from "@volocopter/design-library-react";
import type { Property } from "@volocopter/filter-react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import type { FilterProps } from "@voloiq/filter-panel";
import { FormProvider, createFormControl, datetime, object, string } from "@voloiq/form";
import { I18nProvider } from "@voloiq/i18n";
import { MemoryRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ResourceOverview as ResourceOverviewComponent } from "../ResourceOverview";
import type { RenderAddHandler } from "../add/ResourceAdd";
import { BulkEditForm } from "../bulk-edit";
import type { RenderEditHandler } from "../edit/ResourceEdit";
import type { RenderMultiPreviewHandler } from "../multi-preview/ResourceMultiPreview";
import type { TestResource } from "../multi-preview/__tests__/anyMultiPreviewMachineBuilder";
import { RenderSidePanelHandlerOptions } from "../side-panel/ResourceSidePanel";
import { RenderSplitPreviewOptions } from "../split-preview/ResourceSplitPreview";
import type { BaseResource } from "../state-machine/BaseResource";
import { ResourceMachineConfigBuilder } from "../state-machine/resourceMachineConfigBuilder";
import { Aircraft, bulkEditAircraft, fetchAircraft, fetchAllAircraft, formSchema } from "./aircraftDatabase";

const meta: Meta = {
    title: "Resource Overview/Resource Overview",
    parameters: {
        layout: "fullscreen",
        xstate: true,
        featureFlags: {
            "resource-overview-new-filter": { enabled: false },
            "iq-777-resource-management": { enabled: true },
            "vao-1907-bulk-edit": { enabled: true },
        },
    },
    decorators: [
        (Story) => (
            <LocalAuthenticationProvider>
                <I18nProvider>
                    <ParametersCacheProvider>
                        <MemoryRouter>
                            <Box height="100vh">
                                <Story />
                            </Box>
                        </MemoryRouter>
                    </ParametersCacheProvider>
                </I18nProvider>
            </LocalAuthenticationProvider>
        ),
    ],
};
export default meta;

type AircraftProps = {
    aircraft: Aircraft;
} & CardListItemProps;

const AircraftListItem = (props: AircraftProps) => {
    const { aircraft, ...cardListItemProps } = props;
    const { name, model, msn, maxVelocity } = aircraft;

    return (
        <CardListItem {...cardListItemProps}>
            <CardListItem.Identifier>
                <Grid spacing="1" gap={1} templateColumns="repeat(3, 1fr)">
                    <GridItem colSpan={3}>
                        <Text size="medium" fontWeight="medium">
                            {name}
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="xs" lineHeight="shorter">
                            Model
                        </Text>
                        <Text fontSize="md">{model}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="xs" lineHeight="shorter">
                            MSN
                        </Text>
                        <Text fontSize="md">{msn}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="xs" lineHeight="shorter">
                            Max. Velocity
                        </Text>
                        <Text fontSize="md">{maxVelocity}</Text>
                    </GridItem>
                </Grid>
            </CardListItem.Identifier>
            <CardListItem.Status>
                <Flex justifyContent="flex-end">
                    <Tag colorScheme="teal">Serviceable</Tag>
                </Flex>
            </CardListItem.Status>
        </CardListItem>
    );
};

const AircraftPreview = (props: AircraftProps) => {
    const { aircraft } = props;
    const { id, msn, name, model, maxVelocity } = aircraft;
    const borderColor = useColorModeValue("gray.100", "monochrome.100");
    return (
        <Box p={4} m={4} borderWidth="thin" borderColor={borderColor} borderRadius="sm">
            <VStack width="fit-content" alignItems="flex-start" fontWeight="400" fontSize="16">
                <Text>Id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Model: {model}</Text>
                <Text>MSN: {msn}</Text>
                <Text>Maximum Velocity: {maxVelocity}</Text>
            </VStack>
        </Box>
    );
};

const AircraftDetails = (props: AircraftProps) => {
    const { aircraft } = props;
    const { id, msn, name, model, maxVelocity } = aircraft;
    return (
        <VStack width="fit-content" padding="6" alignItems="flex-start" fontWeight="400" fontSize="16">
            <Text>Id: {id}</Text>
            <Text>Name: {name}</Text>
            <Text>Model: {model}</Text>
            <Text>MSN: {msn}</Text>
            <Text>Maximum Velocity: {maxVelocity}</Text>
        </VStack>
    );
};

const aircraftTypeCreateSchema = object({
    name: string().required().label("Name"),
    validFrom: datetime().label("Valid From"),
    validTo: datetime().label("Valid To"),
});

type AircraftAddErrorProps =
    | {
          withApiGenericError: true;
      }
    | {
          withApiFormError: true;
      };

const AircraftAdd =
    (errorProps?: AircraftAddErrorProps): RenderAddHandler =>
    (props) => {
        const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
        const FormControl = createFormControl<typeof aircraftTypeCreateSchema>();
        return (
            <FormProvider
                schema={aircraftTypeCreateSchema}
                formType="create"
                onCreate={() => {
                    onSubmit();
                    return new Promise<{}>((resolve) =>
                        setTimeout(() => {
                            if (!errorProps) {
                                resolve({});
                            } else if ("withApiGenericError" in errorProps) {
                                onSubmitError("GENERIC");
                            } else {
                                resolve({
                                    name: "This name already exists",
                                });
                            }
                        }, 500)
                    );
                }}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={(isBackendFormError) =>
                    onSubmitError(isBackendFormError ? "BACKEND_FORM_ERROR" : "GENERIC")
                }
                formRef={formRef}
            >
                <FormControl fieldName="name" />
                <FormControl fieldName="validFrom" />
                <FormControl fieldName="validTo" />
            </FormProvider>
        );
    };

const MultiPreviewBody: RenderMultiPreviewHandler<TestResource> = (props) => {
    const { selectedElements } = props;
    return <Box>{selectedElements.length} elements</Box>;
};

const AircraftEdit: RenderEditHandler<Aircraft> = (props) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError, resource } = props;
    const FormControl = createFormControl<typeof aircraftTypeCreateSchema>();
    return (
        <FormProvider
            schema={aircraftTypeCreateSchema}
            formType="edit"
            initialValues={resource}
            onEdit={() => {
                onSubmit();
                return new Promise<{}>((resolve) => setTimeout(() => resolve({}), 300));
            }}
            onAfterSubmit={onAfterSubmit}
            onSubmitError={(isBackendFormError) => onSubmitError(isBackendFormError ? "BACKEND_FORM_ERROR" : "GENERIC")}
            formRef={formRef}
        >
            <FormControl fieldName="name" />
        </FormProvider>
    );
};

const resourceMachineConfigBuilderTemplate = () =>
    new ResourceMachineConfigBuilder({
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        getResourceName: () => "Aircraft",
    });

export const WithList = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
    </ResourceOverviewComponent>
);

export const WithListError = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: () => new Promise((_, reject) => setTimeout(reject, 500)),
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.id}`,
            })
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
    </ResourceOverviewComponent>
);

export const WithListActionButtons = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.ListActionButtons>
            <ResourceOverviewComponent.ListActionButton onClick={() => alert("Import CSV clicked!")}>
                Import CSV
            </ResourceOverviewComponent.ListActionButton>
            <ResourceOverviewComponent.ListActionButton onClick={() => alert("Settings clicked!")}>
                Settings
            </ResourceOverviewComponent.ListActionButton>
        </ResourceOverviewComponent.ListActionButtons>
    </ResourceOverviewComponent>
);

export const WithPreview = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withPreview({
                fetchPreviewResource: fetchAircraft,
                getPreviewTitle: (aircraft) => `Aircraft "${aircraft.name}"`,
            })
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Preview>
            {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
        </ResourceOverviewComponent.Preview>
    </ResourceOverviewComponent>
);

export const WithDetails = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withPreview({
                fetchPreviewResource: () => Promise.resolve<{ data: { id: string } }>({ data: { id: "123" } }),
                getPreviewTitle: () => "Preview",
            })
            .withDetails({
                fetchDetailsResource: () => Promise.resolve<{ data: { id: string } }>({ data: { id: "123" } }),
                getDetailsTitle: () => "Details",
            })
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Details>
            {(aircraft: Aircraft) => <AircraftDetails aircraft={aircraft} />}
        </ResourceOverviewComponent.Details>
        <ResourceOverviewComponent.Preview>
            {(resource: Aircraft) => `Preview ${resource.id}`}
        </ResourceOverviewComponent.Preview>
    </ResourceOverviewComponent>
);

export const WithAdd = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withAdd()
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Add>{AircraftAdd()}</ResourceOverviewComponent.Add>
    </ResourceOverviewComponent>
);

export const WithAddBackendGenericError = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withAdd()
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Add>{AircraftAdd({ withApiGenericError: true })}</ResourceOverviewComponent.Add>
    </ResourceOverviewComponent>
);

export const WithAddBackendFormError = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withAdd()
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Add>{AircraftAdd({ withApiFormError: true })}</ResourceOverviewComponent.Add>
    </ResourceOverviewComponent>
);

export const WithDelete = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withPreview({
                fetchPreviewResource: fetchAircraft,
                getPreviewTitle: (aircraft) => `Aircraft "${aircraft.name}"`,
            })
            .withDelete<Aircraft>({
                deleteResource: () => Promise.resolve(),
                getDeleteTexts: (aircraft) => ({
                    confirmationModal: {
                        headerText: `Delete Aircraft ${aircraft.name}`,
                        bodyText: `Do you really want to permanently delete aircraft ${aircraft.name}?`,
                    },
                }),
            })
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Preview>
            {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
        </ResourceOverviewComponent.Preview>
    </ResourceOverviewComponent>
);

const crewMembers = [
    { firstName: "Amelia", lastName: "Earhart", id: "1" },
    { firstName: "Paul", lastName: "Stone", id: "2" },
];

const getAllFilters = (): FilterProps<BaseResource>[] => [
    {
        type: "number",
        propertyName: "flightHeight",
        displayName: "Max. Flight height",
    },
    {
        type: "numberRange",
        propertyName: "flightDuration",
        fromLabel: "min",
        toLabel: "max",
        displayName: "Flight Duration",
    },
    {
        type: "range",
        propertyName: "dateModified",
        fromLabel: "min",
        toLabel: "max",
        displayName: "Date Modified",
    },
    {
        type: "select",
        displayName: "Aircraft Zone",
        propertyName: "aircraftZone",
        options: [
            { value: "A", label: "A" },
            { value: "B", label: "B" },
        ],
    },
    {
        type: "boolean",
        displayName: "Serviceability",
        propertyName: "serviceability",
        trueLabel: "serviceable",
        falseLabel: "unserviceable",
        neutralLabel: "any",
    },
    {
        type: "text",
        displayName: "Description",
        propertyName: "description",
    },
    {
        type: "multiSelect",
        propertyName: "pilot",
        propertyNameSerializer: () => `crew.role EQ "PILOT" AND crew.crewMemberId`,
        options: [],
        displayName: "Pilot",
    },
];

const getAllFiltersAsync = (): Promise<FilterProps<BaseResource>[]> =>
    Promise.resolve([
        {
            type: "number",
            propertyName: "flightHeight",
            displayName: "Max. Flight height",
        },
        {
            type: "numberRange",
            propertyName: "flightDuration",
            fromLabel: "min",
            toLabel: "max",
            displayName: "Flight Duration",
        },
        {
            type: "range",
            propertyName: "dateModified",
            fromLabel: "min",
            toLabel: "max",
            displayName: "Date Modified",
        },
        {
            type: "select",
            displayName: "Aircraft Zone",
            propertyName: "aircraftZone",
            options: [
                { value: "A", label: "A" },
                { value: "B", label: "B" },
            ],
        },
        {
            type: "boolean",
            displayName: "Serviceability",
            propertyName: "serviceability",
            trueLabel: "serviceable",
            falseLabel: "unserviceable",
            neutralLabel: "any",
        },
        {
            type: "text",
            displayName: "Description",
            propertyName: "description",
        },
        {
            type: "multiSelect",
            propertyName: "pilot",
            propertyNameSerializer: () => `crew.role EQ "PILOT" AND crew.crewMemberId`,
            options: crewMembers.map((crewMember) => ({
                label: `${crewMember.firstName} ${crewMember.lastName}`,
                value: crewMember.id,
            })),
            displayName: "Pilot",
        },
    ]);

export const WithFilter = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={resourceMachineConfigBuilderTemplate()
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withFilter({ getAllFilters, getAllFiltersAsync })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
        </ResourceOverviewComponent>
    );
};

const getAllFiltersForFilterBar = (): Property[] => [
    {
        type: "number",
        propertyName: "flightHeight",
        label: "Max. Flight height",
        group: "Flight Specs",
    },
    {
        type: "number-range",
        propertyName: "flightDuration",
        minLabel: "min",
        maxLabel: "max",
        label: "Flight Duration",
        group: "Flight Specs",
    },
    {
        type: "date-range",
        propertyName: "dateModified",
        minLabel: "min",
        maxLabel: "max",
        label: "Date Modified",
        group: "Meta data",
    },
    {
        type: "select",
        label: "Aircraft Zone",
        propertyName: "aircraftZone",
        options: [
            { value: "A", label: "A" },
            { value: "B", label: "B" },
        ],
        group: "Aircraft",
    },
    {
        type: "boolean",
        label: "Serviceability",
        propertyName: "serviceability",
        options: [
            { label: "serviceable", value: true },
            { label: "unserviceable", value: false },
        ],
        group: "Status",
    },
    {
        type: "text",
        label: "Description",
        propertyName: "description",
        group: "Meta data",
    },
    {
        type: "select-multiple",
        propertyName: "pilot",
        propertyNameSerializer: () => `crew.role EQ "PILOT" AND crew.crewMemberId`,
        options: crewMembers.map((crewMember) => ({
            label: `${crewMember.firstName} ${crewMember.lastName}`,
            value: crewMember.id,
        })),
        label: "Pilot",
        group: "Flight Specs",
    },
];

export const WithFilterBar = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={resourceMachineConfigBuilderTemplate()
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withFilterBar({ getAllFilters: getAllFiltersForFilterBar })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
        </ResourceOverviewComponent>
    );
};
WithFilterBar.parameters = {
    featureFlags: { "resource-overview-new-filter": { enabled: true } },
};

export const WithSort = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={resourceMachineConfigBuilderTemplate()
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withSort({
                    sortingOptions: [
                        {
                            id: "size",
                            label: "Size",
                        },
                        {
                            id: "speed",
                            label: "Speed",
                        },
                    ],
                })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
        </ResourceOverviewComponent>
    );
};

export const WithEdit = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={resourceMachineConfigBuilderTemplate()
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withPreview({
                    fetchPreviewResource: fetchAircraft,
                    getPreviewTitle: (aircraft) => `Aircraft "${aircraft.name}"`,
                })
                .withEdit({
                    getEditTitle: (aircraft: Aircraft) => aircraft.name,
                })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.Preview>
                {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
            </ResourceOverviewComponent.Preview>
            <ResourceOverviewComponent.Edit>{AircraftEdit}</ResourceOverviewComponent.Edit>
        </ResourceOverviewComponent>
    );
};

export const WithBulkEdit = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withFilterBar({ getAllFilters: getAllFiltersForFilterBar })
                .withBulkEdit({
                    getBulkEditTitle: () => "Aircraft",
                    bulkEditResource: bulkEditAircraft,
                    schema: formSchema,
                })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.BulkEdit>{BulkEditForm}</ResourceOverviewComponent.BulkEdit>
        </ResourceOverviewComponent>
    );
};

export const WithEditFromDetail = () => (
    <ResourceOverviewComponent
        machineConfig={resourceMachineConfigBuilderTemplate()
            .withList({
                fetchAllResources: fetchAllAircraft,
                pageSize: 2,
                getListTitle: () => "Aircraft",
                getModuleTitle: () => "Storybook",
                getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
            })
            .withPreview({
                fetchPreviewResource: () => Promise.resolve<{ data: { id: string } }>({ data: { id: "123" } }),
                getPreviewTitle: () => "Preview",
            })
            .withDetails({
                fetchDetailsResource: () => Promise.resolve<{ data: { id: string } }>({ data: { id: "123" } }),
                getDetailsTitle: () => "Details",
                checkIfResourceIsEditable: () => ({
                    isResourceEditable: true,
                }),
            })
            .withEdit()
            .build()}
    >
        <ResourceOverviewComponent.ListItem>
            {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
            )}
        </ResourceOverviewComponent.ListItem>
        <ResourceOverviewComponent.Details>
            {(aircraft: Aircraft) => <AircraftDetails aircraft={aircraft} />}
        </ResourceOverviewComponent.Details>
        <ResourceOverviewComponent.Preview>
            {(resource: Aircraft) => `Preview ${resource.id}`}
        </ResourceOverviewComponent.Preview>
        <ResourceOverviewComponent.Edit>{AircraftEdit}</ResourceOverviewComponent.Edit>
    </ResourceOverviewComponent>
);

export const WithEditWithoutUpdatePermission = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withPreview({
                    fetchPreviewResource: fetchAircraft,
                    getPreviewTitle: (aircraft) => `Aircraft "${aircraft.name}"`,
                })
                .withEdit()
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.Preview>
                {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
            </ResourceOverviewComponent.Preview>
            <ResourceOverviewComponent.Edit>{AircraftEdit}</ResourceOverviewComponent.Edit>
        </ResourceOverviewComponent>
    );
};

export const WithMultiPreview = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withPreview({
                    fetchPreviewResource: fetchAircraft,
                    getPreviewTitle: (aircraft) => `Aircraft "${aircraft.name}"`,
                })
                .withMultiPreview({
                    canOpenMultiPreview: true,
                    fetchAllResources: fetchAllAircraft,
                    getMultiPreviewTitle: () => "Multi Preview",
                })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.Preview>
                {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
            </ResourceOverviewComponent.Preview>
            <ResourceOverviewComponent.Edit>{AircraftEdit}</ResourceOverviewComponent.Edit>
            <ResourceOverviewComponent.MultiPreview>{MultiPreviewBody}</ResourceOverviewComponent.MultiPreview>
        </ResourceOverviewComponent>
    );
};

export const WithQuickFilter = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withQuickFilter({
                    getAllQuickFilters: () => [
                        {
                            displayName: "VoloDrone",
                            propertyName: "model",
                            value: "VoloDrone",
                        },
                        {
                            displayName: "VoloConnect",
                            propertyName: "model",
                            value: "VoloConnect",
                        },

                        {
                            displayName: "VoloCity",
                            propertyName: "model",
                            value: "VoloCity",
                        },
                    ],
                })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.Preview>
                {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
            </ResourceOverviewComponent.Preview>
            <ResourceOverviewComponent.Edit>{AircraftEdit}</ResourceOverviewComponent.Edit>
            <ResourceOverviewComponent.MultiPreview>{MultiPreviewBody}</ResourceOverviewComponent.MultiPreview>
        </ResourceOverviewComponent>
    );
};

export const WithSidePanel = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withSidePanel()
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.SidePanel>
                {(options: RenderSidePanelHandlerOptions) => {
                    const { reloadList } = options;
                    return (
                        <Card ariaLabel="sidePanelCard" onClick={reloadList}>
                            <VStack alignItems="flex-start">
                                <HStack alignItems="flex-start" alignSelf="stretch" justifyContent="space-between">
                                    <Text>Aircraft</Text>
                                    <Tag colorScheme="teal">Serviceable</Tag>
                                </HStack>
                                <Divider />
                                <Text whiteSpace="nowrap">it is a journalist aircraft information</Text>
                                <HStack alignItems="flex-end" alignSelf="stretch" justifyContent="flex-end">
                                    <IconButton
                                        aria-label="cancel"
                                        variant="ghost"
                                        size="md"
                                        icon={<Icon icon="cancel" />}
                                    />
                                    <IconButton
                                        aria-label="check"
                                        variant="ghost"
                                        size="md"
                                        icon={<Icon icon="check" />}
                                    />
                                </HStack>
                            </VStack>
                        </Card>
                    );
                }}
            </ResourceOverviewComponent.SidePanel>
        </ResourceOverviewComponent>
    );
};

export const WithTableRow = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                    useTable: true,
                    getTableColumns: () => ["Name", "Model", "Max Velocity", "MSN"],
                })
                .build()}
        >
            <ResourceOverviewComponent.TableRow>
                {(aircraft: Aircraft) => (
                    <Tr>
                        <Td>{aircraft.name}</Td>
                        <Td>{aircraft.model}</Td>
                        <Td>{aircraft.maxVelocity}</Td>
                        <Td>{aircraft.msn}</Td>
                    </Tr>
                )}
            </ResourceOverviewComponent.TableRow>
        </ResourceOverviewComponent>
    );
};

export const WithSplitPreview = () => {
    return (
        <ResourceOverviewComponent
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: fetchAllAircraft,
                    pageSize: 2,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Storybook",
                    getListItemName: (aircraft) => `Aircraft ${aircraft.name}`,
                })
                .withSplitPreview({ fetchResource: fetchAircraft })
                .build()}
        >
            <ResourceOverviewComponent.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverviewComponent.ListItem>
            <ResourceOverviewComponent.SplitPreview>
                {(aircraft: Aircraft, options: RenderSplitPreviewOptions) => {
                    if (!aircraft) return null;
                    const { id, maxVelocity, model, msn } = aircraft;
                    const { reloadList } = options;
                    return (
                        <Card ariaLabel="splitPreviewCard" onClick={reloadList}>
                            <VStack alignItems="flex-start">
                                <Text>Id: {id}</Text>
                                <Divider />
                                <Text>MaxVelocity: {`${maxVelocity}`}</Text>
                                <Divider />
                                <Text>Model: {`${model}`}</Text>
                                <Divider />
                                <Text>MSN: {`${msn}`}</Text>
                                <Divider />
                            </VStack>
                        </Card>
                    );
                }}
            </ResourceOverviewComponent.SplitPreview>
        </ResourceOverviewComponent>
    );
};
