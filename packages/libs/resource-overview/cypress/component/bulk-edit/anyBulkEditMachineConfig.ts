import { BooleanProperty, SortingConfig, TextProperty } from "@volocopter/filter-react";
import { datetime, multiselect, object, select } from "@voloiq/form";
import type { Pagination } from "@voloiq/service";
import type { BulkEditMachineOptions, BulkEditResourcesHandler } from "../../../src/bulk-edit";
import { CreateListMachineOptions } from "../../../src/list/state-machine/listMachineBuilder";
import { CreatePreviewMachineOptions } from "../../../src/preview/state-machine/previewMachineBuilder";
import type { AuthorizationOptions } from "../../../src/state-machine/resourceMachineConfigBuilder";
import { ResourceMachineConfigBuilder } from "../../../src/state-machine/resourceMachineConfigBuilder";

export const aircraftDatabase = {
    "1": {
        id: "1",
        model: "VoloCity",
        name: "B0",
        msn: "003",
        maxVelocity: 60,
    },
    "2": {
        id: "2",
        model: "VoloCity",
        name: "2X",
        msn: "002",
        maxVelocity: 50,
    },
    "3": {
        id: "3",
        model: "VoloCity",
        name: "White Lady",
        msn: "001",
        maxVelocity: 30,
    },
    "4": {
        id: "4",
        model: "VoloConnect",
        name: "VC-1",
        msn: "004",
        maxVelocity: 130,
    },
    "5": {
        id: "5",
        model: "VoloDrone",
        name: "VD-1",
        msn: "005",
        maxVelocity: 30,
    },
};

export type Aircraft = typeof aircraftDatabase[keyof typeof aircraftDatabase];
export const anyPagination = (overwrite?: Partial<Pagination>) => ({
    size: 1,
    page: 1,
    totalElements: 1,
    totalPages: 1,
    ...overwrite,
});
export const fetchAllResources = () =>
    Promise.resolve({
        data: [{ id: "1" }],
        pagination: anyPagination(),
    });
export const bulkEditAircraft: BulkEditResourcesHandler<Aircraft> = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), 1000);
    });
};

export const getAnyListTitle = () => "Any Title";
export const getAnyModuleTitle = () => "Any Module";
export const getAnyListItemName = () => "Any Item name";
export const fetchAnyPreviewResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const getAnyPreviewTitle = () => "Any Preview Title";

export const booleanProperty: BooleanProperty = {
    type: "boolean",
    propertyName: "serviceability",
    group: "group",
    label: "Serviceability",
    options: [
        { value: true, label: "serviceable" },
        { value: false, label: "unserviceable" },
    ],
};

export const textProperty: TextProperty = {
    type: "text",
    propertyName: "description",
    group: "group",
    label: "Description",
};

export const anyFilters = [booleanProperty, textProperty];

export const anySortingConfig: SortingConfig = {
    options: [
        { value: "name", label: "Name" },
        { value: "createdBy", label: "Created By" },
    ],
};

export type TestResource = {
    id: string;
};

type CrewConfiguration = "UNKNOWN" | "CREWED" | "UNCREWED";
type TechnicalStatus = "UNKNOWN" | "SERVICEABLE" | "UNSERVICEABLE" | "SERVICEABLE_WITH_LIMITATIONS";

export const bulkEditFormSchema = object({
    property: select({
        options: [
            { value: "validFrom", label: "Valid From" },
            { value: "validTo", label: "Valid To" },
            { value: "services", label: "Services" },
            { value: "technicalStatus", label: "Technical Status" },
            { value: "homebase", label: "Homebase" },
            { value: "crewConfiguration", label: "Crew Configuration" },
        ],
        placeholder: "Select property",
        errorMessage: "Error property",
    }).label("Property"),

    validFrom: datetime().label("Change to"),

    validTo: datetime()
        .when("validFrom", (validFrom, yup) => validFrom && yup.min(validFrom, "validTo error"))
        .label("Change to"),

    services: multiselect({
        placeholder: "select services",
        errorMessage: "dropdown error",
        options: [
            { value: "PASSENGER", label: "Passenger" },
            { value: "CARGO", label: "Cargo" },
            { value: "TEST", label: "Test" },
            { value: "TRAINING", label: "Training" },
            { value: "FERRY_FLIGHT", label: "FerryFlight" },
            { value: "CARPOOL", label: "Carpool" },
        ],
    }).label("Change to"),

    technicalStatus: select<TechnicalStatus>({
        placeholder: "select Technical Status",
        options: [
            {
                value: "SERVICEABLE",
                label: "SERVICEABLE",
            },
            {
                value: "SERVICEABLE_WITH_LIMITATIONS",
                label: "SERVICEABLE WITH LIMITATIONS",
            },
            {
                value: "UNSERVICEABLE",
                label: "UNSERVICEABLE",
            },
        ],
        errorMessage: "dropdown error",
    }).label("Change to"),
    homebase: select({
        placeholder: "select homebase",
        options: [
            { value: "ALI-A50", label: "ALI-A50" },
            { value: "ALI-A51", label: "ALI-A51" },
        ],
        errorMessage: "dropdown error",
    }).label("Change to"),
    crewConfiguration: select<CrewConfiguration>({
        placeholder: "generic.dropdown placeholder",
        options: [
            { value: "CREWED", label: "CREWED" },
            { value: "UNCREWED", label: "model" },
        ],
        errorMessage: "dropdown error",
    }).label("Change to"),
});

export const anyBulkEditMachineConfig = (
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    previewMachineOverwrites?: Partial<CreatePreviewMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>,
    bulkEditMachineOverwrites?: Partial<BulkEditMachineOptions<TestResource>>
) =>
    new ResourceMachineConfigBuilder({
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        getResourceName: () => "Resource",
        ...authorizationOverwrites,
    })
        .withList({
            fetchAllResources,
            getListTitle: getAnyListTitle,
            getModuleTitle: getAnyModuleTitle,
            getListItemName: getAnyListItemName,
            ...listMachineOverwrites,
        })
        .withFilterBar({ getAllFilters: () => anyFilters, getSortingConfig: () => anySortingConfig })
        .withPreview({
            fetchPreviewResource: fetchAnyPreviewResource,
            getPreviewTitle: getAnyPreviewTitle,
            ...previewMachineOverwrites,
        })
        .withBulkEdit({
            getBulkEditTitle: getAnyModuleTitle,
            bulkEditResource: bulkEditAircraft,
            schema: bulkEditFormSchema,
            ...bulkEditMachineOverwrites,
        })
        .build();
