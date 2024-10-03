import React from "react";
import { FormGroup, createFormControl } from "@voloiq/form";
import { useLogAddTranslation } from "../translations/useLogAddTranslation";
import type { FilePrefillMetadata } from "../useCreateLogPage";
import { useMetadataFormFields } from "./useMetadataFormFields";

export type MetadataFormFieldsProps = {
    prefillMetadata?: FilePrefillMetadata;
    canEditDate: boolean;
};

export const MetadataFormFields = (props: MetadataFormFieldsProps) => {
    const { prefillMetadata, canEditDate } = props;
    const { t } = useLogAddTranslation();
    const { schema } = useMetadataFormFields(prefillMetadata);

    type CreateLogSchema = typeof schema;
    const FormControl = createFormControl<CreateLogSchema>();

    return (
        <>
            <FormControl fieldName="date" isNotEditable={!canEditDate} />
            <FormControl fieldName="aircraftId" />
            <FormControl fieldName="locationId" />
            <FormGroup groupLabel={t("enterMetadataStep.crewGroup")}>
                <FormControl fieldName="crewPilot" />
                <FormControl fieldName="crewSupervisor" />
            </FormGroup>
            <FormControl fieldName="remarks" />
        </>
    );
};
