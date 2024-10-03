import { HStack } from "@volocopter/design-library-react";
import { useExportModalTranslation } from "../translations/useExportModalTranslation";
import { useFormControls } from "./useFormControls";
import { useSampleRate } from "./useSampleRate";
import { ExportFormFieldsProps } from "./utils";

export const ExportFormFields = (props: ExportFormFieldsProps) => {
    const { schema } = props;
    const { FormControl, setValue, sampleRate, exportFileType } = useFormControls(schema);
    const { isSampleRateDisabled } = useSampleRate(sampleRate, setValue, exportFileType);

    const { t } = useExportModalTranslation();

    return (
        <>
            <HStack>
                <FormControl fieldName="startDate" />
                <FormControl fieldName="endDate" />
            </HStack>
            <HStack>
                <FormControl fieldName="exportFileType" />
            </HStack>
            <HStack>
                <FormControl
                    fieldName="sampleRate"
                    isNotEditable={isSampleRateDisabled}
                    helperText={isSampleRateDisabled ? t("form.sampleRateNative") : "\u00A0"}
                />
                <FormControl fieldName="description" helperText="&nbsp;" />
            </HStack>
        </>
    );
};
