import { Heading, Text, VStack } from "@volocopter/design-library-react";
import { useTemplateTranslation } from "./translations/useTemplateTranslation";

export const App = () => {
    const { t } = useTemplateTranslation();
    return (
        <VStack>
            <Text fontSize="9xl">📝</Text>
            <Heading>{t("This is just a template")}</Heading>
        </VStack>
    );
};
