import { Box, HStack, Icon, Radio, RadioGroup } from "@volocopter/design-library-react";
import type { SelectOption } from "@voloiq/form";
import { FormProvider, createFormControl } from "@voloiq/form";
import { BaseResource } from "../state-machine/BaseResource";
import { BulkEditConfirmModal } from "./BulkEditConfirmModal";
import { BulkEditData, RenderBulkEditHandlerProps } from "./BulkEditModal";
import { useResourceBulkEditTranslations } from "./translations/useResourceBulkEditTranslations";
import { EditType, ExtractKeyValue, useBulkEditForm } from "./useBulkEditForm";

export const BulkEditForm = <Resource extends BaseResource>(props: RenderBulkEditHandlerProps<Resource>) => {
    const {
        formRef,
        onSubmit,
        onAfterSubmit,
        onSubmitError,
        schema,
        totalItems,
        filterSet,
        bulkEditResource,
        isOpenConfirmModal,
        onCloseConfirmModal,
        isLoading,
        onOpenConfirmModal,
    } = props;

    const {
        selectedProperty,
        setSelectedProperty,
        setSelectedChangeTo,
        formData,
        setFormData,
        type,
        setType,
        formatEditableProperty,
        extractValue,
    } = useBulkEditForm();

    const { t } = useResourceBulkEditTranslations();

    const FormControl = createFormControl<typeof schema>();

    const onEdit = (selectedData: unknown) => {
        const selectedDataTyped = selectedData as ExtractKeyValue;

        const newValue = selectedDataTyped[selectedProperty?.value ?? ""];

        let data: BulkEditData = { fieldType: "", newValue: "" };

        if (type === "archive") {
            data = { fieldType: "validTo", newValue: new Date().toISOString() };
        } else if (type === "editProperties" && selectedProperty) {
            data = { fieldType: selectedProperty?.value, newValue: extractValue(selectedDataTyped) };
        } else onSubmitError("BACKEND_FORM_ERROR");

        setFormData(data);

        setSelectedChangeTo(newValue);
        onOpenConfirmModal();
    };

    const onConfirm = async () => {
        onSubmit();
        if (formData) {
            try {
                await bulkEditResource({ filterSet, data: formData });
                onAfterSubmit();
            } catch {
                onSubmitError("BACKEND_FORM_ERROR");
                onCloseConfirmModal();
            }
        }
    };

    return (
        <>
            <FormProvider
                formId="bulk-edit"
                schema={schema}
                formRef={formRef}
                formType="edit"
                initialValues={null}
                onEdit={onEdit}
                onSubmitError={(isBackendFormError) =>
                    onSubmitError(isBackendFormError ? "BACKEND_FORM_ERROR" : "GENERIC")
                }
            >
                <RadioGroup size="sm" onChange={(option: EditType) => setType(option)} value={type}>
                    <HStack>
                        <Radio value="editProperties">{t("Edit Properties")}</Radio>
                        <Radio value="archive">{t("Archive")}</Radio>
                    </HStack>
                </RadioGroup>
                {type === "editProperties" && (
                    <HStack alignItems="end">
                        <Box w={400}>
                            <FormControl
                                fieldName="property"
                                onChange={(data) => setSelectedProperty(data as SelectOption)}
                            />
                        </Box>

                        {selectedProperty?.value && (
                            <>
                                <Icon size={8} icon="arrowRight" color="accentPrimaryDefault" />
                                <Box w={400}>
                                    <FormControl fieldName={selectedProperty.value} />
                                </Box>
                            </>
                        )}
                    </HStack>
                )}
            </FormProvider>
            <BulkEditConfirmModal
                isOpen={isOpenConfirmModal}
                onConfirm={onConfirm}
                onCancel={onCloseConfirmModal}
                entries={totalItems}
                editableProperty={formatEditableProperty}
                isLoading={isLoading}
            />
        </>
    );
};
