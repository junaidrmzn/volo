import { PadService } from "@voloiq-typescript-api/vertiport-management-types";
import { add } from "date-fns";
import { useMemo } from "react";
import { coordinate, datetime, multiselect, number, object, string } from "@voloiq/form";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { getDistanceFromLatLonInKm } from "../../../../utils";

type UsePadFormSchemaProps = {
    vertiport: Vertiport;
};

export const usePadFormSchema = (props: UsePadFormSchemaProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();
    const calculateDistance = (latitude: number, longitude: number) => {
        return getDistanceFromLatLonInKm(
            vertiport.location.latitude,
            vertiport.location.longitude,
            latitude,
            longitude
        );
    };

    const padsFormSchema = useMemo(
        () =>
            object({
                padKey: string()
                    .required()
                    .max(20, t("error.errorMessages.maxCharacterError", { maxCharacter: 20 }))
                    .matches(/^[\d A-Z]*$/, t("error.errorMessages.alphanumericWithUpperCaseLettersError"))
                    .label(t("fatoStand.model.fatoStandKey")),
                externalId: string()
                    .max(200, t("error.errorMessages.maxCharacterError", { maxCharacter: 200 }))
                    .matches(/^[\w -./{}]*$/, t("error.errorMessages.alphanumericOnlyError"))
                    .label(t("fatoStand.model.externalId")),
                services: multiselect({
                    placeholder: t("generic.dropdown placeholder"),
                    options: [
                        { label: t("fatoStand.services.fato"), value: PadService.FATO },
                        { label: t("fatoStand.services.stand"), value: PadService.STAND },
                        { label: t("fatoStand.services.overnightParking"), value: PadService["OVERNIGHT-PARKING"] },
                    ],
                    errorMessage: t("generic.dropdown error"),
                }).label(t("fatoStand.model.services")),
                coordinates: coordinate({
                    closeOnBlur: false,
                    coordinateInfoLabels: {
                        latitudeLabel: t("fatoStand.model.latitude"),
                        longitudeLabel: t("fatoStand.model.longitude"),
                        cancelButtonLabel: t("buttons.cancel"),
                        applyButtonLabel: t("buttons.apply"),
                        iconButtonLabel: t("fatoStand.model.coordinates"),
                    },
                })
                    .required(t("generic.required error"))
                    .matches(
                        /^-?\d+(\.\d+)?, -?\d+(\.\d+)?$|([\d.]+)°\s*([\d.]+)'\s*([\d.]+)"\s*([ENSW])\s*([\d.]+)°\s*([\d.]+)'\s*([\d.]+)"\s*([ENSW])|([\d.]+)\s*([\d.]+)\s*,\s*([\d.]+)\s*([\d.]+)/,
                        t("error.errorMessages.commaSeparatedValues")
                    )
                    .test(
                        "check-vertiport-distance",
                        t("generic.distance error", {
                            label1: "Vertiport",
                            label2: t("fatoStand.label"),
                            distance: "5Km",
                        }),
                        (coordinates?: string) => {
                            const coordinateArray = coordinates?.split(",").map((value) => value.trim());
                            if (
                                coordinateArray &&
                                coordinateArray.length === 2 &&
                                coordinateArray[0] &&
                                coordinateArray[1] &&
                                calculateDistance(Number(coordinateArray[0]), Number(coordinateArray[1])) <= 5
                            ) {
                                return true;
                            }
                            return false;
                        }
                    )
                    .label(t("fatoStand.model.coordinates")),
                height: number().required(t("generic.required error")).label(t("fatoStand.model.height")),
                validFrom: datetime()
                    .min(
                        add(new Date(vertiport.validFrom), { days: -1 }),
                        t("generic.minDate error", {
                            label: t("fatoStand.model.validFrom"),
                            minDateLabel: `${"Vertiport "}${t("vertiport.model.validFrom")}`,
                        })
                    )
                    .required(t("generic.required error"))
                    .label(t("fatoStand.model.validFrom")),
                validTo: vertiport.validTo
                    ? datetime()
                          .max(
                              vertiport.validTo,
                              t("generic.maxDate error", {
                                  label: t("fatoStand.model.validTo"),
                                  maxDateLabel: `${"Vertiport "}${t("vertiport.model.validTo")}`,
                              })
                          )
                          .label(t("fatoStand.model.validTo"))
                    : datetime().label(t("fatoStand.model.validTo")),
            }),
        [calculateDistance, t, vertiport.validFrom, vertiport.validTo]
    );
    return { padsFormSchema };
};

export type PadFormSchema = ReturnType<typeof usePadFormSchema>["padsFormSchema"];
