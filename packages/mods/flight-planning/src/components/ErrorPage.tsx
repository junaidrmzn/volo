import { Box, Heading, Text } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../translations/useFlightPlanningTranslation";

type ErrorPageProps = {
    error?: string;
};

export const ErrorPage = (props: ErrorPageProps) => {
    const { error } = props;
    const { t } = useFlightPlanningTranslation();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="100%"
            width="100%"
        >
            <Heading mt={4} mb={1} fontSize="lg" lineHeight="none">
                {t("errorPage.title")}
            </Heading>
            <Text>{error}</Text>
        </Box>
    );
};
