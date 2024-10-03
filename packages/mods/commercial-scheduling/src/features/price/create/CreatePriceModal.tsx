import { HStack, Radio, RadioGroup, Stack, Text, VStack } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePriceTranslation } from "../translations/usePriceTranslation";
import { CreatePriceForm } from "./CreatePriceForm";
import { UseCreatePriceFormOptions } from "./useCreatePriceForm";

type CreatePriceModalProps = {
    isOpen: boolean;
} & UseCreatePriceFormOptions;

export const CreatePriceModal = (props: CreatePriceModalProps) => {
    const { isOpen, closeModal } = props;
    const { t } = usePriceTranslation();

    return (
        <CommercialSchedulingModal
            size="5xl"
            heading={t("modal.add.heading")}
            subHeading={t("modal.add.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Text mb={2}>{t("modal.add.Validity")}</Text>
            <HStack boxSize="full" width="100%" mb={4}>
                <VStack alignItems="flex-start" flex={1} backgroundColor="monochrome.200" padding={1}>
                    <RadioGroup size="sm" value="allDays">
                        <Stack direction="column">
                            <Radio value="allDays">{t("modal.add.all days")}</Radio>
                            <Radio value="byDays">{t("modal.add.by days")}</Radio>
                        </Stack>
                    </RadioGroup>
                </VStack>
                <VStack alignItems="flex-start" flex={1} backgroundColor="monochrome.200" padding={1}>
                    <RadioGroup size="sm" value="allRoutes">
                        <Stack direction="column">
                            <Radio value="allRoutes">{t("modal.add.for all routes")}</Radio>
                            <Radio value="byRoutes">{t("modal.add.by routes")}</Radio>
                        </Stack>
                    </RadioGroup>
                </VStack>
            </HStack>
            <CreatePriceForm {...props} />
        </CommercialSchedulingModal>
    );
};
