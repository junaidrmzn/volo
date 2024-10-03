import { Text, VStack } from "@volocopter/design-library-react";
import { useBookingTranslation } from "../translations/useBookingTranslation";

export const NoBookingSelected = () => {
    const { t } = useBookingTranslation();

    return (
        <VStack width="100%" height="100%" align="center">
            <Text fontWeight="bold">{t("overview.detail.notSelected.title")}</Text>
            <Text>{t("overview.detail.notSelected.subtitle")}</Text>
        </VStack>
    );
};
