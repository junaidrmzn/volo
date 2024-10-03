import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import type { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import type { FilterProperty } from "@voloiq/resource-overview";
import { useAircraftFilterTranslation } from "./translations/useAircraftFilterTranslation";

type UseGetAllFilterPropertiesProps = {
    aircraftTypes: AircraftType[];
    vertiports: Vertiport[];
};

export const useGetAllFilterProperties = () => {
    const { t } = useAircraftFilterTranslation();
    const getAllFilterProperties = (props: UseGetAllFilterPropertiesProps): FilterProperty[] => {
        const { aircraftTypes, vertiports } = props;
        return [
            {
                type: "text",
                propertyName: "registration",
                label: t("filterPanel.registration"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "aircraftTypeId",
                options: aircraftTypes?.map((aircraftType) => ({
                    label: aircraftType.name,
                    value: aircraftType.id,
                })),
                label: t("filterPanel.aircraftType"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "msn",
                label: t("filterPanel.msn"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "services",
                options: [
                    { label: t("filterPanel.service.Passenger"), value: Service.PASSENGER },
                    {
                        label: t("filterPanel.service.Cargo"),
                        value: Service.CARGO,
                    },
                    {
                        label: t("filterPanel.service.Test"),
                        value: Service.TEST,
                    },
                ],
                label: t("filterPanel.service.caption"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "technicalStatus",
                options: [
                    {
                        label: t("filterPanel.technicalStatus.serviceable"),
                        value: TechnicalStatus.SERVICEABLE,
                    },
                    {
                        label: t("filterPanel.technicalStatus.serviceableWithLimitations"),
                        value: TechnicalStatus.SERVICEABLE_WITH_LIMITATIONS,
                    },
                    {
                        label: t("filterPanel.technicalStatus.unserviceable"),
                        value: TechnicalStatus.UNSERVICEABLE,
                    },
                ],
                label: t("filterPanel.technicalStatus.caption"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "homebaseVertiportId",
                options: vertiports?.map((vertiport) => ({
                    label: vertiport.name,
                    value: vertiport.id,
                })),
                label: t("filterPanel.homebase"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "crewConfiguration",
                options: [
                    { label: t("filterPanel.crewConfiguration.crewed"), value: CrewConfiguration.CREWED },
                    {
                        label: t("filterPanel.crewConfiguration.uncrewed"),
                        value: CrewConfiguration.UNCREWED,
                    },
                ],
                label: t("filterPanel.crewConfiguration.caption"),
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "validFrom",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.validFrom"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "validTo",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.validTo"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "leonId",
                label: t("filterPanel.leonId"),
                group: t("filterPanel.filters"),
                isNullable: true,
                nullLabel: t("filterPanel.nullLabel"),
            },
        ];
    };

    return { getAllFilterProperties };
};
