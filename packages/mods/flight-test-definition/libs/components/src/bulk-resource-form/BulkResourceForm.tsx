import type { IconButtonProps } from "@volocopter/design-library-react";
import { Box, Button, HStack, Icon, VStack } from "@volocopter/design-library-react";
import type { AnyObjectSchema, BulkFormProps } from "@voloiq/form";
import { BulkForm } from "@voloiq/form";
import { BulkResourceFormAddGroupButton } from "./BulkResourceFormAddGroupButton";
import { BulkResourceFormDeleteGroupButton } from "./BulkResourceFormDeleteGroupButton";
import { BulkResourceFormDuplicateGroupButton } from "./BulkResourceFormDuplicateGroupButton";
import { useBulkResourceFormTranslation } from "./translations/useBulkResourceFormTranslation";

export type BulkResourceFormProps<Schema extends AnyObjectSchema> = {
    entityName: string;
    isLoading?: boolean;
    deleteButtonProps?: Partial<IconButtonProps>;
    withSubmitButton?: boolean;
    withDuplicateButton?: boolean;
    withAddNewButton?: boolean;
    withDeleteButton?: boolean;
} & Omit<BulkFormProps<Schema>, "children">;

export const BulkResourceForm = <Schema extends AnyObjectSchema>(props: BulkResourceFormProps<Schema>) => {
    const {
        entityName,
        onAfterSubmit,
        isLoading = false,
        renderFormControlGroup,
        deleteButtonProps,
        withSubmitButton = false,
        withDuplicateButton = false,
        withAddNewButton = true,
        withDeleteButton = true,
        ...bulkFormProps
    } = props;

    const { t } = useBulkResourceFormTranslation();

    return (
        <BulkForm
            {...bulkFormProps}
            onAfterSubmit={onAfterSubmit}
            renderFormControlGroup={(FormControl, index) => (
                <HStack p={3} mb={3} background="gray300Gray800" borderRadius="sm" align="flex-start">
                    <Box flex={1}>{renderFormControlGroup(FormControl, index)}</Box>
                    <Box>
                        {withDuplicateButton && (
                            <BulkResourceFormDuplicateGroupButton mt={6} {...deleteButtonProps} index={index} />
                        )}
                        {withDeleteButton && <BulkResourceFormDeleteGroupButton mt={6} {...deleteButtonProps} />}
                    </Box>
                </HStack>
            )}
        >
            <VStack w="full" spacing={3} align="flex-end">
                {withAddNewButton && (
                    <BulkResourceFormAddGroupButton buttonText={t("Add Another {entityName}", { entityName })} />
                )}
                {withSubmitButton && (
                    <Button
                        type="submit"
                        leftIcon={<Icon icon="check" size={4} />}
                        size="lg"
                        variant="primary"
                        isLoading={isLoading}
                    >
                        {t("Done")}
                    </Button>
                )}
            </VStack>
        </BulkForm>
    );
};
