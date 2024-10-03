import { Box, HStack, Heading, IconButtonProps, VStack } from "@volocopter/design-library-react";
import { RefObject } from "react";
import { AnyObjectSchema, BulkForm, BulkFormProps } from "@voloiq/form";
import { useBulkCreateTestHazardAssessmentTranslations } from "../translations/useBulkCreateTestHazardAssessmentTranslations";
import { BulkAddButton } from "./BulkAddButton";
import { DeleteButton } from "./DeleteButton";

export type BulkResourceFormProps<Schema extends AnyObjectSchema> = {
    deleteButtonProps?: Partial<IconButtonProps>;
    headerTitle?: string;
    formRef: RefObject<HTMLFormElement>;
} & Omit<BulkFormProps<Schema>, "children">;

export const TestHazardAssessmentBulkForm = <Schema extends AnyObjectSchema>(props: BulkResourceFormProps<Schema>) => {
    const { onAfterSubmit, renderFormControlGroup, deleteButtonProps, headerTitle, formRef, ...bulkFormProps } = props;
    const { t } = useBulkCreateTestHazardAssessmentTranslations();

    return (
        <BulkForm
            formRef={formRef}
            {...bulkFormProps}
            onAfterSubmit={onAfterSubmit}
            renderFormControlGroup={(FormControl, index) => (
                <Box p={4} mt={4} background="bgContentLayer" borderRadius="sm">
                    <HStack w="full" mb={2} justifyContent="space-between">
                        <Heading fontWeight="semibold" fontSize="md">
                            {headerTitle} {index + 1}
                        </Heading>
                        <DeleteButton mt={8} {...deleteButtonProps} />
                    </HStack>
                    <HStack align="flex-start">
                        <Box flex={1}>{renderFormControlGroup(FormControl, index)}</Box>
                    </HStack>
                </Box>
            )}
        >
            <VStack w="full" spacing={3} align="flex-end">
                <BulkAddButton buttonText={t("form.addAnotherTestHazard")} />
            </VStack>
        </BulkForm>
    );
};
