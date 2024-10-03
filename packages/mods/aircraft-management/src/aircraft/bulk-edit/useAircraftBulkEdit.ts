import { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { datetime, multiselect, object, select } from "@voloiq/form";
import { useGetAllVertiportOptions } from "../../api-hooks/useAircraftService";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";

export const useAircraftBulkEdit = () => {
    const { t: aircraftTranslation } = useAircraftTranslation();
    const { t: resourceTranslation } = useResourcesTranslation();
    const { vertiportOptions } = useGetAllVertiportOptions();

    const aircraftBulkEditSchema = object({
        property: select({
            options: [
                { value: "validFrom", label: aircraftTranslation("model.validFrom") },
                { value: "validTo", label: aircraftTranslation("model.validTo") },
                { value: "services", label: aircraftTranslation("model.services") },
                { value: "technicalStatus", label: aircraftTranslation("model.technicalStatus") },
                { value: "homebaseVertiport", label: aircraftTranslation("model.homebase") },
                { value: "crewConfiguration", label: aircraftTranslation("model.crewConfiguration") },
            ],
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            errorMessage: resourceTranslation("generic.dropdown error"),
        }).label(aircraftTranslation("model.property")),

        validFrom: datetime().label(aircraftTranslation("model.changeTo")),

        validTo: datetime().label(aircraftTranslation("model.changeTo")),

        services: multiselect({
            options: [
                { value: Service.PASSENGER, label: aircraftTranslation("model.service Passenger") },
                { value: Service.CARGO, label: aircraftTranslation("model.service Cargo") },
                { value: Service.TEST, label: aircraftTranslation("model.service Test") },
                { value: Service.TRAINING, label: aircraftTranslation("model.service Training") },
                { value: Service.FERRY_FLIGHT, label: aircraftTranslation("model.service FerryFlight") },
                { value: Service.CARPOOL, label: aircraftTranslation("model.service Carpool") },
            ],
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            errorMessage: resourceTranslation("generic.dropdown error"),
        }).label(aircraftTranslation("model.changeTo")),

        technicalStatus: select<TechnicalStatus>({
            options: [
                {
                    value: TechnicalStatus.SERVICEABLE,
                    label: aircraftTranslation("model.technicalStatus serviceable"),
                },
                {
                    value: TechnicalStatus.SERVICEABLE_WITH_LIMITATIONS,
                    label: aircraftTranslation("model.technicalStatus serviceableWithLimitations"),
                },
                {
                    value: TechnicalStatus.UNSERVICEABLE,
                    label: aircraftTranslation("model.technicalStatus unserviceable"),
                },
            ],
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            errorMessage: resourceTranslation("generic.dropdown error"),
        }).label(aircraftTranslation("model.changeTo")),

        homebaseVertiport: select({
            options: vertiportOptions,
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            errorMessage: resourceTranslation("generic.dropdown error"),
        }).label(aircraftTranslation("model.changeTo")),

        crewConfiguration: select<CrewConfiguration>({
            options: [
                { value: CrewConfiguration.CREWED, label: aircraftTranslation("model.crewConfiguration crewed") },
                { value: CrewConfiguration.UNCREWED, label: aircraftTranslation("model.crewConfiguration uncrewed") },
            ],
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            errorMessage: resourceTranslation("generic.dropdown error"),
        }).label(aircraftTranslation("model.changeTo")),
    });

    return { aircraftBulkEditSchema };
};
