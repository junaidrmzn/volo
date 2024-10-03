import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Radio,
    RadioGroup,
    Stack,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { useDiscountTranslation } from "../translations/useDiscountTranslation";
import { UseCreateDiscountFormOptions, useCreateDiscountForm } from "./useCreateDiscountForm";

type CreateDiscountProps = UseCreateDiscountFormOptions;

export const CreateDiscountForm = (props: CreateDiscountProps) => {
    const { reloadList, closeModal } = props;
    const { t } = useDiscountTranslation();
    const { discountSchema, FormControl, onCreate, discountType, onDiscountTypeChange, errorMessage } =
        useCreateDiscountForm({
            reloadList,
            closeModal,
        });

    return (
        <FormProvider formType="create" schema={discountSchema} onCreate={onCreate}>
            <FormControl fieldName="name" />
            <HStack alignItems="start">
                <FormControl fieldName="validFrom" />
                <FormControl fieldName="validTo" />
            </HStack>
            <FormControl fieldName="codes" />
            <FormControl fieldName="region" />
            <VStack alignItems="flex-start">
                <Text size="sm">{`${t("modal.create.discountType.label")}:`}</Text>
                <Box boxSize="full" backgroundColor="monochrome.200">
                    <RadioGroup
                        aria-label={t("modal.create.discountType.label")}
                        size="sm"
                        value={discountType}
                        onChange={onDiscountTypeChange}
                    >
                        <Stack direction="column">
                            <Radio value="AMOUNT">{t("modal.create.discountType.options.amount")}</Radio>
                            <Radio value="PERCENTAGE"> {t("modal.create.discountType.options.percentage")}</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </VStack>
            {discountType === "AMOUNT" && <FormControl fieldName="currency" />}
            <FormControl fieldName="value" />
            {errorMessage !== "" ? (
                <Text size="xs" color="semanticWarningBasic">
                    {errorMessage}
                </Text>
            ) : null}
            <HStack alignSelf="flex-end">
                <ButtonGroup isAttached>
                    <Button type="reset" onClick={closeModal}>
                        {t("labels.cancel")}
                    </Button>
                    <Button variant="primary" type="submit">
                        {t("labels.upload")}
                    </Button>
                </ButtonGroup>
            </HStack>
        </FormProvider>
    );
};
