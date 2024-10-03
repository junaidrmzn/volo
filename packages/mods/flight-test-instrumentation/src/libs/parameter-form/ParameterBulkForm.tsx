import { Box, HStack, Heading, IconButtonProps, VStack } from "@volocopter/design-library-react";
import { RefObject } from "react";
import type { AnyObjectSchema, BulkFormProps } from "@voloiq/form";
import { BulkForm } from "@voloiq/form";
import { BulkAddButton } from "./parameter-form-layout/BulkAddButton";
import { DeleteButton } from "./parameter-form-layout/DeleteButton";
import { DuplicateButton } from "./parameter-form-layout/DuplicateButton";
import { useFtiParameterFormTranslation } from "./translations/useFtiTranslation";

export type BulkResourceFormProps<Schema extends AnyObjectSchema> = {
    entityName: string;
    deleteButtonProps?: Partial<IconButtonProps>;
    headerTitle?: string;
    isLoading: boolean;
    formRef: RefObject<HTMLFormElement>;
    setIsSaveButtonDisabled: (isSaveButtonDisabled: boolean) => void;
} & Omit<BulkFormProps<Schema>, "children">;

export const ParameterBulkForm = <Schema extends AnyObjectSchema>(props: BulkResourceFormProps<Schema>) => {
    const {
        isLoading,
        entityName,
        onAfterSubmit,
        renderFormControlGroup,
        deleteButtonProps,
        headerTitle,
        formRef,
        setIsSaveButtonDisabled,
        ...bulkFormProps
    } = props;
    const onFormValidityChange = (isFormValid: boolean) => {
        setIsSaveButtonDisabled(!isFormValid);
    };

    const { t } = useFtiParameterFormTranslation();

    return (
        <BulkForm
            formRef={formRef}
            {...bulkFormProps}
            onAfterSubmit={onAfterSubmit}
            onFormValidityChange={onFormValidityChange}
            renderFormControlGroup={(FormControl, index, canDuplicate) => (
                <Box p={4} mt={4} background="bgContentLayer" borderRadius="sm">
                    <HStack mb={3} w="full" justifyContent="space-between" alignItems="flex-start">
                        <Heading fontWeight="semibold" fontSize="md">
                            {headerTitle} {index + 1}
                        </Heading>
                        <Box alignItems="flex-start">
                            <DuplicateButton mr={1} canDuplicate={canDuplicate} {...deleteButtonProps} index={index} />
                            <DeleteButton ml={1} {...deleteButtonProps} />
                        </Box>
                    </HStack>
                    <HStack align="flex-start">
                        <Box flex={1}>{renderFormControlGroup(FormControl, index)}</Box>
                    </HStack>
                </Box>
            )}
        >
            <VStack w="full" spacing={3} align="flex-end">
                <BulkAddButton buttonText={t("addAnotherParameter", { entityName })} />
            </VStack>
        </BulkForm>
    );
};
