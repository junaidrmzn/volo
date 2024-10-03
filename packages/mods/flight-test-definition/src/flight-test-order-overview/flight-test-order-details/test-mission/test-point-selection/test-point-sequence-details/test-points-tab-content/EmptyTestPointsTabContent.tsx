import { Center, Text } from "@volocopter/design-library-react";
import { useTestPointsTabContentTranslation } from "./translations/useTestPointsTabContentTranslation";

export const EmptyTestPointsTabContent = () => {
    const { t } = useTestPointsTabContentTranslation();

    return (
        <Center h="85vh" p={3} bgColor="decorative1Muted" borderRadius={9}>
            <Text color="fontOnBgMuted">{t("No Test Points found. Please add from the list.")}</Text>
        </Center>
    );
};
