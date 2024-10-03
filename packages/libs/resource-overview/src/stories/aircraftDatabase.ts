import { datetime, multiselect, object, select } from "@voloiq/form";
import type { BulkEditResourcesHandler, FetchAllResourcesHandler, FetchResourceHandler } from "..";

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

const paginate = <Resource>(items: Resource[], pageSize: number, pageNumber: number) => {
    return items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const fetchAllAircraft: FetchAllResourcesHandler<Aircraft> = (options) => {
    const { page, size } = options;
    const aircraft = Object.values(aircraftDatabase);
    const totalPages = Math.ceil(aircraft.length / size);

    return new Promise((resolve) => {
        setTimeout(
            () =>
                resolve({
                    data: paginate(aircraft, size, page),
                    pagination: { size, page, totalPages, totalElements: aircraft.length },
                }),
            1000
        );
    });
};

export const bulkEditAircraft: BulkEditResourcesHandler<Aircraft> = () => {
    const aircraft = Object.values(aircraftDatabase);
    return new Promise((resolve) => {
        setTimeout(() => resolve(aircraft), 1000);
    });
};

const isKeyOf = (object: {}, key: string): key is keyof typeof object => Object.keys(object).includes(key);
export const fetchAircraft: FetchResourceHandler<Aircraft> = (aircraftId: string) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (aircraftId && isKeyOf(aircraftDatabase, aircraftId)) {
                resolve({ data: aircraftDatabase[aircraftId] });
            } else {
                reject();
            }
        }, 1000);
    });

type CrewConfiguration = "UNKNOWN" | "CREWED" | "UNCREWED";
type TechnicalStatus = "UNKNOWN" | "SERVICEABLE" | "UNSERVICEABLE" | "SERVICEABLE_WITH_LIMITATIONS";

export const formSchema = object({
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
