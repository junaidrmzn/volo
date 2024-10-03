import { Box, NavigationBarActionButton } from "@volocopter/design-library-react";
import { useActionButtonsTranslation } from "./translations/useActionButtonsTranslation";

const openFeedbackPage = () => window.open(FEEDBACK_URL, "_blank");

export const FeedbackButton = () => {
    const { t } = useActionButtonsTranslation();
    const icon = (
        <Box fontSize="xxs" w={9} pr={1} whiteSpace="pre-line" display="block">
            {t("feedback")}
        </Box>
    );
    const label = t("get in touch");

    return <NavigationBarActionButton onClick={openFeedbackPage} icon={icon} label={label} />;
};
