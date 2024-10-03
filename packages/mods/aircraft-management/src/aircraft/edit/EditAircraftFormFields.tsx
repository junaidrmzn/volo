import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { useForm } from "@voloiq/form";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useAircraftEditForm } from "./useAircraftEditForm";

export type EditAircraftFormFieldsProps = {
    resource: Aircraft;
};

type FromChangeType = {
    originalStartDate?: Date;
    originalEndDate?: Date;
    changeEvent: Date;
    updateLabel: string;
};

const EditAircraftFormFields = (props: EditAircraftFormFieldsProps) => {
    const { resource } = props;
    const { FormControl, aircraftInitialValues } = useAircraftEditForm({ resource });
    const { t: resourceTranslation } = useResourcesTranslation();

    const { setValue } = useForm();

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
            <FormControl
                fieldName="msn"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.msn")}
            />
            <FormControl
                fieldName="aircraftType"
                isNotEditable
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.aircraftType")}
            />
            <FormControl
                fieldName="registration"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.aircraftRegistration")}
            />
            <FormControl
                fieldName="services"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.services")}
            />
            <FormControl
                fieldName="validFrom"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.validFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: aircraftInitialValues.validFrom,
                            originalEndDate: aircraftInitialValues.validTo,
                            changeEvent: event,
                            updateLabel: "validTo",
                        });
                    }
                }}
            />
            <FormControl
                fieldName="validTo"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.validTo")}
            />
            <FormControl
                fieldName="technicalStatus"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.technicalStatus")}
            />
            <FormControl
                fieldName="homebaseVertiport"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.homebase")}
            />
            <FormControl
                fieldName="crewConfiguration"
                additionalInfo={resourceTranslation("aircraft-management.additionalInfo.crewConfiguration")}
            />
        </>
    );
};

export { EditAircraftFormFields };
