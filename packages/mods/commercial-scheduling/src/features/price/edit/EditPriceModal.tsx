import { HStack, Radio, RadioGroup, Stack, Text, VStack } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePriceTranslation } from "../translations/usePriceTranslation";
import { EditPriceForm } from "./EditPriceForm";
import { UseEditPriceFormOptions } from "./useEditPriceForm";

type EditPriceModalProps = {
    isOpen: boolean;
} & UseEditPriceFormOptions;

export const EditPriceModal = (props: EditPriceModalProps) => {
    const { isOpen, closeModal } = props;
    const { t } = usePriceTranslation();

    return (
        <CommercialSchedulingModal
            size="5xl"
            heading={t("modal.edit.heading")}
            subHeading={t("modal.edit.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Text mb={2}>{t("modal.edit.Validity")}</Text>
            <HStack boxSize="full" width="100%" mb={4}>
                <VStack alignItems="flex-start" flex={1} backgroundColor="monochrome.200" padding={1}>
                    <RadioGroup size="sm" value="allDays">
                        <Stack direction="column">
                            <Radio value="allDays">{t("modal.edit.all days")}</Radio>
                            <Radio value="byDays">{t("modal.edit.by days")}</Radio>
                        </Stack>
                    </RadioGroup>
                </VStack>
                <VStack alignItems="flex-start" flex={1} backgroundColor="monochrome.200" padding={1}>
                    <RadioGroup size="sm" value="allRoutes">
                        <Stack direction="column">
                            <Radio value="allRoutes">{t("modal.edit.for all routes")}</Radio>
                            <Radio value="byRoutes">{t("modal.edit.by routes")}</Radio>
                        </Stack>
                    </RadioGroup>
                </VStack>
            </HStack>
            <EditPriceForm {...props} />
        </CommercialSchedulingModal>
    );
};
