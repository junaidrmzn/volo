import type { ReactElement } from "react";
import { FormControlProps, useForm } from "@voloiq/form";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useGetRegions } from "../../api-hooks/useRegionService";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { RegionInput } from "../create/RegionInput";
import { EditVertiportSchema, useEditVertiportFormFields } from "./useEditVertiportFormFields";

export type EditVertiportFormFieldsProps = {
    vertiport: Vertiport;
    FormControl: (props: FormControlProps<EditVertiportSchema>) => ReactElement | null;
    selectedRegion?: { label: string | undefined; value: string | undefined };
};

type FromChangeType = {
    originalStartDate: Date | undefined;
    originalEndDate: Date | undefined;
    changeEvent: Date;
    updateLabel: string;
};

export const EditVertiportFormFields = (props: EditVertiportFormFieldsProps) => {
    const { vertiport, FormControl, selectedRegion } = props;
    const { data: regions } = useGetRegions(1);
    const { vertiportInitialValues } = useEditVertiportFormFields(vertiport);
    const { setValue, getFieldState, clearErrors, setError, getValues } = useForm();
    const { t } = useVertiportTranslation();

    const fromChangeHandler = (props: FromChangeType) => {
        const { originalStartDate, originalEndDate, changeEvent, updateLabel } = props;
        if (originalStartDate && originalEndDate) {
            const returned = adjustEndDateOnDateChange({
                originalStartDate,
                originalEndDate,
                adjustedStartDate: changeEvent,
            });
            if (returned) {
                setValue(updateLabel, returned);
            }
        }
    };

    return (
        <>
            <FormControl fieldName="name" additionalInfo={t("vertiport.additionalInfo.name")} />
            <FormControl
                fieldName="validFrom"
                additionalInfo={t("vertiport.additionalInfo.validFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: vertiportInitialValues.validFrom,
                            originalEndDate: vertiportInitialValues.validTo,
                            changeEvent: event,
                            updateLabel: "validTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="validTo" additionalInfo={t("vertiport.additionalInfo.validTo")} />
            <FormControl
                fieldName="publicFrom"
                additionalInfo={t("vertiport.additionalInfo.publicFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: vertiportInitialValues.publicFrom,
                            originalEndDate: vertiportInitialValues.publicTo,
                            changeEvent: event,
                            updateLabel: "publicTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="publicTo" additionalInfo={t("vertiport.additionalInfo.publicTo")} />
            <FormControl fieldName="iataCode" additionalInfo={t("vertiport.additionalInfo.iataCode")} />
            <FormControl fieldName="icaoCode" additionalInfo={t("vertiport.additionalInfo.icaoCode")} />
            <FormControl fieldName="code" additionalInfo={t("vertiport.additionalInfo.code")} />
            <FormControl fieldName="shortName" additionalInfo={t("vertiport.additionalInfo.shortName")} />
            <FormControl fieldName="timeZone" additionalInfo={t("vertiport.additionalInfo.timezone")} />
            <FormControl
                fieldName="passengerCheckinType"
                additionalInfo={t("vertiport.additionalInfo.passengerCheckinType")}
            />
            <RegionInput
                regions={regions}
                setValue={setValue}
                getFieldState={getFieldState}
                clearError={clearErrors}
                setError={setError}
                getValue={getValues}
                selectedRegion={selectedRegion}
            />
            <FormControl fieldName="elevation" additionalInfo={t("vertiport.additionalInfo.elevation")} />
            <FormControl fieldName="services" additionalInfo={t("vertiport.additionalInfo.services")} />
            <FormControl fieldName="preBatterySwap" additionalInfo={t("vertiport.additionalInfo.batterySwapPre")} />
            <FormControl
                fieldName="prePassengerHandling"
                additionalInfo={t("vertiport.additionalInfo.passengerHandlingPre")}
            />
            <FormControl fieldName="prePilotBriefing" additionalInfo={t("vertiport.additionalInfo.pilotBriefingPre")} />
            <FormControl
                fieldName="preVtolHandling"
                additionalInfo={t("vertiport.additionalInfo.aircraftHandlingPre")}
            />
            <FormControl fieldName="postBatterySwap" additionalInfo={t("vertiport.additionalInfo.batterySwapPost")} />
            <FormControl
                fieldName="postPassengerHandling"
                additionalInfo={t("vertiport.additionalInfo.passengerHandlingPost")}
            />
            <FormControl fieldName="postPilotBriefing" additionalInfo={t("vertiport.additionalInfo.pilotDebriefing")} />
            <FormControl
                fieldName="postVtolHandling"
                additionalInfo={t("vertiport.additionalInfo.aircraftHandlingPost")}
            />
            <FormControl
                fieldName="fatoBlockingTimePre"
                additionalInfo={t("vertiport.additionalInfo.fatoBlockingTimeDeparture")}
            />
            <FormControl
                fieldName="fatoBlockingTimePost"
                additionalInfo={t("vertiport.additionalInfo.fatoBlockingTimeArrival")}
            />
            <FormControl fieldName="additionalFiles" />
            <FormControl fieldName="serviceHours" additionalInfo={t("vertiport.additionalInfo.serviceHours")} />
            <FormControl fieldName="country" additionalInfo={t("vertiport.additionalInfo.country")} />
            <FormControl fieldName="countryCode" additionalInfo={t("vertiport.additionalInfo.countryCode")} />
            <FormControl fieldName="state" additionalInfo={t("vertiport.additionalInfo.state")} />
            <FormControl fieldName="city" additionalInfo={t("vertiport.additionalInfo.city")} />
            <FormControl fieldName="zipCode" additionalInfo={t("vertiport.additionalInfo.zipcode")} />
            <FormControl fieldName="addressLine1" additionalInfo={t("vertiport.additionalInfo.addressLine1")} />
            <FormControl fieldName="addressLine2" additionalInfo={t("vertiport.additionalInfo.addressLine2")} />
            <FormControl fieldName="names" />
            <FormControl fieldName="images" />
            <FormControl fieldName="popularity" additionalInfo={t("vertiport.additionalInfo.popularity")} />
        </>
    );
};
